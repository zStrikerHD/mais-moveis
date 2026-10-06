import { cn } from '@/utils/cn'

/** Um <input> estilizado segundo o design system. */
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-white px-3.5 text-[0.9375rem] text-ink',
        'placeholder:text-stone/70 transition-colors hover:border-brand/50 focus-visible:border-brand',
        className,
      )}
      {...props}
    />
  )
}

export function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-stone">
        {label}
      </label>
      {children}
    </div>
  )
}
