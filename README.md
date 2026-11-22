# Sobia Noor: Portfolio

Static site (HTML, CSS, JS). No build step.

## Files

- `index.html`: home (research focus, selected projects, recent path, background, contact)
- `projects.html`: projects grouped by research domain, with filters
- `timeline.html`: full timeline with filters
- `data.js`: **all content**. Edit this file to add projects and timeline entries.
- `style.css`, `script.js`: look and behaviour

## Add a project

Open `data.js`, copy an object in `projects`, and change `title`, `domain`, `summary`, `tags`, `url`.
`domain` must match an `id` in `domains` (med, security, cv, nlp, ml, teaching). To add a new domain, add an object to `domains`.
`kind` is one of research, study, hackathon, workshop, app, learning, teaching. Optional fields: `data` (dataset name), `result`, `limits`, `url`.
A domain with `status: "exploring"` and no projects shows under "Directions I am building toward".
Add `featured: true` to show it on the home page.

## Add a timeline entry

Copy an object in `timeline`. `start` is `"YYYY-MM"` (used for sorting). `when` is the label shown.

## Deploy on GitHub Pages

1. Create a **public** repo named `<your-github-username>.github.io`.
2. Upload every file in this folder.
3. Settings → Pages → Deploy from a branch → `main` / root.
4. The site goes live at `https://<your-github-username>.github.io` within a minute or two.

## Custom domain (for example sobianoor.com)

Buy the domain from a registrar, add a `CNAME` file containing the domain to the repo root, set the DNS records GitHub lists
under Settings → Pages, and tick "Enforce HTTPS".
