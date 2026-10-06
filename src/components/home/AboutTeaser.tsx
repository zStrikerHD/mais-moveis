import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { site } from '@/config/site'
import { Reveal } from '@/components/ui/Reveal'

const points = [
  ['Corretor identificado', 'Cada anúncio mostra quem atende e o CRECI do responsável.'],
  ['Referência em tudo', 'Todo imóvel tem um código. Basta enviá-lo para receber as informações.'],
  ['Conversa direta', 'O contato é por WhatsApp, telefone ou e-mail, sem formulários no caminho.'],
] as const

export function AboutTeaser() {
  return (
    <section aria-labelledby="sobre-home" className="section-y bg-sand">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6 lg:col-span-5">
          <p className="eyebrow mb-4">Sobre a imobiliária</p>
          <h2 id="sobre-home" className="title-lg max-w-[18ch]">
            Imobiliária de Jaú, com atendimento de quem conhece a cidade.
          </h2>
          <p className="lead mt-5">
            A {site.name} cuida da compra, da venda e do anúncio de imóveis em {site.city}/{site.state} e região.
            Do primeiro contato à visita, você fala diretamente com o corretor responsável.
          </p>
          <p className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-brand-deep">
            <span className="h-px w-6 bg-gold" aria-hidden />
            CRECI {site.creci}
          </p>
          <div className="mt-8">
            <Link to="/sobre" className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep">
              <span className="border-b border-brand-deep/30 transition-colors group-hover:border-gold">Conheça a Mais Imóveis</span>
              <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <ul className="divide-y divide-line-strong border-y border-line-strong">
            {points.map(([title, text]) => (
              <li key={title} className="grid gap-1 py-6 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <h3 className="text-[1.0625rem] font-medium tracking-tight">{title}</h3>
                <p className="text-stone">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
