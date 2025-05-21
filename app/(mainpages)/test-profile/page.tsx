'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card';
import { Button } from '@/app/components/atoms/buttons/Button';
import { Input } from '@/app/components/atoms/inputs/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs';
import { Separator } from '@/app/components/ui/separator';
import { useUser } from '@/hooks/useUser';

export default function TestProfilePage() {
  const { user: currentUser, isLoading: userLoading } = useUser();
  const supabase = createClientComponentClient();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all profiles for testing
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(10);
          
        if (error) throw error;
        setProfiles(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, [supabase]);
  
  // Fetch posts for selected profile
  useEffect(() => {
    if (!selectedProfile) return;
    
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('author_id', selectedProfile.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setPosts(data || []);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
      }
    };
    
    fetchPosts();
  }, [selectedProfile, supabase]);
  
  if (loading || userLoading) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading Profiles...</CardTitle>
          </CardHeader>
          <CardContent className="h-40 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Testing Page</h1>
      
      {/* Profile Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select a Profile to Test</CardTitle>
          <CardDescription>Choose from existing profiles in the database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profiles.map((profile) => (
              <Card 
                key={profile.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedProfile?.id === profile.id ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setSelectedProfile(profile)}
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={profile.avatar_url} alt={profile.username} />
                    <AvatarFallback>{profile.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{profile.username}</h3>
                  <p className="text-sm text-gray-500">{profile.full_name || profile.email}</p>
                </CardContent>
              </Card>
            ))}
            
            {profiles.length === 0 && (
              <div className="col-span-full text-center p-4">
                <p className="text-gray-500">No profiles found. Try creating test data first.</p>
                <Button className="mt-4" onClick={() => window.open('/api/auth/signin', '_blank')}>
                  Create an Account
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Profile View */}
      {selectedProfile && (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedProfile.avatar_url} alt={selectedProfile.username} />
                  <AvatarFallback>{selectedProfile.username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedProfile.username}</h2>
                    <p className="text-gray-500">{selectedProfile.full_name}</p>
                  </div>
                  <p>{selectedProfile.bio || 'No bio provided'}</p>
                  <div className="flex space-x-4">
                    {currentUser?.id !== selectedProfile.id ? (
                      <Button>Follow</Button>
                    ) : (
                      <Button variant="outline">Edit Profile</Button>
                    )}
                    <Button variant="outline">Message</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length > 0 ? (
                    <div className="space-y-6">
                      {posts.map((post) => (
                        <div key={post.id} className="border rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={selectedProfile.avatar_url} alt={selectedProfile.username} />
                              <AvatarFallback>{selectedProfile.username?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{selectedProfile.username}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="mb-3">{post.content}</p>
                          {post.images && post.images.length > 0 && (
                            <div className="mb-3">
                              <img 
                                src={post.images[0]} 
                                alt="Post attachment" 
                                className="rounded-lg max-h-64 w-auto"
                              />
                            </div>
                          )}
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <button className="flex items-center">
                              <span>❤️</span>
                              <span className="ml-1">{post.likes_count || 0}</span>
                            </button>
                            <button className="flex items-center">
                              <span>💬</span>
                              <span className="ml-1">{post.comments_count || 0}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No posts found for this user</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Username</dt>
                      <dd>{selectedProfile.username}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd>{selectedProfile.full_name || 'Not provided'}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd>{selectedProfile.email}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Bio</dt>
                      <dd>{selectedProfile.bio || 'No bio provided'}</dd>
                    </div>
                    <Separator />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Website</dt>
                      <dd>
                        {selectedProfile.website ? (
                          <a 
                            href={selectedProfile.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {selectedProfile.website}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </dd>
                    </div>
                    <Separator />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Joined</dt>
                      <dd>{new Date(selectedProfile.created_at).toLocaleDateString()}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 