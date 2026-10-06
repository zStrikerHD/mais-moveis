import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BedDouble, Bath, Car, ChevronRight, Check, Link2, MapPin, MessageCircle, CalendarCheck, Ruler, House, Share2, ShieldCheck, BedSingle } from 'lucide-react'
import type { Imovel } from '@/types/imovel'
import { findBySlug, similarTo } from '@/utils/catalog'
import { formatArea, formatPrice, propertyPath } from '@/utils/format'
import { propertyMessage, visitMessage, whatsappUrl } from '@/utils/whatsapp'
import { site } from '@/config/site'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Gallery } from '@/components/property/Gallery'
import { BadgeList } from '@/components/property/Badges'
import { FavoriteButton } from '@/components/property/FavoriteButton'
import { PropertyCarousel } from '@/components/property/PropertyCarousel'
import { StickyContactBar } from '@/components/layout/StickyContactBar'

interface Spec {
  icon: React.ReactNode
  label: string
  value: string
}

const specsOf = (p: Imovel): Spec[] => {
  const s = (n: number | undefined, label: string, icon: React.ReactNode, fmt: (n: number) => string = String): Spec[] =>
    n ? [{ icon, label, value: fmt(n) }] : []
  return [
    ...s(p.quartos, 'Quartos', <BedDouble size={20} strokeWidth={1.5} />),
    ...s(p.suites, 'Suítes', <BedSingle size={20} strokeWidth={1.5} />),
    ...s(p.banheiros, 'Banheiros', <Bath size={20} strokeWidth={1.5} />),
    ...s(p.vagas, 'Vagas', <Car size={20} strokeWidth={1.5} />),
    ...s(p.areaTotal, 'Área total', <Ruler size={20} strokeWidth={1.5} />, formatArea),
    ...s(p.areaConstruida, 'Área construída', <House size={20} strokeWidth={1.5} />, formatArea),
  ]
}

