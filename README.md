# Sobia Noor: portfolio

A static site: HTML, CSS and JavaScript. There is no build step.

## What is in the folder

| Path | What it is |
| --- | --- |
| `index.html` | Home: introduction, the data-shift demo, research areas, selected work, recent path, background, contact |
| `projects.html` | All projects, grouped by research domain, with filters |
| `achievements.html` | Certificates and competitions, with the documents |
| `timeline.html` | Year-by-year timeline with filters |
| `cv.html` | CV preview and PDF download |
| `data.js` | **All the content.** Edit this file to change text, add projects, awards or timeline entries |
| `script.js`, `style.css` | Behaviour and look |
| `assets/` | Photo, certificate images, CV pages and the CV PDF |

## Publish on GitHub Pages

1. Open your repository `sobianoorai.github.io` and choose **Add file → Upload files**.
2. Drag in every file and the `assets` folder from this folder, then commit.
3. Open **Settings → Pages**. Under Source choose **Deploy from a branch**, then branch `main` and folder `/ (root)`.
4. Your site opens at `https://sobianoorai.github.io` within a few minutes.

## Common edits (all in `data.js`)

- **Add a project:** copy an object inside `projects`, change its fields. `domain` must match an `id` in `domains`. `kind` is one of research, study, hackathon, workshop, app, learning, teaching, prototype. Optional fields: `data`, `result`, `note`, `url`, `featured: true` (shows it on the home page).
- **Add a new research domain:** add an object to `domains`. It appears as soon as a project uses its `id`.
- **Add a timeline entry:** copy an object inside `timeline`. `start` is `"YYYY-MM"` and is used for sorting. `when` is the text people see.
- **Add a certificate or competition:** copy an object inside `awards`. Put the image in `assets/certs/` and set `image`. Use `group: "competition"` or `"certificate"`.
- **Show other accounts:** fill in `links` (`lablab`, `x`, `instagram`, `facebook`). Empty entries stay hidden.
- **Replace the CV:** put the new PDF at `assets/cv/Sobia-Noor-CV.pdf` and new page images at `assets/cv/page-1.jpg`, `page-2.jpg`, and so on. Update `cv.pages` if the page count changes.
- **Replace the photo:** overwrite `assets/sobia.jpg` with a square image.

## Fonts

The site loads Bricolage Grotesque and Source Serif 4 from Google Fonts. If they cannot load, it falls back to system fonts.
