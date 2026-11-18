import { defineConfig } from 'astro/config';
// Set SITE_URL and BASE_PATH in CI (user site: base "/", project site: "/repo-name").
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  // English at the root, French under /fr/. Same components, translated strings.
  i18n: { defaultLocale: 'en', locales: ['en', 'fr'], routing: { prefixDefaultLocale: false } },
});
