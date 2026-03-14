/**
 * Test Mayar API Connection
 * 
 * Run this to verify your Mayar API credentials are working
 * Usage: node scripts/test-mayar.js
 */

// Load environment variables from .env file
require('dotenv').config({ path: '.env' })

const MAYAR_API_KEY = process.env.MAYAR_API_KEY
const MAYAR_BASE_URL = 'https://api.mayar.club/hl/v1'

async function testMayarAPI() {
  console.log('Testing Mayar API connection...\n')
  console.log('Environment:', process.env.NODE_ENV || 'development')
  console.log('Base URL:', MAYAR_BASE_URL)
  console.log('API Key present:', !!MAYAR_API_KEY)
  console.log('API Key length:', MAYAR_API_KEY?.length || 0)
  console.log('API Key starts with "eyJ":', MAYAR_API_KEY?.startsWith('eyJ'))
  console.log()

  // Test with different authentication methods
  const authMethods = [
    { name: 'Bearer token', headers: { 'Authorization': `Bearer ${MAYAR_API_KEY}` } },
    { name: 'Direct token', headers: { 'Authorization': MAYAR_API_KEY } },
    { name: 'X-API-Key', headers: { 'X-API-Key': MAYAR_API_KEY } },
  ]

  for (const auth of authMethods) {
    console.log(`\n=== Testing: ${auth.name} ===`)
    try {
      const response = await fetch(`${MAYAR_BASE_URL}/product`, {
        method: 'GET',
        headers: {
          ...auth.headers,
          'Accept': 'application/json',
        },
      })

      console.log('Status:', response.status, response.statusText)
      if (response.ok) {
        const data = await response.json()
        console.log('✓ SUCCESS! Response:', JSON.stringify(data, null, 2))
        console.log(`\n🎉 Use this auth method: ${auth.name}`)
        return
      } else {
        const errorData = await response.json()
        console.log('✗ Failed:', JSON.stringify(errorData, null, 2))
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  console.log('\n\n❌ All authentication methods failed.')
  console.log('\nNext steps:')
  console.log('1. Go to https://web.mayar.club/api-keys')
  console.log('2. Delete your current API key')
  console.log('3. Create a NEW API key')
  console.log('4. Make sure to register your domain: http://localhost:3000')
  console.log('5. Copy the new API key to your .env file')
}

testMayarAPI().catch(console.error)
