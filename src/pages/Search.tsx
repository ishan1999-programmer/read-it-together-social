import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search as SearchIcon, BookOpen, Calendar, Star, Heart, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    categories?: string[];
    pageCount?: number;
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    previewLink?: string;
    infoLink?: string;
  };
  saleInfo?: {
    buyLink?: string;
  };
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const [wantToReadBooks, setWantToReadBooks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Load saved "Want to Read" books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wantToReadBooks');
    if (saved) {
      setWantToReadBooks(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save "Want to Read" books to localStorage
  const saveWantToReadBooks = (bookIds: Set<string>) => {
    localStorage.setItem('wantToReadBooks', JSON.stringify([...bookIds]));
  };

  // Search books using Google Books API
  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&orderBy=relevance`
      );
      const data = await response.json();
      
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      toast({
        title: "Search Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      });
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchBooks(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Toggle "Want to Read" status and save to My Feeds
  const toggleWantToRead = (bookId: string, bookTitle: string, book: GoogleBook) => {
    const newWantToReadBooks = new Set(wantToReadBooks);
    
    if (newWantToReadBooks.has(bookId)) {
      newWantToReadBooks.delete(bookId);
      
      // Remove from My Feeds
      const savedBooks = localStorage.getItem('myFeedsBooks');
      if (savedBooks) {
        const books = JSON.parse(savedBooks);
        const updatedBooks = books.filter((b: any) => b.id !== bookId);
        localStorage.setItem('myFeedsBooks', JSON.stringify(updatedBooks));
      }
      
      toast({
        title: "Removed from Want to Read",
        description: `"${bookTitle}" has been removed from your reading list.`,
      });
    } else {
      newWantToReadBooks.add(bookId);
      
      // Add to My Feeds
      const bookData = {
        id: bookId,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || ['Unknown Author'],
        categories: book.volumeInfo.categories || ['Unknown Genre'],
        averageRating: book.volumeInfo.averageRating,
        pageCount: book.volumeInfo.pageCount,
        imageLinks: book.volumeInfo.imageLinks,
        status: 'want-to-read' as const,
        addedDate: new Date().toISOString()
      };
      
      const savedBooks = localStorage.getItem('myFeedsBooks');
      const books = savedBooks ? JSON.parse(savedBooks) : [];
      books.push(bookData);
      localStorage.setItem('myFeedsBooks', JSON.stringify(books));
      
      toast({
        title: "Added to Want to Read",
        description: `"${bookTitle}" has been added to your reading list.`,
      });
    }
    
    setWantToReadBooks(newWantToReadBooks);
    saveWantToReadBooks(newWantToReadBooks);
  };

  const formatAuthors = (authors?: string[]) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  const formatYear = (publishedDate?: string) => {
    if (!publishedDate) return '';
    return new Date(publishedDate).getFullYear().toString();
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
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
      <div className="max-w-7xl mx-auto pt-4 pl-4 md:pl-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Discover Books</h1>
          <p className="text-muted-foreground text-lg">Search millions of books from around the world</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-4 text-lg border-2 focus:border-primary"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Searching books...</span>
          </div>
        )}

        {/* Search Results */}
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    {/* Book Cover */}
                    <div className="aspect-[3/4] mb-3 relative overflow-hidden rounded-lg bg-muted">
                      {book.volumeInfo.imageLinks?.thumbnail ? (
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                          alt={book.volumeInfo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2 leading-tight">
                        {book.volumeInfo.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {formatAuthors(book.volumeInfo.authors)}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3 mt-auto">
                        <span className="text-xs text-muted-foreground">
                          {formatYear(book.volumeInfo.publishedDate)}
                        </span>
                        {book.volumeInfo.averageRating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="text-xs text-muted-foreground">
                              {book.volumeInfo.averageRating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={wantToReadBooks.has(book.id) ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWantToRead(book.id, book.volumeInfo.title, book);
                          }}
                          className="flex-1 text-xs"
                        >
                          <Heart className={`h-3 w-3 mr-1 ${wantToReadBooks.has(book.id) ? 'fill-current' : ''}`} />
                          {wantToReadBooks.has(book.id) ? 'Added' : 'Want to Read'}
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="px-2">
                              <BookOpen className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl mb-4">Book Details</DialogTitle>
                            </DialogHeader>
                            
                            <div className="flex flex-col md:flex-row gap-6">
                              {/* Book Cover */}
                              <div className="flex-shrink-0">
                                <div className="w-48 aspect-[3/4] bg-muted rounded-lg overflow-hidden mx-auto md:mx-0">
                                  {book.volumeInfo.imageLinks?.thumbnail ? (
                                    <img
                                      src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                                      alt={book.volumeInfo.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Book Information */}
                              <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">{book.volumeInfo.title}</h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                  by {formatAuthors(book.volumeInfo.authors)}
                                </p>

                                {/* Rating */}
                                {book.volumeInfo.averageRating && (
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                      {renderStars(book.volumeInfo.averageRating)}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {book.volumeInfo.averageRating} ({book.volumeInfo.ratingsCount} reviews)
                                    </span>
                                  </div>
                                )}

                                {/* Categories */}
                                {book.volumeInfo.categories && (
                                  <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                      {book.volumeInfo.categories.slice(0, 3).map((category, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {category}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Book Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                  {book.volumeInfo.publishedDate && (
                                    <div>
                                      <span className="font-medium">Published:</span>
                                      <p className="text-muted-foreground">{formatYear(book.volumeInfo.publishedDate)}</p>
                                    </div>
                                  )}
                                  {book.volumeInfo.pageCount && (
                                    <div>
                                      <span className="font-medium">Pages:</span>
                                      <p className="text-muted-foreground">{book.volumeInfo.pageCount}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Description */}
                                {book.volumeInfo.description && (
                                  <div className="mb-6">
                                    <h3 className="font-medium mb-2">Description</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                      {book.volumeInfo.description.replace(/<[^>]*>/g, '')}
                                    </p>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                  <Button
                                    onClick={() => toggleWantToRead(book.id, book.volumeInfo.title, book)}
                                    variant={wantToReadBooks.has(book.id) ? "default" : "outline"}
                                  >
                                    <Heart className={`h-4 w-4 mr-2 ${wantToReadBooks.has(book.id) ? 'fill-current' : ''}`} />
                                    {wantToReadBooks.has(book.id) ? 'Remove from Want to Read' : 'Want to Read'}
                                  </Button>
                                  
                                  {book.volumeInfo.previewLink && (
                                    <Button variant="outline" asChild>
                                      <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Preview
                                      </a>
                                    </Button>
                                  )}
                                  
                                  {book.saleInfo?.buyLink && (
                                    <Button variant="outline" asChild>
                                      <a href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Buy
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && searchQuery && books.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">Try searching with different keywords or check your spelling.</p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search for Books</h3>
            <p className="text-muted-foreground">Enter a title, author, or keyword to discover amazing books.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
