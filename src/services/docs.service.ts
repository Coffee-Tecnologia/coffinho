import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const instructionsDir = path.resolve(__dirname, '../../instructions');

export function loadDocs(): string {
  const files = fs.readdirSync(instructionsDir).filter((f) => f.endsWith('.md'));
  return files
    .map((f) => fs.readFileSync(path.join(instructionsDir, f), 'utf-8'))
    .join('\n\n---\n\n');
}
