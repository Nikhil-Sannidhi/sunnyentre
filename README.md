# Sannidhi Entreprizes — website

Static website for **Sannidhi Entreprizes**, a pro bono consulting firm that offers free strategy, finance, operations, technology, marketing and governance help to nonprofits, social enterprises and community groups.

## Files

- `index.html` — page content (hero, mission, services, process, who we serve, volunteer, contact)
- `styles.css` — styling and responsive layout
- `script.js` — mobile menu, scroll effects and contact form

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Before going live

- Replace the placeholder email (`hello@sannidhientreprizes.org`) in `index.html` **and** `CONTACT_EMAIL` in `script.js`.
- Replace the placeholder phone number (`+91 00000 00000`) in `index.html`.
- The contact form opens the visitor's email app (`mailto:`). To receive submissions directly instead, point the form at a form service such as Formspree or Netlify Forms.

## Deploy

It's plain HTML/CSS/JS with no build step, so it can be hosted on GitHub Pages, Netlify or Vercel as-is.
