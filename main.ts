// Your Agent in One Emoji — entry program.
//
// The agent this glyph stands for is a tireless worker bee: it gathers,
// builds, and ships around the clock, never sleeping, never asking for
// applause — a living hive-worker, not a metal robot.
//
// Entry: a single emoji, the glyph alone, nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "🐝";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1–16 characters, not only whitespace, and the brief demands exactly
// one emoji, the glyph alone. Validate before writing anything; a bad
// entry must fail loudly here instead of shipping a zero.
const codePoints = [...ENTRY];
if (codePoints.length < 1 || codePoints.length > 16) {
  throw new Error(`entry must be 1-16 characters, got ${codePoints.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (codePoints.length !== 1) {
  throw new Error(`entry must be exactly one glyph, got ${codePoints.length}`);
}
if (!/^\p{Extended_Pictographic}$/u.test(ENTRY)) {
  throw new Error(`entry must be a single emoji, got ${JSON.stringify(ENTRY)}`);
}
const byteLen = Buffer.byteLength(ENTRY, "utf8");
if (byteLen < 1 || byteLen > 64) {
  throw new Error(`entry byte length out of range: ${byteLen}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
