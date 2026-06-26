# Deploy & DNS — jalapeno.studio

**Hosting:** Vercel (native Git deploy). **Registrar / DNS:** Hostinger (unchanged).

This site is a static Astro build (`astro build` → `dist/`). Vercel auto-detects Astro
and serves `dist/` — no adapter, no server. Pushing to `main` builds and deploys to
production; pull requests get preview URLs. That Git auto-deploy **is** the CI/CD hook
that replaced the old Hostinger `deploy`-branch workflow.

> The steps below are **manual** (dashboard clicks + DNS) — they can't be done from the
> repo. Do them in order. Keep Hostinger serving the old site until Vercel is live, then
> cut over, to avoid downtime.

---

## 1. Vercel — import the project (one-time)

1. Go to vercel.com → **Add New… → Project** → import the GitHub repo
   `NahuelBurdisso/jalapenio`.
2. **Framework Preset:** Astro (auto-detected). Build command `astro build`, output
   directory `dist`. Leave the rest default.
3. Deploy. Confirm the generated `*.vercel.app` URL serves the site correctly
   (hero WebGL, smooth scroll, all sections).

## 2. Vercel — add the domain

1. Project → **Settings → Domains** → add `jalapeno.studio` **and** `www.jalapeno.studio`.
2. Pick a primary (recommended: apex `jalapeno.studio`) and let Vercel set `www` to
   redirect to it.
3. Vercel will show the exact DNS records to add — they should match step 3 below.

## 3. Hostinger — point DNS at Vercel

hPanel → **Domains → jalapeno.studio → DNS / Nameservers → DNS records**:

1. **Remove** the old `A` record(s) for `@` that point to Hostinger hosting (and any old
   `www` record that points to Hostinger).
2. Add:  `A`  `@`  →  `76.76.21.21`
3. Add:  `CNAME`  `www`  →  `cname.vercel-dns.com`
4. Save. Propagation is usually minutes, but can take up to ~24–48h.
5. Once DNS resolves, Vercel auto-provisions SSL (HTTPS). No action needed.

> Registrar stays Hostinger — we are **not** transferring the domain or changing
> nameservers, only the records. Fully reversible.

## 4. Retire the old Hostinger hosting

1. hPanel → **disable / remove the Git auto-deploy integration** on `public_html` so it
   stops cloning and serving the stale `deploy` branch.
2. After Vercel is confirmed serving production at `https://jalapeno.studio/`, delete the
   now-unused deploy branch:
   ```bash
   git push origin --delete deploy
   ```
   (Do this **last** — it is the final cutover action.)

## 5. Google Search Console

1. Add `https://jalapeno.studio/` as a property (URL-prefix or Domain).
2. For the meta-tag method: uncomment the verification line in
   `src/layouts/Base.astro` and paste the token:
   ```html
   <meta name="google-site-verification" content="YOUR_TOKEN" />
   ```
   Commit + push (Vercel redeploys), then click **Verify**.
3. Submit `https://jalapeno.studio/sitemap-index.xml` under **Sitemaps**.

---

## Live verification checklist

- [ ] `curl https://jalapeno.studio/ | grep "Sofía Herrero"` → returns real HTML content
- [ ] View-source shows all section copy without running JS
- [ ] Lighthouse (mobile) > 90 in Performance, Accessibility, Best Practices, SEO
- [ ] Paste the link in WhatsApp / Twitter-X / LinkedIn → preview card renders (title,
      description, OG image)
- [ ] Google **Mobile-Friendly / Rich Results** test passes; JSON-LD validates
- [ ] With JS disabled, the `<noscript>` block + all section text are visible
- [ ] `https://jalapeno.studio/sitemap-index.xml` and `/robots.txt` are reachable
- [ ] `www.jalapeno.studio` redirects to the apex (or your chosen primary)
- [ ] Pushing a commit to `main` triggers a Vercel production deploy; opening a PR
      produces a preview URL

## Post-launch follow-ups (tracked)

- **Replace the OG image:** `public/og-image.png` is a branded **placeholder** (Arial,
  not the Anton brand font). Swap in a final 1200×630 asset when ready.
- **Confirm contact details:** verify `SITE.email` and `SITE.sameAs` (social links) in
  `src/lib/seo.ts` are correct before relying on the JSON-LD / noscript contact info.
- **Analytics (deferred):** no analytics JS ships yet. Add GA4 or Plausible/Fathom later;
  if adding a strict CSP via Vercel/Astro, test that it doesn't break the `is:inline`
  scripts or WebGL.
- **Content pass (deferred):** copy rewrite, value proposition, portfolio metrics, and
  services + pricing were intentionally out of scope for this migration.
