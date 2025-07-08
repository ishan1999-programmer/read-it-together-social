
import React, { useState } from 'react';
import { Heart, MessageCircle, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

const BookPost = ({ post, onLike }: BookPostProps) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-black text-black' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Read':
        return 'bg-black text-white';
      case 'Currently Reading':
        return 'bg-gray-200 text-black';
      case 'Want to Read':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const truncatedReview = post.review.length > 200 
    ? post.review.substring(0, 200) + '...' 
    : post.review;

  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
            {post.user.avatar ? (
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-black">{post.user.name}</h3>
            <p className="text-sm text-gray-500">@{post.user.username} • {post.timestamp}</p>
          </div>
        </div>

        {/* Book Info */}
        <div className="flex space-x-4 mb-4">
          <div className="h-24 w-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
            {post.book.cover ? (
              <img 
                src={post.book.cover} 
                alt={post.book.title}
                className="h-full w-full rounded object-cover"
              />
            ) : (
              <div className="text-gray-400 text-xs text-center p-1">Book Cover</div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-black text-lg">{post.book.title}</h4>
            <p className="text-gray-600 mb-2">by {post.book.author}</p>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-600">{post.book.genre}</span>
              <span className="text-gray-300">•</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.book.status)}`}>
                {post.book.status}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(post.book.rating)}
              <span className="text-sm text-gray-600 ml-2">{post.book.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">
            {showFullReview ? post.review : truncatedReview}
          </p>
          {post.review.length > 200 && (
            <button
              onClick={() => setShowFullReview(!showFullReview)}
              className="text-black font-medium text-sm mt-1 hover:underline"
            >
              {showFullReview ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 ${
              post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-black"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookPost;
