import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client Singleton
 * 
 * Prevents multiple instances of Prisma Client during development
 * with Hot Module Replacement (HMR) or Turbopack.
 * 
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Graceful shutdown for serverless environments
 * Call this in your server shutdown hook
 */
export async function gracefulShutdown() {
  await prisma.$disconnect()
}
