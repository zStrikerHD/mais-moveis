import type { Imovel } from '@/types/imovel'
import { Badge, type BadgeTone } from '@/components/ui/Badge'

interface Flag {
  label: string
  tone: BadgeTone
}

/** Todas as condições aplicáveis, em ordem de prioridade. */
export function propertyFlags(p: Imovel): Flag[] {
  const flags: Flag[] = []
  if (p.status === 'vendido') flags.push({ label: 'Vendido', tone: 'dark' })
  if (p.status === 'reservado') flags.push({ label: 'Reservado', tone: 'gold' })
  if (p.status === 'sob-consulta') flags.push({ label: 'Sob consulta', tone: 'muted' })
  if (p.lancamento) flags.push({ label: 'Lançamento', tone: 'brand' })
  if (p.reforma) flags.push({ label: 'Reforma / construção', tone: 'neutral' })
  if (p.financiamento) flags.push({ label: 'Aceita financiamento', tone: 'neutral' })
  if (p.permuta) flags.push({ label: 'Aceita permuta', tone: 'neutral' })
  if (p.negociavel) flags.push({ label: 'Negociável', tone: 'neutral' })
  return flags
}

/** Cards: no máximo UM selo, o mais relevante, para não poluir a foto. */
export function PrimaryBadge({ property }: { property: Imovel }) {
  const flag = propertyFlags(property).find((f) => f.label !== 'Sob consulta' && f.label !== 'Negociável')
  if (!flag) return null
  const short = flag.label === 'Aceita financiamento' ? 'Financiável' : flag.label === 'Aceita permuta' ? 'Permuta' : flag.label
  return <Badge $tone={flag.tone}>{short}</Badge>
}

/** Página do imóvel: todos os selos aplicáveis. */
export function BadgeList({ property }: { property: Imovel }) {
  const flags = propertyFlags(property)
  if (flags.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Condições do imóvel">
      {flags.map((f) => (
        <li key={f.label}>
          <Badge $tone={f.tone === 'neutral' ? 'muted' : f.tone}>{f.label}</Badge>
        </li>
      ))}
    </ul>
  )
}
