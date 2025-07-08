
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import MyProfile from '@/components/MyProfile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BookPost from '@/components/BookPost';
import { 
  Users, 
  UserPlus, 
  Heart, 
  BookOpen, 
  Calendar,
  Lock,
  Star,
  User
} from 'lucide-react';

// Mock user data
const mockUser = {
  id: 1,
  name: 'Emma Wilson',
  username: 'fantasy_emma',
  bio: 'Avid fantasy reader and book reviewer. Currently working through Brandon Sanderson\'s entire bibliography. Coffee and dragons fuel my reading adventures.',
  avatar: null,
  isPrivate: false,
  isOwnProfile: false,
  isFollowing: false,
  isPendingRequest: false,
  followerCount: 245,
  followingCount: 189,
  favoriteGenres: ['Fantasy', 'Sci-Fi', 'Mystery'],
  joinDate: 'January 2023',
  booksRead: 67,
  currentStreak: 12
};

// Mock posts data
const mockUserPosts = [
  {
    id: 4,
    user: {
      name: 'Emma Wilson',
      username: 'fantasy_emma',
      avatar: null
    },
    book: {
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      genre: 'Fantasy',
      cover: null,
      rating: 5,
      status: 'Read'
    },
    review: 'Epic worldbuilding at its finest! Sanderson creates a universe so detailed and immersive that you feel like you could live there. The magic system is intricate and the characters are deeply developed.',
    likes: 45,
    comments: 15,
    timestamp: '3 days ago',
    isLiked: false
  },
  {
    id: 5,
    user: {
      name: 'Emma Wilson',
      username: 'fantasy_emma',
      avatar: null
    },
    book: {
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      cover: null,
      rating: 4,
      status: 'Currently Reading'
    },
    review: 'Finally diving into this classic! The political intrigue is fascinating and the desert planet setting is beautifully crafted. Understanding why this is considered a masterpiece.',
    likes: 32,
    comments: 8,
    timestamp: '1 week ago',
    isLiked: true
  }
];

// Mock followers and following data
const mockFollowers = [
  { id: 1, name: 'John Doe', username: 'bookworm_john', avatar: null },
  { id: 2, name: 'Sarah Chen', username: 'bookish_sarah', avatar: null }
];

const mockFollowing = [
  { id: 1, name: 'Jane Smith', username: 'romance_jane', avatar: null },
  { id: 2, name: 'Alex Brown', username: 'mystery_alex', avatar: null }
];

const Profile = () => {
  const { username } = useParams();
  
  // If no username is provided, show the current user's profile
  if (!username) {
    return <MyProfile />;
  }

  const [user] = useState(mockUser);
  const [posts, setPosts] = useState(mockUserPosts);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isPending, setIsPending] = useState(user.isPendingRequest);

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

  const handleFollow = () => {
    if (user.isPrivate && !isFollowing) {
      setIsPending(true);
    } else {
      setIsFollowing(!isFollowing);
      setIsPending(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={user.avatar || ''} />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                  <p className="text-muted-foreground text-lg">@{user.username}</p>
                  {user.isPrivate && (
                    <div className="flex items-center gap-1 mt-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Private Profile</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button 
                    onClick={handleFollow}
                    variant={isFollowing ? "outline" : "default"}
                    className={isFollowing ? "" : "bg-primary hover:bg-primary/90"}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    {isPending ? 'Requested' : isFollowing ? 'Following' : 'Follow'}
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

        {/* Content Tabs */}
        {(!user.isPrivate || isFollowing || user.isOwnProfile) ? (
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="followers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Followers
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Following
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="books" className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No books shared yet</p>
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
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Detailed reviews will appear here</p>
              </div>
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
          </Tabs>
        ) : (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">This account is private</h3>
            <p className="text-muted-foreground mb-6">Follow this user to see their books and reviews</p>
            <Button onClick={handleFollow} className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-5 w-5 mr-2" />
              {isPending ? 'Request Sent' : 'Send Follow Request'}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
