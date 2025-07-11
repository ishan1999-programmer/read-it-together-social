
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, Star, BookOpen } from 'lucide-react';

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
}

const BookPost: React.FC<BookPostProps> = ({ post, onLike }) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const truncateReview = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-center gap-3 mb-4">
          <Link to={`/profile/${post.user.username}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user.avatar || ''} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {post.user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/profile/${post.user.username}`} className="hover:underline">
              <h4 className="font-semibold text-foreground">{post.user.name}</h4>
            </Link>
            <p className="text-sm text-muted-foreground">@{post.user.username} • {post.timestamp}</p>
          </div>
          <Badge variant="outline" className={`${
            post.book.status === 'Read' ? 'bg-green-50 text-green-700 border-green-200' :
            post.book.status === 'Currently Reading' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            {post.book.status}
          </Badge>
        </div>

        {/* Book Information */}
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-24 bg-muted rounded flex items-center justify-center flex-shrink-0">
            {post.book.cover ? (
              <img 
                src={post.book.cover} 
                alt={post.book.title}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1">{post.book.title}</h3>
            <p className="text-muted-foreground mb-2">by {post.book.author}</p>
            <p className="text-sm text-muted-foreground mb-2">{post.book.genre}</p>
            <div className="flex items-center gap-1">
              {renderStars(post.book.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                {post.book.rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Review */}
        {post.review && (
          <div className="mb-4">
            <p className="text-foreground leading-relaxed">
              {showFullReview ? post.review : truncateReview(post.review)}
            </p>
            {post.review.length > 200 && (
              <button
                onClick={() => setShowFullReview(!showFullReview)}
                className="text-primary hover:text-primary/80 text-sm font-medium mt-2"
              >
                {showFullReview ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-2 ${
              post.isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookPost;
