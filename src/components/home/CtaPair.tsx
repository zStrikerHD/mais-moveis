import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'
import { Reveal } from '@/components/ui/Reveal'

/** Dois caminhos claros: anunciar (azul) e financiar (areia). */
export function CtaPair() {
  return (
    <section aria-label="Anunciar ou financiar" className="section-y">
      <div className="container-site grid gap-5 md:grid-cols-2">
        <Reveal>
          <article className="on-dark flex h-full flex-col justify-between gap-12 rounded-[var(--radius-lg)] bg-brand p-7 text-white md:p-10">
            <div>
              <p className="eyebrow !text-gold mb-4">Anuncie</p>
              <h2 className="title-lg !text-white max-w-[16ch]">Vai vender ou alugar seu imóvel?</h2>
              <p className="mt-4 max-w-[40ch] text-white/75">
                Conte o que você tem e um corretor entra em contato para avaliar e divulgar.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={whatsappUrl(MESSAGES.sell)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { origin: 'cta-sell' })}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-brand-deep transition-colors hover:bg-gold-soft"
              >
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                Anunciar pelo WhatsApp
              </a>
              <Link to="/anuncie" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 underline decoration-gold underline-offset-[6px]">
                Como funciona
              </Link>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="flex h-full flex-col justify-between gap-12 rounded-[var(--radius-lg)] border border-line bg-white p-7 md:p-10">
            <div>
              <p className="eyebrow mb-4">Financie</p>
              <h2 className="title-lg max-w-[16ch]">Financiamento, passo a passo.</h2>
              <p className="mt-4 max-w-[40ch] text-stone">
                Entenda as etapas, os documentos e o que considerar antes de assinar. Sem simulações complicadas.
              </p>
            </div>
            <div>
              <Link
                to="/financiamento"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium text-brand-deep transition-colors hover:border-brand hover:bg-brand-mist"
              >
                Ver como funciona
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
