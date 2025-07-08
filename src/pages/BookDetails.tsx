
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Star, User, Trash2, Edit } from 'lucide-react';

// Mock book data
const mockBook = {
  id: 1,
  user: {
    name: 'Jane Smith',
    username: 'bookworm_jane',
    avatar: null
  },
  book: {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genres: ['Historical Fiction', 'Romance'],
    cover: null,
    rating: 5,
    status: 'Read'
  },
  review: 'This book absolutely blew me away! Taylor Jenkins Reid has crafted such a compelling story about love, ambition, and the price of fame. Evelyn Hugo is one of the most complex and fascinating characters I\'ve ever encountered. The way the story unfolds through Monique\'s interviews is masterful, and I found myself completely absorbed in Evelyn\'s world. The LGBTQ+ representation is beautiful and authentic, and the ending had me in tears. This is definitely going on my list of all-time favorites!',
  likes: 47,
  comments: 12,
  timestamp: '2 days ago',
  isLiked: false
};

const mockComments = [
  {
    id: 1,
    user: {
      name: 'Alex Chen',
      username: 'scifi_alex',
      avatar: null
    },
    content: 'I completely agree! This book was phenomenal. The character development was incredible.',
    timestamp: '1 day ago',
    isOwn: false
  },
  {
    id: 2,
    user: {
      name: 'Sophie Martinez',
      username: 'romance_sophie',
      avatar: null
    },
    content: 'Adding this to my TBR list right now! Your review convinced me 📚',
    timestamp: '18 hours ago',
    isOwn: false
  },
  {
    id: 3,
    user: {
      name: 'Current User',
      username: 'current_user',
      avatar: null
    },
    content: 'Same here! I couldn\'t put it down once I started reading.',
    timestamp: '12 hours ago',
    isOwn: true
  }
];

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(mockBook);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleLike = () => {
    setBook(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          name: 'Current User',
          username: 'current_user',
          avatar: null
        },
        content: newComment,
        timestamp: 'just now',
        isOwn: true
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Read':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Currently Reading':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Want to Read':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-4">
        <Card className="bg-card border border-border shadow-sm mb-8">
          <CardContent className="p-8">
            {/* User Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                  {book.user.avatar ? (
                    <img 
                      src={book.user.avatar} 
                      alt={book.user.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Link 
                    to={`/profile/${book.user.username}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {book.user.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">@{book.user.username} • {book.timestamp}</p>
                </div>
              </div>
              
              {/* Edit/Delete buttons for book owner */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex space-x-8 mb-6">
              <div className="h-60 w-40 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
                {book.book.cover ? (
                  <img 
                    src={book.book.cover} 
                    alt={book.book.title}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-sm text-center p-4">Book Cover</div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-foreground text-3xl mb-2">{book.book.title}</h1>
                <p className="text-muted-foreground mb-4 text-xl">by {book.book.author}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.book.genres.map(genre => (
                    <Badge key={genre} variant="secondary">{genre}</Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(book.book.status)}`}>
                    {book.book.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars(book.book.rating)}
                  <span className="text-lg text-muted-foreground ml-2">{book.book.rating}/5</span>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Review</h3>
              <p className="text-foreground leading-relaxed text-lg">{book.review}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  book.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart className={`h-6 w-6 ${book.isLiked ? 'fill-current' : ''}`} />
                <span>{book.likes}</span>
              </Button>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="h-6 w-6" />
                <span>{book.comments}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Comments</h2>
          
          {/* Add Comment */}
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="mb-3"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          {comments.map(comment => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar || ''} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {comment.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link 
                        to={`/profile/${comment.user.username}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {comment.user.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
                    </div>
                  </div>
                  
                  {comment.isOwn && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
