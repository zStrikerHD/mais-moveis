import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  side?: 'right' | 'bottom'
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/**
 * Drawer/Sheet acessível (Radix Dialog): foco preso, Esc fecha, ARIA correto.
 * Usado no menu mobile, nos filtros e nos favoritos.
 */
export function Sheet({ open, onOpenChange, title, description, side = 'right', children, footer, className }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content className={cn('sheet-content', `sheet-${side}`, className)}>
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div>
              <Dialog.Title className="text-lg font-medium tracking-tight text-brand-deep">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-0.5 text-sm text-stone">{description}</Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="Fechar"
              className="grid size-9 shrink-0 place-items-center rounded-full text-brand-deep transition-colors hover:bg-brand-soft"
            >
              <X size={18} strokeWidth={1.75} />
            </Dialog.Close>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
          {footer ? <footer className="border-t border-line bg-paper px-5 py-4">{footer}</footer> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
