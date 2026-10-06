import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Imovel } from '@/types/imovel'
import { PropertyCard } from './PropertyCard'
import { cn } from '@/utils/cn'

interface Props {
  title: string
  description?: string
  eyebrow?: string
  items: Imovel[]
  linkTo?: string
  /** Query string que "Ver todos" aplica no catálogo (ex.: "?ordem=menor-preco"). */
  linkLabel?: string
  headingId: string
}

const arrow =
  'grid size-10 place-items-center rounded-full border border-line-strong bg-white text-brand-deep transition-colors hover:border-brand disabled:pointer-events-none disabled:opacity-35'

/** Carrossel horizontal (Embla): ~4 cards no desktop, ~1,25 no celular para sinalizar rolagem. */
export function PropertyCarousel({ title, description, eyebrow, items, linkTo = '/imoveis', linkLabel = 'Ver todos', headingId }: Props) {
  const [ref, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', dragFree: true, skipSnaps: true })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const sync = useCallback(() => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [api])

  useEffect(() => {
    if (!api) return
    sync()
    api.on('select', sync).on('reInit', sync).on('scroll', sync)
    return () => {
      api.off('select', sync).off('reInit', sync).off('scroll', sync)
    }
  }, [api, sync])

  if (items.length === 0) return null

  return (
    <section aria-labelledby={headingId} className="section-y">
      <div className="container-site">
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
            <h2 id={headingId} className="title-lg">
              {title}
            </h2>
            {description ? <p className="mt-3 max-w-[52ch] text-stone">{description}</p> : null}
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <div className={cn('hidden gap-2 md:flex', !canPrev && !canNext && 'md:hidden')}>
              <button type="button" className={arrow} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Anterior">
                <ArrowLeft size={17} strokeWidth={1.75} aria-hidden />
              </button>
              <button type="button" className={arrow} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Próximo">
                <ArrowRight size={17} strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            <Link to={linkTo} className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep">
              <span className="border-b border-transparent transition-colors group-hover:border-gold">{linkLabel}</span>
              <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* A viewport vaza até a borda direita para indicar que há mais cards */}
      <div className="container-site">
        <div ref={ref} className="-mr-[var(--gutter)] overflow-hidden" role="region" aria-roledescription="carrossel" aria-label={title}>
          <ul className="flex touch-pan-y gap-4 pr-[var(--gutter)] md:gap-5">
            {items.map((p, i) => (
              <li key={p.id} className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_44%] lg:flex-[0_0_calc(25%-15px)]">
                <PropertyCard property={p} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
