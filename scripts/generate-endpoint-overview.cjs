#!/usr/bin/env node
/**
 * Generate endpoint overview MDX from OpenAPI spec.
 * 
 * This script reads the main openapi.json and optionally the sandbox-tested spec,
 * then generates a table-based endpoint overview grouped by OpenAPI tags.
 */

const fs = require('fs');
const path = require('path');

/**
 * Load and parse an OpenAPI JSON spec.
 */
function loadOpenApiSpec(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

/**
 * Extract all operations from an OpenAPI spec.
 * Returns array of {path, method, operation} objects.
 */
function extractOperations(spec) {
  const operations = [];
  const paths = spec.paths || {};
  
  for (const [pathname, methods] of Object.entries(paths)) {
    for (const method of ['get', 'post', 'patch', 'put', 'delete']) {
      if (methods[method]) {
        operations.push({
          path: pathname,
          method: method,
          operation: methods[method]
        });
      }
    }
  }
  
  return operations;
}

/**
 * Generate a unique key for an operation.
 */
function getOperationKey(pathname, method) {
  return `${method.toUpperCase()} ${pathname}`;
}

/**
 * Group operations by their primary tag.
 */
function groupOperationsByTag(operations) {
  const grouped = {};
  
  for (const {path, method, operation} of operations) {
    const tags = operation.tags || [];
    const primaryTag = tags.length > 0 ? tags[0] : 'Untagged';
    
    if (!grouped[primaryTag]) {
      grouped[primaryTag] = [];
    }
    grouped[primaryTag].push({path, method, operation});
  }
  
  // Sort operations within each group by path, then method
  for (const tag of Object.keys(grouped)) {
    grouped[tag].sort((a, b) => {
      if (a.path !== b.path) {
        return a.path.localeCompare(b.path);
      }
      return a.method.localeCompare(b.method);
    });
  }
  
  return grouped;
}

/**
 * Check if operation requires X-Idempotency-Key.
 */
function hasIdempotencyKey(operation) {
  const parameters = operation.parameters || [];
  return parameters.some(p => p.name === 'X-Idempotency-Key');
}

/**
 * Check if a string looks like a raw operationId (snake_case or kebab-case with underscores/hyphens).
 */
function looksLikeOperationId(str) {
  if (!str) return false;
  // Matches: get_foo, post_bar-baz, put_foo-bar-id
  return /^[a-z]+[_-][a-z0-9_-]+$/i.test(str);
}

/**
 * Derive a human-readable description from HTTP method + path.
 * E.g. "PATCH /checkout/sessions/{id}" → "Update checkout session"
 */
function deriveDescription(method, path) {
  const methodLower = method.toLowerCase();
  
  // Extract the main resource from path (last segment before parameters)
  // /campaigns/{id} → campaigns
  // /checkout/sessions/{id} → sessions
  // /banking/accounts → accounts
  const segments = path.split('/').filter(s => s && !s.startsWith('{'));
  const resource = segments[segments.length - 1] || segments[segments.length - 2] || 'resource';
  
  // Convert kebab-case or snake_case to space-separated
  const resourceReadable = resource
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toLowerCase());
  
  // Map method to action verb
  const verbMap = {
    'get': segments.length > 2 && !path.includes('{') ? 'List' : 'Get',
    'post': 'Create',
    'patch': 'Update',
    'put': 'Update',
    'delete': 'Delete'
  };
  
  const verb = verbMap[methodLower] || methodLower.toUpperCase();
  return `${verb} ${resourceReadable}`;
}

/**
 * Get operation summary with smart fallbacks and cleanup.
 * Prefers clean OpenAPI summary/description, derives from method+path if needed.
 */
