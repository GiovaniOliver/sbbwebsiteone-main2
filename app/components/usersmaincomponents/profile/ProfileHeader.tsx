/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from '../homefeed/ui/avatar'
import { Button } from '../homefeed/ui/button'
import { 
  Settings, 
  Share2, 
  MapPin, 
  Link as LinkIcon,
  Calendar,
  Edit
} from 'lucide-react'

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    coverPhoto: string;
    bio: string;
    location?: string;
    website?: string;
    joinedDate: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
    };
    badges: string[];
  };
  isOwnProfile?: boolean;
}

export default function ProfileHeader({ user, isOwnProfile = true }: ProfileHeaderProps) {
  return (
    <div>
      {/* Cover Photo */}
      <div className="relative h-[300px] w-full mb-16">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover rounded-b-xl"
        />
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <Avatar className="w-32 h-32 border-4 border-white rounded-full">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="mb-4 flex items-center gap-4">
            {isOwnProfile ? (
              <>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Follow
                </Button>
                <Button variant="outline">
                  Message
                </Button>
              </>
            )}
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.username}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{user.stats.posts}</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="text-center cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <p className="text-xl font-bold text-gray-900">{user.stats.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <p className="text-xl font-bold text-gray-900">{user.stats.following.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-gray-800">{user.bio}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a 
                  href={user.website} 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {user.badges.map((badge, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 