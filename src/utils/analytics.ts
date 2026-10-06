/**
 * Camada de eventos pronta para GA4 / Meta Pixel.
 * Nenhum script é instalado aqui: quando existir um ID, basta carregar o
 * snippet do GA4/Pixel em `index.html` — os eventos abaixo já serão enviados.
 */

export type AnalyticsEvent =
  | 'property_view'
  | 'property_favorite'
  | 'property_share'
  | 'whatsapp_click'
  | 'filter_used'
  | 'search_completed'
  | 'contact_click'
  | 'form_submit'

type Params = Record<string, string | number | boolean | undefined>

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return
  const w = window as AnalyticsWindow

  w.dataLayer?.push({ event, ...params })
  w.gtag?.('event', event, params)
  w.fbq?.('trackCustom', event, params)

  if (import.meta.env.DEV) console.debug('[analytics]', event, params)
}
