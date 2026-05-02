# TurnCom360 — Plug & Play Phone Systems Microsite

Product microsite for TurnCom360 LLC. Drives traffic to the phone configurator at config.turncom360.com.

Built with [Eleventy](https://www.11ty.dev/). Deployed to [Cloudflare Pages](https://pages.cloudflare.com/) at `phones.turncom360.com`.

Scaffolded from the `calnew/empowering-minds` template.

---

## Stack

- Eleventy v3 — static site generator (Nunjucks templates)
- Google Fonts — DM Serif Display (heading) + Source Sans 3 (body), loaded via CDN
- Cloudflare Pages — hosting with auto-deploys from GitHub `main` branch
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
- `site.contact` — phone, email, configurator URL, schedule URL
- `site.address`
- `site.pricing` — three plan tiers (Basic / Pro / Elite)
- `site.testimonials` — four customer testimonials
- `site.nav_main` — top navigation
- `site.nav_footer_*` — footer navigation columns
- `site.social` — Facebook/YouTube/LinkedIn (Facebook and YouTube are `#` placeholders — TODO)

---

## TODO items (for content-editor)

1. Replace `site.social.facebook` and `site.social.youtube` from `#` to real URLs when available
2. Swap the video placeholder blocks on `/` and `/new-business/` with real YouTube embeds when Bill records the setup video
3. The Kareem Kanston testimonial has a TODO comment in markup — swap for a phone-specific quote when available
4. Replace favicon/icons with TurnCom360-specific versions (currently inherited from template)
5. Add an OG image to `/src/assets/img/social/og-default.jpg` branded for TurnCom360 Phones
6. Future pages: /how-it-works, /faq, /case-studies, /specs — add via content-editor in v2

---

## Credits

- Brief: Bill Turner, TurnCom360 LLC
- Built by: site-builder agent (TurnCom360 / calnew)
- Scaffolded from: calnew/empowering-minds template
- Typography: DM Serif Display + Source Sans 3 (Google Fonts, OFL)
