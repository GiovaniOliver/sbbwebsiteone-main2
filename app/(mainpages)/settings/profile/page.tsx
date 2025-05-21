'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/hooks/useUser';
import { Loader2, Upload, User, MapPin, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/atoms/buttons/Button';
import { Input } from '@/app/components/atoms/inputs/Input';
import { Textarea } from '@/app/components/atoms/inputs/Textarea';
import { Label } from '@/app/components/atoms/feedback/Label';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/molecules/cards/Card';
import { useToast } from '@/app/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/molecules/navigation/Tabs';
import Link from 'next/link';
import { useLocation } from '@/app/context/LocationContext';

type State = {
  id: number;
  state_name: string;
  state_code: string;
  black_population: number;
  black_percentage: string;
  state_rank: number;
};

type City = {
  id: number;
  city_name: string;
  state_code: string;
  black_population: number;
  black_percentage: string;
  city_rank: number;
};

// Storage utility hook for handling file uploads
function useSupabaseStorage(config: { bucketName: string; autoCreateBucket?: boolean }) {
  const supabase = createClientComponentClient();
  
  const initializeBucket = async (): Promise<boolean> => {
    try {
      if (config.autoCreateBucket) {
        // Check if bucket exists
        const { data: buckets, error: getBucketError } = await supabase.storage.listBuckets();
        
        if (getBucketError) {
          console.error('Error checking buckets:', getBucketError);
          return false;
        }
        
        const bucketExists = buckets.some(bucket => bucket.name === config.bucketName);
        
        if (!bucketExists) {
          // Create bucket if it doesn't exist
          const { error: createBucketError } = await supabase.storage.createBucket(config.bucketName, {
            public: false  // Make it private by default
          });
          
          if (createBucketError) {
            console.error('Error creating bucket:', createBucketError);
            return false;
          }
          
          console.log(`Bucket ${config.bucketName} created successfully.`);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing bucket:', error);
      return false;
    }
  };
  
  const uploadFile = async (
    userId: string, 
    file: File, 
    uploadOptions?: { folder?: string; customName?: string }
  ) => {
    try {
      const bucketInitialized = await initializeBucket();
      
      if (!bucketInitialized) {
        throw new Error('Failed to initialize storage bucket');
      }
      
      // Generate a file path
      const fileExt = file.name.split('.').pop();
      const folder = uploadOptions?.folder || '';
      const fileName = uploadOptions?.customName || `${userId}_${Date.now()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;
      
      // Upload file
      const { error: uploadError, data } = await supabase.storage
        .from(config.bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(config.bucketName)
        .getPublicUrl(filePath);
      
      return {
        path: filePath,
        url: urlData.publicUrl
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  
  const deleteFile = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from(config.bucketName)
        .remove([filePath]);
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };
  
  return {
    initializeBucket,
    uploadFile,
    deleteFile
  };
}

export default function ProfileSettingsPage() {
  const { user } = useUser();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const storage = useSupabaseStorage({ bucketName: 'avatars', autoCreateBucket: true });
  
  // General profile states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  // Location states
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationUpdating, setLocationUpdating] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Initialize form data with user info
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    website: ''
  });
  
  const { selectedState: contextState, selectedCity: contextCity, setUserLocation } = useLocation();
  
  // Use context values as default values if they exist
  useEffect(() => {
    if (contextState) {
      setSelectedState(contextState);
    }
    if (contextCity) {
      setSelectedCity(contextCity);
    }
  }, [contextState, contextCity]);
  
  const loadUserProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch user profile from database
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      // Set profile and form data
      setProfile(data);
      setFormData({
        username: data.username || '',
        full_name: data.full_name || '',
        bio: data.bio || '',
        website: data.website || ''
      });
      
      // Set location data
      setSelectedState(data.state_code || '');
      setSelectedCity(data.city || '');
      
      // Get avatar URL if exists
      if (data.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
      
      toast({
        title: 'Error fetching profile',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load states from API
  useEffect(() => {
    async function fetchStates() {
      try {
        setLoadingLocations(true);
        const response = await fetch('/api/states');
        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
        setErrorMessage('Failed to load states. Please try again later.');
      } finally {
        setLoadingLocations(false);
      }
    }

    const initStorage = async () => {
      try {
        await storage.initializeBucket();
      } catch (error) {
        console.error('Failed to initialize storage:', error);
      }
    };
    
    if (user) {
      loadUserProfile();
      fetchStates();
      initStorage();
    }
  }, [user]);
  
  // Load cities when state is selected
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }

    async function fetchCities() {
      try {
        setLoadingLocations(true);
        const response = await fetch(`/api/states/${selectedState}/cities`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cities for state ${selectedState}`);
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setErrorMessage(`Failed to load cities for ${selectedState}. Please try again later.`);
      } finally {
        setLoadingLocations(false);
      }
    }

    fetchCities();
  }, [selectedState]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          full_name: formData.full_name,
          bio: formData.bio,
          website: formData.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated',
      });
      
      loadUserProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };
  
  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedState || !selectedCity) {
      toast({
        title: "Missing Fields",
        description: "Please select both state and city.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLocationUpdating(true);
      
      // Use the context function to save location
      await setUserLocation(selectedState, selectedCity);
      
      setSaveMessage('Location updated successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating location:', error);
      toast({
        title: 'Error updating location',
        description: error.message || 'An error occurred',
        variant: 'destructive'
      });
    } finally {
      setLocationUpdating(false);
    }
  };
  
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0 || !user) {
        return;
      }
      
      const file = e.target.files[0];
      const fileSize = file.size / 1024 / 1024; // size in MB
      
      // Validate file size (max 2MB)
      if (fileSize > 2) {
        toast({
          title: 'File too large',
          description: 'Avatar image must be less than 2MB',
          variant: 'destructive'
        });
        return;
      }
      
      setUploadingAvatar(true);
      
      // Upload avatar
      const result = await storage.uploadFile(user.id, file, {
        folder: 'avatars',
        customName: `avatar_${user.id}_${Date.now()}.${file.name.split('.').pop()}`
      });
      
      // Update profile with new avatar URL
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_url: result.url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update avatar in UI
      setAvatarUrl(result.url);
      
      toast({
        title: 'Avatar updated',
        description: 'Your profile picture has been updated'
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      
      toast({
        title: 'Error updating avatar',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploadingAvatar(false);
    }
  };
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Not Logged In</h2>
        <p className="text-gray-500 mb-6">Please sign in to access your profile settings.</p>
        <Button asChild variant="primary">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>
                    Update your profile photo
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={avatarUrl || undefined} />
                      <AvatarFallback className="text-xl">
                        {profile?.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <Loader2 className="h-10 w-10 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full">
                    <Label htmlFor="avatar" className="w-full">
                      <div className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Upload new image</span>
                      </div>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                      />
                    </Label>
                    
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Recommended: Square image, max 2MB
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    Your account verification status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">Basic Profile</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Verified</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">Location</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {(profile?.state_code && profile?.city) ? 'Added' : 'Not Added'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium">Bio</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {profile?.bio ? 'Completed' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Your username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Your full name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://your-website.com"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={updating}
                          className="w-full md:w-auto"
                        >
                          {updating ? (
                            <span>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </span>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Location Tab */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Update Your Location</CardTitle>
              <CardDescription>
                Select your location to personalize your experience and see relevant community data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingLocations && !states.length ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <form onSubmit={handleSaveLocation} className="space-y-6">
                  {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <p className="text-red-700">{errorMessage}</p>
                    </div>
                  )}
                  
                  {saveMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="text-green-700">{saveMessage}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </Label>
                    <select
                      id="state"
                      name="state"
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity('');
                      }}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-gray-900"
                      required
                    >
                      <option value="">Select a state</option>
                      {states.map((state) => (
                        <option key={state.state_code} value={state.state_code}>
                          {state.state_name} - Black Population: {state.black_population.toLocaleString()} ({state.black_percentage})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </Label>
                    <select
                      id="city"
                      name="city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-gray-900"
                      disabled={!selectedState || cities.length === 0}
                      required
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.city_name}>
                          {city.city_name} - Black Population: {city.black_population.toLocaleString()} ({city.black_percentage})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="submit" 
                      disabled={locationUpdating || !selectedState || !selectedCity}
                    >
                      {locationUpdating ? (
                        <span>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        'Save Location'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>
                Your email is used for login and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Email verified</p>
                </div>
                
                <Button variant="outline" size="sm" disabled>
                  Change Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 