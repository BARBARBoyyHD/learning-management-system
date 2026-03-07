/**
 * Test script to verify Prisma and Supabase configuration
 * 
 * Run with: npx tsx scripts/test-setup.ts
 */

import { PrismaClient } from '@prisma/client'

// Test Prisma Configuration
console.log('🧪 Testing Prisma Configuration...\n')

const prisma = new PrismaClient()

async function testPrisma() {
  try {
    // Test database connection
    console.log('✅ Prisma Client imported successfully')
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('❌ DATABASE_URL is not set in .env.local')
    }
    console.log('✅ DATABASE_URL is configured')
    
    // Try to connect to database
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // List tables (if any exist)
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log(`📊 Found ${Array.isArray(tables) ? tables.length : 0} tables in database`)
    
    await prisma.$disconnect()
    console.log('✅ Database disconnected cleanly\n')
    
    return true
  } catch (error) {
    console.error('❌ Prisma test failed:', error instanceof Error ? error.message : error)
    await prisma.$disconnect()
    return false
  }
}

// Test Supabase Configuration
console.log('\n🧪 Testing Supabase Configuration...\n')

function testSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local')
    return false
  }
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL is configured')
  
  if (!supabaseAnonKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local')
    return false
  }
  console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is configured')
  
  // Validate URL format
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    console.error('❌ Supabase URL format is invalid. Should be: https://xxx.supabase.co')
    return false
  }
  console.log('✅ Supabase URL format is valid')
  
  // Validate anon key format (should start with eyJ for JWT)
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.warn('⚠️  Supabase anon key format looks unusual (should start with eyJ)')
  } else {
    console.log('✅ Supabase anon key format is valid')
  }
  
  console.log('\n📝 To complete Supabase setup:')
  console.log('   1. Create project at https://supabase.com')
  console.log('   2. Go to Settings > API')
  console.log('   3. Copy URL and anon key to .env.local')
  console.log('   4. Enable Email authentication in Authentication > Providers')
  
  return true
}

// Run all tests
async function runTests() {
  console.log('═══════════════════════════════════════════════════════\n')
  
  const prismaOk = await testPrisma()
  const supabaseOk = testSupabase()
  
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('\n📊 Test Summary:\n')
  console.log(`  Prisma:      ${prismaOk ? '✅ Working' : '❌ Needs configuration'}`)
  console.log(`  Supabase:    ${supabaseOk ? '✅ Configured' : '❌ Needs configuration'}`)
  console.log(`\n${prismaOk && supabaseOk ? '🎉 All systems ready!' : '⚠️  Some configuration needed'}\n`)
  
  process.exit(prismaOk && supabaseOk ? 0 : 1)
}

runTests()
