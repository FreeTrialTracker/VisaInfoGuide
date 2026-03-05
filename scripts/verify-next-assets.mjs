import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const BUILD_DIR = resolve(process.cwd(), '.next');
const STATIC_DIR = join(BUILD_DIR, 'static');

if (!existsSync(BUILD_DIR)) {
  console.error('ERROR: .next build directory not found. Run "npm run build" first.');
  process.exit(1);
}

function walkDir(dir, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function collectStaticAssets() {
  const assets = new Set();
  if (!existsSync(STATIC_DIR)) return assets;
  const files = walkDir(STATIC_DIR);
  for (const f of files) {
    const relative = f.replace(BUILD_DIR, '').replace(/\\/g, '/');
    assets.add(relative);
  }
  return assets;
}

function extractNextStaticRefs(content) {
  const refs = new Set();
  const regex = /\/_next\/static\/[^\s"'<>)\\\x00-\x1f]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const ref = match[0].split('?')[0];
    if (/\.(css|js|woff2?|ttf|otf|png|jpg|svg|ico|json)$/.test(ref)) {
      refs.add(ref);
    }
  }
  return refs;
}

const builtAssets = collectStaticAssets();

const htmlDirs = [
  join(BUILD_DIR, 'server', 'app'),
  join(BUILD_DIR, 'server', 'pages'),
];

let allRefs = new Set();

for (const dir of htmlDirs) {
  if (!existsSync(dir)) continue;
  const files = walkDir(dir).filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json'));
  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf8');
      const refs = extractNextStaticRefs(content);
      for (const ref of refs) allRefs.add(ref);
    } catch {}
  }
}

let missing = [];
for (const ref of allRefs) {
  const assetPath = ref.replace('/_next', '');
  if (!builtAssets.has(assetPath)) {
    missing.push(ref);
  }
}

if (missing.length > 0) {
  console.error('\nERROR: The following /_next/static/* assets are referenced in build output but missing from .next/static:');
  for (const m of missing) {
    console.error(`  MISSING: ${m}`);
  }
  console.error('\nThis means stale HTML is referencing assets from a previous build.');
  console.error('Ensure a clean build: delete .next and node_modules/.cache then rebuild.\n');
  process.exit(1);
} else {
  console.log(`OK: All ${allRefs.size} referenced /_next/static/* assets exist in the build output.`);
  process.exit(0);
}
