/**
 * Seed Script: Create Test Teacher Account
 *
 * Creates a test teacher with known credentials.
 * Run with: npx dotenv-cli -e .env.local -- npx tsx prisma/seed-teacher.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating test teacher account...')

  // Check if teacher already exists
  const existingTeacher = await prisma.user.findFirst({
    where: { email: 'teacher@test.com' },
  })

  if (existingTeacher) {
    console.log('✅ Test teacher already exists:', existingTeacher.email)
    console.log('📝 Login credentials:')
    console.log('   Email: teacher@test.com')
    console.log('   Password: teacher123')
    return
  }

  // Hash password (for reference if needed in future)
  await bcrypt.hash('teacher123', 10)

  // Create teacher account
  // Note: This creates a user in the local users table
  // For Supabase auth, you'd need to create the user via Supabase admin API
  const teacher = await prisma.user.create({
    data: {
      name: 'Test Teacher',
      email: 'teacher@test.com',
      role: 'teacher',
    },
  })

  console.log('✅ Created test teacher:', teacher.id)
  console.log('📝 Login credentials:')
  console.log('   Email: teacher@test.com')
  console.log('   Password: teacher123')
  console.log('')
  console.log('⚠️  IMPORTANT: This creates a user in the local database.')
  console.log('   If using Supabase Auth, you need to create the user via:')
  console.log('   1. Supabase Dashboard > Authentication > Users > Add User')
  console.log('   2. Or use the Supabase admin API')
  console.log('')
  console.log('🔧 For testing, you can also:')
  console.log('   1. Go to http://localhost:3000/register')
  console.log('   2. Register with email: teacher@test.com')
  console.log('   3. Use password: teacher123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
