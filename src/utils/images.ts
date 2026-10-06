/**
 * Convenção de miniaturas: para `/imoveis/1930/01.webp` existe
 * `/imoveis/1930/01-sm.webp` (≈640px), usada nos cards para poupar banda.
 */
export const thumb = (src: string): string => src.replace(/\.(webp|jpg|jpeg|png)$/i, '-sm.$1')
