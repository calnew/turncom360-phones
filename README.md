# TurnCom360 â€” Plug & Play Phone Systems Microsite

Product microsite for TurnCom360 LLC. Drives traffic to the phone configurator at config.turncom360.com.

Built with [Eleventy](https://www.11ty.dev/). Deployed to [Cloudflare Pages](https://pages.cloudflare.com/) at `phones.turncom360.com`.

Scaffolded from the `calnew/empowering-minds` template.

---

## Stack

- Eleventy v3 â€” static site generator (Nunjucks templates)
- Google Fonts â€” DM Serif Display (heading) + Source Sans 3 (body), loaded via CDN
- Cloudflare Pages â€” hosting with auto-deploys from GitHub `main` branch
- Zero runtime JS dependencies on the client (vanilla JS only)

---

## Setup

```bash
# Clone
git clone https://github.com/calnew/turncom360-phones.git
cd turncom360-phones

# Install dependencies (Node 20+)
npm install

# Start dev server
npm start
# http://localhost:8080

# Production build
npm run build
# Output: ./_site/
```

---

## Cloudflare Pages deployment

In the Cloudflare dashboard:

1. Workers & Pages > Create > Pages > Connect to Git
2. Select `calnew/turncom360-phones`
3. Build settings:

   | Field                  | Value              |
   |------------------------|--------------------|
   | Framework preset       | Eleventy           |
   | Build command          | `npm run build`    |
   | Build output directory | `_site`            |
   | NODE_VERSION env var   | `20`               |

4. Save and deploy. First build ~2 minutes.
5. Live at `turncom360-phones.pages.dev`
6. Connect custom domain `phones.turncom360.com` via Custom domains tab in Cloudflare

---

## Pages

| URL             | Page                        |
|-----------------|-----------------------------|
| `/`             | Home                        |
| `/new-business/`| For New Businesses          |
| `/upgrading/`   | For Upgrading Businesses    |
| `/compare/`     | Compare (vs. competitors)   |
| `/404.html`     | 404                         |

---

## Content source of truth

All site data lives in `src/_data/site.json`:

- `site.name`, `site.tagline`, `site.description`
- `site.contact` â€” phone, email, configurator URL, schedule URL
- `site.address`
- `site.pricing` â€” three plan tiers (Basic / Pro / Elite)
- `site.testimonials` â€” four customer testimonials
- `site.nav_main` â€” top navigation
- `site.nav_footer_*` â€” footer navigation columns
- `site.social` â€” Facebook/YouTube/LinkedIn (Facebook and YouTube are `#` placeholders â€” TODO)

---

## TODO items (for content-editor)

1. Replace `site.social.facebook` and `site.social.youtube` from `#` to real URLs when available
2. Swap the video placeholder blocks on `/` and `/new-business/` with real YouTube embeds when Bill records the setup video
3. The Kareem Kanston testimonial has a TODO comment in markup â€” swap for a phone-specific quote when available
4. Replace favicon/icons with TurnCom360-specific versions (currently inherited from template)
5. Add an OG image to `/src/assets/img/social/og-default.jpg` branded for TurnCom360 Phones
6. Future pages: /how-it-works, /faq, /case-studies, /specs â€” add via content-editor in v2

---

## Credits

- Brief: Bill Turner, TurnCom360 LLC
- Built by: site-builder agent (TurnCom360 / calnew)
- Scaffolded from: calnew/empowering-minds template
- Typography: DM Serif Display + Source Sans 3 (Google Fonts, OFL)

---

## GitHub Codespaces setup

This repository is ready to work on from any computer with GitHub Codespaces.

### Open in Codespaces

1. Go to this repository on GitHub.
2. Click **Code**.
3. Open the **Codespaces** tab.
4. Click **Create codespace on main**.
5. Wait for the container setup to finish. The postCreateCommand installs dependencies automatically.

### Project type and tools

- Project type: Eleventy static site
- Runtime: Node.js 20
- Package manager: npm
- Hosting/deploy target: Cloudflare Pages/Workers where configured
- Main development command: npm start
- Main build/check command: npm run build

Cloudflare Pages deploys from GitHub. Build output: _site.

### Install dependencies

Codespaces runs this automatically when the container is created:

`ash
npm ci
`

If there is no package-lock.json, use:

`ash
npm install
`

### Run the app

`ash
npm start
`

Open the forwarded port from the Codespaces **Ports** panel.

### Test before committing

`ash
npm run build
`

### Commit and push changes

`ash
git status
git add .
git commit -m "Describe your change"
git push
`

After pushing, GitHub and Cloudflare will handle the configured build/deploy flow.

