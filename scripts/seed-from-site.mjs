/**
 * Seed único: lê os imóveis do site atual, baixa as fotos como WebP e gera
 * `src/data/_seed.json`. Depois da primeira execução, edite apenas
 * `src/data/properties.ts` — este script não precisa ser rodado de novo.
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://www.maisimoveisjau.com.br'

const html = await (await fetch(BASE + '/')).text()
const links = [...new Set([...html.matchAll(/href="(https:\/\/www\.maisimoveisjau\.com\.br\/imovel\/\d+\/[^"]+)"/g)].map((m) => m[1]))]
console.log(links.length, 'imóveis')

const strip = (s) => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/[ \t]+/g, ' ').trim()
const num = (s) => (s ? Number(s.replace(/\./g, '').replace(',', '.')) : undefined)

const out = []
for (const url of links) {
  const page = await (await fetch(url)).text()
  const codigo = url.match(/imovel\/(\d+)\//)[1]
  const h1 = strip(page.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? '')
  const imgs = [...new Set([...page.matchAll(/https:\/\/newmobby\.com\.br\/storage\/[^"']+\/imoveis\/\d+\/md\/[^"']+\.jpg/g)].map((m) => m[0]))]
  const icons = strip(page.match(/imovel-icones[\s\S]*?<\/div>\s*<\/div>\s*(?=\s*<div class="mb-5">|\s*<hr)/)?.[0] ?? '')
  const iconsRaw = page.match(/imovel-icones gx-4[\s\S]*?(?=<div class="mb-5">)/)?.[0] ?? ''
  const pick = (re) => num(iconsRaw.replace(/<[^>]+>/g, ' ').match(re)?.[1])
  const flat = iconsRaw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  const descBlock = page.match(/<h2>Descri[\s\S]*?<div>([\s\S]*?)<\/div>/)?.[1] ?? ''
  const feats = [...(page.match(/<h2>Caracter[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? '').matchAll(/<div class="col-sm-6 col-lg-4">([\s\S]*?)<\/div>/g)].map((m) => strip(m[1]))
  const valor = page.match(/imovel-valor__value">\s*([^<]+)</)?.[1]?.trim()
  const corretor = strip(page.match(/corretor__nome">([\s\S]*?)</)?.[1] ?? '')
  const creci = strip(page.match(/corretor__creci">([\s\S]*?)</)?.[1] ?? '')

  const dir = path.join(root, 'public', 'imoveis', codigo)
  await mkdir(dir, { recursive: true })
  const files = []
  let n = 0
  for (const img of imgs.slice(0, 12)) {
    n++
    const buf = Buffer.from(await (await fetch(img)).arrayBuffer())
    const name = String(n).padStart(2, '0')
    await sharp(buf).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(dir, `${name}.webp`))
    await sharp(buf).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(dir, `${name}-sm.webp`))
    files.push(`/imoveis/${codigo}/${name}.webp`)
  }
  out.push({
    codigo, url, h1, valor,
    quartos: pick(/([\d.,]+)\s*quartos?/), suites: pick(/sendo\s*([\d.,]+)\s*su/),
    banheiros: pick(/([\d.,]+)\s*banheiros?/), vagas: pick(/([\d.,]+)\s*vagas?/),
    areaTotal: pick(/([\d.,]+)\s*m²\s*área total/i), areaConstruida: pick(/([\d.,]+)\s*m²\s*área constru/i),
    flat, descricao: strip(descBlock), caracteristicas: feats, corretor, creci, imagens: files,
  })
  console.log(codigo, h1, files.length, 'fotos')
}
await writeFile(path.join(root, 'src', 'data', '_seed.json'), JSON.stringify(out, null, 2))
