import { cn } from '@/utils/cn'

interface LogoProps {
  /** `dark` para fundos claros; `light` para fundos azuis. */
  tone?: 'dark' | 'light'
  /** Esconde o texto (ex.: header compacto). */
  compact?: boolean
  className?: string
}

/**
 * Marca para uso em interface (header/footer): telhado + janela da marca
 * redesenhados em SVG, com o nome em Geist. A logo completa fica em
 * `/brand/logo.webp` e é usada em páginas institucionais.
 */
export function Logo({ tone = 'dark', compact, className }: LogoProps) {
  const ink = tone === 'dark' ? 'var(--color-brand)' : '#fff'
  const sub = tone === 'dark' ? 'var(--color-gold-deep)' : 'var(--color-gold)'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden>
        <rect x="23" y="3" width="4" height="7.5" fill="var(--color-gold)" />
        <path d="M2.5 17 L17 4 L31.5 17" stroke="var(--color-gold)" strokeWidth="3" strokeLinejoin="miter" />
        <rect x="14" y="12" width="2.6" height="2.6" fill="var(--color-gold)" />
        <rect x="17.4" y="12" width="2.6" height="2.6" fill="var(--color-gold)" />
        <rect x="14" y="15.4" width="2.6" height="2.6" fill="var(--color-gold)" />
        <rect x="17.4" y="15.4" width="2.6" height="2.6" fill="var(--color-gold)" />
        <path d="M5 28 V17.5 L11 24 L17 17.5" stroke={ink} strokeWidth="3.2" strokeLinejoin="miter" fill="none" />
      </svg>
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]" style={{ color: ink }}>
            Mais
          </span>
          <span className="mt-[3px] text-[0.5625rem] font-medium uppercase tracking-[0.2em]" style={{ color: sub }}>
            Imóveis Jaú
          </span>
        </span>
      )}
    </span>
  )
}
