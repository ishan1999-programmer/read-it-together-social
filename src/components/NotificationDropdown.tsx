
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Heart, MessageCircle, UserPlus, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow_request';
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
  onAcceptFollowRequest: (notificationId: number, userId: string) => void;
  onRejectFollowRequest: (notificationId: number, userId: string) => void;
}

const NotificationDropdown = ({ 
  notifications, 
  onMarkAsRead, 
  onAcceptFollowRequest, 
  onRejectFollowRequest 
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'follow_request':
        return <UserPlus className="h-4 w-4 text-green-500" />;
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
        <Bell className="h-8 w-8 text-primary" />
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
          <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto z-20 shadow-lg">
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
                        <Avatar className="w-8 h-8">
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
                              className="font-medium text-sm hover:text-primary transition-colors"
                            >
                              {notification.user.name}
                            </Link>
                          </div>
                          
                          <p className="text-sm text-foreground mb-1">
                            {notification.message}
                          </p>
                          
                          {notification.postTitle && (
                            <Link 
                              to={`/book/${notification.postId}`}
                              className="text-xs text-primary hover:underline"
                            >
                              "{notification.postTitle}"
                            </Link>
                          )}
                          
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp}
                          </p>

                          {notification.type === 'follow_request' && (
                            <div className="flex space-x-2 mt-2">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAcceptFollowRequest(notification.id, notification.user.username);
                                }}
                                className="h-7 px-3"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRejectFollowRequest(notification.id, notification.user.username);
                                }}
                                className="h-7 px-3"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Decline
                              </Button>
                            </div>
                          )}
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
