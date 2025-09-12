'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Download, UserCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Logo } from '@/components/ui/logo';

const navItems = [
  { href: '/dashboard', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const sidebarContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? 'secondary' : 'ghost'}
          className="justify-start gap-3"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden justify-start gap-2 mb-4">
                <Menu className="h-5 w-5" />
                <span>Dashboard Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-4">
              <Link href="/" className="mb-6 block">
                 <Logo className="h-6 w-auto" />
              </Link>
              {sidebarContent}
            </SheetContent>
          </Sheet>
        ) : (
          <aside className="hidden md:block">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                Student Dashboard
              </h2>
              {sidebarContent}
            </div>
          </aside>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
