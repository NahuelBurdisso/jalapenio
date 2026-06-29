# Deploy & DNS — jalapeno.studio

**Hosting:** Hostinger (static files, served from `public_html`).
**Registrar / DNS:** Hostinger.

This site is a static Astro build (`astro build` → `dist/`). We do **not** use Vercel:
its free tier only lets the project owner's commits deploy, so a second collaborator
can't ship without a paid seat. Instead, a GitHub Action builds the site and publishes
`dist/` to a `deploy` branch; Hostinger's Git integration clones that branch into
`public_html` (clone-only — it never builds). The Action runs under `GITHUB_TOKEN`, so
**any collaborator's push to `main` deploys** — no per-author restriction, no cost.

```
push to main → GitHub Action (build) → force-push dist/ to `deploy` branch
            → Hostinger Git pull → public_html → https://www.jalapeno.studio
```

---

## 1. GitHub Action (already in repo)

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to
the `deploy` branch. Nothing to configure — it uses the built-in `GITHUB_TOKEN`.
Check runs under the repo's **Actions** tab.

## 2. Hostinger — Git deployment (one-time)

hPanel → **Websites → jalapeno.studio → Advanced → GIT** (or "Git Version Control"):

1. **Repository:** `https://github.com/NahuelBurdisso/jalapenio` (add the deploy key
   Hostinger shows as a repo deploy key on GitHub if the repo is private).
2. **Branch:** `deploy`  ← the built output, **not** `main`.
3. **Directory:** `public_html` (site root).
4. Save. Use **Auto-Deploy / webhook** if offered so each `deploy`-branch update pulls
   automatically; otherwise hit "Deploy"/"Pull" after each Action run.

> Hostinger only **clones** — it does not run `npm`/builds. That's why the Action must
> publish the already-built `dist/` to `deploy`.

## 3. DNS — point back to Hostinger

hPanel → **Domains → jalapeno.studio → DNS / Nameservers → DNS records**. Keep
Hostinger nameservers; only edit records. Currently the records point at Vercel
(`A @ → 216.198.79.1`, `CNAME www → *.vercel-dns…`). Revert to Hostinger:

1. **Delete** the Vercel records: `A @ → 216.198.79.x` and `CNAME www → …vercel-dns…`.
2. **Set** `A @` → **your Hostinger hosting IP** (hPanel shows it on the website's
   overview / "Website details"; the previous Hostinger IP for this plan was
   `62.72.62.66` — confirm the current one before saving).
3. **Set** `A www` → the same Hostinger IP (or `CNAME www → jalapeno.studio`).
4. Re-add the `AAAA` IPv6 record only if Hostinger provides one for the plan.
5. Save. Propagation: minutes, up to ~24–48h. SSL auto-provisions in hPanel (or
   **SSL → install free certificate**).

Canonical host is **`https://www.jalapeno.studio`**; `public/.htaccess` 301-redirects
apex→www and http→https, so both resolve to the same canonical URL.

## 4. Turn off Vercel (stop the failing builds)

In the Vercel dashboard (Nahuel's team), either **disconnect the Git integration** on the
project or **delete the project**. Otherwise Vercel keeps trying (and failing) to deploy
every push and posts red checks on PRs. DNS no longer points at it, so it serves nothing.

## 5. Google Search Console

1. Add `https://www.jalapeno.studio/` as a property.
2. Meta-tag method: uncomment the verification line in `src/layouts/Base.astro`, paste the
   token, push to `main` (Action redeploys), then click **Verify**.
3. Submit `https://www.jalapeno.studio/sitemap-index.xml` under **Sitemaps**.

---

## Live verification checklist

- [ ] **Actions** tab shows the deploy workflow green; the `deploy` branch updated.
- [ ] Hostinger pulled it: `public_html` has the new `index.html` + `.htaccess`.
- [ ] `curl https://www.jalapeno.studio/ | grep "Sofía Herrero"` → real HTML content.
- [ ] `curl -I https://jalapeno.studio/` → `301` to `https://www.jalapeno.studio/`.
- [ ] `curl -I https://www.jalapeno.studio/_astro/<hashed>.js` → `Cache-Control: …immutable`.
- [ ] `curl -I https://www.jalapeno.studio/fondo.webp` → `Cache-Control: …max-age=604800`.
- [ ] Lighthouse (mobile) > 90 Performance / Accessibility / Best Practices / SEO.
- [ ] Link preview card renders in WhatsApp / X / LinkedIn (title, description, OG image).
- [ ] With JS disabled, the `<noscript>` block + section text are visible.
- [ ] `/sitemap-index.xml` and `/robots.txt` reachable.
- [ ] A push to `main` (from **either** collaborator) deploys within a few minutes.

## Performance note (Vercel → Hostinger)

No meaningful loss: the build is fully static, so all wins (WebP images, preloaded
self-hosted fonts, JS-free hero, lazy video, hashed-asset immutable caching via
`.htaccess`) are baked into the files and host-independent. The only things dropped are
Vercel-only: **Analytics** and **Speed Insights** (`@vercel/*` packages, removed). Add a
host-agnostic tool (Plausible / GA4 / Umami) later if metrics are needed — a `<script>`
slot is marked in `src/layouts/Base.astro`.

## Post-launch follow-ups

- **OG image:** `public/og-image.png` is a branded **placeholder**. Swap a final 1200×630.
- **Analytics (deferred):** none ships now; add Plausible/GA4 when wanted.
