import { imoveis } from '@/data/properties'
import type { Imovel, PropertyFilters, PropertyStatus, SortKey } from '@/types/imovel'
import { propertySlug, slugify } from './format'

/* ------------------------------------------------------------------ acesso */

export const allProperties = (): Imovel[] => imoveis

export const findBySlug = (slug: string): Imovel | undefined => {
  const codigo = slug.split('-')[0]
  return imoveis.find((p) => p.codigo === codigo || propertySlug(p) === slug)
}

const isVisible = (p: Imovel): boolean => p.status !== 'vendido'

/* ------------------------------------------------------------------ filtros */

export function filterProperties(list: Imovel[], f: PropertyFilters): Imovel[] {
  const q = f.q ? slugify(f.q) : ''
  return list.filter((p) => {
    if (q) {
      const haystack = slugify(`${p.codigo} ${p.titulo} ${p.bairro} ${p.tipo}`)
      if (!haystack.includes(q)) return false
    }
    if (f.cidade && slugify(p.cidade) !== f.cidade) return false
    if (f.bairro && slugify(p.bairro) !== f.bairro) return false
    if (f.tipo && slugify(p.tipo) !== f.tipo) return false
    if (f.min !== undefined && (p.preco === null || p.preco < f.min)) return false
    if (f.max !== undefined && (p.preco === null || p.preco > f.max)) return false
    if (f.quartos !== undefined && (p.quartos ?? 0) < f.quartos) return false
    if (f.suites !== undefined && (p.suites ?? 0) < f.suites) return false
    if (f.banheiros !== undefined && (p.banheiros ?? 0) < f.banheiros) return false
    if (f.vagas !== undefined && (p.vagas ?? 0) < f.vagas) return false
    const area = p.areaTotal ?? p.areaConstruida ?? 0
    if (f.amin !== undefined && area < f.amin) return false
    if (f.amax !== undefined && area > f.amax) return false
    if (f.fin && !p.financiamento) return false
    if (f.perm && !p.permuta) return false
    if (f.lanc && !p.lancamento) return false
    if (f.reforma && !p.reforma) return false
    if (f.status && p.status !== f.status) return false
    return true
  })
}

/** Catálogo público: imóveis vendidos só aparecem quando o filtro pede. */
export const catalog = (f: PropertyFilters): Imovel[] =>
  filterProperties(f.status ? imoveis : imoveis.filter(isVisible), f)

/* ----------------------------------------------------------------- ordenação */

const codeNum = (p: Imovel): number => Number(p.codigo) || p.id

export function sortProperties(list: Imovel[], key: SortKey): Imovel[] {
  const copy = [...list]
  const price = (p: Imovel, fallback: number) => p.preco ?? fallback
  switch (key) {
    case 'menor-preco':
      return copy.sort((a, b) => price(a, Infinity) - price(b, Infinity))
    case 'maior-preco':
      return copy.sort((a, b) => price(b, -Infinity) - price(a, -Infinity))
    case 'area':
      return copy.sort((a, b) => (b.areaTotal ?? 0) - (a.areaTotal ?? 0))
    case 'quartos':
      return copy.sort((a, b) => (b.quartos ?? 0) - (a.quartos ?? 0))
    case 'recentes':
    default:
      return copy.sort((a, b) => (b.publicadoEm ?? '').localeCompare(a.publicadoEm ?? '') || codeNum(b) - codeNum(a))
  }
}

/* ------------------------------------------------------- seleções da home */

const withPrice = (): Imovel[] => imoveis.filter((p) => isVisible(p) && p.preco !== null)

export const nearYou = (): Imovel[] => sortProperties(imoveis.filter((p) => isVisible(p) && p.proximo), 'recentes')

export const cheapestFirst = (): Imovel[] => [...withPrice()].sort((a, b) => (a.preco ?? 0) - (b.preco ?? 0))

export const priciestFirst = (): Imovel[] => [...withPrice()].sort((a, b) => (b.preco ?? 0) - (a.preco ?? 0))

/**
 * "Para descobrir": mistura tipos diferentes. Rotação diária determinística
 * (mesma ordem durante o dia, muda no dia seguinte) — sem backend e sem aleatório
 * que quebre o layout entre renders.
 */
