
import React, { useState } from 'react';
import { Heart, MessageCircle, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface BookPostProps {
  post: {
    id: number;
    user: {
      name: string;
      username: string;
      avatar: string | null;
    };
    book: {
      title: string;
      author: string;
      genre: string;
      cover: string | null;
      rating: number;
      status: string;
    };
    review: string;
    likes: number;
    comments: number;
    timestamp: string;
    isLiked: boolean;
  };
  onLike: (postId: number) => void;
  showComments?: boolean;
}

const BookPost = ({ post, onLike, showComments = false }: BookPostProps) => {
  const [showFullReview, setShowFullReview] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(showComments);
  const [newComment, setNewComment] = useState('');
  
  // Mock comments data - only show user's own comments in feed
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'Current User',
        username: 'current_user',
        avatar: null
      },
      content: 'Adding this to my TBR list right now!',
      timestamp: '12 hours ago',
      isOwn: true,
      likes: 0,
      isLiked: false
    }
  ]);

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
        isOwn: true,
        likes: 0,
        isLiked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const handleCommentLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
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

  const truncatedReview = post.review.length > 200 
    ? post.review.substring(0, 200) + '...' 
    : post.review;

  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
            {post.user.avatar ? (
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <Link 
              to={`/profile/${post.user.username}`}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {post.user.name}
            </Link>
            <p className="text-sm text-muted-foreground">@{post.user.username} • {post.timestamp}</p>
          </div>
        </div>

        {/* Book Info */}
        <div className="flex space-x-6 mb-4">
          <div className="h-40 w-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
            {post.book.cover ? (
              <img 
                src={post.book.cover} 
                alt={post.book.title}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-xs text-center p-2">Book Cover</div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-xl mb-1">{post.book.title}</h4>
            <p className="text-muted-foreground mb-3 text-lg">by {post.book.author}</p>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-sm text-muted-foreground">{post.book.genre}</span>
              <span className="text-muted-foreground">•</span>
              <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(post.book.status)}`}>
                {post.book.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {renderStars(post.book.rating)}
              <span className="text-sm text-muted-foreground ml-2">{post.book.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed">
            {showFullReview ? post.review : truncatedReview}
          </p>
          {post.review.length > 200 && (
            <button
              onClick={() => setShowFullReview(!showFullReview)}
              className="text-primary font-medium text-sm mt-1 hover:underline"
            >
              {showFullReview ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 ${
              post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommentsExpanded(!commentsExpanded)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="h-6 w-6" />
            <span>{comments.length}</span>
          </Button>
        </div>

        {/* Comments Section - Only show user's own comments in feed */}
        {commentsExpanded && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="space-y-4">
              {/* Add Comment */}
              <div className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="mb-3 resize-none"
                  />
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!newComment.trim()}
                    size="sm"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* User's Comments Only */}
              {comments.filter(comment => comment.isOwn).map(comment => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatar || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {comment.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground text-sm">{comment.user.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-foreground text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center space-x-1 h-6 px-2 ${
                          comment.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookPost;
