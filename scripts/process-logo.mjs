import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SOURCE =
  process.argv[2] || path.join(root, 'assets', 'logo-source.png');

const PUBLIC = path.join(root, 'client', 'public');

const isNearWhite = (r, g, b, threshold = 245) =>
  r >= threshold && g >= threshold && b >= threshold;

const isRed = (r, g, b) => r > 160 && g < 100 && b < 100 && r > g + 40;

const isDark = (r, g, b) => r < 80 && g < 80 && b < 80;

const processPixels = (data, mode = 'default') => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isNearWhite(r, g, b)) {
      data[i + 3] = 0;
      continue;
    }

    if (mode === 'light' && isDark(r, g, b) && !isRed(r, g, b)) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
};

const buildLogo = async (mode) => {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  processPixels(pixels, mode);

  const trimmed = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  return trimmed;
};

const main = async () => {
  const logoDefault = await buildLogo('default');
  const logoLight = await buildLogo('light');

  await sharp(logoDefault)
    .resize({ height: 80, withoutEnlargement: false })
    .png()
    .toFile(path.join(PUBLIC, 'logo.png'));

  await sharp(logoLight)
    .resize({ height: 80, withoutEnlargement: false })
    .png()
    .toFile(path.join(PUBLIC, 'logo-light.png'));

  await sharp(logoDefault)
    .resize({ height: 32, withoutEnlargement: false })
    .png()
    .toFile(path.join(PUBLIC, 'favicon.png'));

  console.log('Logo assets created:');
  console.log('  client/public/logo.png       (transparent, for light backgrounds)');
  console.log('  client/public/logo-light.png (transparent, for dark backgrounds)');
  console.log('  client/public/favicon.png');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
