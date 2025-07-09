import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Heart, MessageCircle, TrendingUp, Users, Filter } from 'lucide-react';

// Mock data for trending books
const mockTrendingBooks = [
  { id: 1, title: 'The Secret History', author: 'Donna Tartt', likes: 52, postedBy: 'sarahj' },
  { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', likes: 45, postedBy: 'mikechen' },
  { id: 3, title: 'Daisy Jones & The Six', author: 'Taylor Jenkins Reid', likes: 38, postedBy: 'emmaw' },
  { id: 4, title: 'Babel', author: 'R.F. Kuang', likes: 61, postedBy: 'alexr' },
];

// Mock data for recently shared books
const mockRecentlyShared = [
  { id: 1, title: 'The House in the Cerulean Sea', author: 'TJ Klune', timeAgo: '2 hours ago' },
  { id: 2, title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', timeAgo: '5 hours ago' },
  { id: 3, title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', timeAgo: '1 day ago' },
  { id: 4, title: 'The Silent Patient', author: 'Alex Michaelides', timeAgo: '1 day ago' },
  { id: 5, title: 'Where the Crawdads Sing', author: 'Delia Owens', timeAgo: '2 days ago' },
  { id: 6, title: 'Little Fires Everywhere', author: 'Celeste Ng', timeAgo: '3 days ago' },
];

// Mock data for top rated books this week
const mockTopRated = [
  { id: 1, title: 'The Midnight Library', author: 'Matt Haig', rating: 5 },
  { id: 2, title: 'Eleanor Oliphant Is Completely Fine', author: 'Gail Honeyman', rating: 4 },
  { id: 3, title: 'Normal People', author: 'Sally Rooney', rating: 4 },
];

// Mock data for books by genre
const mockBooksByGenre = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classic' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic' },
  { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian' },
  { id: 4, title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Dystopian' },
  { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
  { id: 6, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy' },
  { id: 7, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Thriller' },
  { id: 8, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller' },
];

// Mock data for people to follow
const mockPeopleToFollow = [
  { id: 1, name: 'Sarah Johnson', username: 'sarahj', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', mutualGenres: ['Fiction', 'Thriller'] },
  { id: 2, name: 'Mike Chen', username: 'mikechen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', mutualGenres: ['Science Fiction', 'Non-Fiction'] },
  { id: 3, name: 'Emma Wilson', username: 'emmaw', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', mutualGenres: ['Fantasy', 'Young Adult'] },
];

// Mock data for weekly highlights
const mockWeeklyHighlights = [
  {
    id: 1,
    user: { name: 'Alex Rodriguez', username: 'alexr', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    book: { title: 'The Martian' },
    content: 'Just finished "The Martian" and I\'m blown away! The science is fascinating and the story is incredibly gripping. Highly recommend it to all sci-fi fans!',
    timeAgo: '3 days ago',
    stats: { likes: 75, comments: 22, rating: 5 },
  },
  {
    id: 2,
    user: { name: 'Olivia Brown', username: 'oliviab', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    book: { title: 'Becoming' },
    content: 'Michelle Obama\'s "Becoming" is such an inspiring memoir. Her journey is both relatable and extraordinary. A must-read for anyone looking for motivation and perspective.',
    timeAgo: '5 days ago',
    stats: { likes: 63, comments: 18, rating: 5 },
  },
];

// List of genres for filtering
const genres = ['All', 'Classic', 'Dystopian', 'Fantasy', 'Thriller'];

// Helper function to get genre color
const getGenreColor = (genre: string) => {
  switch (genre) {
    case 'Classic': return 'bg-red-100 text-red-800';
    case 'Dystopian': return 'bg-purple-100 text-purple-800';
    case 'Fantasy': return 'bg-blue-100 text-blue-800';
    case 'Thriller': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Explore = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredBooksByGenre = selectedGenre === 'All' 
    ? mockBooksByGenre 
    : mockBooksByGenre.filter(book => book.genre === selectedGenre);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Discover Books</h1>
          <p className="text-muted-foreground text-lg">Explore trending books, top ratings, and connect with fellow readers</p>
        </div>

        {/* Trending Books - Horizontal Carousel */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Trending Books</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockTrendingBooks.map((book) => (
              <Card key={book.id} className="min-w-[280px] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Book Cover</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">{book.likes}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Posted by {book.postedBy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recently Shared */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">Recently Shared</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockRecentlyShared.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-3">
                  <div className="aspect-[3/4] bg-muted rounded mb-2 flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Cover</span>
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">{book.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                  <p className="text-xs text-muted-foreground">{book.timeAgo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Rated This Week */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-primary">Top Rated This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTopRated.map((book) => (
              <Card key={book.id} className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">Cover</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < book.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">{book.rating}</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Excellence
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Books by Genre */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Books by Genre</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className="rounded-full"
              >
                {genre}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBooksByGenre.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-muted rounded mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Cover</span>
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <Badge 
                    className={`${getGenreColor(book.genre)} text-white`}
                  >
                    {book.genre}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* People to Follow */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">People to Follow</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockPeopleToFollow.map((person) => (
              <Card key={person.id} className="min-w-[250px] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{person.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">@{person.username}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {person.mutualGenres.map((genre, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">Follow</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Weekly Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">Weekly Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockWeeklyHighlights.map((highlight, index) => (
              <Card key={highlight.id} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={highlight.user.avatar} />
                      <AvatarFallback>{highlight.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{highlight.book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {highlight.user.name} • {highlight.timeAgo}
                      </p>
                      <p className="text-sm mb-4 line-clamp-3">{highlight.content}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{highlight.stats.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{highlight.stats.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{highlight.stats.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Explore;
