import type { Imovel } from '@/types/imovel'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})
const nf = new Intl.NumberFormat('pt-BR')

export const formatPrice = (value: number | null): string =>
  value === null ? 'Sob consulta' : brl.format(value)

export const formatNumber = (n: number): string => nf.format(n)

/** Rótulo compacto para filtros: "R$ 650 mil" / "R$ 1,2 mi". */
export const shortPrice = (n: number): string =>
  n >= 1_000_000
    ? `R$ ${(n / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi`
    : `R$ ${Math.round(n / 1000)} mil`
export const formatArea = (n: number): string => `${nf.format(n)} m²`

export const plural = (n: number, one: string, many: string): string =>
  `${nf.format(n)} ${n === 1 ? one : many}`

export const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** URL amigável: `/imovel/1930-sobrado-com-3-quartos-no-jardim-dona-emilia` */
export const propertySlug = (p: Imovel): string => `${p.codigo}-${slugify(p.titulo)}`

export const propertyPath = (p: Imovel): string => `/imovel/${propertySlug(p)}`

/** Linha de resumo para cards: "3 quartos · 2 vagas · 163 m²" */
export const propertySummary = (p: Imovel): string[] => {
  const parts: string[] = []
  if (p.quartos) parts.push(plural(p.quartos, 'quarto', 'quartos'))
  if (p.vagas) parts.push(plural(p.vagas, 'vaga', 'vagas'))
  const area = p.areaConstruida ?? p.areaTotal
  if (area) parts.push(formatArea(area))
  return parts
}
