
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
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
      <Link to="/" className="flex items-center space-x-2">
        <BookOpen className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
        <span className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} text-primary`}>
          BookShare
        </span>
      </Link>

      <div className="flex items-center space-x-2">
        <Button asChild variant="ghost" className="hover:bg-accent px-3 py-2 h-auto">
          <Link to="/add-book" className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">Post</span>
          </Link>
        </Button>
        
        <NotificationDropdown 
          notifications={postNotifications}
          onMarkAsRead={handleMarkAsRead}
        />
        
        <ProfileDropdown 
          followRequests={followRequests}
          onAcceptFollowRequest={handleAcceptFollowRequest}
          onRejectFollowRequest={handleRejectFollowRequest}
        />
      </div>
    </nav>
  );
};

export default Navbar;
