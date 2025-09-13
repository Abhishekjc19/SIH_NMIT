
"use client";
'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: 'Account Created',
          description: "You've successfully signed up!",
        });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup Error',
          description: data.error || 'Failed to create an account. Please try again.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup Error',
        description: error.message || 'Failed to create an account. Please try again.',
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
          <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <GoogleSignInButton />
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
