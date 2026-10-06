// Gera src/data/icons.js com apenas os ícones MDI usados no site.
// Uso: node scripts/build-icons.mjs   (ou: npm run icons)
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if ([".js", ".jsx"].includes(extname(full))) out.push(full);
  }
  return out;
}

const used = new Set();
for (const file of walk(srcDir)) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/mdi:[a-z0-9-]+/g)) used.add(m[0]);
}

const mdi = JSON.parse(
  readFileSync(join(root, "node_modules/@iconify-json/mdi/icons.json"), "utf8")
);

const icons = {};
const aliases = {};
const missing = [];

function add(name) {
  if (icons[name] || aliases[name]) return;
  if (mdi.icons[name]) {
    icons[name] = mdi.icons[name];
  } else if (mdi.aliases[name]) {
    aliases[name] = mdi.aliases[name];
    if (mdi.aliases[name].parent) add(mdi.aliases[name].parent);
  } else {
    missing.push(name);
  }
}

for (const full of [...used].sort()) add(full.slice(4));

const collection = {
  prefix: "mdi",
  icons,
  aliases,
  width: mdi.width,
  height: mdi.height,
};

const banner = `// Arquivo gerado por scripts/build-icons.mjs. Não edite à mão.
// Contém apenas os ícones MDI usados no projeto, para funcionar offline.
`;
const outPath = join(srcDir, "data", "icons.js");
writeFileSync(
  outPath,
  `${banner}export const mdiOffline = ${JSON.stringify(collection)};\n`
);

console.log(`Ícones usados: ${used.size}`);
console.log(`Incluídos: ${Object.keys(icons).length} (+ ${Object.keys(aliases).length} alias)`);
if (missing.length) console.warn(`NÃO encontrados: ${missing.join(", ")}`);
console.log(`Gerado: ${outPath}`);
