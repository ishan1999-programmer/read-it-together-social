
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BookPost from '@/components/BookPost';
import { 
  Edit3, 
  Heart, 
  BookOpen, 
  Calendar,
  Star,
  TrendingUp,
  Settings,
  Camera
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

const MyProfile = () => {
  const [user] = useState(mockCurrentUser);
  const [posts, setPosts] = useState(mockMyPosts);

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
                
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
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
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              My Books
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Drafts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-6">
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
          
          <TabsContent value="saved" className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Your saved books will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Reading Goals</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Books this year</span>
                    <span className="font-medium">34 / 50</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Reading Streak</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{user.currentStreak}</div>
                  <div className="text-muted-foreground">Days in a row</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Edit3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Your draft posts will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyProfile;
