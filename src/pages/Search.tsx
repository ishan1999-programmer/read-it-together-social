
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, Filter, Star, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock search results
const mockBookResults = [
  {
    id: 1,
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Historical Fiction',
    cover: null,
    rating: 4.8,
    reviewCount: 234
  },
  {
    id: 2,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    cover: null,
    rating: 4.6,
    reviewCount: 189
  }
];

const mockUserResults = [
  {
    id: 1,
    name: 'Literary Luna',
    username: 'literary_luna',
    avatar: null,
    bio: 'Bookworm & coffee enthusiast 📚☕',
    followers: 1234,
    isFollowing: false
  },
  {
    id: 2,
    name: 'Fantasy Finn',
    username: 'fantasy_finn',
    avatar: null,
    bio: 'Dragons, magic, and endless adventures',
    followers: 892,
    isFollowing: true
  }
];

const genres = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History'];
const sortOptions = ['Relevance', 'Most Popular', 'Newest', 'Highest Rated'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');
  const [bookResults] = useState(mockBookResults);
  const [userResults, setUserResults] = useState(mockUserResults);

  const handleFollowUser = (userId: number) => {
    setUserResults(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto pt-4 pl-4 md:pl-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Search</h1>
          <p className="text-muted-foreground text-lg">Find books and connect with readers</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for books by title, author, or users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 text-lg"
          />
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

        {/* Results */}
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookResults.map(book => (
                <Card key={book.id} className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="h-24 w-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                        {book.cover ? (
                          <img src={book.cover} alt={book.title} className="h-full w-full rounded-md object-cover" />
                        ) : (
                          <div className="text-muted-foreground text-xs text-center">Cover</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link to={`/book/${book.id}`} className="font-bold text-foreground hover:text-primary transition-colors">
                          {book.title}
                        </Link>
                        <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {book.genre}
                        </Badge>
                        <div className="flex items-center space-x-1 mb-1">
                          {renderStars(book.rating)}
                          <span className="text-sm text-muted-foreground ml-2">{book.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{book.reviewCount} reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userResults.map(user => (
                <Card key={user.id} className="bg-card border border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-16 h-16 mb-4">
                        <AvatarImage src={user.avatar || ''} />
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <Link 
                        to={`/profile/${user.username}`}
                        className="font-bold text-lg mb-1 hover:text-primary transition-colors"
                      >
                        {user.name}
                      </Link>
                      <p className="text-muted-foreground mb-2">@{user.username}</p>
                      <p className="text-sm text-muted-foreground mb-3">{user.bio}</p>
                      <p className="text-sm text-muted-foreground mb-4">{user.followers} followers</p>
                      
                      <Button
                        onClick={() => handleFollowUser(user.id)}
                        variant={user.isFollowing ? "outline" : "default"}
                        size="sm"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {user.isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Search;
