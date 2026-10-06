import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  from { background-position: 150% 0; }
  to { background-position: -50% 0; }
`

/** Bloco de skeleton. Dimensões vêm de quem usa, para espelhar o conteúdo real. */
export const Skeleton = styled.div<{ $h?: string; $w?: string; $r?: string }>`
  height: ${(p) => p.$h ?? '1rem'};
  width: ${(p) => p.$w ?? '100%'};
  border-radius: ${(p) => p.$r ?? 'var(--radius-xs)'};
  background: linear-gradient(100deg, var(--color-sand) 30%, #fbf8f1 50%, var(--color-sand) 70%);
  background-size: 300% 100%;
  animation: ${shimmer} 1.6s linear infinite;
`
