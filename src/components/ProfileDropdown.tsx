
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, UserPlus, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface FollowRequest {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string | null;
  };
  timestamp: string;
}

interface ProfileDropdownProps {
  followRequests: FollowRequest[];
  onAcceptFollowRequest: (requestId: number, userId: string) => void;
  onRejectFollowRequest: (requestId: number, userId: string) => void;
}

const ProfileDropdown = ({ 
  followRequests, 
  onAcceptFollowRequest, 
  onRejectFollowRequest 
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const requestCount = followRequests.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-accent p-3"
      >
        <User className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
        {requestCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {requestCount > 9 ? '9+' : requestCount}
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
                <h3 className="font-semibold text-lg">Follow Requests</h3>
                {requestCount > 0 && (
                  <p className="text-sm text-muted-foreground">{requestCount} pending</p>
                )}
              </div>
              
              {followRequests.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No follow requests
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {followRequests.map(request => (
                    <div
                      key={request.id}
                      className="p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={request.user.avatar || ''} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {request.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <UserPlus className="h-4 w-4 text-green-500" />
                            <Link 
                              to={`/profile/${request.user.username}`}
                              className="font-medium text-sm hover:text-primary transition-colors"
                            >
                              {request.user.name}
                            </Link>
                            <span className="text-sm text-foreground">
                              wants to follow you
                            </span>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">
                            {request.timestamp}
                          </p>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAcceptFollowRequest(request.id, request.user.username);
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
                                onRejectFollowRequest(request.id, request.user.username);
                              }}
                              className="h-7 px-3"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Decline
                            </Button>
                          </div>
                        </div>
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

export default ProfileDropdown;
