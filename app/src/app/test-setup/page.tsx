/**
 * Setup Test Page
 *
 * Visual page to verify Prisma and Supabase configuration
 * Access at: http://localhost:3000/test-setup
 */

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { PrismaClient } from '@prisma/client'

// Prisma Client singleton for this page
const prisma = new PrismaClient()

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  details?: string
}

async function runTests(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test 1: Environment Variables
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const databaseUrl = process.env.DATABASE_URL

    if (!supabaseUrl || !supabaseAnonKey) {
      results.push({
        name: 'Environment Variables',
        status: 'fail',
        message: 'Missing Supabase credentials',
        details: 'NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set',
      })
    } else if (!databaseUrl) {
      results.push({
        name: 'Environment Variables',
        status: 'fail',
        message: 'Missing DATABASE_URL',
        details: 'DATABASE_URL not set in .env.local',
      })
    } else {
      results.push({
        name: 'Environment Variables',
        status: 'pass',
        message: 'All environment variables configured',
        details: `Supabase URL: ${supabaseUrl?.substring(0, 30)}...`,
      })
    }
  } catch (error) {
    results.push({
      name: 'Environment Variables',
      status: 'fail',
      message: 'Error reading environment',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test 2: Prisma Database Connection
  try {
    await prisma.$connect()
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    const tableCount = Array.isArray(tables) ? tables.length : 0
    const tableNames = Array.isArray(tables) 
      ? tables.map((t: any) => t.table_name).join(', ')
      : 'None'

    results.push({
      name: 'Prisma Database Connection',
      status: 'pass',
      message: `Connected successfully - ${tableCount} tables found`,
      details: `Tables: ${tableNames || 'No tables yet (run migrations)'}`,
    })

    await prisma.$disconnect()
  } catch (error) {
    results.push({
      name: 'Prisma Database Connection',
      status: 'fail',
      message: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test 3: Supabase Client Initialization
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase credentials')
    }

    // Validate URL format
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
      throw new Error('Invalid Supabase URL format')
    }

    // Validate anon key format
    if (!supabaseAnonKey.startsWith('eyJ')) {
      throw new Error('Invalid anon key format (should be JWT)')
    }

    results.push({
      name: 'Supabase Client',
      status: 'pass',
      message: 'Supabase client configured correctly',
      details: `URL: ${supabaseUrl}`,
    })
  } catch (error) {
    results.push({
      name: 'Supabase Client',
      status: 'fail',
      message: 'Supabase client configuration error',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test 4: Supabase Auth Connection
  try {
    const supabase = await getSupabaseServerClient()

    // Try to get session (will be null if not logged in, which is fine)
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error && error.message.includes('Invalid API key')) {
      throw new Error('Invalid Supabase API key')
    }

    results.push({
      name: 'Supabase Auth',
      status: 'pass',
      message: 'Supabase Auth service reachable',
      details: session
        ? `User logged in: ${session.user.email}`
        : 'No active session (this is normal)',
    })
  } catch (error) {
    results.push({
      name: 'Supabase Auth',
      status: 'fail',
      message: 'Supabase Auth connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // Test 5: Database Schema
  try {
    await prisma.$connect()
    
    // Check if required tables exist
    const requiredTables = ['users', 'quizzes', 'questions', 'question_options', 'student_responses', 'response_details']
    const existingTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    
    const existingTableNames = Array.isArray(existingTables) 
      ? existingTables.map((t: any) => t.table_name)
      : []
    
    const missingTables = requiredTables.filter(table => !existingTableNames.includes(table))
    
    if (missingTables.length === 0) {
      results.push({
        name: 'Database Schema',
        status: 'pass',
        message: 'All required tables exist',
        details: `Found: ${requiredTables.join(', ')}`,
      })
    } else {
      results.push({
        name: 'Database Schema',
        status: 'warning',
        message: `Missing ${missingTables.length} tables`,
        details: `Missing: ${missingTables.join(', ')}\nRun: npm run db:migrate`,
      })
    }

    await prisma.$disconnect()
  } catch (error) {
    results.push({
      name: 'Database Schema',
      status: 'fail',
      message: 'Could not check schema',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  return results
}

export default async function SetupTestPage() {
  const results = await runTests()
  
  const passCount = results.filter(r => r.status === 'pass').length
  const failCount = results.filter(r => r.status === 'fail').length
  const warningCount = results.filter(r => r.status === 'warning').length
  const totalCount = results.length

  const allPass = failCount === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="size-20 bg-gradient-to-br from-primary-base to-primary-hover rounded-2xl flex items-center justify-center shadow-xl shadow-primary-base/20">
              <span className="material-symbols-outlined text-4xl text-white">
                fact_check
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-text-primary mb-4">
            Setup Test Page
          </h1>
          <p className="text-lg text-text-secondary">
            Verify your Prisma and Supabase configuration
          </p>
        </div>

        {/* Summary Card */}
        <div className={`rounded-2xl p-6 mb-8 ${
          allPass 
            ? 'bg-gradient-to-br from-success-base to-success-light text-white' 
            : failCount > 0 
              ? 'bg-gradient-to-br from-error-base to-error-light text-white'
              : 'bg-gradient-to-br from-warning-base to-warning-light text-white'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-4xl">
              {allPass ? 'check_circle' : failCount > 0 ? 'error' : 'warning'}
            </span>
            <div>
              <h2 className="text-2xl font-bold">
                {allPass ? 'All Systems Operational!' : failCount > 0 ? 'Configuration Issues Found' : 'Mostly Ready'}
              </h2>
              <p className="text-white/80">
                {passCount}/{totalCount} tests passed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{passCount}</div>
              <div className="text-sm text-white/80">Passed</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{failCount}</div>
              <div className="text-sm text-white/80">Failed</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{warningCount}</div>
              <div className="text-sm text-white/80">Warnings</div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border-2 ${
                result.status === 'pass'
                  ? 'bg-bg-primary border-success-base'
                  : result.status === 'fail'
                    ? 'bg-bg-primary border-error-base'
                    : 'bg-bg-primary border-warning-base'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className={`material-symbols-outlined text-3xl flex-shrink-0 ${
                  result.status === 'pass'
                    ? 'text-success-base'
                    : result.status === 'fail'
                      ? 'text-error-base'
                      : 'text-warning-base'
                }`}>
                  {result.status === 'pass' ? 'check_circle' : result.status === 'fail' ? 'error' : 'warning'}
                </span>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {result.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    result.status === 'pass'
                      ? 'text-success-base font-medium'
                      : result.status === 'fail'
                        ? 'text-error-base font-medium'
                        : 'text-warning-base font-medium'
                  }`}>
                    {result.message}
                  </p>
                  {result.details && (
                    <p className="text-sm text-text-tertiary whitespace-pre-wrap">
                      {result.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        {failCount > 0 && (
          <div className="mt-8 rounded-2xl bg-bg-primary border-2 border-border-primary p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-base">lightbulb</span>
              Next Steps
            </h3>
            
            <div className="space-y-3 text-text-secondary">
              <p>
                <strong className="text-text-primary">1. Check your .env.local file:</strong>
                <br />
                Make sure you've updated the placeholder values with real Supabase credentials
              </p>
              
              <p>
                <strong className="text-text-primary">2. Get Supabase credentials:</strong>
                <br />
                Go to{' '}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  className="text-primary-base hover:text-primary-hover underline"
                >
                  supabase.com
                </a>{' '}
                → Settings → API
              </p>
              
              <p>
                <strong className="text-text-primary">3. Run database migrations:</strong>
                <br />
                <code className="bg-bg-tertiary px-2 py-1 rounded text-sm">
                  npm run db:migrate
                </code>
              </p>
              
              <p>
                <strong className="text-text-primary">4. Refresh this page:</strong>
                <br />
                After fixing configuration, reload to see updated results
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-text-tertiary">
          <p>Quizizz Clone - Setup Test Page</p>
          <p className="mt-1">Built with Next.js 16, Prisma 6, and Supabase</p>
        </div>
      </div>
    </div>
  )
}
