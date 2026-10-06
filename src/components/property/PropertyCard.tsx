import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Imovel } from '@/types/imovel'
import { formatPrice, propertyPath, propertySummary } from '@/utils/format'
import { thumb } from '@/utils/images'
import { track } from '@/utils/analytics'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn'
import { FavoriteButton } from './FavoriteButton'
import { PrimaryBadge } from './Badges'

export function PropertyCard({ property: p, priority = false }: { property: Imovel; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const summary = propertySummary(p)
  const sold = p.status === 'vendido'
  const to = propertyPath(p)
  const where = `${p.bairro} · ${p.cidade}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {!loaded && <Skeleton $h="100%" $r="0" className="absolute inset-0" />}
        <Link to={to} tabIndex={-1} aria-hidden onClick={() => track('property_view', { codigo: p.codigo, origin: 'card' })}>
          <img
            src={thumb(p.imagens[0])}
            alt={`${p.tipo} em ${p.bairro}, ${p.cidade}`}
            width={640}
            height={480}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={cn(
              'size-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.03]',
              loaded ? 'opacity-100' : 'opacity-0',
              sold && 'grayscale',
            )}
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="pointer-events-auto">
            <PrimaryBadge property={p} />
          </div>
          <div className="pointer-events-auto">
            <FavoriteButton property={p} />
          </div>
        </div>
      </div>

      <Link
        to={to}
        onClick={() => track('property_view', { codigo: p.codigo, origin: 'card' })}
        className="flex flex-1 flex-col gap-1 p-4 pb-5 outline-offset-[-3px]"
      >
        <span className="text-[0.8125rem] font-medium text-gold-deep">{p.tipo}</span>
        <h3 className="truncate text-[1rem] font-medium leading-snug tracking-[-0.01em] text-brand-deep" title={where}>
          {where}
        </h3>
        <p className={cn('num mt-3 text-[1.375rem] font-semibold tracking-[-0.02em]', p.preco === null ? 'text-stone' : 'text-brand-deep')}>
          {formatPrice(p.preco)}
        </p>
        {summary.length > 0 && (
          <p className="num mt-1 text-[0.875rem] text-stone">{summary.join(' · ')}</p>
        )}
        <span className="sr-only">
          {p.titulo}. Referência {p.codigo}.
        </span>
      </Link>
    </article>
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-line bg-white" aria-hidden>
      <Skeleton $h="auto" $r="0" className="aspect-[4/3]" />
      <div className="flex flex-col gap-2.5 p-4 pb-5">
        <Skeleton $h="0.8rem" $w="22%" />
        <Skeleton $h="1.05rem" $w="70%" />
        <Skeleton $h="1.6rem" $w="48%" className="mt-2" />
        <Skeleton $h="0.9rem" $w="80%" />
      </div>
    </div>
  )
}
