import { useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { PropertyFilters } from '@/types/imovel'
import { allProperties, catalog, facets, serializeFilters } from '@/utils/catalog'
import { propertyPath, shortPrice } from '@/utils/format'
import { track } from '@/utils/analytics'
import { Select } from '@/components/ui/Select'
import { Field, Input } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { FiltersPanel } from './FiltersPanel'

const BANDS = [
  { value: '0-300000', min: undefined, max: 300000 },
  { value: '300000-600000', min: 300000, max: 600000 },
  { value: '600000-1000000', min: 600000, max: 1000000 },
  { value: '1000000-2000000', min: 1000000, max: 2000000 },
  { value: '2000000-', min: 2000000, max: undefined },
] as const

const bandLabel = (b: (typeof BANDS)[number]): string =>
  b.min === undefined ? `Até ${shortPrice(b.max!)}` : b.max === undefined ? `Acima de ${shortPrice(b.min)}` : `${shortPrice(b.min)} a ${shortPrice(b.max)}`

const QUARTOS = [1, 2, 3, 4].map((n) => ({ value: String(n), label: `${n}+ quartos` }))

/** Busca rápida da home. "Mais filtros" abre o painel completo num Sheet. */
export function QuickSearch() {
  const uid = useId()
  const navigate = useNavigate()
  const f = useMemo(() => facets(), [])
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [band, setBand] = useState<string | undefined>()
  const [code, setCode] = useState('')
  const [open, setOpen] = useState(false)

  const effective = (): PropertyFilters => {
    const b = BANDS.find((x) => x.value === band)
    const next: PropertyFilters = { ...filters }
    if (code.trim()) next.q = code.trim()
    if (b) {
      if (b.min !== undefined) next.min = b.min
      if (b.max !== undefined) next.max = b.max
    }
    return next
  }

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const next = effective()
    const exact = code.trim() && allProperties().find((p) => p.codigo === code.trim())
    track('search_completed', { origin: 'home', results: catalog(next).length })
    if (exact && Object.keys(filters).length === 0 && !band) {
      navigate(propertyPath(exact))
      return
    }
    const qs = serializeFilters(next, 'recentes').toString()
    navigate(`/imoveis${qs ? `?${qs}` : ''}`)
  }

  const count = catalog(effective()).length

  return (
    <section aria-label="Buscar imóveis" className="relative z-10 -mt-px bg-paper">
      <div className="container-site">
        <form
          onSubmit={submit}
          className="relative -mt-10 grid gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-5 shadow-float sm:grid-cols-2 md:-mt-14 md:p-6 lg:grid-cols-[1fr_1fr_1fr_0.8fr_auto] lg:items-end"
        >
          <Field label="Tipo" htmlFor={`${uid}-tipo`}>
            <Select id={`${uid}-tipo`} value={filters.tipo} onChange={(v) => setFilters((s) => ({ ...s, tipo: v }))} options={f.tipos} allLabel="Todos os tipos" />
          </Field>
          <Field label="Bairro" htmlFor={`${uid}-bairro`}>
            <Select id={`${uid}-bairro`} value={filters.bairro} onChange={(v) => setFilters((s) => ({ ...s, bairro: v }))} options={f.bairros} allLabel="Todos os bairros" />
          </Field>
          <Field label="Faixa de preço" htmlFor={`${uid}-preco`}>
            <Select
              id={`${uid}-preco`}
              value={band}
              onChange={setBand}
              options={BANDS.map((b) => ({ value: b.value, label: bandLabel(b) }))}
              allLabel="Qualquer valor"
            />
          </Field>
          <Field label="Quartos" htmlFor={`${uid}-quartos`}>
            <Select
              id={`${uid}-quartos`}
              value={filters.quartos ? String(filters.quartos) : undefined}
              onChange={(v) => setFilters((s) => ({ ...s, quartos: v ? Number(v) : undefined }))}
              options={QUARTOS}
              allLabel="Qualquer"
            />
          </Field>
          <Button type="submit" $size="lg" className="sm:col-span-2 lg:col-span-1">
            <Search size={18} strokeWidth={1.75} aria-hidden />
            Buscar
          </Button>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:col-span-2 sm:flex-row sm:items-end sm:justify-between lg:col-span-5">
            <Field label="Já tem o código do imóvel?" htmlFor={`${uid}-code`} className="sm:w-72">
              <Input id={`${uid}-code`} inputMode="numeric" placeholder="Ex.: 1930" value={code} onChange={(e) => setCode(e.target.value)} />
            </Field>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full px-4 text-[0.9375rem] font-medium text-brand-deep transition-colors hover:bg-brand-mist sm:self-auto"
            >
              <SlidersHorizontal size={17} strokeWidth={1.75} aria-hidden />
              Mais filtros
            </button>
          </div>
        </form>
      </div>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="Mais filtros"
        description="Refine por cidade, preço, áreas, condições e mais."
        footer={
          <div className="flex gap-3">
            <Button type="button" $variant="outline" onClick={() => setFilters({})}>
              Limpar
            </Button>
            <Button
              type="button"
              $block
              onClick={() => {
                setOpen(false)
                submit()
              }}
            >
              Ver {count} {count === 1 ? 'imóvel' : 'imóveis'}
            </Button>
          </div>
        }
      >
        <FiltersPanel filters={filters} onChange={setFilters} />
      </Sheet>
    </section>
  )
}
