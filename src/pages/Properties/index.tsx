import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import type { PropertyFilters, SortKey } from '@/types/imovel'
import { activeFilterCount, catalog, parseFilters, serializeFilters, sortProperties } from '@/utils/catalog'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { EmptyState } from '@/components/ui/EmptyState'
import { FiltersPanel } from '@/components/filters/FiltersPanel'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { HeroBackground } from '@/components/ui/HeroBackground'

const SORTS = [
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'area', label: 'Maior área' },
  { value: 'quartos', label: 'Mais quartos' },
]

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const { filters, sort } = useMemo(() => parseFilters(params), [params])
  const [sheet, setSheet] = useState(false)

  const results = useMemo(() => sortProperties(catalog(filters), sort), [filters, sort])
  const active = activeFilterCount(filters)

  const update = useCallback(
    (next: PropertyFilters, nextSort: SortKey = sort) => {
      setParams(serializeFilters(next, nextSort), { replace: true })
    },
    [setParams, sort],
  )

  const onFilters = (next: PropertyFilters) => {
    const changed = Object.keys(next).find((k) => (next as Record<string, unknown>)[k] !== (filters as Record<string, unknown>)[k])
    if (changed) track('filter_used', { filter: changed })
    update(next)
  }

  const clear = () => update({}, 'recentes')

  const cityHint = filters.tipo ? '' : ''
  const heading = 'Imóveis à venda em Jaú e região'

  return (
    <>
      <Seo
        title="Imóveis à venda em Jaú/SP"
        description="Veja casas, sobrados, chácaras, terrenos e apartamentos à venda em Jaú e região. Filtre por bairro, tipo, preço, quartos e condições."
        path="/imoveis"
      />
      <section className="relative overflow-hidden bg-sand pb-10 pt-32 md:pb-14 md:pt-40">
        <HeroBackground src="/hero/imoveis.jpg" alt="Vista aérea de Jaú" position="object-center" />
        <div className="container-site relative z-10">
          <p className="eyebrow mb-4">Catálogo</p>
          <h1 className="display max-w-[20ch] !text-[clamp(2rem,4.4vw,3.25rem)]">{heading}</h1>
          <p className="num mt-4 text-stone" aria-live="polite">
            {results.length === 0
              ? 'Nenhum imóvel encontrado'
              : `${results.length} ${results.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`}
            {cityHint}
          </p>
        </div>
      </section>

      <section className="section-y !pt-8 md:!pt-12">
        <div className="container-site grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-12">
          <aside className="hidden lg:block" aria-label="Filtros">
            <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pr-3 pb-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-medium">Filtros</h2>
                {active > 0 && (
                  <button type="button" onClick={clear} className="text-sm font-medium text-brand underline decoration-gold underline-offset-4">
                    Limpar filtros
                  </button>
                )}
              </div>
              <FiltersPanel filters={filters} onChange={onFilters} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-end justify-between gap-3">
              <Button type="button" $variant="outline" onClick={() => setSheet(true)} className="lg:hidden">
                <SlidersHorizontal size={16} strokeWidth={1.75} aria-hidden />
                Filtros{active > 0 ? ` (${active})` : ''}
              </Button>
              <div className="ml-auto flex w-full max-w-60 flex-col gap-1.5">
                <label htmlFor="ordem" className="sr-only">
                  Ordenar por
                </label>
                <Select
                  id="ordem"
                  value={sort === 'recentes' ? undefined : sort}
                  onChange={(v) => update(filters, (v as SortKey | undefined) ?? 'recentes')}
                  options={SORTS}
                  allLabel="Mais recentes"
                  aria-label="Ordenar por"
                />
              </div>
            </div>

            {results.length > 0 ? (
              <PropertyGrid items={results} />
            ) : (
              <EmptyState
                title="Nenhum imóvel corresponde aos filtros selecionados."
                text="Tente ampliar a faixa de preço ou remover alguma condição."
                actionLabel="Limpar filtros"
                onAction={clear}
              />
            )}
          </div>
        </div>
      </section>

      <Sheet
        open={sheet}
        onOpenChange={setSheet}
        title="Filtros"
        footer={
          <div className="flex gap-3">
            <Button type="button" $variant="outline" onClick={clear} disabled={active === 0}>
              <X size={16} strokeWidth={1.75} aria-hidden />
              Limpar
            </Button>
            <Button type="button" $block onClick={() => setSheet(false)}>
              Ver {results.length} {results.length === 1 ? 'imóvel' : 'imóveis'}
            </Button>
          </div>
        }
      >
        <FiltersPanel filters={filters} onChange={onFilters} />
      </Sheet>
    </>
  )
}
