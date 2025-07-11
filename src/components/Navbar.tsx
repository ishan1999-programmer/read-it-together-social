
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();

  // Mock data for notifications (only post-related)
  const postNotifications = [
    {
      id: 1,
      type: 'like' as const,
      user: {
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: null,
      },
      message: 'liked your post',
      timestamp: '2 hours ago',
      isRead: false,
      postId: 1,
      postTitle: 'The Great Gatsby',
    },
    {
      id: 2,
      type: 'comment' as const,
      user: {
        name: 'Mike Chen',
        username: 'mikechen',
        avatar: null,
      },
      message: 'commented on your post',
      timestamp: '5 hours ago',
      isRead: true,
      postId: 2,
      postTitle: 'To Kill a Mockingbird',
    },
  ];

  // Mock data for follow requests
  const followRequests = [
    {
      id: 1,
      user: {
        name: 'Alex Rodriguez',
        username: 'alexr',
        avatar: null,
      },
      timestamp: '1 hour ago',
    },
    {
      id: 2,
      user: {
        name: 'Emma Wilson',
        username: 'emmaw',
        avatar: null,
      },
      timestamp: '3 hours ago',
    },
  ];

  const handleMarkAsRead = (notificationId: number) => {
    console.log('Mark notification as read:', notificationId);
  };

  const handleAcceptFollowRequest = (requestId: number, userId: string) => {
    console.log('Accept follow request:', requestId, userId);
  };

  const handleRejectFollowRequest = (requestId: number, userId: string) => {
    console.log('Reject follow request:', requestId, userId);
  };

  return (
    <nav className="bg-background border-b border-border h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      <Link to="/feeds" className="flex items-center space-x-2">
        <BookOpen className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
        <span className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} text-primary`}>
          BookShare
        </span>
      </Link>

      <div className="flex items-center space-x-2">
        {!isMobile && (
          <Button asChild variant="default" className="px-4 py-2 h-auto bg-primary hover:bg-primary/90">
            <Link to="/add-book" className="flex items-center gap-2">
              <span className="text-primary-foreground font-medium">+Post</span>
            </Link>
          </Button>
        )}
        
        <Button asChild variant="ghost" size="icon" className="hover:bg-accent">
          <Link to="/search">
            <Search className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-primary`} />
          </Link>
        </Button>
        
        <div className="relative">
          <NotificationDropdown 
            notifications={postNotifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
        
        <div className="relative">
          <ProfileDropdown 
            followRequests={followRequests}
            onAcceptFollowRequest={handleAcceptFollowRequest}
            onRejectFollowRequest={handleRejectFollowRequest}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
