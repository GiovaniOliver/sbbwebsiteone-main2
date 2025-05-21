'use client'

import { useState, useEffect } from 'react'
import { Users, TrendingUp, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/molecules/display/Avatar'
import { Button } from '@/app/components/atoms/buttons/Button'
import { cn } from '@/backend/lib/utils/utils'
import { getSupabaseClient } from '@/hooks/useSupabase'
import { useUser } from '@/hooks/useUser'
import { Skeleton } from '@/app/components/atoms/feedback/Skeleton'
import Link from 'next/link'
import { useToast } from '@/app/components/shared'

interface Friend {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  online_status: string;
}

interface SuggestedUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  mutual_friends: number;
}

interface TrendingTopic {
  id: string;
  topic: string;
  engagement: string;
}

export default function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const supabase = getSupabaseClient();
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      // Only proceed if user is authenticated
      if (user) {
        // Call data loading functions and catch any errors at this level too
        try {
          await Promise.all([
            fetchOnlineFriends(),
            fetchSuggestedUsers(),
            fetchTrendingTopics()
          ]);
        } catch (error) {
          console.error('Error initializing sidebar data:', error);
          // Don't show a toast here since the individual functions will handle their own errors
        }
      } else {
        // Reset states if no user is authenticated
        setOnlineFriends([]);
        setSuggestions([]);
        setTrendingTopics([]);
        setIsLoadingFriends(false);
        setIsLoadingSuggestions(false);
        setIsLoadingTopics(false);
      }
    };

    initializeData();
  }, [user]);

  const fetchOnlineFriends = async () => {
    setIsLoadingFriends(true);
    try {
      if (!user) {
        setOnlineFriends([]);
        return;
      }
      
      // This would be replaced with a real query to get online friends
      // For now, we'll simulate it with a fetch from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, first_name, last_name, avatar_url, online_status')
        .limit(5);
      
      if (error) {
        // Handle specific database errors
        console.error('Supabase error fetching online friends:', error);
        
        // Show toast with friendly error message
        toast({
          title: "Couldn't load online friends",
          description: "We're having trouble connecting to the database. Please try again later.",
          variant: "destructive",
        });
        
        // Set empty array so UI can handle no results state
        setOnlineFriends([]);
        return;
      }
      
      // Convert to Friend objects and add online status
      const friends: Friend[] = (data || []).map(profile => ({
        id: profile.id,
        username: profile.username || 'Anonymous',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        avatar_url: profile.avatar_url,
        online_status: profile.online_status || 'online' // Default to online for demo
      }));
      
      setOnlineFriends(friends);
    } catch (error) {
      // Log error with fallback for empty error object
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error fetching online friends:', error || 'Empty error object');
      
      // Set empty array to prevent UI errors
      setOnlineFriends([]);
      
      // Show toast with friendly error message
      toast({
        title: "Couldn't load online friends",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingFriends(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    setIsLoadingSuggestions(true);
    try {
      if (!user) {
        setSuggestions([]);
        return;
      }
      
      // In a real app, this would be a more complex query that finds users
      // who might be interesting to the current user based on various factors
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, first_name, last_name, avatar_url')
        .neq('id', user?.id || '')
        .limit(5);
      
      if (error) {
        // Handle specific database errors
        console.error('Supabase error fetching suggested users:', error);
        
        // Show toast with friendly error message
        toast({
          title: "Couldn't load suggestions",
          description: "We're having trouble connecting to the database. Please try again later.",
          variant: "destructive",
        });
        
        // Set empty array so UI can handle no results state
        setSuggestions([]);
        return;
      }
      
      // Convert to SuggestedUser objects with randomized mutual friends
      const suggestedUsers: SuggestedUser[] = (data || []).map(profile => ({
        id: profile.id,
        username: profile.username || 'Anonymous',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        avatar_url: profile.avatar_url,
        mutual_friends: Math.floor(Math.random() * 10) + 1 // Random 1-10 for demo
      }));
      
      setSuggestions(suggestedUsers);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
      
      // Set empty array to prevent UI errors
      setSuggestions([]);
      
      // Show toast with friendly error message
      toast({
        title: "Couldn't load user suggestions",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const fetchTrendingTopics = async () => {
    setIsLoadingTopics(true);
    try {
      if (!user) {
        setTrendingTopics([]);
        setIsLoadingTopics(false);
        return;
      }
      
      // For now, we'll use mock data since there's no trending topics table yet
      // This would be replaced with a real query in production
      const mockTopics: TrendingTopic[] = [
        { id: '1', topic: 'NFT Collection Launch', engagement: '2.5k' },
        { id: '2', topic: 'DAO Governance Update', engagement: '1.8k' },
        { id: '3', topic: 'Community Event', engagement: '1.2k' },
      ];
      
      // Add a small delay to simulate API call
      setTimeout(() => {
        setTrendingTopics(mockTopics);
        setIsLoadingTopics(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      
      // Set empty array to prevent UI errors
      setTrendingTopics([]);
      
      // Show toast with friendly error message - optional for mock data
      // toast({
      //   title: "Couldn't load trending topics",
      //   description: "Something went wrong. Please try again later.",
      //   variant: "destructive",
      // });
      
      setIsLoadingTopics(false);
    }
  };

  const handleConnect = async (userId: string) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to connect with other users",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Check if already following
      const { data, error: checkError } = await supabase
        .from('follows')
        .select()
        .eq('follower_id', user.id)
        .eq('following_id', userId)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows found" which is expected
        console.error('Error checking follow status:', checkError);
        toast({
          title: "Error",
          description: "Couldn't check if you're already following this user",
          variant: "destructive",
        });
        return;
      }
      
      // If already following, do nothing or implement an unfollow feature
      if (data) {
        toast({
          title: "Already connected",
          description: "You're already connected with this user",
        });
        return;
      }
      
      // Create a new follow relationship
      const { error: insertError } = await supabase
        .from('follows')
        .insert({
          follower_id: user.id,
          following_id: userId,
          created_at: new Date().toISOString(),
        });
      
      if (insertError) {
        console.error('Error following user:', insertError);
        toast({
          title: "Error",
          description: "Couldn't connect with this user. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Success
      toast({
        title: "Connected!",
        description: "You are now following this user",
      });
      
      // Update suggested users list to remove the one we just followed
      setSuggestions(current => current.filter(user => user.id !== userId));
      
    } catch (error) {
      console.error('Error connecting with user:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <aside className={cn(
      "fixed top-16 right-0 h-[calc(100vh-64px)]",
      "bg-gradient-to-b from-[#1B2130] to-[#182030] border-l border-[#2E3446]",
      "transition-all duration-300 overflow-hidden shadow-md",
      "w-0 lg:w-80", // Hidden on mobile, 320px (80rem) on desktop
      isCollapsed && "lg:w-0"
    )}>
      <div className="flex flex-col h-full p-4">
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 left-0 transform -translate-x-full bg-[#1B2130] p-2 rounded-l-md border border-r-0 border-[#2E3446] text-gray-400 hover:text-white shadow-md"
        >
          {isCollapsed ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>

        {/* Online Friends Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2E3446]/50">
            <Users className="h-5 w-5 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Online Friends</h2>
          </div>
          
          {isLoadingFriends ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : onlineFriends.length > 0 ? (
            <div className="space-y-3">
              {onlineFriends.map((friend) => (
                <Link key={friend.id} href={`/profile/${friend.id}`}>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#2E3446]/40 transition-colors cursor-pointer">
                    <div className="relative">
                      <Avatar className="h-8 w-8 border border-[#3D495E]/50 shadow-sm">
                        <AvatarImage src={friend.avatar_url || ''} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700">
                          {friend.username ? friend.username[0].toUpperCase() : '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#1B2130]" />
                    </div>
                    <span className="text-sm text-gray-300">{friend.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-2 text-sm">
              No friends online right now
            </div>
          )}
        </div>

        {/* Suggested Connections */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2E3446]/50">
            <UserPlus className="h-5 w-5 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Suggested Connections</h2>
          </div>
          
          {isLoadingSuggestions ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-16 rounded" />
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
              {suggestions.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-2 rounded-md hover:bg-[#2E3446]/40 transition-colors">
                  <Link href={`/profile/${connection.id}`} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-[#3D495E]/50 shadow-sm">
                      <AvatarImage src={connection.avatar_url || ''} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-blue-700">
                        {connection.username ? connection.username[0].toUpperCase() : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">{connection.username}</span>
                      <span className="text-xs text-gray-500">{connection.mutual_friends} mutual friends</span>
                    </div>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                    onClick={() => handleConnect(connection.id)}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-2 text-sm">
              No suggestions available
            </div>
          )}
        </div>

        {/* Trending Topics */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2E3446]/50">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h2 className="text-sm font-semibold text-white">Trending Topics</h2>
          </div>
          
          {isLoadingTopics ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : trendingTopics.length > 0 ? (
            <div className="space-y-3">
              {trendingTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between p-2 rounded-md hover:bg-[#2E3446]/40 transition-colors">
                  <span className="text-sm text-gray-300">{topic.topic}</span>
                  <span className="text-xs py-1 px-2 bg-[#2E3446]/70 rounded-full text-gray-400">{topic.engagement}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-2 text-sm">
              No trending topics right now
            </div>
          )}
        </div>
      </div>
    </aside>
  )
} 