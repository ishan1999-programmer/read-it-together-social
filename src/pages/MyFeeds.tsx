import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Search, 
  Star,
  Calendar,
  FileText,
  Edit,
  Check,
  X
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  categories?: string[];
  averageRating?: number;
  pageCount?: number;
  imageLinks?: {
    thumbnail?: string;
  };
  status: 'want-to-read' | 'currently-reading' | 'read';
  addedDate: string;
  startedDate?: string;
  completedDate?: string;
  currentPage?: number;
}

const MyFeeds = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [tempPageNumber, setTempPageNumber] = useState<number>(0);
  const [originalPageNumber, setOriginalPageNumber] = useState<number>(0);

  useEffect(() => {
    // Load books from localStorage
    const savedBooks = localStorage.getItem('myFeedsBooks');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        setBooks(parsedBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Filter books based on search term
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBooks(filtered);
  }, [books, searchTerm]);

  const updateBookStatus = (bookId: string, newStatus: Book['status']) => {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        const updatedBook = { ...book, status: newStatus };
        
        if (newStatus === 'currently-reading' && !book.startedDate) {
          updatedBook.startedDate = new Date().toISOString();
          updatedBook.currentPage = 1;
        } else if (newStatus === 'read' && !book.completedDate) {
          updatedBook.completedDate = new Date().toISOString();
          updatedBook.currentPage = book.pageCount || 0;
        }
        
        return updatedBook;
      }
      return book;
    });
    
    setBooks(updatedBooks);
    localStorage.setItem('myFeedsBooks', JSON.stringify(updatedBooks));
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

  const startEditingPage = (bookId: string, currentPage: number) => {
    setEditingPageId(bookId);
    setTempPageNumber(currentPage);
    setOriginalPageNumber(currentPage);
  };

  const savePageNumber = (bookId: string) => {
    if (tempPageNumber > 0) {
      updateCurrentPage(bookId, tempPageNumber);
    }
    setEditingPageId(null);
  };

  const cancelEditingPage = () => {
    setEditingPageId(null);
    setTempPageNumber(originalPageNumber);
  };

  const updateCurrentPage = (bookId: string, currentPage: number) => {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        return { ...book, currentPage };
      }
      return book;
    });
    
    setBooks(updatedBooks);
    localStorage.setItem('myFeedsBooks', JSON.stringify(updatedBooks));
  };

  const hasPageNumberChanged = (bookId: string) => {
    return editingPageId === bookId && tempPageNumber !== originalPageNumber;
  };

  const renderBookCard = (book: Book, showStatusControls = true) => (
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
              
              {book.pageCount && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Page {book.currentPage || 1} of {book.pageCount}</span>
                    <span>{calculateProgress(book.currentPage || 1, book.pageCount).toFixed(0)}%</span>
                  </div>
                  <Progress value={calculateProgress(book.currentPage || 1, book.pageCount)} />
                  
                  <div className="flex items-center gap-2 mt-2">
                    {editingPageId === book.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Page number"
                          min="1"
                          max={book.pageCount}
                          value={tempPageNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setTempPageNumber(parseInt(value) || 0);
                          }}
                          className="w-24 h-8 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          autoFocus
                        />
                        <span className="text-xs text-muted-foreground">/ {book.pageCount}</span>
                        <Button
                          size="sm"
                          variant={hasPageNumberChanged(book.id) ? "default" : "secondary"}
                          onClick={() => savePageNumber(book.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditingPage}
                          className="h-6 px-2 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Currently on page {book.currentPage || 1}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditingPage(book.id, book.currentPage || 1)}
                          className="h-6 px-2 text-xs flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Update
                        </Button>
                      </div>
                    )}
                  </div>
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

          {showStatusControls && (
            <div className="flex flex-wrap gap-1 pt-2">
              <Button
                size="sm"
                variant={book.status === 'want-to-read' ? 'default' : 'outline'}
                onClick={() => updateBookStatus(book.id, 'want-to-read')}
                className="text-xs h-7"
              >
                Want to Read
              </Button>
              <Button
                size="sm"
                variant={book.status === 'currently-reading' ? 'default' : 'outline'}
                onClick={() => updateBookStatus(book.id, 'currently-reading')}
                className="text-xs h-7"
              >
                Reading
              </Button>
              <Button
                size="sm"
                variant={book.status === 'read' ? 'default' : 'outline'}
                onClick={() => updateBookStatus(book.id, 'read')}
                className="text-xs h-7"
              >
                Read
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const getBooksByStatus = (status: Book['status']) => {
    return filteredBooks.filter(book => book.status === status);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Feeds</h1>
          <p className="text-muted-foreground">Track your reading journey</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="want-to-read" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
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

          <TabsContent value="want-to-read" className="space-y-6">
            {getBooksByStatus('want-to-read').length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No books in your want to read list</p>
                <Button className="mt-4" asChild>
                  <a href="/search">Discover Books</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getBooksByStatus('want-to-read').map(book => renderBookCard(book))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="currently-reading" className="space-y-6">
            {getBooksByStatus('currently-reading').length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No books currently being read</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getBooksByStatus('currently-reading').map(book => renderBookCard(book))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-6">
            {getBooksByStatus('read').length === 0 ? (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No books completed yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getBooksByStatus('read').map(book => renderBookCard(book))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyFeeds;
