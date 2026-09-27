# 757 Esthetics — Premium Website Rebrand

A full multi-page redesign for 757 Esthetics, moving off Wix onto a fast, animated
static site. Built with plain HTML/CSS/JS — no build step, no dependencies, works
on any static host (GitHub Pages, Netlify, Vercel, etc.).

## Pages
- `index.html` — Home (animated hero, services preview, testimonials, stats)
- `about.html` — Natasha's story, philosophy, timeline
- `services.html` — Full treatment menu with pricing
- `events.html` — Upcoming/past studio events with filtering
- `gallery.html` — Studio photo gallery with lightbox
- `contact.html` — Booking request form, studio info, map, FAQ
- `privacy.html` / `terms.html` — Legal placeholders

## Design
Warm ivory/charcoal palette with a rose-gold accent, Cormorant Garamond display
serif + Jost body sans. Scroll-reveal animations, animated hero gradient blobs,
counters, testimonial slider, accordion FAQ, filterable events, gallery lightbox,
and a fully responsive mobile hamburger menu with a slide-in nav panel.

## ⚠️ Before this goes live — real content needed

This build could not pull content from the live 757esthetics.com (that domain
is blocked from this environment), so the following is **placeholder** and must
be swapped in by Natasha before launch:

1. **Photos** — all images currently use generic `picsum.photos` placeholders.
   Replace with Natasha's real studio, portrait, and treatment photos
   (`assets/img/` is set up for this — drop files in and update `src` paths).
2. **Bio / story** — `about.html` has a plausible-but-invented founder story.
   Replace with Natasha's real background, credentials, and journey.
3. **Services & pricing** — `services.html` lists common esthetics services
   with sample pricing. Confirm exact treatment names, durations, and prices.
4. **Events** — `events.html` has sample event listings. Replace with real
   dates/details, or wire up to a real events/calendar source.
5. **Contact info** — phone, email, and address in the footer/contact page are
   placeholders (`(757) 555-0757`, `hello@757esthetics.com`, `757 Studio Lane`).
6. **Social links** — Instagram/Facebook/TikTok icons currently link to `#`.
   Add Natasha's real profile URLs (search for `aria-label="Instagram"` etc.
   across the HTML files).
7. **Live booking calendar (Calendly)** — the site is wired up for Calendly so
   Natasha can manage her own availability from her phone and get an email the
   instant someone books. To activate it:
   1. Natasha creates a free account at calendly.com with her own email and
      connects her phone's calendar (so it blocks off busy times automatically).
   2. She sets up her event type (e.g. "Skin Consultation" or "Book a Facial")
      and copies its scheduling link (looks like `https://calendly.com/her-name/consultation`).
   3. Paste that link into `assets/js/config.js` as `calendlyUrl`. That's the
      only change needed — the calendar widget will automatically appear on
      the Contact page above the request form.
   Until that link is added, the site shows the "Request an Appointment" form
   below as a working fallback (it displays a confirmation message on submit,
   but doesn't send anywhere yet — see note in that form).
8. **Testimonials** — replace the placeholder quotes in `index.html` with real
   client reviews (with permission).
9. **Map embed** — the Google Maps embed in `contact.html` currently points to
   a generic "Hampton Roads, VA" search; update with the exact studio address.

## Local preview
Just open `index.html` in a browser, or serve the folder with any static
server, e.g. `python3 -m http.server`.
