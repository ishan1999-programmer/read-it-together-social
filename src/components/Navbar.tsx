
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like' as const,
      user: {
        name: 'Alex Chen',
        username: 'scifi_alex',
        avatar: null
      },
      message: 'liked your review of "The Seven Husbands of Evelyn Hugo"',
      timestamp: '2 minutes ago',
      isRead: false,
      postId: 1,
      postTitle: 'The Seven Husbands of Evelyn Hugo'
    },
    {
      id: 2,
      type: 'comment' as const,
      user: {
        name: 'Sophie Martinez',
        username: 'romance_sophie',
        avatar: null
      },
      message: 'commented on your post',
      timestamp: '1 hour ago',
      isRead: false,
      postId: 1,
      postTitle: 'Project Hail Mary'
    },
    {
      id: 3,
      type: 'follow_request' as const,
      user: {
        name: 'Literary Luna',
        username: 'literary_luna',
        avatar: null
      },
      message: 'wants to follow you',
      timestamp: '3 hours ago',
      isRead: true
    }
  ]);

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleAcceptFollowRequest = (notificationId: number, userId: string) => {
    console.log(`Accepting follow request from ${userId}`);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleRejectFollowRequest = (notificationId: number, userId: string) => {
    console.log(`Rejecting follow request from ${userId}`);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <nav className="bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-12 w-12 text-primary" />
          <span className="text-3xl font-bold text-primary">BookMates</span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-6 py-3">
            <Link to="/add-book" className="flex items-center space-x-2">
              <Plus className="h-6 w-6" />
              <span>Create Post</span>
            </Link>
          </Button>
          
          <NotificationDropdown
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onAcceptFollowRequest={handleAcceptFollowRequest}
            onRejectFollowRequest={handleRejectFollowRequest}
          />
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent p-3">
            <Link to="/profile">
              <User className="h-8 w-8 text-primary" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
