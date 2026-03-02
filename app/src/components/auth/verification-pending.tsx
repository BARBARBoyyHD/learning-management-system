'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function VerificationPending() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-lighter">
          <span className="material-symbols-outlined h-8 w-8 text-primary-base">mail</span>
        </div>
        <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
        <CardDescription className="text-base">
          We've sent a verification link to your email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 border border-blue-200">
          <p className="font-medium mb-2">Next steps:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your email inbox</li>
            <li>Click the verification link</li>
            <li>You'll be redirected to the app</li>
          </ol>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Didn't receive the email?</p>
          <p className="mt-1">Check your spam folder or try again.</p>
        </div>

        <Button variant="outline" className="w-full">
          Resend verification email
        </Button>

        <div className="text-center">
          <a href="/register" className="text-sm text-primary-base hover:underline font-medium">
            Back to registration
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
