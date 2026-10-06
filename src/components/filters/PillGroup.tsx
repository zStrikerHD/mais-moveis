import { cn } from '@/utils/cn'

interface PillGroupProps {
  label: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  options?: number[]
}

/** "Qualquer · 1+ · 2+ · 3+ · 4+" — grupo de rádio acessível. */
export function PillGroup({ label, value, onChange, options = [1, 2, 3, 4] }: PillGroupProps) {
  const items: { v: number | undefined; text: string }[] = [
    { v: undefined, text: 'Qualquer' },
    ...options.map((n) => ({ v: n, text: `${n}+` })),
  ]
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((it) => {
        const active = it.v === value
        return (
          <button
            key={it.text}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(it.v)}
            className={cn(
              'num h-9 min-w-11 rounded-full border px-3.5 text-[0.875rem] transition-colors',
              active
                ? 'border-brand bg-brand text-white'
                : 'border-line-strong bg-white text-brand-deep hover:border-brand/60',
            )}
          >
            {it.text}
          </button>
        )
      })}
    </div>
  )
}
