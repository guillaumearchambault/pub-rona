import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'hero-1080x1920.png');

await sharp({
  create: {
    width: 1080,
    height: 1920,
    channels: 3,
    background: { r: 30, g: 58, b: 95 },
  },
})
  .png()
  .toFile(out);

console.log(`Wrote ${out}`);
