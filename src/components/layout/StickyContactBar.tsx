import { CalendarCheck, MessageCircle } from 'lucide-react'
import type { Imovel } from '@/types/imovel'
import { propertyMessage, visitMessage, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'

/** Barra fixa inferior (só no celular) da página do imóvel. */
export function StickyContactBar({ property }: { property: Imovel }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-sticky-cta)] border-t border-line bg-paper/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-xl gap-2.5">
        <a
          href={whatsappUrl(propertyMessage(property))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { origin: 'sticky', codigo: property.codigo })}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ok text-[0.9375rem] font-medium text-white"
        >
          <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
          WhatsApp
        </a>
        <a
          href={whatsappUrl(visitMessage(property))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { origin: 'sticky-visit', codigo: property.codigo })}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-white text-[0.9375rem] font-medium text-brand-deep"
        >
          <CalendarCheck size={18} strokeWidth={1.75} aria-hidden />
          Agendar visita
        </a>
      </div>
    </div>
  )
}
