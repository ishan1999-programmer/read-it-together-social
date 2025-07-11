
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Search, User, Settings, LogOut, BookOpen, Rss } from 'lucide-react';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: 'Feeds', url: '/feeds', icon: Rss },
  { title: 'My Reads', url: '/my-reads', icon: BookOpen },
  { title: 'Explore', url: '/explore', icon: Compass },
  { title: 'Search', url: '/search', icon: Search },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const isActive = (url: string) => location.pathname === url;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <SidebarComponent 
      className={`${
        isMobile 
          ? (state === "collapsed" ? "w-0" : "w-64") 
          : (state === "collapsed" ? "w-20" : "w-80")
      } transition-all duration-300`} 
      collapsible={isMobile ? "offcanvas" : "icon"}
    >
      {isMobile && <SidebarTrigger className="m-4" />}
      
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={`space-y-2 ${isMobile ? 'p-4' : 'p-6'}`}>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`flex items-center ${
                        isMobile ? 'space-x-3 p-3' : 'space-x-5 p-5'
                      } rounded-lg transition-colors ${
                        isMobile ? 'text-lg' : 'text-xl'
                      } ${
                        isActive(item.url) 
                          ? 'bg-primary text-primary-foreground font-semibold' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <item.icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
                      {state !== "collapsed" && (
                        <span className={isMobile ? 'text-lg' : 'text-xl'}>
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`flex items-center justify-start ${
            isMobile ? 'space-x-3 p-3' : 'space-x-5 p-5'
          } w-full rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}
        >
          <LogOut className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
          {state !== "collapsed" && (
            <span className={isMobile ? 'text-lg' : 'text-xl'}>
              Logout
            </span>
          )}
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
