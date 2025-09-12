
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clapperboard, PlusCircle, UserCog, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Logo } from '@/components/ui/logo';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/studio', label: 'My Courses', icon: Clapperboard },
  { href: '/studio/create', label: 'Create Course', icon: PlusCircle },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  const renderMobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden justify-start gap-2 mb-4">
          <Menu className="h-5 w-5" />
          <span>Studio Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-4">
        <Link href="/" className="mb-6 block">
           <Logo className="h-6 w-auto" />
        </Link>
        {sidebarContent}
      </SheetContent>
    </Sheet>
  );

  const renderDesktopSidebar = () => (
    <aside className="hidden md:block">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <UserCog className="w-6 h-6" />
          Instructor Studio
        </h2>
        {sidebarContent}
      </div>
    </aside>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div>
          {hasMounted && (isMobile ? renderMobileSidebar() : renderDesktopSidebar())}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
