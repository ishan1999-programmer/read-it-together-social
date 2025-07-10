
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

export const addBookToMyFeeds = (bookData: any) => {
  const book: Book = {
    id: bookData.id,
    title: bookData.volumeInfo?.title || 'Unknown Title',
    authors: bookData.volumeInfo?.authors || ['Unknown Author'],
    categories: bookData.volumeInfo?.categories,
    averageRating: bookData.volumeInfo?.averageRating,
    pageCount: bookData.volumeInfo?.pageCount,
    imageLinks: bookData.volumeInfo?.imageLinks,
    status: 'want-to-read',
    addedDate: new Date().toISOString()
  };

  // Get existing books from localStorage
  const existingBooks = localStorage.getItem('myFeedsBooks');
  let books: Book[] = [];
  
  if (existingBooks) {
    try {
      books = JSON.parse(existingBooks);
    } catch (error) {
      console.error('Error parsing existing books:', error);
    }
  }

  // Check if book already exists
  const bookExists = books.some(existingBook => existingBook.id === book.id);
  
  if (!bookExists) {
    books.push(book);
    localStorage.setItem('myFeedsBooks', JSON.stringify(books));
    return true; // Book added successfully
  }
  
  return false; // Book already exists
};

export const removeBookFromWantToRead = (bookId: string) => {
  const savedBookIds = localStorage.getItem('wantToReadBooks');
  const savedBooksData = localStorage.getItem('wantToReadBooksData');
  
  if (savedBookIds && savedBooksData) {
    try {
      const bookIds = JSON.parse(savedBookIds);
      const booksData = JSON.parse(savedBooksData);
      
      const updatedBookIds = bookIds.filter((id: string) => id !== bookId);
      delete booksData[bookId];
      
      localStorage.setItem('wantToReadBooks', JSON.stringify(updatedBookIds));
      localStorage.setItem('wantToReadBooksData', JSON.stringify(booksData));
    } catch (error) {
      console.error('Error removing book from want to read:', error);
    }
  }
};
