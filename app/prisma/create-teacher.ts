/**
 * Create Test Teacher via Supabase Admin API
 *
 * This creates a teacher account in Supabase Auth with known credentials.
 * Run with: npx dotenv-cli -e .env.local -- npx tsx prisma/create-teacher.ts
 */

import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating test teacher account in Supabase...')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    console.error('   Need: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  // Create Supabase admin client
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const email = 'teacher@test.com'
  const password = 'teacher123'

  // Check if user already exists
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
  const existingTeacher = existingUsers.users.find(u => u.email === email)

  if (existingTeacher) {
    console.log('✅ Test teacher already exists in Supabase:', email)
    console.log('📝 Login credentials:')
    console.log('   Email:', email)
    console.log('   Password:', password)
    
    // Ensure user exists in local database too
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: existingTeacher.id,
        name: 'Test Teacher',
        email,
        role: 'teacher',
      },
    })
    
    return
  }

  // Create user in Supabase Auth
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm email
    user_metadata: {
      name: 'Test Teacher',
      role: 'teacher',
    },
  })

  if (error) {
    console.error('❌ Failed to create user:', error.message)
    process.exit(1)
  }

  console.log('✅ Created test teacher in Supabase:', data.user.id)
  console.log('📝 Login credentials:')
  console.log('   Email:', email)
  console.log('   Password:', password)

  // Also create in local database
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      id: data.user.id,
      name: 'Test Teacher',
      email,
      role: 'teacher',
    },
  })

  console.log('✅ Also created in local database')
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
