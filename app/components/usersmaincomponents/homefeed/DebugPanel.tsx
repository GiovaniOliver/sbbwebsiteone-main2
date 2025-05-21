'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card'
import { Button } from '@/app/components/atoms/buttons/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getSupabaseClient } from '@/hooks'
import { useUser } from '@/hooks/useUser'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/molecules/feedback/Dialog'
import { ScrollArea } from '@/app/components/molecules/overlay/ScrollArea'

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>('')
  const supabase = getSupabaseClient()
  const { user } = useUser()

  const runDiagnostics = async () => {
    setIsLoading(true)
    setDebugInfo(null)

    try {
      const diagnostics: any = {
        timestamp: new Date().toISOString(),
        connection: 'Testing...',
        tables: {},
        auth: {},
      }

      // Test basic connection
      const { data: connectionTest, error: connectionError } = await supabase
        .from('profiles')
        .select('count')

      diagnostics.connection = connectionError 
        ? `Failed: ${connectionError.message}` 
        : 'Success'

      // Check tables
      const tables = ['profiles', 'posts', 'post_likes', 'post_comments']
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('count')
          
          diagnostics.tables[table] = {
            exists: !error,
            error: error ? error.message : null,
            count: data ? data.length : 0
          }

          // For posts table, check structure
          if (table === 'posts' && !error) {
            const { data: samplePost, error: sampleError } = await supabase
              .from('posts')
              .select('*')
              .limit(1)

            if (!sampleError && samplePost && samplePost.length > 0) {
              diagnostics.tables.postFields = Object.keys(samplePost[0])
            }
          }
        } catch (err: any) {
          diagnostics.tables[table] = {
            exists: false,
            error: err.message
          }
        }
      }

      // Test auth
      const { data: session } = await supabase.auth.getSession()
      diagnostics.auth.hasSession = !!session?.session
      if (session?.session) {
        diagnostics.auth.userId = session.session.user.id
      }

      // Test posts query with relationship
      try {
        const { data: postWithRelations, error: relationError } = await supabase
          .from('posts')
          .select(`
            *,
            users:author_id (id, username),
            likes:post_likes (user_id)
          `)
          .limit(1)

        diagnostics.postsRelationshipTest = {
          success: !relationError,
          error: relationError ? relationError.message : null,
          data: postWithRelations
        }
      } catch (err: any) {
        diagnostics.postsRelationshipTest = {
          success: false,
          error: err.message
        }
      }

      setDebugInfo(diagnostics)
    } catch (err: any) {
      setDebugInfo({
        error: `Failed to run diagnostics: ${err.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkRLS = async () => {
    setIsLoading(true)
    setResult('Checking Row Level Security policies...\n')

    try {
      // Check if user is authenticated
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        setResult(prev => prev + `❌ Session error: ${sessionError.message}\n`)
        return
      }

      if (!sessionData.session) {
        setResult(prev => prev + `❌ No active session. Please sign in first.\n`)
        return
      }

      setResult(prev => prev + `✅ Authenticated as user: ${sessionData.session.user.email}\n`)

      // Check if user has a profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('id', sessionData.session.user.id)
        .single()

      if (profileError) {
        setResult(prev => prev + `❌ Profile error: ${profileError.message}\n`)
        setResult(prev => prev + `Creating a profile for the user...\n`)

        // Create a profile for the user
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: sessionData.session.user.id,
            username: sessionData.session.user.email?.split('@')[0] || 'user',
            first_name: '',
            last_name: '',
            email: sessionData.session.user.email || '',
          })

        if (createProfileError) {
          setResult(prev => prev + `❌ Failed to create profile: ${createProfileError.message}\n`)
        } else {
          setResult(prev => prev + `✅ Created a profile for the user\n`)
        }
      } else {
        setResult(prev => prev + `✅ User has a profile with username: ${profileData.username}\n`)
      }

      // Check if the posts table has RLS enabled
      const { data: rlsData, error: rlsError } = await supabase.rpc('check_rls_enabled', {
        table_name: 'posts'
      })

      if (rlsError) {
        setResult(prev => prev + `❓ Could not check RLS status: ${rlsError.message}\n`)
      } else {
        if (rlsData) {
          setResult(prev => prev + `✅ RLS is enabled for posts table\n`)
        } else {
          setResult(prev => prev + `❌ RLS is NOT enabled for posts table\n`)
        }
      }

      // Check storage buckets
      setResult(prev => prev + `\nChecking storage buckets...\n`)
      
      try {
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
        
        if (bucketError) {
          setResult(prev => prev + `❌ Error listing buckets: ${bucketError.message}\n`)
        } else {
          setResult(prev => prev + `✅ Found ${buckets.length} storage buckets\n`)
          
          // Check for post-media bucket
          const postMediaBucket = buckets.find((b: { name: string }) => b.name === 'post-media')
          if (postMediaBucket) {
            setResult(prev => prev + `✅ 'post-media' bucket exists\n`)
          } else {
            setResult(prev => prev + `❌ 'post-media' bucket does not exist\n`)
            
            // Try to create the bucket
            try {
              const { error: createBucketError } = await supabase.storage.createBucket('post-media', {
                public: true,
                fileSizeLimit: 10 * 1024 * 1024,
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
              })
              
              if (createBucketError) {
                setResult(prev => prev + `❌ Failed to create 'post-media' bucket: ${createBucketError.message}\n`)
              } else {
                setResult(prev => prev + `✅ Created 'post-media' bucket\n`)
              }
            } catch (err) {
              setResult(prev => prev + `❌ Error creating bucket: ${err instanceof Error ? err.message : String(err)}\n`)
            }
          }
        }
        
        // Test storage permissions by uploading a tiny file
        setResult(prev => prev + `Testing storage upload permissions...\n`)
        
        // Create a small test file
        const testBlob = new Blob(['test'], { type: 'text/plain' })
        const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' })
        
        const { error: uploadError } = await supabase.storage
          .from('post-media')
          .upload(`${sessionData.session.user.id}/test/permission-test.txt`, testFile, {
            upsert: true
          })
          
        if (uploadError) {
          setResult(prev => prev + `❌ Storage upload test failed: ${uploadError.message}\n`)
          
          if (uploadError.message.includes('row-level security')) {
            setResult(prev => prev + `This is an RLS policy issue with storage. Need to set proper policies.\n`)
          }
        } else {
          setResult(prev => prev + `✅ Storage upload test succeeded\n`)
          
          // Clean up the test file
          const { error: deleteError } = await supabase.storage
            .from('post-media')
            .remove([`${sessionData.session.user.id}/test/permission-test.txt`])
            
          if (deleteError) {
            setResult(prev => prev + `❌ Warning: Could not clean up test file: ${deleteError.message}\n`)
          } else {
            setResult(prev => prev + `✅ Test file cleaned up successfully\n`)
          }
        }
      } catch (storageError) {
        setResult(prev => prev + `❌ Error checking storage: ${storageError instanceof Error ? storageError.message : String(storageError)}\n`)
      }

      // Test insert a post for RLS
      setResult(prev => prev + `\nTesting post creation...\n`)
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert({
          content: 'Test post from debug panel',
          author_id: sessionData.session.user.id,
          type: 'text'
        })
        .select()
        .single()

      if (postError) {
        setResult(prev => prev + `❌ Post creation test failed: ${postError.message}\n`)
        
        if (postError.message.includes('row-level security')) {
          setResult(prev => prev + `This is an RLS policy issue. Need to set proper policies.\n`)
        }
      } else {
        setResult(prev => prev + `✅ Post creation test succeeded with ID: ${postData.id}\n`)
        
        // Clean up the test post
        const { error: deleteError } = await supabase
          .from('posts')
          .delete()
          .eq('id', postData.id)
          
        if (deleteError) {
          setResult(prev => prev + `❌ Warning: Could not clean up test post: ${deleteError.message}\n`)
        } else {
          setResult(prev => prev + `✅ Test post cleaned up successfully\n`)
        }
      }

      setResult(prev => prev + `\nDiagnostic complete!\n`)
    } catch (error) {
      setResult(prev => prev + `\n❌ Error during RLS check: ${error instanceof Error ? error.message : String(error)}\n`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-4 bg-blue-50 border-blue-200 hidden md:block">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>Debug Panel</span>
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-blue-100 hover:bg-blue-200"
                >
                  Check RLS Policies
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Row Level Security Diagnostic</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] mt-4 rounded-md border p-4">
                  <pre className="whitespace-pre-wrap text-sm">
                    {result || 'Click "Run Diagnostic" to check RLS policies'}
                  </pre>
                </ScrollArea>
                <DialogFooter>
                  <Button 
                    onClick={checkRLS}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Running...' : 'Run Diagnostic'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('Current user:', user)}
            >
              Log User
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="text-xs">
          This panel is for developers only and should be hidden in production.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
