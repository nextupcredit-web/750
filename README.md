# 757esthetics — Premium Website Rebrand

A full multi-page redesign for 757esthetics, moving off Wix onto a fast, animated
static site. Built with plain HTML/CSS/JS — no build step, no dependencies, works
on any static host (GitHub Pages, Netlify, Vercel, etc.).

## Pages
- `index.html` — Home (animated hero, "How a Visit Works", services preview, testimonials)
- `about.html` — Natasha Barjon's real story, philosophy, and credentials
- `services.html` — Full real service menu with pricing and real "Book Now" links
- `events.html` — Specials &amp; Spa Parties (seasonal offers, Master Esthetics scope)
- `gallery.html` — Studio photo gallery with lightbox
- `contact.html` — Booking (Calendly-ready), studio info, map, FAQ
- `privacy.html` / `terms.html` — Legal placeholders

## Design
Warm ivory/charcoal palette with a rose-gold accent, Cormorant Garamond display
serif + Jost body sans. Scroll-reveal animations, animated hero gradient blobs,
counters, testimonial slider, accordion FAQ, gallery lightbox, and a fully
responsive mobile hamburger menu with a slide-in nav panel.

## Real content sourced from a PDF export

`www.757esthetics.com` is blocked from this environment's network, so the first
pass of this site used placeholder content. The user then uploaded
`757esthetics-full-site.pdf` (a compiled export of the live site, done by a tool
with real access to it), and this rebuild was updated with the **real** business
details found in it:

- Owner: **Natasha Barjon** — Licensed Esthetician, NCEA Certified, ASCP Member,
  Navy Veteran, Lean Six Sigma Black Belt. Real bio/philosophy (the 80/20 rule,
  virtual consultations) is now in `about.html`.
- Real address: 4304 Holland Rd Shopping Plaza Center, Luxe Luv Studios #2,
  Virginia Beach, VA 23452.
- Real phone: 757-550-0177. Real email: admin@757esthetics.com.
- Real Instagram (@757esthetics) and LinkedIn (nbarjon) — linked in the header,
  footer, and mobile nav.
- Real service menu &amp; pricing in `services.html` (Consultations, Facials, Boosters,
  Pre-Consultation-required treatments), each "Book Now" linking to that
  service's real page on the live Wix site (e.g.
  `https://www.757esthetics.com/service-page/first-time-client-facial`).
- Real booking &amp; cancellation policy (12-hour notice) and the Accutane
  clearance notice, shown on `services.html` and in the `contact.html` FAQ.
- Real promo codes: `NEWSPA20` (20% off first service) and `newcustomer15`
  (first product order).
- Real photos, hotlinked directly from Natasha's own Wix media CDN
  (`static.wixstatic.com`) — used for the hero portrait, About page portrait,
  and gallery. The PDF only exposed these as clickable image buttons (no
  visible thumbnails), so which URL matched which caption was inferred from
  the order they appeared in the source file and each file's naming pattern.
  This environment's network policy also blocks `static.wixstatic.com`, so
  these could not be visually verified before publishing — **do a quick visual
  check of `index.html`, `about.html`, and `gallery.html` once live**, and swap
  any mismatched image via its `src` attribute if needed.

## Still placeholder / needs a decision

1. **Testimonials** (`index.html`) — the PDF didn't include client reviews, so
   these are still placeholder quotes. Replace with real ones (with permission).
2. **Facebook/TikTok** — not confirmed in the source PDF, so those icons were
   removed rather than guessed. Add them back (in the header/footer/mobile nav
   `<div class="footer-social">` / `mobile-nav-social` blocks) if Natasha has them.
3. **Shop, Gift Cards, Loyalty, Blog** — these are real sections of the live
   site (real URLs: `/category/all-products`, `/gift-card`, `/loyalty`,
   `/blog`) but each depends on a Wix app (Wix Stores, Wix Loyalty) that
   doesn't port to a static site as-is. For now, `events.html` links out to the
   real shop URL for the `newcustomer15` code; Gift Cards/Loyalty/Blog aren't
   rebuilt. Worth a follow-up conversation about whether to keep those on Wix,
   link out to them, or replace with a different platform.
4. **Live booking calendar (Calendly)** — the Contact page is wired up so
   Natasha can manage her own availability from her phone and get an email the
   instant someone books. To activate it:
   1. Natasha creates a free account at calendly.com with her own email and
      connects her phone's calendar (so it blocks off busy times automatically).
   2. She sets up her event type (e.g. "Skin Consultation" or "First Time
      Client Facial") and copies its scheduling link (looks like
      `https://calendly.com/her-name/consultation`).
   3. Paste that link into `assets/js/config.js` as `calendlyUrl`. That's the
      only change needed — the calendar widget will automatically appear on
      the Contact page above the request form.
   Until that link is added, the site shows the "Request an Appointment" form
   below as a working fallback (it displays a confirmation message on submit,
   but doesn't send anywhere yet).
5. **Map embed** — `contact.html` points to the real address via a public
   Google Maps search-embed URL (no API key needed); swap in an official
   Google My Business embed if Natasha has one claimed.

## Local preview
Just open `index.html` in a browser, or serve the folder with any static
server, e.g. `python3 -m http.server`.
