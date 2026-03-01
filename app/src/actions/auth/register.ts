'use server';

import { createClient } from '@/lib/supabase/server';
import { registerSchema } from '@/lib/validators/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface RegisterResult {
  success: boolean;
  error?: string;
}

/**
 * Teacher registration Server Action
 * 
 * @param formData - Form data with email, password, and name
 * @returns RegisterResult with success status and optional error message
 */
export async function register(formData: FormData): Promise<RegisterResult> {
  try {
    // Parse form data
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    // Validate with Zod
    const validatedData = registerSchema.parse({ email, password, name });

    // Create Supabase client
    const supabase = await createClient();

    // Call Supabase signUp
    const result = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
          role: 'teacher', // Add role to metadata
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
      },
    });

    // Handle Supabase errors
    if (result.error) {
      // Handle duplicate email
      if (result.error.status === 400 && result.error.message.includes('already')) {
        return {
          success: false,
          error: 'An account with this email already exists.',
        };
      }

      // Handle weak password
      if (result.error.status === 400 && result.error.message.includes('password')) {
        return {
          success: false,
          error: result.error.message,
        };
      }

      // Generic error
      return {
        success: false,
        error: result.error.message || 'Registration failed. Please try again.',
      };
    }

    // Insert user into local users table
    // Note: We use the Supabase user ID to create the local user record
    if (result.data?.user) {
      const { prisma } = await import('@/lib/prisma');
      
      try {
        await prisma.user.create({
          data: {
            id: result.data.user.id, // Use Supabase auth.users.id
            email: validatedData.email,
            name: validatedData.name,
            role: 'teacher',
          },
        });
      } catch (dbError) {
        console.error('Failed to create local user record:', dbError);
        // Don't fail the registration, but log the error
        // The user can be synced later via trigger or manual process
      }
    }

    // Success - return success response (client will handle redirect)
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const flattened = error.flatten();
      const fieldNames = Object.keys(flattened.fieldErrors) as Array<keyof typeof flattened.fieldErrors>;
      const firstField = fieldNames[0];
      const firstError = firstField ? flattened.fieldErrors[firstField]?.[0] : 'Validation failed';
      return {
        success: false,
        error: firstError || 'Validation failed',
      };
    }

    // Handle unknown errors
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
