
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { 
  TrendingUp, 
  Star, 
  Heart, 
  MessageCircle,
  Clock,
  UserPlus,
  ChevronRight
} from 'lucide-react';

// Mock data for trending books
const trendingBooks = [
  {
    id: 1,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: null,
    likes: 245,
    user: { name: 'Alex Chen', avatar: null },
    genre: 'Science Fiction'
  },
  {
    id: 2,
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: null,
    likes: 189,
    user: { name: 'Sophie Martinez', avatar: null },
    genre: 'Historical Fiction'
  },
  {
    id: 3,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover: null,
    likes: 156,
    user: { name: 'Literary Luna', avatar: null },
    genre: 'Literary Fiction'
  }
];

// Mock data for recently shared
const recentlyShared = [
  {
    id: 4,
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    cover: null,
    timeAgo: '2 minutes ago',
    user: { name: 'Mystery Mike', avatar: null }
  },
  {
    id: 5,
    title: 'Educated',
    author: 'Tara Westover',
    cover: null,
    timeAgo: '15 minutes ago',
    user: { name: 'Book Lover', avatar: null }
  },
  {
    id: 6,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: null,
    timeAgo: '1 hour ago',
    user: { name: 'Philosophy Phil', avatar: null }
  }
];

// Mock data for top rated
const topRated = [
  {
    id: 7,
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    cover: null,
    rating: 4.8,
    reviews: 342
  },
  {
    id: 8,
    title: 'Circe',
    author: 'Madeline Miller',
    cover: null,
    rating: 4.7,
    reviews: 289
  }
];

// Mock data for people to follow
const peopleToFollow = [
  {
    id: 1,
    name: 'Literary Luna',
    username: 'literary_luna',
    avatar: null,
    genres: ['Literary Fiction', 'Poetry'],
    mutualGenres: 2,
    isFollowing: false
  },
  {
    id: 2,
    name: 'Fantasy Finn',
    username: 'fantasy_finn',
    avatar: null,
    genres: ['Fantasy', 'Sci-Fi'],
    mutualGenres: 1,
    isFollowing: false
  },
  {
    id: 3,
    name: 'Romance Reader',
    username: 'romance_reader',
    avatar: null,
    genres: ['Romance', 'Contemporary'],
    mutualGenres: 1,
    isFollowing: true
  }
];

const genres = ['All', 'Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History'];

const genreColors = {
  'Fiction': 'bg-blue-100 text-blue-800',
  'Mystery': 'bg-purple-100 text-purple-800',
  'Romance': 'bg-pink-100 text-pink-800',
  'Sci-Fi': 'bg-green-100 text-green-800',
  'Fantasy': 'bg-indigo-100 text-indigo-800',
  'Biography': 'bg-yellow-100 text-yellow-800',
  'History': 'bg-orange-100 text-orange-800',
  'default': 'bg-gray-100 text-gray-800'
};

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [followingUsers, setFollowingUsers] = useState(new Set([3]));

  const handleFollowUser = (userId: number) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getGenreColor = (genre: string) => {
    return genreColors[genre as keyof typeof genreColors] || genreColors.default;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Trending Books Carousel */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Trending Books</h2>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {trendingBooks.map((book) => (
                <CarouselItem key={book.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-28 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-foreground text-xs text-center px-2">Book Cover</span>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                          </div>
                          
                          <Badge className={getGenreColor(book.genre)}>
                            {book.genre}
                          </Badge>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-xs">
                                  {book.user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{book.user.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Heart className="h-4 w-4" />
                              <span>{book.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Recently Shared */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Recently Shared</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyShared.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">Cover</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">by {book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{book.timeAgo}</span>
                        <span className="text-xs text-muted-foreground">by {book.user.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Rated This Week */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-6 w-6 text-yellow-500 fill-current" />
            <h2 className="text-3xl font-bold text-foreground">Top Rated This Week</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topRated.map((book) => (
              <Card key={book.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-muted-foreground text-xs text-center px-2">Book Cover</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{book.title}</h3>
                        <p className="text-muted-foreground">by {book.author}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-foreground">{book.rating}</span>
                        <span className="text-sm text-muted-foreground">({book.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Books by Genre */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Books by Genre</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className="rounded-full"
              >
                {genre}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingBooks.map((book) => (
              <Card key={`genre-${book.id}`} className="hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="p-3">
                  <div className="w-full h-32 bg-muted rounded mb-3 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground text-center px-2">Cover</span>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">{book.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <Badge className={getGenreColor(book.genre)}>
                    {book.genre}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* People to Follow */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">People to Follow</h2>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {peopleToFollow.map((user) => (
                <CarouselItem key={user.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-bold text-foreground mb-1">{user.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">@{user.username}</p>
                      
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {user.genres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4">
                        {user.mutualGenres} mutual genres
                      </p>
                      
                      <Button
                        onClick={() => handleFollowUser(user.id)}
                        variant={followingUsers.has(user.id) ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                      >
                        {followingUsers.has(user.id) ? 'Following' : 'Follow'}
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Weekly Highlights */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Weekly Highlights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Most Liked Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">Cover</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Project Hail Mary</h4>
                    <p className="text-sm text-muted-foreground mb-2">by Andy Weir</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>245 likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>89 comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-600" />
                  Highest Rated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">Cover</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">The Invisible Life of Addie LaRue</h4>
                    <p className="text-sm text-muted-foreground mb-2">by V.E. Schwab</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Explore;
