import Link from 'next/link';
import { Logo } from '../ui/logo';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Logo className="h-6 w-auto" />
              <span className="sr-only">ShikshaLite Home</span>
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">About Us</Link>
            <Link href="#" className="hover:text-primary">Help & Support</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShikshaLite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
