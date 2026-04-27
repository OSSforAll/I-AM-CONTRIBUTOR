#!/usr/bin/env node
// @ts-check
import { readFileSync } from 'fs';
import { resolve } from 'path';

const VALID_CATEGORIES  = ['Beginner', 'Intermediate', 'Advanced', 'Maintainer'];
const VALID_REGISTRIES  = ['npm', 'packagist', 'pypi', 'rubygems', 'crates', 'github'];
const GITHUB_USER_RE    = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const URL_RE            = /^https?:\/\/.+/;
const TWITTER_HANDLE_RE = /^[a-zA-Z0-9_]{1,50}$/;
const LINKEDIN_HANDLE_RE = /^[a-zA-Z0-9-]{3,100}$/;

/**
 * Collected validation errors.
 * @type {Array<string>}
 */
const errors = [];

/**
 * Records a validation error with context.
 * @param {number} index
 * @param {string} field
 * @param {string} message
 */
function fail(index, field, message) {
  errors.push(`  [${index}] ${field}: ${message}`);
}

// ── Load file ────────────────────────────────────────────────

const filePath = resolve(process.cwd(), 'contributors.json');
let raw;
try {
  raw = readFileSync(filePath, 'utf8');
} catch {
  console.error('ERROR: contributors.json not found.');
  process.exit(1);
}

let contributors;
try {
  contributors = JSON.parse(raw);
} catch (e) {
  console.error(`ERROR: contributors.json is not valid JSON.\n  ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(contributors)) {
  console.error('ERROR: contributors.json must be a JSON array.');
  process.exit(1);
}

// ── Validate each entry ──────────────────────────────────────

contributors.forEach((c, i) => {
  if (typeof c !== 'object' || c === null || Array.isArray(c)) {
    fail(i, 'root', 'each entry must be a JSON object');
    return;
  }

  // github (required)
  if (c.github === undefined) {
    fail(i, 'github', 'required field is missing');
  } else if (typeof c.github !== 'string') {
    fail(i, 'github', `must be a string, got ${typeof c.github}`);
  } else if (!GITHUB_USER_RE.test(c.github)) {
    fail(i, 'github', `"${c.github}" is not a valid GitHub username (no @ prefix, no URL, letters/numbers/hyphens only)`);
  }

  // name (optional string)
  if (c.name !== undefined && typeof c.name !== 'string') {
    fail(i, 'name', `must be a string`);
  }

  // category (optional enum)
  if (c.category !== undefined) {
    if (typeof c.category !== 'string') {
      fail(i, 'category', 'must be a string');
    } else if (!VALID_CATEGORIES.includes(c.category)) {
      fail(i, 'category', `"${c.category}" is not allowed — must be one of: ${VALID_CATEGORIES.join(', ')}`);
    }
  }

  // intro (optional string)
  if (c.intro !== undefined && typeof c.intro !== 'string') {
    fail(i, 'intro', 'must be a string');
  }

  // techStack (optional array of strings)
  if (c.techStack !== undefined) {
    if (!Array.isArray(c.techStack)) {
      fail(i, 'techStack', 'must be an array');
    } else {
      c.techStack.forEach((t, ti) => {
        if (typeof t !== 'string') fail(i, `techStack[${ti}]`, 'each item must be a string');
      });
    }
  }

  // packages (optional array)
  if (c.packages !== undefined) {
    if (!Array.isArray(c.packages)) {
      fail(i, 'packages', 'must be an array');
    } else {
      c.packages.forEach((pkg, pi) => {
        if (typeof pkg !== 'object' || pkg === null || Array.isArray(pkg)) {
          fail(i, `packages[${pi}]`, 'each item must be an object');
          return;
        }
        if (typeof pkg.name !== 'string' || !pkg.name.trim()) {
          fail(i, `packages[${pi}].name`, 'required string field is missing or empty');
        }
        if (typeof pkg.url !== 'string' || !URL_RE.test(pkg.url)) {
          fail(i, `packages[${pi}].url`, `must be a valid URL starting with http:// or https://`);
        }
        if (pkg.registry !== undefined) {
          if (typeof pkg.registry !== 'string') {
            fail(i, `packages[${pi}].registry`, 'must be a string');
          } else if (!VALID_REGISTRIES.includes(pkg.registry.toLowerCase())) {
            fail(i, `packages[${pi}].registry`, `"${pkg.registry}" is not allowed — must be one of: ${VALID_REGISTRIES.join(', ')}`);
          }
        }
      });
    }
  }

  // URL-type optional fields
  for (const field of ['website', 'blog', 'youtube']) {
    if (c[field] !== undefined) {
      if (typeof c[field] !== 'string') {
        fail(i, field, 'must be a string');
      } else if (!URL_RE.test(c[field])) {
        fail(i, field, `must be a valid URL starting with http:// or https://`);
      }
    }
  }

  // twitter — accept plain handle (letters/digits/underscores) OR full URL
  if (c.twitter !== undefined) {
    if (typeof c.twitter !== 'string') {
      fail(i, 'twitter', 'must be a string');
    } else if (!TWITTER_HANDLE_RE.test(c.twitter) && !URL_RE.test(c.twitter)) {
      fail(i, 'twitter', `must be a plain handle (e.g. "yourhandle") or a full URL`);
    }
  }

  // linkedin — accept plain handle (letters/digits/hyphens) OR full URL
  if (c.linkedin !== undefined) {
    if (typeof c.linkedin !== 'string') {
      fail(i, 'linkedin', 'must be a string');
    } else if (!LINKEDIN_HANDLE_RE.test(c.linkedin) && !URL_RE.test(c.linkedin)) {
      fail(i, 'linkedin', `must be a plain handle (letters, numbers, hyphens — e.g. "tushar-sonar") or a full URL`);
    }
  }

  // openSource (optional array)
  if (c.openSource !== undefined) {
    if (!Array.isArray(c.openSource)) {
      fail(i, 'openSource', 'must be an array');
    } else {
      c.openSource.forEach((p, pi) => {
        if (typeof p !== 'object' || p === null || Array.isArray(p)) {
          fail(i, `openSource[${pi}]`, 'each item must be an object');
          return;
        }
        if (typeof p.name !== 'string' || !p.name.trim()) {
          fail(i, `openSource[${pi}].name`, 'required string field is missing or empty');
        }
        if (typeof p.url !== 'string' || !URL_RE.test(p.url)) {
          fail(i, `openSource[${pi}].url`, 'must be a valid URL starting with http:// or https://');
        }
      });
    }
  }
});

// ── Check for duplicate github usernames ─────────────────────

const seen = new Map();
contributors.forEach((c, i) => {
  if (typeof c.github !== 'string') return;
  const lower = c.github.toLowerCase();
  if (seen.has(lower)) {
    fail(i, 'github', `duplicate username — "${c.github}" already appears at index ${seen.get(lower)}`);
  } else {
    seen.set(lower, i);
  }
});

// ── Report ───────────────────────────────────────────────────

if (errors.length > 0) {
  console.error(`contributors.json validation failed with ${errors.length} error(s):\n`);
  errors.forEach(e => console.error(e));
  process.exit(1);
}

console.log(`contributors.json is valid. ${contributors.length} contributor(s) checked.`);