
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold text-primary">BookMates</span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/add-book" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Post</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
            <Link to="/notifications">
              <Bell className="h-7 w-7 text-primary" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
            <Link to="/profile">
              <User className="h-7 w-7 text-primary" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
