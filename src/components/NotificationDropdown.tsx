
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Notification {
  id: number;
  type: 'like' | 'comment';
  user: {
    name: string;
    username: string;
    avatar: string | null;
  };
  message: string;
  timestamp: string;
  isRead: boolean;
  postId?: number;
  postTitle?: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
}

const NotificationDropdown = ({ 
  notifications, 
  onMarkAsRead
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-accent p-3"
      >
        <Bell className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <Card className={`absolute right-0 top-full mt-2 ${
            isMobile ? 'w-80 max-w-[calc(100vw-2rem)]' : 'w-96'
          } max-h-96 overflow-y-auto z-20 shadow-lg`}>
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-lg">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications yet
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors ${
                        !notification.isRead ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={notification.user.avatar || ''} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {notification.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getNotificationIcon(notification.type)}
                            <Link 
                              to={`/profile/${notification.user.username}`}
                              className="font-medium text-sm hover:text-primary transition-colors whitespace-nowrap"
                            >
                              {notification.user.name}
                            </Link>
                            <span className="text-sm text-foreground truncate">
                              {notification.message}
                            </span>
                          </div>
                          
                          {notification.postTitle && (
                            <Link 
                              to={`/book/${notification.postId}`}
                              className="text-xs text-primary hover:underline block"
                            >
                              "{notification.postTitle}"
                            </Link>
                          )}
                          
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                        
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
