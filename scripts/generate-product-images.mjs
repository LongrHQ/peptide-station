/**
 * Peptide Station — Product Image Generator
 *
 * Uses fal.ai flux/dev (nano-banna-pro style) to generate
 * clinical 1:1 product images matching the reference aesthetic:
 * white/cream textured background, glass vial + pen device,
 * clean pharmaceutical labeling.
 *
 * Usage (from packages/medsy-minimal):
 *   node scripts/generate-product-images.mjs
 *
 * Outputs to: public/images/products/
 */

import { fal } from '@fal-ai/client';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load .env.local ──────────────────────────────────────────
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  });
}

if (!process.env.FAL_AI_SECRET_KEY) {
  console.error('❌  FAL_AI_SECRET_KEY not found in .env.local');
  process.exit(1);
}

fal.config({ credentials: process.env.FAL_AI_SECRET_KEY });

// ── Output directory ─────────────────────────────────────────
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Shared style prompt ──────────────────────────────────────
// Matches the reference image: cream textured paper background,
// pharmaceutical glass vial/pen, clean black serif label typography,
// clinical overhead lighting, 1:1 square format.
const STYLE =
  'product photography, square format, cream textured paper background, soft studio lighting, clinical pharmaceutical aesthetic, shot from slightly above, minimalist composition, high detail, sharp focus, no shadows clipping, white label with clean black serif typography';

// ── Product definitions ──────────────────────────────────────
const PRODUCTS = [
  {
    filename: 'bpc-157-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "BPC-157" and "BODY PROTECTION COMPOUND 157" and "5mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'tb-500-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "TB-500" and "THYMOSIN BETA-4 FRAGMENT" and "5mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'ghk-cu-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "GHK-Cu" and "COPPER PEPTIDE COMPLEX" and "50mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'sermorelin-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "SERMORELIN" and "GROWTH HORMONE SECRETAGOGUE" and "2mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'ipamorelin-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "IPAMORELIN" and "GH SECRETAGOGUE" and "2mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'cjc-1295-pen.jpg',
    prompt: `A premium peptide injection pen device lying next to a small pharmaceutical glass vial labeled "CJC-1295" and "GHRH ANALOGUE" and "2mg/vial" in clean black serif font, ${STYLE}`,
  },
  {
    filename: 'recovery-stack.jpg',
    prompt: `Two premium peptide injection pens side by side next to two small pharmaceutical glass vials labeled "BPC-157" and "TB-500" respectively, with a small card reading "RECOVERY STACK", ${STYLE}`,
  },
  {
    filename: 'starter-kit.jpg',
    prompt: `A flat lay of a peptide starter kit: one premium metal injection pen, a glass vial, several needle tips, two alcohol swabs, a compact sharps bin, and a folded instruction card, all arranged neatly on cream textured paper, ${STYLE}`,
  },
  {
    filename: 'pen-device.jpg',
    prompt: `A single premium metal peptide injection pen device, cap on, engraved with "PEPTIDE STATION" on the barrel, lying diagonally on cream textured paper, ${STYLE}`,
  },
  {
    filename: 'cartridge-refill.jpg',
    prompt: `Three small pharmaceutical glass vials in a row, each labeled "PEPTIDE STATION CARTRIDGE REFILL" with clean black serif font, lying on cream textured paper, ${STYLE}`,
  },
];

// ── Download helper ───────────────────────────────────────────
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// ── Generate ─────────────────────────────────────────────────
async function generate() {
  console.log(`\n🎨  Generating ${PRODUCTS.length} product images via fal.ai flux/dev\n`);

  for (const product of PRODUCTS) {
    const destPath = path.join(OUTPUT_DIR, product.filename);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭   Skipping ${product.filename} (already exists)`);
      continue;
    }

    process.stdout.write(`⏳  Generating ${product.filename}...`);

    try {
      const result = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt: product.prompt,
          image_size: 'square_hd',   // 1:1 square, high definition
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: true,
        },
      });

      const imageUrl = result?.data?.images?.[0]?.url;
      if (!imageUrl) {
        console.log(' ❌  No image URL in response');
        console.log('  Response:', JSON.stringify(result?.data, null, 2));
        continue;
      }

      await downloadFile(imageUrl, destPath);
      console.log(` ✅  Saved to public/images/products/${product.filename}`);

    } catch (err) {
      console.log(` ❌  Failed: ${err.message}`);
    }
  }

  console.log('\n✨  Done. Images saved to public/images/products/');
  console.log('    Update your Google Sheet image paths to /images/products/<filename>');
}

generate().catch((err) => {
  console.error('❌  Fatal:', err.message || err);
  process.exit(1);
});
