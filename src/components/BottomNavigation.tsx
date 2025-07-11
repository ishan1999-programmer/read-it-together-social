
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Plus, BookOpen, User } from 'lucide-react';

const navigationItems = [
  { title: 'Feed', url: '/feeds', icon: Home },
  { title: 'Explore', url: '/explore', icon: Compass },
  { title: 'Post', url: '/add-book', icon: Plus, isSpecial: true },
  { title: 'My Reads', url: '/my-reads', icon: BookOpen },
  { title: 'Profile', url: '/profile', icon: User },
];

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (url: string) => location.pathname === url;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              item.isSpecial 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 -mt-2 scale-110 shadow-lg' 
                : isActive(item.url)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <item.icon className={`${item.isSpecial ? 'h-6 w-6' : 'h-5 w-5'} mb-1`} />
            <span className={`text-xs font-medium ${item.isSpecial ? 'text-primary-foreground' : ''}`}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
