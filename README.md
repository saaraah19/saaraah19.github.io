# Sarra Sawsene Sahraoui — portfolio

Astro 5 + TypeScript, static output. Only dependencies: `astro` and four `@fontsource` font packages.

    npm install
    npm run dev       # local
    npm run build     # static site in dist/

## Where things live
- `src/content/projects/*.json` — every project. `tier` (featured / supporting / experiment), `status` (live / dev / exp / desktop / archived), links, flow steps, build notes. Add or re-tier a project by editing data only.
- Case-study pages (`/work/<id>`) are generated for every `featured` project. Bespoke diagrams are in `src/components/projects/` and registered in `src/pages/work/[id].astro`; projects without one fall back to a plain curve through `flow`.
- `src/data/certifications.json`, `src/data/contact.json` — credentials and contact links.
- `src/styles/global.css` — all design tokens (light/dark), tags, buttons, diagram styles.
- `src/components/cats/CatFigure.astro` — the one cat, reused (hero, Marginalia, MeowP3).

## Languages
English lives at the root, French under `/fr/`. UI strings are in `src/i18n/index.ts`; each project file carries its French copy under an `fr` key, and anything missing falls back to English. The nav link switches to the same page in the other language.

## Deploy (GitHub Pages)
1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo: Settings → Pages → Source: **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds on every push to `main` (or run it by hand from the Actions tab). It works out the site address and base path from the repository name by itself: `user.github.io/repo` gets `/repo`, a repository named `user.github.io` gets none. A custom domain needs neither; put a `CNAME` file in `public/`.

## Still to supply
Real project screenshots (none are faked), solution/result text per project (fields exist, omitted until written), repo name for the base path.
