'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/molecules/cards/Card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { Button } from '@/app/components/atoms/buttons/Button'
import { Input } from '@/app/components/atoms/inputs/Input'
import { Label } from '@/app/components/atoms/feedback/Label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

type RlsCheckResult = {
  table: string
  operation: string
  result: boolean | null
  timestamp: string
}

type StorageCheckResult = {
  bucket: string
  operation: string
  result: boolean | null
  timestamp: string
}

export default function RlsChecker() {
  const supabase = createClientComponentClient()
  const [tableResults, setTableResults] = useState<RlsCheckResult[]>([])
  const [storageResults, setStorageResults] = useState<StorageCheckResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTable, setSelectedTable] = useState('profiles')
  const [selectedOperation, setSelectedOperation] = useState('SELECT')
  const [selectedBucket, setSelectedBucket] = useState('avatars')
  const [userId, setUserId] = useState('')
  
  // Get the current user ID when component loads
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    getCurrentUser()
  }, [])

  const checkTableAccess = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc('check_rls_access', {
        table_name: selectedTable,
        operation: selectedOperation,
        test_row: { id: userId }
      })
      
      if (error) throw error
      
      const newResult: RlsCheckResult = {
        table: selectedTable,
        operation: selectedOperation,
        result: data,
        timestamp: new Date().toISOString()
      }
      
      setTableResults(prev => [newResult, ...prev].slice(0, 10))
    } catch (error) {
      console.error('Error checking RLS access:', error)
      const newResult: RlsCheckResult = {
        table: selectedTable,
        operation: selectedOperation,
        result: false,
        timestamp: new Date().toISOString()
      }
      setTableResults(prev => [newResult, ...prev].slice(0, 10))
    } finally {
      setIsLoading(false)
    }
  }
  
  const checkStorageAccess = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc('check_storage_access', {
        bucket_id: selectedBucket,
        operation: selectedOperation,
        file_path: `${userId}/test-file.txt`
      })
      
      if (error) throw error
      
      const newResult: StorageCheckResult = {
        bucket: selectedBucket,
        operation: selectedOperation,
        result: data,
        timestamp: new Date().toISOString()
      }
      
      setStorageResults(prev => [newResult, ...prev].slice(0, 10))
    } catch (error) {
      console.error('Error checking storage access:', error)
      const newResult: StorageCheckResult = {
        bucket: selectedBucket,
        operation: selectedOperation,
        result: false,
        timestamp: new Date().toISOString()
      }
      setStorageResults(prev => [newResult, ...prev].slice(0, 10))
    } finally {
      setIsLoading(false)
    }
  }
  
  const checkAllAccess = async () => {
    setIsLoading(true)
    const operations = ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
    const tables = ['profiles', 'posts']
    const buckets = ['avatars', 'post-media']
    
    try {
      // Clear previous results
      setTableResults([])
      setStorageResults([])
      
      // Check all table operations
      for (const table of tables) {
        for (const operation of operations) {
          const { data, error } = await supabase.rpc('check_rls_access', {
            table_name: table,
            operation,
            test_row: { id: userId }
          })
          
          const newResult: RlsCheckResult = {
            table,
            operation,
            result: error ? false : data,
            timestamp: new Date().toISOString()
          }
          
          setTableResults(prev => [...prev, newResult])
        }
      }
      
      // Check all storage operations
      for (const bucket of buckets) {
        for (const operation of operations) {
          const { data, error } = await supabase.rpc('check_storage_access', {
            bucket_id: bucket,
            operation,
            file_path: `${userId}/test-file.txt`
          })
          
          const newResult: StorageCheckResult = {
            bucket,
            operation,
            result: error ? false : data,
            timestamp: new Date().toISOString()
          }
          
          setStorageResults(prev => [...prev, newResult])
        }
      }
    } catch (error) {
      console.error('Error checking all access:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl dark:text-gray-100">RLS Policy Checker</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Check if your user has the correct permissions to tables and storage buckets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="userId" className="dark:text-gray-200">User ID</Label>
              <Input 
                id="userId" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                placeholder="User ID" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="table" className="dark:text-gray-200">Database Table</Label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger id="table" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                    <SelectValue placeholder="Select table" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="profiles">profiles</SelectItem>
                    <SelectItem value="posts">posts</SelectItem>
                    <SelectItem value="comments">comments</SelectItem>
                    <SelectItem value="likes">likes</SelectItem>
                    <SelectItem value="follows">follows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storage" className="dark:text-gray-200">Storage Bucket</Label>
                <Select value={selectedBucket} onValueChange={setSelectedBucket}>
                  <SelectTrigger id="storage" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                    <SelectValue placeholder="Select bucket" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="avatars">avatars</SelectItem>
                    <SelectItem value="post-media">post-media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="operation" className="dark:text-gray-200">Operation</Label>
              <Select value={selectedOperation} onValueChange={setSelectedOperation}>
                <SelectTrigger id="operation" className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="SELECT">SELECT</SelectItem>
                  <SelectItem value="INSERT">INSERT</SelectItem>
                  <SelectItem value="UPDATE">UPDATE</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={checkTableAccess} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Check Table Access
          </Button>
          <Button 
            onClick={checkStorageAccess} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Check Storage Access
          </Button>
          <Button 
            onClick={checkAllAccess} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Check All
          </Button>
        </CardFooter>
      </Card>
      
      {tableResults.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl dark:text-gray-100">Table Access Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Table</TableHead>
                  <TableHead className="dark:text-gray-300">Operation</TableHead>
                  <TableHead className="dark:text-gray-300">Result</TableHead>
                  <TableHead className="dark:text-gray-300">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableResults.map((result, i) => (
                  <TableRow key={i} className="dark:border-gray-700">
                    <TableCell className="dark:text-gray-300">{result.table}</TableCell>
                    <TableCell className="dark:text-gray-300">{result.operation}</TableCell>
                    <TableCell>
                      {result.result === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : result.result === false ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {storageResults.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl dark:text-gray-100">Storage Access Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Bucket</TableHead>
                  <TableHead className="dark:text-gray-300">Operation</TableHead>
                  <TableHead className="dark:text-gray-300">Result</TableHead>
                  <TableHead className="dark:text-gray-300">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {storageResults.map((result, i) => (
                  <TableRow key={i} className="dark:border-gray-700">
                    <TableCell className="dark:text-gray-300">{result.bucket}</TableCell>
                    <TableCell className="dark:text-gray-300">{result.operation}</TableCell>
                    <TableCell>
                      {result.result === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : result.result === false ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 