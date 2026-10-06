import { site } from '@/config/site'
import type { Imovel } from '@/types/imovel'

export const whatsappUrl = (message: string): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

export const propertyMessage = (p: Imovel): string =>
  `Olá! Tenho interesse no imóvel REF ${p.codigo} — ${p.titulo}. Gostaria de receber mais informações.`

export const visitMessage = (p: Imovel): string =>
  `Olá! Gostaria de agendar uma visita ao imóvel REF ${p.codigo} — ${p.titulo}.`

export const MESSAGES = {
  general: 'Olá! Vim pelo site da Mais Imóveis Jaú e gostaria de falar com um corretor.',
  sell: 'Olá! Gostaria de anunciar um imóvel com a Mais Imóveis Jaú.',
  financing: 'Olá! Gostaria de entender como funciona o financiamento de um imóvel.',
} as const
