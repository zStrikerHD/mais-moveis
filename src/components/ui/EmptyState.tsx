import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  text?: string
  actionLabel?: string
  onAction?: () => void
  to?: string
  icon?: React.ReactNode
}

/** Estado vazio: título direto, uma frase de apoio e uma única saída. */
export function EmptyState({ title, text, actionLabel, onAction, to, icon }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <span className="mb-5 grid size-12 place-items-center rounded-full bg-sand text-brand">
        {icon ?? <SearchX size={22} strokeWidth={1.5} />}
      </span>
      <h2 className="text-xl font-medium">{title}</h2>
      {text ? <p className="mt-2 text-stone">{text}</p> : null}
      {actionLabel && to ? (
        <Button as={Link} to={to} $variant="primary" className="mt-6">
          {actionLabel}
        </Button>
      ) : actionLabel ? (
        <Button type="button" onClick={onAction} $variant="primary" className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
