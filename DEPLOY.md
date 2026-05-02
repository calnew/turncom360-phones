# Deploying to Cloudflare Pages — Step by Step

Total time: ~20 minutes.

## Before you begin

You need:
- A GitHub account (`calnew` in your case)
- A Cloudflare account (same one you use for MemberReel and TurnCom360)
- Git installed locally

---

## Step 1 — Push the code to GitHub

```bash
# From the project root (where this file lives)

# Create the repo on GitHub first:
# go to https://github.com/new
#   - Name: empowering-minds
#   - Owner: calnew
#   - Private: yes
#   - Do NOT initialize with README (we have one)

# Then connect this folder to it:
git init
git add .
git commit -m "Initial commit — full Eleventy site with SEO, SVG illustrations, HIPAA security headers"
git branch -M main
git remote add origin https://github.com/calnew/empowering-minds.git
git push -u origin main
```

---

## Step 2 — Download the fonts

```bash
cd src/assets/fonts
curl -L -o fraunces-variable.woff2 "https://fonts.bunny.net/fraunces/files/fraunces-latin-wght-normal.woff2"
curl -L -o outfit-variable.woff2 "https://fonts.bunny.net/outfit/files/outfit-latin-wght-normal.woff2"
cd ../../..

git add src/assets/fonts/*.woff2
git commit -m "Add self-hosted font files"
git push
```

**Note:** The GitHub Action workflow will also attempt to download these on every build as a fallback, but committing them locally guarantees they're always there.

---

## Step 3 — Create the Cloudflare Pages project

1. Go to https://dash.cloudflare.com → **Workers & Pages**
2. Click **Create** → **Pages** tab → **Connect to Git**
3. Choose **GitHub** → authorize Cloudflare if prompted
4. Select the `calnew/empowering-minds` repository
5. Click **Begin setup**

## Step 4 — Configure build settings

| Setting | Value |
|---|---|
| Project name | `empowering-minds` |
| Production branch | `main` |
| Framework preset | **Eleventy** |
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory (advanced) | (leave blank) |

### Environment variables
Click **Add variable** and add:
- `NODE_VERSION` = `20`

Click **Save and Deploy**.

---

## Step 5 — Watch the first build

The first deploy takes about 1-2 minutes. You'll see:
- ✅ Install dependencies (30s)
- ✅ Build Eleventy site (10s)
- ✅ Deploy to Cloudflare edge (30s)

When done, you get a URL like:
**`https://empowering-minds.pages.dev`**

Visit it → the full site loads. Click through every page to verify.

---

## Step 6 — Verify security headers

Open the live site in your browser, press F12, go to the **Network** tab, reload, click on the main page request, then look at **Response Headers**. You should see:

```
content-security-policy: default-src 'self' 'unsafe-inline'; ...
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

All present → you're good.

---

## Step 7 — Test the sitemap

Visit `https://empowering-minds.pages.dev/sitemap.xml` → should list all 16 public pages with the correct URLs.

Visit `https://empowering-minds.pages.dev/robots.txt` → should show the allow/disallow rules.

---

## Step 8 — Connect the custom domain (when ready)

Once `empoweringmindsnc.com` is registered:

1. Go to your Pages project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter `empoweringmindsnc.com` → **Continue**
4. If the domain uses Cloudflare DNS, it configures automatically
5. SSL certificate provisions in ~2 minutes
6. Repeat for `www.empoweringmindsnc.com` (sets up the www → apex redirect automatically)

---

## Step 9 — Ongoing updates

Every time you push to GitHub `main`, Cloudflare Pages automatically rebuilds and redeploys:

```bash
# Edit content in src/...
git add .
git commit -m "Update job postings"
git push
# ~30 seconds later: changes are live
```

---

## Troubleshooting

**Build fails with font errors**
- Check that `src/assets/fonts/fraunces-variable.woff2` and `outfit-variable.woff2` exist in the repo
- If the GitHub Action workflow `npm run build` succeeds locally but Cloudflare fails, try adding a dummy env var change and redeploy to invalidate cache

**Pages deploy but CSS/fonts don't load**
- Check browser DevTools Console for errors
- Verify the `_headers` file is being respected (should see in response headers)

**Homepage loads but internal links 404**
- This happens if `permalink` front matter is missing on a page
- Check that each `.njk` in `src/` has `permalink: /whatever/` in its front matter

**SVG illustrations don't show**
- Check that `src/assets/img/illustrations/*.svg` were committed
- `git status` should show no untracked files

---

## Next steps after launch

1. **Submit sitemap to Google Search Console:**
   - Go to https://search.google.com/search-console
   - Add property: `empoweringmindsnc.com`
   - Verify ownership (TXT record or HTML file)
   - Sitemaps → Add: `sitemap.xml`

2. **Create Google Business Profile:**
   - https://business.google.com
   - Verify physical address
   - Link to website
   - This drives local search results dramatically for healthcare providers

3. **Test Schema.org markup:**
   - https://search.google.com/test/rich-results
   - Paste your homepage URL
   - Should show `MedicalOrganization` + `LocalBusiness` detected

4. **Build the forms Worker** (separate project):
   - See the companion worker project for handling contact/apply/internal form submissions via Resend

5. **Replace all placeholders** — see README.md "Placeholders to replace before launch"
