import { Heart } from 'lucide-react'
import type { Imovel } from '@/types/imovel'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/utils/cn'

interface Props {
  property: Imovel
  /** `surface`: botão circular sobre foto; `inline`: botão com texto (página do imóvel). */
  variant?: 'surface' | 'inline'
  className?: string
}

export function FavoriteButton({ property, variant = 'surface', className }: Props) {
  const { has, toggle } = useFavorites()
  const active = has(property.id)
  const label = active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'

  const icon = (
    <Heart
      size={variant === 'surface' ? 18 : 17}
      strokeWidth={1.7}
      aria-hidden
      className={cn('transition-all duration-200', active ? 'scale-110 fill-current' : 'scale-100')}
    />
  )

  if (variant === 'inline') {
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => toggle(property.id, property.codigo)}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors',
          active
            ? 'border-brand bg-brand-soft text-brand-deep'
            : 'border-line-strong bg-white text-brand-deep hover:border-brand',
          className,
        )}
      >
        {icon}
        {active ? 'Salvo nos favoritos' : 'Favoritar'}
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={() => toggle(property.id, property.codigo)}
      className={cn(
        'grid size-9 place-items-center rounded-full bg-white/92 backdrop-blur-[2px] transition-colors hover:bg-white',
        active ? 'text-brand' : 'text-brand-deep/70 hover:text-brand-deep',
        className,
      )}
    >
      {icon}
    </button>
  )
}
