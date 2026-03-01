/**
 * Setup Test API Endpoint
 *
 * Returns JSON status of Prisma and Supabase configuration
 * Access at: /api/test-setup
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const results: Record<string, any> = {}

  try {
    // Test Environment Variables
    results.env = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      databaseUrl: !!process.env.DATABASE_URL,
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'not set',
    }

    // Test Prisma Connection
    await prisma.$connect()
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    results.prisma = {
      connected: true,
      tableCount: Array.isArray(tables) ? tables.length : 0,
      tables: Array.isArray(tables) ? tables.map((t: any) => t.table_name) : [],
    }
    await prisma.$disconnect()

    // Test Supabase
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    results.supabase = {
      configured: true,
      authWorking: !error || error.message.includes('JWT'),
      hasSession: !!session,
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'All systems operational',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        results,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
