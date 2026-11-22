# Deploying SERK Technologies Group ($0/month Architecture)

This document provides step-by-step instructions for deploying the SERK Technologies Group website and "Edit Everything" Admin Panel on a permanent **$0/month stack**:
- **Hosting:** [Render](https://render.com) (Free Web Service)
- **Database:** [Neon](https://neon.tech) (Free Serverless PostgreSQL with permanent persistence)
- **Media CDN:** [Cloudinary](https://cloudinary.com) (Free 25 GB/month media storage)
- **Email Delivery:** [Resend](https://resend.com) (Free 3,000 emails/month for lead alerts)

---

## 1. Setup Neon PostgreSQL Database (2 minutes)
1. Sign up at [neon.tech](https://neon.tech).
2. Create a new project (e.g. `serk-technologies`).
3. Under **Dashboard > Connection Details**, select **Prisma** or **PostgreSQL**.
4. Copy the connection string. It will look like:
   ```
   postgresql://<user>:<password>@<endpoint>.neon.tech/neondb?sslmode=require
   ```
5. Save this as your `DATABASE_URL`.

---

## 2. Setup Cloudinary Media CDN (2 minutes)
1. Sign up at [cloudinary.com](https://cloudinary.com).
2. On your **Dashboard**, copy the **API Environment variable**:
   ```
   cloudinary://<api_key>:<api_secret>@<cloud_name>
   ```
3. Or note your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
4. Save this as your `CLOUDINARY_URL`.

---

## 3. Setup Resend Email for Lead Alerts (2 minutes)
1. Sign up at [resend.com](https://resend.com).
2. Under **API Keys**, click **Create API Key** (Permissions: Full access).
3. Copy the key (starts with `re_...`).
4. Save this as your `RESEND_API_KEY`.
*(All inquiries submitted on `/contact` will automatically forward alerts to `serktechgroup@gmail.com`).*

---

## 4. Deploy to Render via Blueprint (3 minutes)

### Option A: Using `render.yaml` Blueprint (Recommended)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Next.js full-stack enterprise refactor"
   git push origin main
   ```
2. Log into [dashboard.render.com](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your `serk-technologies-group` GitHub repository.
5. Render will automatically detect `render.yaml`.
6. Fill in the prompted secret variables:
   - `DATABASE_URL`: Your Neon connection string with `?sslmode=require`.
   - `CLOUDINARY_URL`: Your Cloudinary connection string.
   - `RESEND_API_KEY`: Your Resend API key.
   - `ADMIN_PASSWORD`: A secure password for `/admin`.
7. Click **Apply**. Render will run:
   ```bash
   npm install && npx prisma generate && npx prisma db push && npm run build
   ```
8. Once built, open your Render URL (e.g. `https://serk-technologies-group.onrender.com`).

---

## 5. Seed Initial Data
Once your app is deployed and connected to Neon, seed the database with all 23 verified SERK dossiers, theme tokens, and default pages:
1. In the Render Dashboard, open your web service and click **Shell**.
2. Run:
   ```bash
   npm run db:seed
   ```
3. All verified SERK content, product maturity badges, and initial settings will be populated into Neon.

---

## 6. Access the Admin Control Panel
Navigate to:
```
https://<your-render-url>/admin
```
- **Email:** `admin@serkgroup.com` (or your configured `ADMIN_EMAIL`)
- **Password:** Your configured `ADMIN_PASSWORD` (default: `SerkAdmin2026!`)

From `/admin`, you can:
- **Design Studio:** Dynamically update colors, fonts, border-radius, and toggle 1-row vs 2-row navigation.
- **Projects & Ventures:** Add, update, or reclassify any of the 23 software dossiers.
- **Leads Inbox:** Review demo requests, manage sales pipeline, and export leads to CSV.
- **Cloud Gallery:** Upload new photos directly to Cloudinary CDN.
- **Settings:** Download a one-click full database JSON backup or restore from archive.

---

## 7. Render Free Tier Keep-Alive (Preventing Cold Starts)
Render free services sleep after 15 minutes of inactivity. To keep your site running fast with zero cold starts at $0/month:
1. Create a free account at [cron-job.org](https://cron-job.org) or [uptimerobot.com](https://uptimerobot.com).
2. Set up a free ping every 10 minutes to:
   ```
   https://<your-render-url>/api/health
   ```
3. This endpoint returns `{ status: "ok" }` in less than 50ms and keeps your service warm 24/7.
