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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/studio', label: 'For Instructors' },
];

export function Header() {
  const isMobile = useIsMobile();
  // TODO: Replace with actual authentication state
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);


  const navContent = (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="ghost" asChild className="text-base">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

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

          {isAuthenticated ? (
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
                <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Log Out</DropdownMenuItem>
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
                   {!isAuthenticated && (
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