function ApproxMap({ p }: { p: Imovel }) {
  const [show, setShow] = useState(false)
  const q = encodeURIComponent(`${p.bairro}, ${p.cidade}, SP, Brasil`)
  return (
    <section aria-labelledby="local" className="mt-12 border-t border-line pt-10">
      <h2 id="local" className="text-xl font-medium">
        Localização
      </h2>
      <p className="mt-2 flex items-center gap-2 text-stone">
        <MapPin size={16} strokeWidth={1.6} aria-hidden />
        {p.bairro}, {p.cidade}/SP
      </p>
      <div className="mt-5 aspect-[16/8] overflow-hidden rounded-[var(--radius-md)] border border-line bg-sand">
        {show ? (
          <iframe
            title={`Mapa da região: ${p.bairro}, ${p.cidade}`}
            src={`https://www.google.com/maps?q=${q}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setShow(true)} className="grid size-full place-items-center text-center text-brand-deep transition-colors hover:bg-brand-mist">
            <span className="flex flex-col items-center gap-2">
              <MapPin size={22} strokeWidth={1.5} aria-hidden />
              <span className="font-medium">Ver região no mapa</span>
              <span className="text-sm text-stone">Mostra apenas a área do bairro, nunca o endereço exato.</span>
            </span>
          </button>
        )}
      </div>
    </section>
  )
}

export default function PropertyDetail() {
  const { slug = '' } = useParams()
  const p = findBySlug(slug)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (p) track('property_view', { codigo: p.codigo, origin: 'page' })
  }, [p])

  if (!p) {
    return (
      <div className="container-site pb-24 pt-40">
        <Seo title="Imóvel não encontrado" description="Este imóvel não está mais disponível ou o link está incorreto." noindex />
        <EmptyState
          title="Não encontramos este imóvel."
          text="Ele pode ter sido vendido ou o endereço mudou. Veja outras opções disponíveis."
          actionLabel="Ver todos os imóveis"
          to="/imoveis"
        />
      </div>
    )
  }

  const specs = specsOf(p)
  const url = `${site.url}${propertyPath(p)}`
  const paragraphs = p.descricao.split(/\n{2,}/)
  const similar = similarTo(p)

  const share = async () => {
    track('property_share', { codigo: p.codigo })
    if (navigator.share) {
      try {
        await navigator.share({ title: p.titulo, text: `${p.titulo} — ${formatPrice(p.preco)}`, url })
        return
      } catch {
        /* cancelado pelo usuário */
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard indisponível */
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: p.titulo,
    description: p.descricao.slice(0, 280),
    url,
    image: p.imagens.slice(0, 4).map((i) => `${site.url}${i}`),
    ...(p.preco ? { offers: { '@type': 'Offer', price: p.preco, priceCurrency: 'BRL' } } : {}),
    address: { '@type': 'PostalAddress', addressLocality: p.cidade, addressRegion: 'SP', addressCountry: 'BR' },
  }

  return (
    <>
      <Seo
        title={`${p.titulo} — ${formatPrice(p.preco)}`}
        description={`${p.tipo} à venda em ${p.bairro}, ${p.cidade}/SP. ${p.descricao.split('\n')[0].slice(0, 120)}`}
        path={propertyPath(p)}
        image={p.imagens[0]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-site pb-28 pt-28 md:pt-32 lg:pb-20">
        <nav aria-label="Você está em" className="mb-5 text-sm text-stone">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="hover:text-brand-deep">Início</Link></li>
            <ChevronRight size={14} aria-hidden />
            <li><Link to="/imoveis" className="hover:text-brand-deep">Imóveis</Link></li>
            <ChevronRight size={14} aria-hidden />
            <li><Link to={`/imoveis?tipo=${p.tipo.toLowerCase()}`} className="hover:text-brand-deep">{p.tipo}</Link></li>
            <ChevronRight size={14} aria-hidden />
            <li aria-current="page" className="font-medium text-brand-deep">REF {p.codigo}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14 xl:grid-cols-[1fr_24rem]">
          <div className="min-w-0">
            <Gallery images={p.imagens} alt={`${p.titulo}`} />

            <header className="mt-8">
              <div className="mb-4">
                <BadgeList property={p} />
              </div>
              <h1 className="text-[clamp(1.625rem,3.2vw,2.375rem)] tracking-[-0.03em]">{p.titulo}</h1>
              <p className="mt-2 flex items-center gap-2 text-stone">
                <MapPin size={16} strokeWidth={1.6} aria-hidden />
                {p.bairro} · {p.cidade}/SP
                <span className="text-line-strong" aria-hidden>|</span>
                <span>REF {p.codigo}</span>
              </p>
              <p className="num mt-5 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-brand-deep">
                {formatPrice(p.preco)}
              </p>
            </header>

            {specs.length > 0 && (
              <section aria-label="Características principais" className="mt-8">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-3">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-center gap-3.5 bg-white p-4">
                      <span className="text-gold-deep">{s.icon}</span>
                      <div>
                        <dt className="text-[0.8125rem] text-stone">{s.label}</dt>
                        <dd className="num text-[1.0625rem] font-medium text-brand-deep">{s.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section aria-labelledby="desc" className="mt-12">
              <h2 id="desc" className="text-xl font-medium">
                Sobre o imóvel
              </h2>
              <div className="mt-4 flex max-w-[68ch] flex-col gap-4 text-[1.0625rem] leading-[1.7] text-ink/90">
                {paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </section>

            {p.caracteristicas && p.caracteristicas.length > 0 && (
              <section aria-labelledby="car" className="mt-12 border-t border-line pt-10">
                <h2 id="car" className="text-xl font-medium">
                  Detalhes e comodidades
                </h2>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {p.caracteristicas.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[0.9375rem]">
                      <Check size={16} strokeWidth={2} className="shrink-0 text-gold-deep" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ApproxMap p={p} />
          </div>

          <aside aria-label="Contato sobre este imóvel" className="lg:relative">
            <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6 lg:sticky lg:top-28">
              <p className="text-sm text-stone">Valor de venda</p>
              <p className="num mt-1 text-[1.75rem] font-semibold tracking-[-0.02em] text-brand-deep">{formatPrice(p.preco)}</p>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  as="a"
                  href={whatsappUrl(propertyMessage(p))}
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="whatsapp"
                  $size="lg"
                  $block
                  onClick={() => track('whatsapp_click', { origin: 'detail', codigo: p.codigo })}
                >
                  <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                  Chamar no WhatsApp
                </Button>
                <Button
                  as="a"
                  href={whatsappUrl(visitMessage(p))}
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="outline"
                  $size="lg"
                  $block
                  onClick={() => track('whatsapp_click', { origin: 'detail-visit', codigo: p.codigo })}
                >
                  <CalendarCheck size={18} strokeWidth={1.75} aria-hidden />
                  Agendar visita
                </Button>
              </div>

              <div className="mt-4 flex gap-2.5">
                <FavoriteButton property={p} variant="inline" className="flex-1 justify-center" />
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-4 text-[0.9375rem] font-medium text-brand-deep transition-colors hover:border-brand"
                >
                  {copied ? <Link2 size={17} strokeWidth={1.7} aria-hidden /> : <Share2 size={17} strokeWidth={1.7} aria-hidden />}
                  <span aria-live="polite">{copied ? 'Link copiado' : 'Compartilhar'}</span>
                </button>
              </div>

              {p.corretor && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-[0.8125rem] text-stone">Corretor responsável</p>
                  <p className="mt-1 font-medium text-brand-deep">{p.corretor.nome}</p>
                  {p.corretor.creci && <p className="text-sm text-stone">CRECI {p.corretor.creci}</p>}
                </div>
              )}
              <p className="mt-4 flex items-start gap-2 text-[0.8125rem] leading-snug text-stone">
                <ShieldCheck size={15} strokeWidth={1.6} className="mt-px shrink-0 text-gold-deep" aria-hidden />
                Imobiliária CRECI {site.creci}. Valores e condições sujeitos a confirmação.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="border-t border-line bg-sand">
          <PropertyCarousel headingId="semelhantes" title="Imóveis semelhantes" items={similar} />
        </div>
      )}

      <StickyContactBar property={p} />
    </>
  )
}
