#!/usr/bin/env node
// @ts-check
import { readFileSync } from 'fs';

const [,, basePath, headPath] = process.argv;

if (!basePath || !headPath) {
  console.error('Usage: check-no-removals.mjs <base-file> <head-file>');
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

const headUsernames = new Set(
  head
    .filter(c => typeof c.github === 'string')
    .map(c => c.github.toLowerCase())
);

const removed = base.filter(
  c => typeof c.github === 'string' && !headUsernames.has(c.github.toLowerCase())
);

if (removed.length > 0) {
  console.error(`ERROR: The following contributor(s) were removed, which is not allowed:\n`);
  removed.forEach(c => console.error(`  - ${c.github}`));
  process.exit(1);
}

console.log(`OK: No contributors were removed. (${base.length} → ${head.length})`);
