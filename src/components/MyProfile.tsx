import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import BookPost from '@/components/BookPost';
import { 
  Edit3, 
  Heart, 
  BookOpen, 
  Calendar,
  Star,
  TrendingUp,
  Camera,
  Users,
  User,
  BookMarked
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

interface WantToReadBook {
  id: string;
  title: string;
  authors: string[];
  categories?: string[];
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
  };
}

const MyProfile = () => {
  const [user] = useState(mockCurrentUser);
  const [posts, setPosts] = useState(mockMyPosts);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [wantToReadBooks, setWantToReadBooks] = useState<WantToReadBook[]>([]);

  // Load "Want to Read" books from localStorage
  useEffect(() => {
    const savedBookIds = localStorage.getItem('wantToReadBooks');
    const savedBooksData = localStorage.getItem('wantToReadBooksData');
    
    if (savedBookIds && savedBooksData) {
      try {
        const bookIds = JSON.parse(savedBookIds);
        const booksData = JSON.parse(savedBooksData);
        const books = bookIds.map((id: string) => booksData[id]).filter(Boolean);
        setWantToReadBooks(books);
      } catch (error) {
        console.error('Error loading want to read books:', error);
        setWantToReadBooks([]);
      }
    }
  }, []);

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

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  const formatGenres = (categories?: string[]) => {
    if (!categories || categories.length === 0) return 'Unknown Genre';
    return categories.slice(0, 2).join(', ');
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

        {/* Content Tabs */}
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              My Books
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              My Reviews
            </TabsTrigger>
            <TabsTrigger value="want-to-read" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              Want to Read
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
          
          <TabsContent value="reviews" className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Your detailed reviews will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="want-to-read" className="space-y-6">
            {wantToReadBooks.length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <BookMarked className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">You haven't added any books to your reading list yet</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90" asChild>
                  <a href="/search">Discover Books</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wantToReadBooks.map((book) => (
                  <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-24 bg-muted rounded-lg overflow-hidden">
                          {book.imageLinks?.thumbnail ? (
                            <img
                              src={book.imageLinks.thumbnail.replace('http:', 'https:')}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2 leading-tight">
                            {book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            by {formatAuthors(book.authors)}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {formatGenres(book.categories)}
                          </p>
                          {book.publishedDate && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(book.publishedDate).getFullYear()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
      </div>
    </Layout>
  );
};

export default MyProfile;
