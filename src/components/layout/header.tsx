
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, UserCircle } from 'lucide-react';
import { Logo } from '../ui/logo';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/studio', label: 'For Instructors' },
];

export function Header() {
  const isMobile = useIsMobile();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out: ', error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'There was a problem signing out. Please try again.',
      });
    }
  };

  const navContent = (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild className="text-base">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );
  
  if (!hasMounted) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
            <div className="container mx-auto flex h-16 items-center px-4">
                 <div className="flex items-center gap-6">
                    <Link href="/">
                        <Logo className="h-6 w-auto" />
                        <span className="sr-only">ShikshaLite Home</span>
                    </Link>
                </div>
            </div>
        </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo className="h-6 w-auto" />
            <span className="sr-only">ShikshaLite Home</span>
          </Link>
          {!isMobile && <nav className="hidden md:flex items-center gap-2">{navContent}</nav>}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex flex-1 max-w-sm items-center relative">
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-10"
              aria-label="Search courses"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <Switch id="data-saver" />
            <Label htmlFor="data-saver" className="text-sm">Data Saver</Label>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/studio">Instructor Studio</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
                <Button asChild><Link href="/signup">Sign Up</Link></Button>
             </div>
          )}


          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                  <Link href="/">
                    <Logo className="h-6 w-auto mb-4" />
                    <span className="sr-only">ShikshaLite Home</span>
                  </Link>
                  <nav className="flex flex-col gap-2">{navContent}</nav>
                   {!user && (
                    <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                        <Button variant="ghost" asChild><Link href="/login">Login</Link></Button>
                        <Button asChild><Link href="/signup">Sign Up</Link></Button>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mt-4">
                    <Switch id="data-saver-mobile" />
                    <Label htmlFor="data-saver-mobile">Data Saver</Label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
