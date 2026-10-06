import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id?: string
  value: string | undefined
  onChange: (value: string | undefined) => void
  options: SelectOption[]
  /** Texto da opção "sem filtro" (ex.: "Todos os bairros"). */
  allLabel: string
  'aria-label'?: string
  className?: string
}

const ALL = '__all__'

/** Select acessível (Radix) com visual do design system. `undefined` = sem filtro. */
export function Select({ id, value, onChange, options, allLabel, className, ...aria }: SelectProps) {
  return (
    <RadixSelect.Root value={value ?? ALL} onValueChange={(v) => onChange(v === ALL ? undefined : v)}>
      <RadixSelect.Trigger
        id={id}
        aria-label={aria['aria-label']}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-line-strong bg-white px-3.5 text-left text-[0.9375rem]',
          'transition-colors hover:border-brand/50 data-[state=open]:border-brand',
          value ? 'text-ink' : 'text-stone',
          className,
        )}
      >
        <span className="truncate">
          <RadixSelect.Value />
        </span>
        <ChevronDown size={16} strokeWidth={1.75} className="shrink-0 text-stone" aria-hidden />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className="select-content z-[var(--z-lightbox)] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[var(--radius-md)] border border-line bg-white p-1 shadow-float"
        >
          <RadixSelect.Viewport>
            {[{ value: ALL, label: allLabel }, ...options].map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="relative flex h-10 cursor-pointer select-none items-center rounded-[var(--radius-xs)] pl-8 pr-3 text-[0.9375rem] outline-none data-[highlighted]:bg-brand-mist data-[state=checked]:font-medium"
              >
                <RadixSelect.ItemIndicator className="absolute left-2.5 text-gold-deep">
                  <Check size={15} strokeWidth={2} />
                </RadixSelect.ItemIndicator>
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
