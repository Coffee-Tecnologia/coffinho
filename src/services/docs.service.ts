import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const instructionsDir = path.resolve(__dirname, '../../instructions');

const SAFE_ID_RE = /^[a-zA-Z0-9-]+$/;

export function validateId(value: string, label: string): string | null {
  if (!value || value.trim() === '') return `${label} é obrigatório.`;
  if (!SAFE_ID_RE.test(value)) return `${label} contém caracteres inválidos.`;
  return null;
}

function collectMdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectMdFiles(full);
    if (entry.isFile() && entry.name.endsWith('.md')) return [full];
    return [];
  });
}

function readSection(files: string[]): string {
  return files
    .map((f) => {
      const label = path.relative(instructionsDir, f);
      return `=== ${label} ===\n${fs.readFileSync(f, 'utf-8')}`;
    })
    .join('\n\n---\n\n');
}

export function loadDocs(appId: string, moduleId?: string): string {
  const parts: string[] = [];

  // shared/ — comum a todos os sistemas
  const sharedDir = path.join(instructionsDir, 'shared');
  const sharedFiles = collectMdFiles(sharedDir);
  if (sharedFiles.length) parts.push(readSection(sharedFiles));

  // app-specific
  const appDir = path.join(instructionsDir, appId);
  if (!fs.existsSync(appDir)) {
    console.warn(`[Coffinho] warn: pasta instructions/${appId}/ não encontrada`);
    return parts.join('\n\n---\n\n');
  }

  const targetDir = moduleId ? path.join(appDir, moduleId) : appDir;
  const appFiles = collectMdFiles(targetDir);

  if (process.env.NODE_ENV !== 'production') {
    const labels = appFiles.map((f) => path.relative(instructionsDir, f));
    console.log(`[Coffinho] docs carregados (${appId}${moduleId ? '/' + moduleId : ''}):`, labels);
  }

  if (appFiles.length) parts.push(readSection(appFiles));

  return parts.join('\n\n---\n\n');
}
