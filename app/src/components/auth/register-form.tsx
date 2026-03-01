'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validators/auth';
import { register as registerAction } from '@/actions/auth/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData and pass to server action
      const formData = new FormData();
      formData.set('email', data.email);
      formData.set('password', data.password);
      formData.set('name', data.name);

      const result = await registerAction(formData);

      if (!result.success) {
        if (result.error) {
          setError(result.error);
        }
      } else {
        // Success - redirect to login
        window.location.href = '/login?registered=true';
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-neutral-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Enter your details to register as a teacher
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Server Error */}
          {error && (
            <div className="rounded-md bg-error-base/10 p-3 text-sm text-error-light border border-error-base/20">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-neutral-200">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary-base focus:ring-primary-base"
              disabled={isSubmitting}
              {...register('name')}
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-sm text-error-light" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@example.com"
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary-base focus:ring-primary-base"
              disabled={isSubmitting}
              {...register('email')}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-error-light" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary-base focus:ring-primary-base"
              disabled={isSubmitting}
              {...register('password')}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-sm text-error-light" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium bg-primary-base hover:bg-primary-hover active:bg-primary-active shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-neutral-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-primary-base hover:text-primary-light font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
