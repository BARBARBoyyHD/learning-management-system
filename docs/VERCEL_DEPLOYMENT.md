# Vercel Deployment Guide - Quizizz Clone

## Quick Fix for Current Issue

Your deployment is failing because:
1. **Husky is running during deployment** - Fixed by making it skip when `.git` doesn't exist
2. **Using `.env.local`** - Environment variables must be configured in Vercel Dashboard

---

## Step-by-Step Deployment Setup

### 1. Configure Environment Variables in Vercel

Go to **Vercel Dashboard** → Select your project → **Settings** → **Environment Variables**

Add the following variables:

#### Required Variables

| Variable | Value Example | Environment |
|----------|---------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` (your anon key) | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://quizizz.vercel.app` | Production, Preview |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | Production, Preview |

#### How to Get Each Value

**Supabase URL & Anon Key:**
1. Go to https://app.supabase.com
2. Select your project
3. Click **Project Settings** (gear icon) → **API**
4. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Database URL (if using Supabase Database):**
1. Go to Supabase Dashboard → **Settings** → **Database**
2. Click **Connection string** tab
3. Copy the **URI** connection string
4. Replace `[YOUR-PASSWORD]` with your actual database password
5. Add as `DATABASE_URL` in Vercel

**App URL:**
- For Vercel deployments: `https://your-project-id.vercel.app`
- For custom domains: `https://quizizz.yourdomain.com`

---

### 2. Update `next.config.ts` for Vercel

Make sure your `next.config.ts` has proper production settings:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports if needed
  // output: 'export',
  
  // Optimize for production
  productionBrowserSpeedInsights: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
```

---

### 3. Database Migration in Production

Before deploying, you need to run database migrations in Vercel:

#### Option A: Run Migrations Automatically (Recommended)

Add a `postinstall` script to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate && prisma migrate deploy"
  }
}
```

This ensures migrations run automatically after `npm install` in Vercel.

#### Option B: Run Migrations Manually

After deployment, run migrations from your local machine:

```bash
# Set production database URL
export DATABASE_URL="postgresql://..."

# Run production migrations
npm run db:migrate:prod
```

Or use Vercel CLI:

```bash
vercel env pull .env.production.local
npm run db:migrate:prod
```

---

### 4. Redeploy

After making these changes:

```bash
# Commit and push changes
git add .
git commit -m "fix: update deployment configuration for Vercel"
git push

# Trigger new deployment
vercel --prod
```

Or simply push to your main branch - Vercel will auto-deploy.

---

## Troubleshooting

### Build Fails with "DATABASE_URL is not defined"

**Solution:** Make sure `DATABASE_URL` is added in Vercel Dashboard → Settings → Environment Variables

### Prisma Client Not Generated

**Solution:** Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Supabase Connection Errors

**Solutions:**
1. Check that Supabase project is active
2. Verify `NEXT_PUBLIC_SUPABASE_URL` has no trailing slash
3. Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is complete (starts with `eyJ`)
4. Check Supabase Dashboard → Authentication → Email templates for proper configuration

### 500 Error on First Load

**Solution:** This is normal - Vercel is cold-starting. Subsequent requests will be fast. If persistent:
- Check Vercel Functions logs in Dashboard
- Verify all environment variables are set
- Ensure database migrations have run

---

## Environment Variables Reference

### All Variables (Copy-Paste Ready)

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# Optional but Recommended
NEXT_PUBLIC_APP_NAME="Quizizz Clone"
NODE_ENV=production
NEXT_PUBLIC_DEBUG=false
```

### Variable Scopes

| Variable | Production | Preview | Development |
|----------|------------|---------|-------------|
| `NEXT_PUBLIC_*` | ✅ | ✅ | ✅ |
| `DATABASE_URL` | ✅ | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | ❌ |
| `NODE_ENV` | `production` | `preview` | `development` |

---

## Post-Deployment Checklist

- [ ] All environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] Supabase authentication working
- [ ] Test quiz creation flow
- [ ] Test student join flow
- [ ] Check Vercel Functions logs for errors
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)

---

## Useful Vercel Commands

```bash
# Link local project to Vercel
vercel link

# Pull environment variables from Vercel
vercel env pull

# View deployment logs
vercel logs

# View environment variables
vercel env list

# Promote preview deployment to production
vercel --prod
```

---

## Additional Resources

- [Vercel Next.js Deployment Docs](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Supabase Vercel Integration](https://supabase.com/docs/guides/getting-started/quickstarts/vercel)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deploy-to-vercel)

---

*Last updated: March 2026*
