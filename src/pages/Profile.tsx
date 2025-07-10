import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import MyProfile from '@/components/MyProfile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BookPost from '@/components/BookPost';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Calendar,
  Lock,
  Star,
  User,
  FileText,
  Rss,
  Settings,
  LogOut
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
  { id: 1, name: 'John Doe', username: 'bookworm_john', avatar: null, isFollowing: true },
  { id: 2, name: 'Sarah Chen', username: 'bookish_sarah', avatar: null, isFollowing: false }
];

const mockFollowing = [
  { id: 1, name: 'Jane Smith', username: 'romance_jane', avatar: null, isFollowing: false },
  { id: 2, name: 'Alex Brown', username: 'mystery_alex', avatar: null, isFollowing: true }
];

// Mock reads data for other user
const mockUserBooks = [
  {
    id: '1',
    title: 'The Name of the Wind',
    authors: ['Patrick Rothfuss'],
    categories: ['Fantasy', 'Adventure'],
    averageRating: 4.5,
    pageCount: 662,
    status: 'want-to-read' as const,
    addedDate: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Mistborn: The Final Empire',
    authors: ['Brandon Sanderson'],
    categories: ['Fantasy', 'Magic'],
    averageRating: 4.4,
    pageCount: 541,
    status: 'currently-reading' as const,
    addedDate: '2024-01-10T00:00:00.000Z',
    startedDate: '2024-01-20T00:00:00.000Z',
    currentPage: 250
  },
  {
    id: '3',
    title: 'The Way of Kings',
    authors: ['Brandon Sanderson'],
    categories: ['Fantasy', 'Epic'],
    averageRating: 4.6,
    pageCount: 1007,
    status: 'read' as const,
    addedDate: '2023-12-01T00:00:00.000Z',
    startedDate: '2023-12-05T00:00:00.000Z',
    completedDate: '2024-01-05T00:00:00.000Z'
  }
];

interface Book {
  id: string;
  title: string;
  authors: string[];
  categories?: string[];
  averageRating?: number;
  pageCount?: number;
  status: 'want-to-read' | 'currently-reading' | 'read';
  addedDate: string;
  startedDate?: string;
  completedDate?: string;
  currentPage?: number;
}

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // If no username is provided, show the current user's profile
  if (!username) {
    return <MyProfile />;
  }

  const [user] = useState(mockUser);
  const [posts, setPosts] = useState(mockUserPosts);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isPending, setIsPending] = useState(user.isPendingRequest);
  const [userBooks] = useState<Book[]>(mockUserBooks);
  const [followers, setFollowers] = useState(mockFollowers);
  const [following, setFollowing] = useState(mockFollowing);

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

  const handleFollowUser = (userId: number, shouldFollow: boolean) => {
    setFollowers(prev => 
      prev.map(follower => 
        follower.id === userId 
          ? { ...follower, isFollowing: shouldFollow }
          : follower
      )
    );
    
    setFollowing(prev => 
      prev.map(followingUser => 
        followingUser.id === userId 
          ? { ...followingUser, isFollowing: shouldFollow }
          : followingUser
      )
    );
  };

  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  const formatGenres = (categories?: string[]) => {
    if (!categories || categories.length === 0) return 'Unknown Genre';
    return categories.slice(0, 2).join(', ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProgress = (currentPage: number, totalPages: number) => {
    if (!totalPages || totalPages === 0) return 0;
    return Math.min((currentPage / totalPages) * 100, 100);
  };

  const renderBookCard = (book: Book) => (
    <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              by {formatAuthors(book.authors)}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              {formatGenres(book.categories)}
            </p>
            
            {book.averageRating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{book.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {book.status === 'want-to-read' && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Added {formatDate(book.addedDate)}</span>
            </div>
          )}

          {book.status === 'currently-reading' && (
            <div className="space-y-2">
              {book.startedDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Started {formatDate(book.startedDate)}</span>
                </div>
              )}
              
              {book.pageCount && book.currentPage && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Page {book.currentPage} of {book.pageCount}</span>
                    <span>{calculateProgress(book.currentPage, book.pageCount).toFixed(0)}%</span>
                  </div>
                  <Progress value={calculateProgress(book.currentPage, book.pageCount)} />
                </div>
              )}
            </div>
          )}

          {book.status === 'read' && book.completedDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Completed {formatDate(book.completedDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const getBooksByStatus = (status: Book['status']) => {
    return userBooks.filter(book => book.status === status);
  };

  const renderReadsTab = () => (
    <Tabs defaultValue="want-to-read" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="want-to-read" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Want to Read ({getBooksByStatus('want-to-read').length})
        </TabsTrigger>
        <TabsTrigger value="currently-reading" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Currently Reading ({getBooksByStatus('currently-reading').length})
        </TabsTrigger>
        <TabsTrigger value="read" className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          Read ({getBooksByStatus('read').length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="want-to-read">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBooksByStatus('want-to-read').map(book => renderBookCard(book))}
        </div>
      </TabsContent>

      <TabsContent value="currently-reading">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBooksByStatus('currently-reading').map(book => renderBookCard(book))}
        </div>
      </TabsContent>

      <TabsContent value="read">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBooksByStatus('read').map(book => renderBookCard(book))}
        </div>
      </TabsContent>
    </Tabs>
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header - same as before */}
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

        {/* Mobile Settings and Logout - Only show for own profile */}
        {isMobile && user.isOwnProfile && (
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
        {(!user.isPrivate || isFollowing || user.isOwnProfile) ? (
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {isMobile ? 'Posts' : 'Posts'}
              </TabsTrigger>
              {!isMobile && (
                <TabsTrigger value="reads" className="flex items-center gap-2">
                  <Rss className="h-4 w-4" />
                  Reads
                </TabsTrigger>
              )}
              <TabsTrigger value="followers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {isMobile ? 'Followers' : 'Followers'}
              </TabsTrigger>
              {!isMobile && (
                <TabsTrigger value="following" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Following
                </TabsTrigger>
              )}
            </TabsList>
            
            {/* Mobile: Show reads in a separate section when not in tabs */}
            {isMobile && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Reading List</h3>
                {renderReadsTab()}
              </div>
            )}
            
            <TabsContent value="posts" className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No posts shared yet</p>
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
            
            {!isMobile && (
              <TabsContent value="reads" className="space-y-6">
                {renderReadsTab()}
              </TabsContent>
            )}
            
            <TabsContent value="followers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followers.map(follower => (
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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button 
                        size="sm" 
                        variant={follower.isFollowing ? "outline" : "default"}
                        onClick={() => handleFollowUser(follower.id, !follower.isFollowing)}
                      >
                        {follower.isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {!isMobile && (
              <TabsContent value="following" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {following.map(followingUser => (
                    <div key={followingUser.id} className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={followingUser.avatar || ''} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {followingUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{followingUser.name}</h4>
                        <p className="text-sm text-muted-foreground">@{followingUser.username}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button 
                          size="sm" 
                          variant={followingUser.isFollowing ? "outline" : "default"}
                          onClick={() => handleFollowUser(followingUser.id, !followingUser.isFollowing)}
                        >
                          {followingUser.isFollowing ? 'Following' : 'Follow'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
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
