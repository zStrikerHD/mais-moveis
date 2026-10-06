import styled, { css } from 'styled-components'

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  $variant?: Variant
  $size?: Size
  $block?: boolean
}

const variants: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: var(--color-brand);
    color: #fff;
    border-color: var(--color-brand);
    &:hover { background: var(--color-brand-deep); border-color: var(--color-brand-deep); }
  `,
  outline: css`
    background: transparent;
    color: var(--color-brand-deep);
    border-color: var(--color-line-strong);
    &:hover { border-color: var(--color-brand); background: var(--color-brand-mist); }
  `,
  ghost: css`
    background: transparent;
    color: var(--color-brand-deep);
    border-color: transparent;
    &:hover { background: var(--color-brand-soft); }
  `,
  light: css`
    background: #fff;
    color: var(--color-brand-deep);
    border-color: #fff;
    &:hover { background: var(--color-gold-soft); border-color: var(--color-gold-soft); }
  `,
  whatsapp: css`
    background: var(--color-ok);
    color: #fff;
    border-color: var(--color-ok);
    &:hover { background: #25573f; border-color: #25573f; }
  `,
}

const sizes: Record<Size, ReturnType<typeof css>> = {
  sm: css`height: 2.25rem; padding: 0 1rem; font-size: 0.875rem;`,
  md: css`height: 2.75rem; padding: 0 1.25rem; font-size: 0.9375rem;`,
  lg: css`height: 3.25rem; padding: 0 1.75rem; font-size: 1rem;`,
}

/**
 * Botão base do sistema. Polimórfico: `<Button as={Link} to="/imoveis">`.
 * Radius em cápsula para combinar com a ilha do header.
 */
export const Button = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-weight: 500;
  letter-spacing: -0.005em;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  width: ${(p) => (p.$block ? '100%' : 'auto')};
  transition:
    background-color var(--dur-fast) ease,
    border-color var(--dur-fast) ease,
    color var(--dur-fast) ease,
    transform var(--dur-fast) ease;

  ${(p) => sizes[p.$size ?? 'md']}
  ${(p) => variants[p.$variant ?? 'primary']}

  &:active { transform: translateY(1px); }
  &:disabled { opacity: 0.5; pointer-events: none; }
  svg { flex-shrink: 0; }
`
