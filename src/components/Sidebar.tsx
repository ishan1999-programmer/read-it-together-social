
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

  const isActive = (url: string) => location.pathname === url;

  return (
    <SidebarComponent className={state === "collapsed" ? "w-20" : "w-72"} collapsible="icon">
      <SidebarTrigger className="m-4 md:hidden" />
      
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3 p-6">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-colors text-lg ${
                        isActive(item.url) 
                          ? 'bg-primary text-primary-foreground font-semibold' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <item.icon className="h-7 w-7" />
                      {state !== "collapsed" && <span className="text-lg">{item.title}</span>}
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
