
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BookPost from '@/components/BookPost';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Edit3, 
  Calendar,
  Camera,
  Users,
  User,
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';

// Mock current user data
const mockCurrentUser = {
  id: 1,
  name: 'John Doe',
  username: 'bookworm_john',
  bio: 'Passionate reader exploring worlds through books. Love discussing plot twists and character development. Currently obsessed with contemporary fiction.',
  avatar: null,
  followerCount: 156,
  followingCount: 203,
  favoriteGenres: ['Fiction', 'Mystery', 'Biography'],
  joinDate: 'March 2023',
  booksRead: 34,
  currentStreak: 8
};

// Mock user's own posts
const mockMyPosts = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      username: 'bookworm_john',
      avatar: null
    },
    book: {
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Psychological Thriller',
      cover: null,
      rating: 4,
      status: 'Read'
    },
    review: 'What a mind-bending psychological thriller! The twist at the end completely caught me off guard. Michaelides masterfully weaves together psychology and mystery.',
    likes: 23,
    comments: 7,
    timestamp: '2 days ago',
    isLiked: false
  }
];

// Mock followers and following data
const mockFollowers = [
  { id: 1, name: 'Emma Wilson', username: 'fantasy_emma', avatar: null },
  { id: 2, name: 'Sarah Chen', username: 'bookish_sarah', avatar: null },
  { id: 3, name: 'Mike Johnson', username: 'reading_mike', avatar: null }
];

const mockFollowing = [
  { id: 1, name: 'Jane Smith', username: 'romance_jane', avatar: null },
  { id: 2, name: 'Alex Brown', username: 'mystery_alex', avatar: null }
];

const MyProfile = () => {
  const [user] = useState(mockCurrentUser);
  const [posts, setPosts] = useState(mockMyPosts);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
    console.log('Edit profile clicked');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative mx-auto md:mx-0">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.avatar || ''} />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                  <p className="text-muted-foreground text-lg">@{user.username}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button onClick={handleEditProfile} className="bg-primary hover:bg-primary/90">
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">{user.bio}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{user.followerCount}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{user.followingCount}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{user.booksRead}</div>
                  <div className="text-sm text-muted-foreground">Books Read</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{user.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
              
              {/* Favorite Genres */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteGenres.map(genre => (
                    <Badge key={genre} variant="secondary" className="bg-accent/50">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Settings and Logout */}
        {isMobile && (
          <div className="bg-card rounded-xl border border-border p-4 mb-8">
            <div className="flex gap-4">
              <Button 
                asChild 
                variant="outline" 
                className="flex-1 flex items-center gap-2"
              >
                <Link to="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button 
                onClick={handleLogout}
                variant="destructive" 
                className="flex-1 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} mb-8`}>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Followers
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger value="following" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Following
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            {posts.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">You haven't shared any books yet</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90">
                  Share Your First Book
                </Button>
              </div>
            ) : (
              posts.map(post => (
                <BookPost 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="followers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFollowers.map(follower => (
                <div key={follower.id} className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={follower.avatar || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {follower.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{follower.name}</h4>
                    <p className="text-sm text-muted-foreground">@{follower.username}</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {!isMobile && (
            <TabsContent value="following" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockFollowing.map(following => (
                  <div key={following.id} className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={following.avatar || ''} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {following.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{following.name}</h4>
                      <p className="text-sm text-muted-foreground">@{following.username}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyProfile;
