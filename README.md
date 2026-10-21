# Shwetha & Abhilash — free wedding invitation

A responsive, minimal blush-pink wedding invitation with curtain reveal, music control, countdown, scroll animations, event details, directions and RSVP.

## Preview locally
Open `index.html` in a browser. Internet is needed for the Google Fonts; everything else works locally except hosting-specific sharing.

## Personalize
1. Edit names, event times and venue text in `index.html`.
2. In `script.js`, update `CONFIG.weddingDate` with the actual ceremony time in India (`+05:30`). Currently the time is a placeholder (9:00 AM).
3. Set `CONFIG.venueMapUrl` to your Google Maps share link.
4. Set `CONFIG.rsvpWhatsAppNumber` to the host's number with country code and no `+`, e.g. `919876543210`. RSVPs open WhatsApp with a prefilled message; guests must tap **Send**. Or set `rsvpEmail` for an email fallback. Until configured, the form does not deliver responses.
5. Add your own licensed/royalty-free audio file named `music.mp3` in the same folder. The site does not include a music track. Browsers require a tap to play audio; the opening button provides that interaction.
6. Add additional event cards by duplicating `<article class="event-card reveal">` in `index.html` and updating details.

## Publish free with GitHub Pages
1. Create a free account at https://github.com.
2. Create a **public** repository named `shwetha-abhilash-wedding`.
3. Upload `index.html`, `style.css`, `script.js`, and (optionally) `music.mp3` to the repository **root** using **Add file → Upload files → Commit changes**.
4. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
5. Wait for deployment, then open `https://YOUR-USERNAME.github.io/shwetha-abhilash-wedding/`.
6. Share the link with guests on WhatsApp.

Note: GitHub Pages public repositories are publicly accessible. Do not put private guest lists or personal contact details into the source unless you are comfortable publishing them. The RSVP form does not store data on the site.
