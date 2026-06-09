#!/usr/bin/env node
/**
 * Prepends a release from a repository_dispatch client_payload to a changelog JSON source file.
 * Reads the release object from GITHUB_EVENT_PATH (set automatically by GitHub Actions).
 *
 * Usage:
 *   node scripts/prepend_release.js changelog/source/android.json
 */

const fs = require('fs');

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('Usage: node scripts/prepend_release.js <json-path>');
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const release = event.client_payload;

if (!release || !release.version) {
  console.error('Error: client_payload is missing or has no version field');
  process.exit(1);
}
if (!release.release_date) {
  console.error('Error: client_payload is missing release_date');
  process.exit(1);
}
if (!Array.isArray(release.entries) || release.entries.length === 0) {
  console.error('Error: client_payload entries must be a non-empty array');
  process.exit(1);
}

if (!fs.existsSync(jsonPath)) {
  console.error(`Error: ${jsonPath} not found`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
data.releases.unshift(release);
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`✓ Prepended v${release.version} to ${jsonPath}`);
