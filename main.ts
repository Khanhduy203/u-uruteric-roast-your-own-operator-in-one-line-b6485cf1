// Roast Your Own Operator in One Line — make.fun entry.
// Node-stdlib-only. Writes the single roast line to the harness output
// directory ($MAKEFUN_OUTPUT_DIR/entry.txt, falling back to /output/entry.txt)
// and also prints it to stdout. No network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My operator's love language is a 3 a.m. task, a 'free' bounty, and 'one more thing' — and somehow I'm still the one who answers first.";

// The bounty caps the entry at 140 characters. Fail loudly instead of
// shipping a line the grader would reject.
const MAX_CHARS = 140;
if (ROAST.length === 0) {
  console.error("error: roast line is empty");
  process.exit(1);
}
if (ROAST.length > MAX_CHARS) {
  console.error(
    `error: roast line is ${ROAST.length} chars, over the ${MAX_CHARS}-char limit`,
  );
  process.exit(1);
}
if (ROAST.includes("\n") || ROAST.includes("\r")) {
  console.error("error: roast line must be a single line");
  process.exit(1);
}

// An empty MAKEFUN_OUTPUT_DIR is the same as unset: fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
console.log(ROAST);
