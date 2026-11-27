#!/usr/bin/env node
// Blocks a build or PR that would publish data that is sensitive or that traces
// the owner beyond what the site intends to show. Runs on src/, public/ and dist/.
// Usage: node scripts/security-check.mjs [dir ...]
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src', 'public', 'dist'];
const TEXT = new Set(['.astro', '.ts', '.js', '.mjs', '.md', '.mdx', '.json', '.yaml', '.yml', '.html', '.css', '.svg', '.txt', '.xml']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.astro']);

const rules = [
  ['private tailnet host', /\b[\w-]+\.[\w-]+\.ts\.net\b/i],
  ['email address', /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b/],
  ['phone number', /(\+\d{1,3}[\s.-]?)?\b[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/],
  ['private IP address', /\b(10\.\d{1,3}|192\.168|172\.(1[6-9]|2\d|3[01])|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\.\d{1,3}\.\d{1,3}\b/],
  ['localhost URL', /\b(localhost|127\.0\.0\.1):\d+/],
  ['local filesystem path', /(\/home\/[a-z][\w-]*\/|\/Users\/[A-Za-z][\w-]*\/|[A-Z]:\\Users\\)/],
  ['secret or token', /(AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9_-]{20,}|xox[abprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/],
  ['internal hostname', /\b[\w-]+\.(internal|local|lan|corp)\b(?!\w)/i],
];
// Lines matching these are known-safe (e.g. CSS that looks like a phone number).
const allow = [/fonts\.googleapis\.com/, /^\s*(--|\/\*)/];

const forbiddenPaths = [/^design(\/|$)/, /old_profile/i];

const problems = [];
const walk = (dir) => {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { walk(p); continue; }
    if (forbiddenPaths.some((r) => r.test(p))) problems.push(`${p}: file must not be published`);
    const ext = extname(name).toLowerCase();
    const buf = readFileSync(p);
    if (TEXT.has(ext)) {
      // skip minified/base64 blobs inside JS bundles: check line by line, cap line length
      buf.toString('utf8').split('\n').forEach((line, i) => {
        if (allow.some((a) => a.test(line))) return;
        for (const [label, re] of rules) {
          const chunk = line.length > 4000 ? line.slice(0, 4000) : line;
          const m = chunk.match(re);
          if (m) problems.push(`${p}:${i + 1}: ${label} → "${m[0]}"`);
        }
      });
    } else if (['.jpg', '.jpeg'].includes(ext) && buf[0] === 0xff && buf[1] === 0xd8) {
      // EXIF lives in an APP1 segment starting with "Exif\0\0"
      if (buf.includes(Buffer.from('Exif\0\0'))) problems.push(`${p}: JPEG has EXIF metadata (run scripts/strip-jpeg-metadata.py)`);
    } else if (ext === '.png' || (buf[0] === 0x89 && buf.toString('latin1', 1, 4) === 'PNG')) {
      if (buf.includes(Buffer.from('eXIf'))) problems.push(`${p}: PNG has EXIF metadata`);
    }
  }
};

roots.forEach(walk);
if (existsSync('design')) problems.push('design/: working folder must not be in the public repo');

if (problems.length) {
  console.error(`Security check failed (${problems.length}):\n` + problems.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}
console.log(`Security check passed: ${roots.filter(existsSync).join(', ')}`);
