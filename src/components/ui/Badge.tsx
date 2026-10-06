import styled, { css } from 'styled-components'

export type BadgeTone = 'neutral' | 'gold' | 'brand' | 'muted' | 'dark'

const tones: Record<BadgeTone, ReturnType<typeof css>> = {
  neutral: css`background: rgb(255 255 255 / 0.94); color: var(--color-brand-deep);`,
  gold: css`background: var(--color-gold-soft); color: #5e4c27;`,
  brand: css`background: var(--color-brand); color: #fff;`,
  muted: css`background: var(--color-sand); color: var(--color-stone);`,
  dark: css`background: rgb(20 33 61 / 0.82); color: #fff;`,
}

export const Badge = styled.span<{ $tone?: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.5rem;
  padding: 0 0.625rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.005em;
  line-height: 1;
  white-space: nowrap;
  ${(p) => tones[p.$tone ?? 'neutral']}
`
