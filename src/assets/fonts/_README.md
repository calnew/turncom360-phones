# Self-Hosted Fonts

This directory needs two font files that couldn't be downloaded during
the initial scaffold. Get them yourself — takes 60 seconds.

## Download commands

```bash
# From project root
cd src/assets/fonts

# Fraunces (serif display)
curl -L -o fraunces-variable.woff2 "https://fonts.bunny.net/fraunces/files/fraunces-latin-wght-normal.woff2"

# Outfit (sans body)
curl -L -o outfit-variable.woff2 "https://fonts.bunny.net/outfit/files/outfit-latin-wght-normal.woff2"
```

## Alternative: google-webfonts-helper

If bunny.net is unreachable, use https://gwfh.mranftl.com/fonts:

1. Search "Fraunces", select weights 400/500/600/700, download woff2 files
2. Search "Outfit", select weights 300/400/500/600/700, download woff2 files
3. Rename the variable font files to:
   - `fraunces-variable.woff2`
   - `outfit-variable.woff2`
4. Drop into this folder

## Fallback

If these files are missing, the site will gracefully fall back to system
fonts (Georgia / system-ui) via the `@font-face` declarations in
`src/assets/css/style.css`.
