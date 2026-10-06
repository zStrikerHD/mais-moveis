import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  linkTo?: string
  linkLabel?: string
  as?: 'h1' | 'h2'
}

/** Cabeçalho padrão de seção: título à esquerda, atalho "Ver todos" à direita. */
export function SectionHeader({ eyebrow, title, description, linkTo, linkLabel = 'Ver todos', as: Tag = 'h2' }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
      <div>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <Tag className="title-lg">{title}</Tag>
        {description ? <p className="mt-3 max-w-[52ch] text-stone">{description}</p> : null}
      </div>
      {linkTo ? (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-sm font-medium text-brand-deep"
        >
          <span className="border-b border-transparent transition-colors group-hover:border-gold">{linkLabel}</span>
          <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      ) : null}
    </div>
  )
}
