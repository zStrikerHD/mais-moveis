import { useId, useMemo, useState } from 'react'
import type { PropertyFilters, PropertyStatus } from '@/types/imovel'
import { facets, statusLabel } from '@/utils/catalog'
import { shortPrice } from '@/utils/format'
import { Select } from '@/components/ui/Select'
import { Field, Input } from '@/components/ui/Field'
import { RangeSlider, SwitchRow } from '@/components/ui/Controls'
import { PillGroup } from './PillGroup'

interface Props {
  filters: PropertyFilters
  onChange: (next: PropertyFilters) => void
}

const drop = <K extends keyof PropertyFilters>(f: PropertyFilters, key: K, value: PropertyFilters[K]): PropertyFilters => {
  const next = { ...f }
  if (value === undefined || value === '' || value === false || (typeof value === 'number' && Number.isNaN(value))) {
    delete next[key]
  } else {
    next[key] = value
  }
  return next
}

const num = (s: string): number | undefined => (s === '' ? undefined : Number(s))

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <fieldset className="border-0 p-0">
    <legend className="mb-2.5 text-[0.8125rem] font-medium text-stone">{title}</legend>
    {children}
  </fieldset>
)

/** Painel completo de filtros. Aplica em tempo real; usado na sidebar e nos Sheets. */
export function FiltersPanel({ filters, onChange }: Props) {
  const uid = useId()
  const f = useMemo(() => facets(), [])
  const set = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => onChange(drop(filters, key, value))

  const lo = filters.min ?? f.priceMin
  const hi = filters.max ?? f.priceMax
  const [preview, setPreview] = useState<[number, number] | null>(null)
  const shown = preview ?? [lo, hi]

  const commitPrice = ([a, b]: [number, number]) => {
    setPreview(null)
    let next = drop(filters, 'min', a <= f.priceMin ? undefined : a)
    next = drop(next, 'max', b >= f.priceMax ? undefined : b)
    onChange(next)
  }

  const statusOptions = (Object.keys(statusLabel) as PropertyStatus[]).map((s) => ({ value: s, label: statusLabel[s] }))

  return (
    <div className="flex flex-col gap-6">
      <Field label="Código ou palavra-chave" htmlFor={`${uid}-q`}>
        <Input
          id={`${uid}-q`}
          type="search"
          inputMode="search"
          placeholder="Ex.: 1930 ou Taiuva"
          value={filters.q ?? ''}
          onChange={(e) => set('q', e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4">
        <Field label="Cidade" htmlFor={`${uid}-cidade`}>
          <Select id={`${uid}-cidade`} value={filters.cidade} onChange={(v) => set('cidade', v)} options={f.cidades} allLabel="Todas as cidades" />
        </Field>
        <Field label="Bairro" htmlFor={`${uid}-bairro`}>
          <Select id={`${uid}-bairro`} value={filters.bairro} onChange={(v) => set('bairro', v)} options={f.bairros} allLabel="Todos os bairros" />
        </Field>
        <Field label="Tipo de imóvel" htmlFor={`${uid}-tipo`}>
          <Select id={`${uid}-tipo`} value={filters.tipo} onChange={(v) => set('tipo', v)} options={f.tipos} allLabel="Todos os tipos" />
        </Field>
      </div>

      <Group title="Faixa de preço">
        <div className="px-1">
          <RangeSlider
            min={f.priceMin}
            max={f.priceMax}
            step={5000}
            value={[Math.max(shown[0], f.priceMin), Math.min(shown[1], f.priceMax)]}
            onPreview={setPreview}
            onCommit={commitPrice}
            labels={['Preço mínimo', 'Preço máximo']}
          />
        </div>
        <div className="num mt-2 flex justify-between text-[0.875rem] text-brand-deep">
          <span>{shortPrice(shown[0])}</span>
          <span>{shortPrice(shown[1])}</span>
        </div>
      </Group>

      <Group title="Quartos">
        <PillGroup label="Quartos" value={filters.quartos} onChange={(v) => set('quartos', v)} />
      </Group>
      <Group title="Suítes">
        <PillGroup label="Suítes" value={filters.suites} onChange={(v) => set('suites', v)} options={[1, 2, 3]} />
      </Group>
      <Group title="Banheiros">
        <PillGroup label="Banheiros" value={filters.banheiros} onChange={(v) => set('banheiros', v)} />
      </Group>
      <Group title="Vagas">
        <PillGroup label="Vagas" value={filters.vagas} onChange={(v) => set('vagas', v)} />
      </Group>

      <Group title="Área total (m²)">
        <div className="grid grid-cols-2 gap-3">
          <Input
            aria-label="Área mínima em metros quadrados"
            inputMode="numeric"
            placeholder="Mínima"
            value={filters.amin ?? ''}
            onChange={(e) => set('amin', num(e.target.value.replace(/\D/g, '')))}
          />
          <Input
            aria-label="Área máxima em metros quadrados"
            inputMode="numeric"
            placeholder="Máxima"
            value={filters.amax ?? ''}
            onChange={(e) => set('amax', num(e.target.value.replace(/\D/g, '')))}
          />
        </div>
      </Group>

      <Group title="Condições">
        <div className="divide-y divide-line">
          <SwitchRow id={`${uid}-fin`} label="Aceita financiamento" checked={!!filters.fin} onChange={(v) => set('fin', v)} />
          <SwitchRow id={`${uid}-perm`} label="Aceita permuta" checked={!!filters.perm} onChange={(v) => set('perm', v)} />
          <SwitchRow id={`${uid}-lanc`} label="Lançamento" checked={!!filters.lanc} onChange={(v) => set('lanc', v)} />
          <SwitchRow id={`${uid}-ref`} label="Reforma / construção" checked={!!filters.reforma} onChange={(v) => set('reforma', v)} />
        </div>
      </Group>

      <Field label="Situação" htmlFor={`${uid}-status`}>
        <Select id={`${uid}-status`} value={filters.status} onChange={(v) => set('status', v as PropertyStatus | undefined)} options={statusOptions} allLabel="Disponíveis e reservados" />
      </Field>
    </div>
  )
}
