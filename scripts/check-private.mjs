// Scans src/ and public/ for patterns that look like private data before publishing.
// Run with: npm run check-private
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src', 'public', '.env'];
const patterns = [
  { name: 'Transaction or invoice ID', re: /\b(PT-\d{6,}|INV-\d{6,})\b/ },
  { name: 'Phone number (India or US)', re: /(\+91|\+1)[\s-]?\d{9,10}|\b\d{10}\b/ },
  { name: 'TIN / tax ID number', re: /\bTIN\b[:\s]*\d/i },
  { name: 'Teams meeting ID or passcode', re: /\b\d{3} \d{3} \d{3} \d{3}\b/ },
  { name: 'PIN assignment reference', re: /\bPIN\b/ },
  { name: 'Private key or secret assignment', re: /^\s*[\w.]*(PRIVATE|SECRET|PASSWORD)\w*\s*[:=]/im },
];

const hits = [];
function walk(dir) {
  if (dir === '.env') {
    const text = readFileSync(dir, 'utf8');
    for (const p of patterns) if (p.re.test(text)) hits.push(`${dir}: ${p.name}`);
    return;
  }
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx|css|html|md|json|txt)$/.test(name)) {
      const text = readFileSync(path, 'utf8');
      for (const p of patterns) if (p.re.test(text)) hits.push(`${path}: ${p.name}`);
    }
  }
}
roots.forEach(walk);

if (hits.length) {
  console.error('Possible private data found:\n' + hits.join('\n'));
  process.exit(1);
}
console.log('No private-data patterns found in src/ or public/.');
