import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react'
import { site } from '@/config/site'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { HeroBackground } from '@/components/ui/HeroBackground'

export default function Contact() {
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [assunto, setAssunto] = useState('Quero comprar um imóvel')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    track('form_submit', { form: 'contato_geral', assunto })

    const text = `Olá! Mensagem enviada pelo formulário do site:%0A%0A*Assunto:* ${assunto}%0A*Nome:* ${nome || 'Não informado'}%0A*Contato:* ${whatsapp || 'Não informado'}%0A*Mensagem:* ${mensagem || 'Gostaria de falar com um corretor.'}`

    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const mapQuery = encodeURIComponent(`${site.address}, Brasil`)

  return (
    <>
      <Seo
        title="Contato | Mais Imóveis Jaú"
        description="Fale diretamente com os corretores da Mais Imóveis Jaú. Telefone, WhatsApp, e-mail e endereço em Jaú/SP. CRECI 045793-J."
        path="/contato"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sand pb-16 pt-32 md:pb-24 md:pt-40">
        <HeroBackground src="/hero/contato.jpg" alt="Igreja Matriz e Obelisco de Jaú iluminados" position="object-[center_35%]" />
        <div className="container-site relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Canais de Atendimento</p>
            <h1 className="display max-w-[20ch]">
              Estamos prontos para atender você com atenção e agilidade.
            </h1>
            <p className="lead mt-6">
              Tire dúvidas sobre imóveis, agende visitas ou conheça nosso escritório em Jaú.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid de Canais e Formulário */}
      <section className="section-y bg-white border-b border-line">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Informações de Contato */}
          <Reveal className="space-y-8 lg:col-span-5">
            <div>
              <p className="eyebrow mb-3">Informações</p>
              <h2 className="title-lg">Canais Oficiais</h2>
              <p className="mt-3 text-sm text-stone leading-relaxed">
                Você pode ligar, mandar uma mensagem no WhatsApp ou enviar um e-mail. Respondemos prontamente.
              </p>
            </div>

            <div className="space-y-5 rounded-[var(--radius-lg)] border border-line bg-sand/40 p-6 sm:p-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">WhatsApp Principal</span>
                <div className="mt-2">
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-lg font-medium text-brand-deep transition-colors hover:text-gold-deep"
                    onClick={() => track('whatsapp_click', { origin: 'contact-page' })}
                  >
                    <MessageCircle size={20} className="text-ok" aria-hidden />
                    (14) 99196-0770
                  </a>
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Telefones</span>
                <div className="mt-2 space-y-1.5">
                  {site.phones.map((p) => (
                    <div key={p.tel}>
                      <a
                        href={`tel:${p.tel}`}
                        className="inline-flex items-center gap-2 text-base text-brand-deep transition-colors hover:text-gold-deep"
                        onClick={() => track('contact_click', { origin: 'contact-page', channel: 'phone' })}
                      >
                        <Phone size={17} className="text-stone" aria-hidden />
                        {p.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">E-mail</span>
                <div className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-base text-brand-deep transition-colors hover:text-gold-deep"
                    onClick={() => track('contact_click', { origin: 'contact-page', channel: 'email' })}
                  >
                    <Mail size={17} className="text-stone" aria-hidden />
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Endereço</span>
                <div className="mt-2 flex items-start gap-2 text-sm text-stone leading-relaxed">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-stone" aria-hidden />
                  <span>{site.address}</span>
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-deep">
                  <ShieldCheck size={16} className="text-gold-deep" aria-hidden />
                  CRECI Jurídico: {site.creci}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Formulário de Envio Rápido */}
          <Reveal delay={0.08} className="rounded-[var(--radius-lg)] border border-line bg-paper p-7 sm:p-10 shadow-hairline lg:col-span-7">
            <h2 className="title-lg !text-2xl">Envie uma mensagem direta</h2>
            <p className="mt-2 text-sm text-stone">
              Preencha os campos abaixo. Ao enviar, uma conversa será iniciada imediatamente com a nossa equipe.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="contato-assunto" className="block text-sm font-medium text-brand-deep">
                  Qual é o seu objetivo? *
                </label>
                <select
                  id="contato-assunto"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                >
                  <option value="Quero comprar um imóvel">Quero comprar um imóvel</option>
                  <option value="Quero agendar uma visita">Quero agendar uma visita</option>
                  <option value="Quero anunciar meu imóvel">Quero anunciar meu imóvel</option>
                  <option value="Dúvida sobre financiamento">Dúvida sobre financiamento</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contato-nome" className="block text-sm font-medium text-brand-deep">
                    Seu nome completo *
                  </label>
                  <input
                    id="contato-nome"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contato-whatsapp" className="block text-sm font-medium text-brand-deep">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    id="contato-whatsapp"
                    type="tel"
                    required
                    placeholder="(14) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contato-msg" className="block text-sm font-medium text-brand-deep">
                  Mensagem
                </label>
                <textarea
                  id="contato-msg"
                  rows={4}
                  placeholder="Escreva sua mensagem, código do imóvel de interesse ou horário preferido para contato..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" $variant="whatsapp" $size="lg" $block>
                  <Send size={18} strokeWidth={1.75} aria-hidden />
                  Iniciar conversa no WhatsApp
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Mapa Local */}
      <section className="section-y bg-sand">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-4">Localização</p>
            <h2 className="title-lg">Onde estamos em Jaú</h2>
            <p className="lead mt-2">
              Venha tomar um café conosco na Avenida Doutor Quinzinho, 995 — Jardim Jorge Atalla.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 aspect-[21/9] min-h-[300px] overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-hairline">
            <iframe
              title="Localização da Mais Imóveis Jaú"
              src={`https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
