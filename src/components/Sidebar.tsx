
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Search, User, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const { collapsed } = useSidebar();

  const isActive = (url: string) => location.pathname === url;

  return (
    <SidebarComponent className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarTrigger className="m-4 md:hidden" />
      
      <SidebarContent className="bg-white border-r border-gray-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive(item.url) 
                          ? 'bg-amber-100 text-amber-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
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