export function discover(limit = 8, today = new Date()): Imovel[] {
  const seed = today.getFullYear() * 372 + today.getMonth() * 31 + today.getDate()
  const pool = imoveis.filter(isVisible)
  const byType = new Map<string, Imovel[]>()
  for (const p of pool) byType.set(p.tipo, [...(byType.get(p.tipo) ?? []), p])
  const groups = [...byType.values()]
  const out: Imovel[] = []
  for (let round = 0; out.length < Math.min(limit, pool.length); round++) {
    for (const g of groups) {
      const item = g[(seed + round) % g.length]
      if (item && !out.includes(item)) out.push(item)
      if (out.length >= limit) break
    }
    if (round > pool.length) break
  }
  return out
}

export const featured = (): Imovel[] => imoveis.filter((p) => isVisible(p) && p.destaque)

export function similarTo(p: Imovel, limit = 6): Imovel[] {
  const score = (o: Imovel): number => {
    let s = 0
    if (o.tipo === p.tipo) s += 3
    if (o.bairro === p.bairro) s += 2
    if (p.preco && o.preco) s += 2 - Math.min(2, Math.abs(Math.log(o.preco / p.preco)))
    return s
  }
  return imoveis
    .filter((o) => o.id !== p.id && isVisible(o))
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit)
}

/* -------------------------------------------------------------------- facets */

export interface Option { value: string; label: string }

const uniqueOptions = (values: string[]): Option[] =>
  [...new Map(values.map((v) => [slugify(v), v])).entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))

export const facets = () => {
  const list = imoveis.filter(isVisible)
  const prices = list.map((p) => p.preco).filter((n): n is number => n !== null)
  const areas = list.map((p) => p.areaTotal ?? 0).filter(Boolean)
  return {
    tipos: uniqueOptions(list.map((p) => p.tipo)),
    bairros: uniqueOptions(list.map((p) => p.bairro)),
    cidades: uniqueOptions(list.map((p) => p.cidade)),
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    areaMax: Math.max(...areas),
  }
}

/* ------------------------------------------------------------ URL <-> filtros */

const NUM_KEYS = ['min', 'max', 'quartos', 'suites', 'banheiros', 'vagas', 'amin', 'amax'] as const
const BOOL_KEYS = ['fin', 'perm', 'lanc', 'reforma'] as const
const STR_KEYS = ['q', 'cidade', 'bairro', 'tipo'] as const
const STATUSES: PropertyStatus[] = ['disponivel', 'reservado', 'vendido', 'sob-consulta']
const SORTS: SortKey[] = ['recentes', 'menor-preco', 'maior-preco', 'area', 'quartos']

export function parseFilters(sp: URLSearchParams): { filters: PropertyFilters; sort: SortKey } {
  const filters: PropertyFilters = {}
  for (const k of STR_KEYS) {
    const v = sp.get(k)
    if (v) filters[k] = v
  }
  for (const k of NUM_KEYS) {
    const v = sp.get(k)
    if (v !== null && v !== '' && !Number.isNaN(Number(v))) filters[k] = Number(v)
  }
  for (const k of BOOL_KEYS) if (sp.get(k) === '1') filters[k] = true
  const status = sp.get('status') as PropertyStatus | null
  if (status && STATUSES.includes(status)) filters.status = status
  const s = sp.get('ordem') as SortKey | null
  return { filters, sort: s && SORTS.includes(s) ? s : 'recentes' }
}

export function serializeFilters(filters: PropertyFilters, sort: SortKey): URLSearchParams {
  const sp = new URLSearchParams()
  for (const k of STR_KEYS) if (filters[k]) sp.set(k, String(filters[k]))
  for (const k of NUM_KEYS) if (filters[k] !== undefined) sp.set(k, String(filters[k]))
  for (const k of BOOL_KEYS) if (filters[k]) sp.set(k, '1')
  if (filters.status) sp.set('status', filters.status)
  if (sort !== 'recentes') sp.set('ordem', sort)
  return sp
}

export const activeFilterCount = (f: PropertyFilters): number => Object.keys(f).length

export const statusLabel: Record<PropertyStatus, string> = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
  'sob-consulta': 'Sob consulta',
}
