
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-black" />
          <span className="text-xl font-bold text-black">BookMates</span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-black hover:bg-gray-800 text-white">
            <Link to="/add-book" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Post</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
            <Link to="/notifications">
              <Bell className="h-5 w-5 text-black" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
            <Link to="/profile">
              <User className="h-5 w-5 text-black" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
