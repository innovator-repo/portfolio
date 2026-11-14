// Arrange the build for GitHub Pages: the site lives at /portfolio/bharat/.
// /portfolio/ redirects there, and the asset paths the Salesforce site uses keep working.
import { cpSync, mkdirSync, renameSync, rmSync, writeFileSync, existsSync } from 'node:fs';

const out = 'dist';
const tmp = 'dist-bharat';
rmSync(tmp, { recursive: true, force: true });
renameSync(out, tmp);
mkdirSync(out);
renameSync(tmp, `${out}/bharat`);

// Old asset URLs (badges, résumé, social image, icon) stay valid at the previous paths.
for (const f of ['img', 'Resume.pdf', 'og.png', 'favicon.png']) {
  if (existsSync(`${out}/bharat/${f}`)) cpSync(`${out}/bharat/${f}`, `${out}/${f}`, { recursive: true });
}

const target = '/portfolio/bharat/';
writeFileSync(`${out}/index.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Bharat Kumar · Salesforce Developer</title>
<link rel="canonical" href="https://innovator-repo.github.io${target}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace('${target}'+location.search+location.hash)</script>
</head><body><a href="${target}">Continue to the portfolio</a></body></html>
`);
writeFileSync(`${out}/404.html`, `<!doctype html><meta charset="utf-8"><title>Not found</title><script>location.replace('${target}')</script><a href="${target}">Go to the portfolio</a>
`);
console.log('Pages layout ready: /portfolio/ -> ' + target);
