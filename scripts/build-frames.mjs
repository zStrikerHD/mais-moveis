/**
 * Converte os 120 PNGs do time-lapse em sequências WebP otimizadas.
 *   public/frames/d/0001.webp ... 120 frames, 1440px (desktop/tablet)
 *   public/frames/m/0001.webp ...  60 frames, recorte vertical 560x864 (celular)
 *   public/frames/poster.webp      primeiro frame leve para o primeiro paint
 *
 * Uso: node scripts/build-frames.mjs
 */
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.resolve(root, '..', 'ezgif-50336ed0e2d10a8f-png-split')
const out = path.join(root, 'public', 'frames')

const files = (await readdir(src)).filter((f) => f.endsWith('.png')).sort()
await mkdir(path.join(out, 'd'), { recursive: true })
await mkdir(path.join(out, 'm'), { recursive: true })

const pad = (n) => String(n).padStart(4, '0')

let m = 0
for (let i = 0; i < files.length; i++) {
  const input = path.join(src, files[i])
  await sharp(input)
    .resize({ width: 1280 })
    .webp({ quality: 50, effort: 5 })
    .toFile(path.join(out, 'd', `${pad(i + 1)}.webp`))

  if (i % 2 === 0 || i === files.length - 1) {
    m++
    await sharp(input)
      .extract({ left: 600, top: 0, width: 780, height: 1080 })
      .resize({ width: 560 })
      .webp({ quality: 55, effort: 5 })
      .toFile(path.join(out, 'm', `${pad(m)}.webp`))
  }
}

await sharp(path.join(src, files[0]))
  .resize({ width: 960 })
  .webp({ quality: 55 })
  .toFile(path.join(out, 'poster.webp'))

console.log(`desktop: ${files.length} frames, mobile: ${m} frames`)

