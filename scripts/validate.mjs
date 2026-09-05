import { readFile, access } from 'node:fs/promises';
const html = await readFile('index.html', 'utf8');
const failures = [];

for (const token of ['<title>', 'name="description"', '<main', '<h1', 'id="work"', 'id="experience"', 'id="about"', 'id="contact"']) {
  if (!html.includes(token)) failures.push(`Missing required markup: ${token}`);
}

const localAssets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map(match => match[1])
  .filter(value => !value.startsWith('http') && !value.startsWith('#'));

for (const asset of localAssets) {
  try { await access(asset); } catch { failures.push(`Missing local asset: ${asset}`); }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Validated index.html and ${localAssets.length} local asset references.`);
