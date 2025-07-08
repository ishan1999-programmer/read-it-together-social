
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
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-accent p-3">
            <Link to="/notifications">
              <Bell className="h-8 w-8 text-primary" />
            </Link>
          </Button>
          
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
