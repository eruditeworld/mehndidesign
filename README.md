# Manish Mehndi Artist — Website

A premium, cinematic, mobile-first static website for **Manish Mehndi Artist**
(bridal & wedding mehndi artist, Hazratganj, Lucknow). Built with plain
HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

This is the **fourth** mehndi-artist site built for MB Creatives clients, and
was deliberately given a different visual identity from the earlier three:
a dark cinematic "wedding studio" palette (charcoal, ivory, burnt copper,
antique gold) with bold editorial type and a dedicated photo + video
portfolio, rather than the burgundy/luxury, earthy/traditional or
ivory/editorial looks used previously.

## Folder structure

```
manish-mehndi-artist/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── images/
│   │   ├── hero/            hero + final CTA photographs
│   │   ├── about/            artist portrait
│   │   ├── gallery/           photo portfolio
│   │   └── video-thumbnails/  video poster images
│   └── videos/               mp4 video files go here
├── favicon/favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Before going live — verify with the client

Every one of these appears in `index.html` as an HTML comment
(`<!-- EDITABLE CLIENT DETAIL -->` or `<!-- REPLACE WITH CLIENT PHOTO -->`)
so they're easy to find and replace. **Nothing below was invented — these
are placeholders on purpose.**

- Artist biography, years of experience, specialization
- Number of brides / clients served
- Confirmed services and pricing
- Bridal package names and details
- Real client testimonials (do not add a testimonial that wasn't actually given)
- Instagram, Facebook, YouTube, Google Business Profile links
- Email address
- Working hours, booking policy, cancellation policy
- Service area, travel charges
- Artist photo, gallery photos, gallery videos
- Confirmed Google Maps embed (a generic embed is in place using the address)

The confirmed details already in the code: business name, tagline, phone/
WhatsApp number (9005827403), and the Hazratganj, Lucknow address.

## Replacing placeholder photos

All hero, about and gallery images are currently palette-matched SVG
placeholders generated for this build (not stock photography), clearly
labeled "REPLACE WITH CLIENT PHOTO" in the code. To swap in a real photo,
just replace the file at the same path and keep the same filename, e.g.:

```
assets/images/gallery/bridal-01.svg  →  assets/images/gallery/bridal-01.jpg
```
(and update the one `src` attribute in `index.html` to match the new
extension).

## Adding real videos

The video section is wired to a lightweight modal player that needs **no
JavaScript changes** when you swap content. For each of the 3 demo video
cards in `index.html`, do three things:

1. Add the real video file to `assets/videos/` (e.g. `mehndi-video-01.mp4`)
2. Add a matching thumbnail to `assets/images/video-thumbnails/`
3. Update the card's `data-video-src`, `data-video-poster`, title and
   description text

Demo `.mp4.placeholder` files are included in `assets/videos/` as empty
stand-ins showing where real files should go — rename/replace them with
actual `.mp4` files. Until real videos are added, clicking a video card
will show a small on-screen note instead of playing anything broken.

Videos never autoplay, always show `preload="metadata"`, and pause
automatically when the modal is closed.

## Tech notes

- No frameworks: HTML5 + CSS3 + vanilla JS only
- Deployable as-is to GitHub Pages, Cloudflare Pages, Netlify or Vercel
- Fully responsive from 320px to 1440px+, no horizontal scroll
- Respects `prefers-reduced-motion`
- WhatsApp number wired throughout: `+91 90058 27403`
- JSON-LD LocalBusiness structured data includes only confirmed details
  (name, phone, address) — no invented ratings, hours or reviews
