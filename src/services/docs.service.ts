import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const instructionsDir = path.resolve(__dirname, '../../instructions');

function collectMdFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectMdFiles(full);
    if (entry.isFile() && entry.name.endsWith('.md')) return [full];
    return [];
  });
}

export function loadDocs(): string {
  return collectMdFiles(instructionsDir)
    .map((f) => fs.readFileSync(f, 'utf-8'))
    .join('\n\n---\n\n');
}
