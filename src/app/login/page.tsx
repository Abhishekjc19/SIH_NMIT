"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: 'Login Successful',
          description: "You've successfully logged in!",
        });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Error',
          description: data.error || 'Invalid username or password.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: error.message || 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-background px-4 py-12">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
               <Logo className="h-7 w-auto" />
            </Link>
          <CardTitle className="text-2xl font-bold font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <GoogleSignInButton />
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
