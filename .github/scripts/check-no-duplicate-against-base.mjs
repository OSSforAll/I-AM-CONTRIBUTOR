#!/usr/bin/env node
// @ts-check
import { readFileSync } from 'fs';

const [,, basePath, headPath] = process.argv;

if (!basePath || !headPath) {
  console.error('Usage: check-no-duplicate-against-base.mjs <base-file> <head-file>');
  process.exit(1);
}

let base, head;

try {
  base = JSON.parse(readFileSync(basePath, 'utf8'));
} catch {
  console.error(`ERROR: Could not read or parse base file: ${basePath}`);
  process.exit(1);
}

try {
  head = JSON.parse(readFileSync(headPath, 'utf8'));
} catch {
  console.error(`ERROR: Could not read or parse head file: ${headPath}`);
  process.exit(1);
}

if (!Array.isArray(base) || !Array.isArray(head)) {
  console.error('ERROR: Both files must contain a JSON array.');
  process.exit(1);
}

const baseUsernames = new Set(
  base
    .filter(c => typeof c.github === 'string')
    .map(c => c.github.toLowerCase())
);

const duplicates = head.filter(
  c => typeof c.github === 'string' && baseUsernames.has(c.github.toLowerCase())
);

if (duplicates.length > 0) {
  console.error(`ERROR: The following GitHub username(s) already exist in the main branch:\n`);
  duplicates.forEach(c => console.error(`  - ${c.github}`));
  console.error(`\nIf you are updating your existing entry, that is not yet supported via PR.`);
  process.exit(1);
}

console.log(`OK: No duplicate usernames found against base. (${base.length} base → ${head.length} head)`);
