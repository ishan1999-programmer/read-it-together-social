
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Search, User, Settings } from 'lucide-react';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const navigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Explore', url: '/explore', icon: Compass },
  { title: 'Search', url: '/search', icon: Search },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const isActive = (url: string) => location.pathname === url;

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
    </SidebarComponent>
  );
};

export default Sidebar;
