import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const themeBg = { r: 11, g: 18, b: 32, alpha: 1 }; // #0b1220 — matches theme-color / body
const navy = { r: 30, g: 58, b: 95 };

const ronaLogo = join(publicDir, 'rona-logo.png');
const faviconSvg = join(publicDir, 'favicon.svg');

/** ~12% of edge — matches common app-icon rounding; clamped for tiny/large sizes */
function radiusForSize(size) {
  return Math.max(6, Math.min(72, Math.round(size * 0.12)));
}

/** Clip a square PNG to a rounded rectangle (logo file is never modified). */
async function roundedSquarePng(imageBuffer, size) {
  const r = radiusForSize(size);
  const maskSvg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/>
    </svg>`
  );
  const mask = await sharp(maskSvg).resize(size, size).ensureAlpha().png().toBuffer();
  return sharp(imageBuffer).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png();
}

/**
 * Dock / installed PWA icons on macOS show transparent pixels as black.
 * Composite the rounded clip on an opaque theme square so there is no transparency.
 */
async function roundedSquarePngOpaque(imageBuffer, size) {
  const clipped = await roundedSquarePng(imageBuffer, size);
  const clippedBuf = await clipped.toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: themeBg.r, g: themeBg.g, b: themeBg.b },
    },
  }).composite([{ input: clippedBuf, left: 0, top: 0 }]).png();
}

function squareIconBuffer(sourcePath, size) {
  return sharp(sourcePath)
    .resize(size, size, {
      fit: 'contain',
      background: themeBg,
    })
    .png()
    .toBuffer();
}

async function writeSquaredIconNoRound(sourcePath, size, filename) {
  const buf = await squareIconBuffer(sourcePath, size);
  await sharp(buf).png().toFile(join(publicDir, filename));
  console.log(`Wrote ${join(publicDir, filename)} (square, tab/UI)`);
}

async function writeRoundedIcon(sourcePath, size, filename) {
  const buf = await squareIconBuffer(sourcePath, size);
  const out = await roundedSquarePngOpaque(buf, size);
  await out.toFile(join(publicDir, filename));
  console.log(`Wrote ${join(publicDir, filename)}`);
}

async function writeMaskableRounded(sourcePath) {
  const pad = 512;
  const inner = Math.round(pad * 0.62);
  const fgBuffer = await sharp(sourcePath)
    .resize(inner, inner, { fit: 'inside' })
    .png()
    .toBuffer();
  const buf = await sharp({
    create: {
      width: pad,
      height: pad,
      channels: 3,
      background: { r: themeBg.r, g: themeBg.g, b: themeBg.b },
    },
  })
    .composite([{ input: fgBuffer, gravity: 'center' }])
    .png()
    .toBuffer();
  const out = await roundedSquarePngOpaque(buf, pad);
  await out.toFile(join(publicDir, 'pwa-512-maskable.png'));
  console.log(`Wrote ${join(publicDir, 'pwa-512-maskable.png')}`);
}

async function writePlaceholderRounded(filename, size) {
  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: navy,
    },
  })
    .png()
    .toBuffer();
  const out = await roundedSquarePngOpaque(buf, size);
  await out.toFile(join(publicDir, filename));
  console.log(`Wrote ${join(publicDir, filename)} (placeholder)`);
}

async function writeFromImageSource(sourcePath) {
  /* Tab favicons: sharp square, no rounding — tiny sizes show halos from rounded masks. */
  await writeSquaredIconNoRound(sourcePath, 48, 'favicon.png');
  await writeSquaredIconNoRound(sourcePath, 192, 'favicon-192.png');
  /* Install / home screen: rounded on theme */
  await writeRoundedIcon(sourcePath, 192, 'pwa-192x192.png');
  await writeRoundedIcon(sourcePath, 512, 'pwa-512x512.png');
  await writeRoundedIcon(sourcePath, 180, 'apple-touch-icon.png');
  await writeMaskableRounded(sourcePath);
}

if (existsSync(ronaLogo)) {
  await writeFromImageSource(ronaLogo);
} else if (existsSync(faviconSvg)) {
  await writeFromImageSource(faviconSvg);
} else {
  await sharp({
    create: {
      width: 48,
      height: 48,
      channels: 3,
      background: navy,
    },
  })
    .png()
    .toFile(join(publicDir, 'favicon.png'));
  console.log(`Wrote ${join(publicDir, 'favicon.png')} (placeholder)`);
  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 3,
      background: navy,
    },
  })
    .png()
    .toFile(join(publicDir, 'favicon-192.png'));
  console.log(`Wrote ${join(publicDir, 'favicon-192.png')} (placeholder)`);
  await writePlaceholderRounded('pwa-192x192.png', 192);
  await writePlaceholderRounded('pwa-512x512.png', 512);
  await writePlaceholderRounded('apple-touch-icon.png', 180);
  await writePlaceholderRounded('pwa-512-maskable.png', 512);
}
