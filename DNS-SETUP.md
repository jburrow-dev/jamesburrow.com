# Moving jamesburrow.com DNS from Namecheap to Cloudflare

Current state (checked 2026-10-26): Namecheap BasicDNS, parking page on `@` and `www`,
Namecheap email forwarding active (MX → eforward*.registrar-servers.com).

## 1. Note your email forwards (Namecheap)
Domain List → jamesburrow.com → Advanced DNS → **Mail Settings / Redirect Email**.
Write down each alias → destination (e.g. `hello@` → your inbox). These stop working
after step 3 until you recreate them in step 4.

## 2. Add the site to Cloudflare
dash.cloudflare.com → **Add a domain** → `jamesburrow.com` → **Free** plan.
Delete the imported parking-page `A`/`CNAME` records for `@` and `www` and the old
`eforward` MX/SPF records. Cloudflare then shows two nameservers (`xxx.ns.cloudflare.com`).

## 3. Point Namecheap at Cloudflare
Namecheap → Domain List → jamesburrow.com → **Nameservers: Custom DNS** → paste both
Cloudflare nameservers → save. Usually active within an hour (up to 24h).
Cloudflare emails you when the zone is **Active**.

## 4. Recreate email forwarding (Cloudflare Email Routing, free)
Cloudflare → jamesburrow.com → **Email → Email Routing** → enable (it adds the MX/SPF
records) → add the same aliases from step 1.

## 5. Attach the domain to the Worker
Uncomment `routes` in `wrangler.jsonc` (add `www.jamesburrow.com` too) and run
`npm run deploy`. Wrangler creates the DNS records and SSL cert automatically.
