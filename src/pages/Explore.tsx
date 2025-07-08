
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BookPost from '@/components/BookPost';
import { 
  TrendingUp, 
  Star, 
  Filter, 
  Users, 
  BookOpen,
  Search,
  UserPlus
} from 'lucide-react';

// Mock trending books data
const mockTrendingBooks = [
  {
    id: 6,
    user: {
      name: 'Alex Chen',
      username: 'scifi_alex',
      avatar: null
    },
    book: {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Science Fiction',
      cover: null,
      rating: 5,
      status: 'Read'
    },
    review: 'An absolutely brilliant sci-fi adventure! Weir combines humor, science, and heart in the most unexpected ways. Had me laughing and crying at the same time.',
    likes: 156,
    comments: 42,
    timestamp: '1 day ago',
    isLiked: false
  },
  {
    id: 7,
    user: {
      name: 'Sophie Martinez',
      username: 'romance_sophie',
      avatar: null
    },
    book: {
      title: 'Beach Read',
      author: 'Emily Henry',
      genre: 'Contemporary Romance',
      cover: null,
      rating: 4,
      status: 'Read'
    },
    review: 'Perfect summer read! Emily Henry has such a gift for writing realistic characters and emotions. The enemies-to-lovers trope done perfectly.',
    likes: 98,
    comments: 28,
    timestamp: '2 days ago',
    isLiked: true
  }
];

// Mock new and noteworthy books
const mockNewBooks = [
  {
    id: 8,
    user: {
      name: 'David Kim',
      username: 'thriller_david',
      avatar: null
    },
    book: {
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      genre: 'Historical Fiction',
      cover: null,
      rating: 5,
      status: 'Currently Reading'
    },
    review: 'Just started this and already completely hooked! The storytelling is incredible and Evelyn is such a fascinating character.',
    likes: 67,
    comments: 19,
    timestamp: '3 hours ago',
    isLiked: false
  }
];

// Mock suggested users
const mockSuggestedUsers = [
  {
    id: 1,
    name: 'Literary Luna',
    username: 'literary_luna',
    avatar: null,
    genres: ['Literary Fiction', 'Poetry', 'Essays'],
    followers: 1234,
    isFollowing: false
  },
  {
    id: 2,
    name: 'Mystery Mike',
    username: 'mystery_mike',
    avatar: null,
    genres: ['Mystery', 'Thriller', 'Crime'],
    followers: 892,
    isFollowing: false
  },
  {
    id: 3,
    name: 'Fantasy Finn',
    username: 'fantasy_finn',
    avatar: null,
    genres: ['Fantasy', 'Sci-Fi', 'Adventure'],
    followers: 567,
    isFollowing: true
  }
];

const genres = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History'];
const sortOptions = ['Newest', 'Most Liked', 'Most Commented', 'Highest Rated'];

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [trendingPosts, setTrendingPosts] = useState(mockTrendingBooks);
  const [newPosts, setNewPosts] = useState(mockNewBooks);
  const [suggestedUsers, setSuggestedUsers] = useState(mockSuggestedUsers);

  const handleLike = (postId: number) => {
    setTrendingPosts(prevPosts => 
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
    
    setNewPosts(prevPosts => 
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

  const handleFollowUser = (userId: number) => {
    setSuggestedUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore</h1>
          <p className="text-muted-foreground text-lg">Discover new books and connect with fellow readers</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter by Genre
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <Button
                    key={genre}
                    size="sm"
                    variant={selectedGenre === genre ? "default" : "outline"}
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="md:w-48">
              <h3 className="font-semibold mb-3">Sort by</h3>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              New & Noteworthy
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Discover Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Trending Books</h2>
            </div>
            {trendingPosts.map(post => (
              <BookPost key={post.id} post={post} onLike={handleLike} />
            ))}
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">New & Noteworthy</h2>
            </div>
            {newPosts.map(post => (
              <BookPost key={post.id} post={post} onLike={handleLike} />
            ))}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Suggested Users</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedUsers.map(user => (
                <div key={user.id} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={user.avatar || ''} />
                      <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                    <p className="text-muted-foreground mb-3">@{user.username}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4 justify-center">
                      {user.genres.slice(0, 2).map(genre => (
                        <Badge key={genre} variant="secondary" className="bg-accent/50 text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {user.followers} followers
                    </p>
                    
                    <Button
                      onClick={() => handleFollowUser(user.id)}
                      variant={user.isFollowing ? "outline" : "default"}
                      className={user.isFollowing ? "" : "bg-primary hover:bg-primary/90"}
                      size="sm"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Explore;
