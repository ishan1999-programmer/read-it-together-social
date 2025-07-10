
import React from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNavigation from './BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const user = localStorage.getItem('user');
  const isMobile = useIsMobile();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <div className="flex w-full">
          {!isMobile && <Sidebar />}
          <main className={`flex-1 bg-background min-h-[calc(100vh-4rem)] overflow-x-hidden ${isMobile ? 'pb-20' : ''}`}>
            <div className={`${isMobile ? 'p-4' : 'p-6'} w-full`}>
              {children}
            </div>
          </main>
        </div>
        {isMobile && <BottomNavigation />}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