function getOperationSummary(operation, method, path) {
  let summary = (operation.summary || '').trim();
  
  // Skip if summary looks like operationId or starts with "Copy of"
  if (summary && !looksLikeOperationId(summary) && !/^Copy of\b/i.test(summary)) {
    return summary;
  }
  
  // Try description field
  const description = (operation.description || '').trim();
  if (description && !looksLikeOperationId(description)) {
    // Take first sentence, strip markdown
    const cleaned = description
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
      .replace(/[*_~`]/g, ''); // Remove markdown formatting
    const firstSentence = cleaned.split(/[.!?]\s/)[0];
    if (firstSentence && firstSentence.length > 10 && firstSentence.length < 200) {
      return firstSentence + (firstSentence.endsWith('.') ? '' : '.');
    }
  }
  
  // Derive from method + path
  const derived = deriveDescription(method, path);
  if (derived && derived !== 'GET resource' && derived !== 'POST resource') {
    return derived;
  }
  
  // Last resort
  return '—';
}

/**
 * Generate markdown table for a tag group.
 */
function generateMarkdownTable(tag, operations) {
  const lines = [];
  lines.push(`\n## ${tag}\n`);
  lines.push('| Method | Endpoint | Description | Idempotent |');
  lines.push('|--------|----------|-------------|------------|');
  
  for (const {path, method, operation} of operations) {
    const methodUpper = method.toUpperCase();
    const summary = getOperationSummary(operation, method, path);
    const idempotent = hasIdempotencyKey(operation) ? 'Yes' : '—';
    
    // Escape MDX expressions in path (curly braces)
    const pathEscaped = path.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
    
    // Escape pipe characters in descriptions
    const summaryEscaped = summary.replace(/\|/g, '\\|');
    
    lines.push(`| ${methodUpper} | \`${pathEscaped}\` | ${summaryEscaped} | ${idempotent} |`);
  }
  
  return lines.join('\n');
}

/**
 * Generate the full MDX content (body only, no frontmatter/comment).
 */
function generateMdxContent(mainSpec, sandboxSpec = null) {
  const mainOps = extractOperations(mainSpec);
  
  // Get sandbox operations as a set of keys for comparison
  const sandboxKeys = new Set();
  if (sandboxSpec) {
    const sandboxOps = extractOperations(sandboxSpec);
    for (const {path, method} of sandboxOps) {
      sandboxKeys.add(getOperationKey(path, method));
    }
  }
  
  const grouped = groupOperationsByTag(mainOps);
  
  // Sort tags alphabetically
  const sortedTags = Object.keys(grouped).sort();
  
  // Build MDX body content (no frontmatter)
  const lines = [];
  lines.push('This page provides a scannable catalog of all Yuno REST API endpoints. Use it to discover what operations are available before diving into individual reference pages.');
  lines.push('');
  lines.push('For implementation details:');
  lines.push('- [Authentication](/reference/getting-started/authentication) — How to authenticate API requests');
  lines.push('- [Environments](/reference/getting-started/api-environments) — Sandbox and production base URLs');
  lines.push('- [OpenAPI Specification](/openapi.json) — Machine-readable API definition');
  lines.push('');
  
  if (sandboxSpec) {
    lines.push('<Note>');
    lines.push(`This overview is generated from the full OpenAPI specification (${mainOps.length} operations). `);
    lines.push(`A subset of ${sandboxKeys.size} operations have been sandbox-tested and are available in \`openapi/yuno_sandbox_tested.json\`.`);
    lines.push('</Note>');
    lines.push('');
  }
  
  // Generate tables for each tag
  for (const tag of sortedTags) {
    const tableContent = generateMarkdownTable(tag, grouped[tag]);
    lines.push(tableContent);
  }
  
  return lines.join('\n');
}

/**
 * Main entry point.
 */
function main() {
  const repoRoot = path.join(__dirname, '..');
  const mainSpecPath = path.join(repoRoot, 'openapi.json');
  const sandboxSpecPath = path.join(repoRoot, 'openapi', 'yuno_sandbox_tested.json');
  const outputPath = path.join(repoRoot, 'reference', 'getting-started', 'endpoint-overview.mdx');
  
  console.log(`Loading main OpenAPI spec from ${mainSpecPath}...`);
  const mainSpec = loadOpenApiSpec(mainSpecPath);
  
  let sandboxSpec = null;
  if (fs.existsSync(sandboxSpecPath)) {
    console.log(`Loading sandbox-tested spec from ${sandboxSpecPath}...`);
    sandboxSpec = loadOpenApiSpec(sandboxSpecPath);
  }
  
  console.log('Generating MDX content...');
  const bodyContent = generateMdxContent(mainSpec, sandboxSpec);
  
  console.log(`Writing to ${outputPath}...`);
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Build three separate pieces: frontmatter, comment, body
  const frontmatter = [
    '---',
    'title: "Endpoint Overview"',
    'description: "A complete index of Yuno API endpoints organized by resource"',
    '---'
  ].join('\n');
  
  const comment = '{/* Generated from OpenAPI spec — regenerate via: node scripts/generate-endpoint-overview.cjs */}';
  
  // Concatenate with proper spacing
  const fullContent = frontmatter + '\n\n' + comment + '\n\n' + bodyContent;
  
  fs.writeFileSync(outputPath, fullContent);
  
  console.log(`✓ Generated ${outputPath}`);
  
  // Print summary
  const mainOps = extractOperations(mainSpec);
  const grouped = groupOperationsByTag(mainOps);
  const idempotentCount = mainOps.filter(({operation}) => hasIdempotencyKey(operation)).length;
  
  console.log('\nSummary:');
  console.log(`  Total operations: ${mainOps.length}`);
  console.log(`  Tags: ${Object.keys(grouped).length}`);
  console.log(`  Idempotent operations: ${idempotentCount}`);
}

if (require.main === module) {
  main();
}
