# Tess's Snip Snip — Campus Hair Studio

A modern, aesthetic hair salon website built for a college hostel-based hair styling business at Symbiosis.

## Live Site

Deployed on Vercel — [View Live](https://tess-s-snip-snip.vercel.app)

## Features

- **Service Menu** — 4 hairstyles with pricing (Blow Out, Curly Blow Out, Beach Waves, Pin Straight)
- **Style Gallery** — Click any hairstyle image to book that service directly
- **Client Video Showcase** — Muted, auto-playing transformation videos in portrait format
- **Customer Reviews** — Carousel with pre-loaded reviews + a "Leave a Review" form with star ratings
- **Reservation System** — Pick a date, time slot, and service — no login required
- **Google Sheets Backend** — Bookings and reviews are stored in Google Sheets for easy access
- **Dark / Light Mode** — Smooth animated theme toggle with saved preference
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Scroll Animations** — Fade-in effects on all sections as you scroll

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Playfair Display + Inter)
- Google Apps Script (backend)
- Deployed on Vercel via GitHub

## Project Structure

```
tess_snip_snip/
├── index.html              # Main page
├── styles.css              # All styles + dark/light themes
├── script.js               # Interactivity, booking, reviews, theme toggle
├── google-apps-script.js   # Code to paste into Google Apps Script
├── GOOGLE_SHEETS_SETUP.txt # Step-by-step backend setup guide
├── images/                 # Gallery photos
│   ├── beachwaves.jpg
│   ├── curlyblowout.jpg
│   ├── blowout.jpg
│   └── pinstraight.jpg
└── videos/                 # Client transformation videos
    ├── testimony1.mp4
    ├── testimony2.mp4
    └── testimony3.mp4
```

## Google Sheets Setup

See `GOOGLE_SHEETS_SETUP.txt` for full instructions. In short:

1. Create a Google Sheet with `Bookings` and `Reviews` tabs
2. Add the Apps Script from `google-apps-script.js`
3. Deploy as a Web App
4. Paste the URL into `script.js` (line 2)

## Contact

- **Location:** Girls Hostel, Symbiosis
- **WhatsApp:** 87148 90772
- **Instagram:** [@tessamaria_05](https://instagram.com/tessamaria_05)
