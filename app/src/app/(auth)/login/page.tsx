'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered') === 'true';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-lighter to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-lighter">
            <Lock className="h-8 w-8 text-primary-base" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your teacher account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {registered && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              <strong>Registration successful!</strong> Please sign in with your email and password.
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">
            Sign in
          </Button>
          <div className="text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <a href="/register" className="text-primary-base hover:underline font-medium">
              Register
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
