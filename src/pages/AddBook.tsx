
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Upload, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Poetry', 'Drama'];
const readingStatuses = ['Want to Read', 'Currently Reading', 'Read', 'Did Not Finish'];

const AddBook = () => {
  const navigate = useNavigate();
  
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genres: [] as string[],
    status: 'Read',
    rating: 0,
    review: '',
    cover: null as string | null
  });

  const [suggestions, setSuggestions] = useState([
    'The Seven Husbands of Evelyn Hugo',
    'Project Hail Mary',
    'Atomic Habits'
  ]);

  const handleGenreToggle = (genre: string) => {
    setBookData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleRatingClick = (rating: number) => {
    setBookData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting book:', bookData);
    // TODO: Implement actual submission
    navigate('/');
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer ${
          i < bookData.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground hover:text-amber-500'
        }`}
        onClick={() => handleRatingClick(i + 1)}
      />
    ));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Add Book</h1>
          <p className="text-muted-foreground text-lg">Share a book you've read or are reading</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover Upload */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Book Cover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/3] bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center mb-4">
                    {bookData.cover ? (
                      <img src={bookData.cover} alt="Book cover" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">Click to upload cover</p>
                      </>
                    )}
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Cover
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title with Autocomplete */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <div className="relative">
                      <Input
                        required
                        value={bookData.title}
                        onChange={(e) => setBookData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter book title..."
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {bookData.title && suggestions.length > 0 && (
                      <div className="mt-2 bg-card border border-border rounded-md shadow-sm">
                        {suggestions.filter(s => s.toLowerCase().includes(bookData.title.toLowerCase())).map((suggestion, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
                            onClick={() => setBookData(prev => ({ ...prev, title: suggestion }))}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Author *</label>
                    <Input
                      required
                      value={bookData.author}
                      onChange={(e) => setBookData(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Enter author name..."
                    />
                  </div>

                  {/* Genres */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Genres</label>
                    <div className="flex flex-wrap gap-2">
                      {genres.map(genre => (
                        <Badge
                          key={genre}
                          variant={bookData.genres.includes(genre) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleGenreToggle(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Reading Status */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Reading Status</label>
                    <select
                      value={bookData.status}
                      onChange={(e) => setBookData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      {readingStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Rating</label>
                    <div className="flex items-center space-x-1">
                      {renderStars()}
                      <span className="ml-3 text-sm text-muted-foreground">
                        {bookData.rating > 0 ? `${bookData.rating}/5` : 'No rating'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={bookData.review}
                    onChange={(e) => setBookData(prev => ({ ...prev, review: e.target.value }))}
                    placeholder="Share your thoughts about this book..."
                    rows={6}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Share Book
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddBook;
