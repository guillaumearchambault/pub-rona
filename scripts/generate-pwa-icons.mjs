import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const navy = { r: 30, g: 58, b: 95 };

async function writeSquarePng(filename, size) {
  const out = join(publicDir, filename);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: navy,
    },
  })
    .png()
    .toFile(out);
  console.log(`Wrote ${out}`);
}

await writeSquarePng('pwa-192x192.png', 192);
await writeSquarePng('pwa-512x512.png', 512);
await writeSquarePng('apple-touch-icon.png', 180);
