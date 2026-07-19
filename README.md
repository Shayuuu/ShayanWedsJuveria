# Shayan & Juveria — Wedding Invitation

A premium, mobile-first interactive wedding invitation. Pure HTML/CSS/JS — no build step, no dependencies. Just open `index.html` or host the folder anywhere (Netlify, Vercel, GitHub Pages).

## Editing your wedding details

**Everything is configured in one place** — open `js/script.js` and edit the `weddingConfig` object at the very top:

- `weddingDate` — main date/time (`"YYYY-MM-DDTHH:MM:SS"`), drives the countdown and calendar event
- `dateReveal` — the day / date / month / year shown in the "Save the Date" scratch card
- `whatsappNumber` — country code + number, digits only (e.g. `"919876543210"`)
- `events` — Mehendi, Haldi, Nikah, Reception: dates, times, venues and Google Maps links
- `venue` — main venue name, address and maps link for the "Join Us" section
- `music` — path to the background music file

## Adding your own media

| File | Purpose |
|---|---|
| `assets/wedding-music.mp3` | Background music (starts after the doors are opened) |
| `assets/hero-video.mp4` | Cinematic hero background video — short 10–20s muted loop, ~2–4 MB (set `heroVideo: ""` in the config to disable) |
| `assets/wedding-preview.jpg` | WhatsApp/Instagram link preview image (1200×630 recommended) |
| `assets/images/photo-1.svg` … `photo-6.svg` | Gallery placeholders — replace with your photos (WebP recommended, ~640×800), then update the `src` paths in `index.html` |

## Connecting the RSVP form to a backend

RSVPs currently save to the visitor's device (localStorage) and show a success message. To collect them centrally, in `weddingConfig.rsvp` set:

```js
rsvp: {
  mode: "endpoint",
  endpoint: "https://formspree.io/f/YOUR_ID", // or Apps Script / Firebase / Supabase URL
},
```

The form POSTs JSON: `{ name, guests, attending, message }`.

## Local preview

```bash
# from this folder — any static server works
python -m http.server 8080
# then open http://localhost:8080 (or your phone at http://<your-ip>:8080)
```
