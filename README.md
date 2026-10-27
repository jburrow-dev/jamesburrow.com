# jamesburrow.com

One-page portfolio/resume site: SEO and AI building work.

Static files in `public/`, served by Cloudflare Workers static assets. `src/index.js` 301-redirects http:// and www. to https://jamesburrow.com.

```bash
npm install
npm run dev      # local preview at http://localhost:8787
npm run deploy   # publish to Cloudflare
```

## Social share image

`og/og-card.html` is the source for `public/img/og-card.jpg` (1200×630, used for `og:image` and `twitter:image`). After editing it, re-render:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 --allow-file-access-from-files --screenshot=og-card.png "file://$PWD/og/og-card.html" && sips -s format jpeg -s formatOptions 85 og-card.png --out public/img/og-card.jpg && rm og-card.png
```
