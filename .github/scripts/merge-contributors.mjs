#!/usr/bin/env node
// @ts-check
/**
 * Merges two contributors.json arrays without conflicts.
 * Usage: node merge-contributors.mjs <base-file> <head-file>
 *
 * Output (stdout): base entries + any entries from head whose github
 * username does not already exist in base.
 */
import { readFileSync } from 'fs';

const [,, basePath, headPath] = process.argv;

if (!basePath || !headPath) {
  console.error('Usage: merge-contributors.mjs <base-file> <head-file>');
  process.exit(1);
}

const base = JSON.parse(readFileSync(basePath, 'utf8'));
const head = JSON.parse(readFileSync(headPath, 'utf8'));

const baseHandles = new Set(
  base.filter(c => typeof c.github === 'string').map(c => c.github.toLowerCase())
);

const newEntries = head.filter(
  c => typeof c.github === 'string' && !baseHandles.has(c.github.toLowerCase())
);

process.stdout.write(JSON.stringify([...base, ...newEntries], null, 2) + '\n');
