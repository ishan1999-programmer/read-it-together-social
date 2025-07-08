
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit3, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Comment {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string | null;
  };
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (commentId: number, content: string) => void;
}

const Comments = ({ comments, onAddComment, onDeleteComment, onEditComment }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleEditStart = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSave = (commentId: number) => {
    if (editContent.trim()) {
      onEditComment(commentId, editContent);
      setEditingComment(null);
      setEditContent('');
    }
  };

  const handleEditCancel = () => {
    setEditingComment(null);
    setEditContent('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">Comments ({comments.length})</h3>
      
      {/* Add Comment */}
      <Card>
        <CardContent className="p-4">
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
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.map(comment => (
        <Card key={comment.id}>
          <CardContent className="p-4">
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
                <div className="flex space-x-1">
                  {editingComment === comment.id ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSave(comment.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEditCancel}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditStart(comment)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {editingComment === comment.id ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                className="resize-none"
              />
            ) : (
              <p className="text-foreground">{comment.content}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
