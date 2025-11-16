import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  User, 
  ClipboardList, 
  MessageSquare, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/student/dashboard', icon: Home },
  { title: 'Profile', url: '/student/profile', icon: User },
  { title: 'Assessments', url: '/student/assessments', icon: ClipboardList },
  { title: 'Mock Interview', url: '/student/mock-interview', icon: MessageSquare },
  { title: 'Feedback', url: '/student/feedback', icon: BarChart3 },
];

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [location] = useLocation();
  const { signOut, studentProfile } = useAuth();

  const [, setLocation] = useLocation();
  
  const handleSignOut = () => {
    signOut();
    setLocation('/');
  };

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-6 border-b">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-primary">Hirica</h2>
              <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location === item.url}>
                        <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="space-y-4">
              {studentProfile && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{studentProfile.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{studentProfile.email}</p>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleSignOut}
                data-testid="button-sign-out"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {studentProfile && (
                  <>
                    <span className="hidden sm:inline">Welcome back, </span>
                    <span className="font-medium text-foreground">{studentProfile.name}</span>
                  </>
                )}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
