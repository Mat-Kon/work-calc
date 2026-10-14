import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

const ABSTRACT_DIR = path.resolve("src/styles/abstract");
const SKIP_DIR = path.resolve("src/styles/abstract");

function collectScss(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      collectScss(full, out);
    } else if (entry.endsWith(".scss")) {
      out.push(full);
    }
  }
  return out;
}

const files = collectScss(path.resolve("src"));

let updated = 0;
let skipped = 0;

for (const filePath of files) {
  if (filePath.startsWith(SKIP_DIR)) continue;

  const original = readFileSync(filePath, "utf8");
  if (!/\bvars\.|\bmix\./.test(original)) continue;

  if (
    /@use\s+["'].*variables["']/.test(original) ||
    /@use\s+["'].*mixins["']/.test(original)
  ) {
    console.log(`↷ уже есть @use: ${path.relative(process.cwd(), filePath)}`);
    skipped++;
    continue;
  }

  let relPath = path.relative(path.dirname(filePath), ABSTRACT_DIR);
  relPath = relPath.split(path.sep).join("/");
  if (!relPath.startsWith(".")) relPath = "./" + relPath;

  const header =
    `@use "${relPath}/variables" as vars;\n` +
    `@use "${relPath}/mixins" as mix;\n\n`;

  const clean = original.replace(/^\uFEFF/, "");
  writeFileSync(filePath, header + clean, "utf8");
  console.log(`✓ ${path.relative(process.cwd(), filePath)}  →  ${relPath}`);
  updated++;
}

console.log(`\nОбновлено: ${updated}, пропущено: ${skipped}`);
