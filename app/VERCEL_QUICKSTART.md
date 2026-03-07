# 🚀 Vercel Deployment - Quick Start

## Problem Fixed

The deployment was failing because:
1. ❌ **Husky** was trying to run during Vercel build (no `.git` directory)
2. ❌ **Environment variables** were in `.env.local` (not available in Vercel)

## ✅ What Was Fixed

### 1. Husky Prepare Script
Updated to skip when `.git` doesn't exist (like in Vercel builds):

```json
{
  "scripts": {
    "prepare": "node -e \"if (require('fs').existsSync('.git')) { require('child_process').execSync('husky', { stdio: 'inherit' }) }\" || true"
  }
}
```

### 2. Database Scripts
Removed `dotenv -e .env.local` dependency - now uses standard environment variables:

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "postinstall": "prisma generate"
  }
}
```

### 3. Postinstall Hook
Added automatic Prisma Client generation during deployment.

---

## 📋 Deployment Checklist

### Step 1: Configure Environment Variables in Vercel

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add these **4 required variables**:

| Variable | Where to Get It | Example |
|----------|-----------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key | `eyJhbG...` |
| `DATABASE_URL` | Supabase Dashboard → Settings → Database → Connection string | `postgresql://...` |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | `https://your-app.vercel.app` |

### Step 2: Push Changes

```bash
git add .
git commit -m "fix: update deployment configuration for Vercel"
git push origin main
```

Vercel will automatically deploy.

### Step 3: Run Database Migrations

After the deployment completes, run migrations:

**Option A - From your local machine:**
```bash
# Get production DATABASE_URL from Vercel Dashboard
vercel env pull .env.production.local
npm run db:migrate:prod
```

**Option B - Add to Vercel deployment** (recommended):
The `postinstall` script now runs `prisma generate` automatically.
For migrations, you can add a deployment hook or run manually.

---

## 🔧 Troubleshooting

### Build Still Fails?

1. Check **Vercel Dashboard** → **Deployments** → Click failed deployment → **View Build Logs**
2. Look for missing environment variables
3. Ensure all 4 required variables are set for **Production** environment

### Database Errors?

```bash
# Verify database connection locally
vercel env pull .env.production.local
npx prisma db pull

# Test migration
npx prisma migrate deploy
```

### Supabase Connection Errors?

- Ensure Supabase project is **active** (not paused)
- Check that `NEXT_PUBLIC_SUPABASE_URL` has **no trailing slash**
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is **complete** (starts with `eyJ`)

---

## 📚 Full Documentation

- **Complete deployment guide:** [`/docs/VERCEL_DEPLOYMENT.md`](./docs/VERCEL_DEPLOYMENT.md)
- **Environment variables reference:** [`/app/.env.example`](./app/.env.example)

---

## ⚡ Quick Commands Reference

```bash
# Link project to Vercel
vercel link

# Pull environment variables from Vercel
vercel env pull

# View deployment logs
vercel logs

# Deploy to production
vercel --prod
```

---

**Need help?** Check the full deployment guide at [`/docs/VERCEL_DEPLOYMENT.md`](./docs/VERCEL_DEPLOYMENT.md)
