import { useState } from 'react'
import { Camera, CheckCircle2, MessageCircle, Phone, Send, ShieldCheck, Sparkles } from 'lucide-react'
import { site } from '@/config/site'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { HeroBackground } from '@/components/ui/HeroBackground'

const benefits = [
  {
    icon: <Camera size={22} className="text-gold-deep" />,
    title: 'Apresentação Visual Cuidada',
    description:
      'Produzimos fotografias nítidas e organizadas para destacar o potencial real do seu patrimônio nos canais digitais.',
  },
  {
    icon: <ShieldCheck size={22} className="text-gold-deep" />,
    title: 'Segurança e CRECI',
    description:
      'Visitas sempre agendadas e acompanhadas por corretores credenciados, garantindo a integridade do seu imóvel.',
  },
  {
    icon: <Sparkles size={22} className="text-gold-deep" />,
    title: 'Foco no Mercado de Jaú',
    description:
      'Amplo conhecimento da demanda imobiliária local: sabemos quem busca casas, terrenos ou apartamentos na cidade.',
  },
  {
    icon: <CheckCircle2 size={22} className="text-gold-deep" />,
    title: 'Zero Custo Inicial',
    description:
      'Você não paga nada para anunciar seu imóvel conosco. Os honorários são devidos apenas no êxito da negociação.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Envio dos dados preliminares',
    desc: 'Preencha o formulário rápido abaixo ou envie uma mensagem no WhatsApp com o tipo do imóvel e bairro.',
  },
  {
    number: '2',
    title: 'Visita e Avaliação de Mercado',
    desc: 'Um corretor credenciado vai até o imóvel para conhecer os detalhes, tirar fotos e orientar sobre a precificação adequada.',
  },
  {
    number: '3',
    title: 'Divulgação e Atendimento aos Interessados',
    desc: 'Publicamos o imóvel no portal e conectamos compradores qualificados com acompanhamento até a assinatura da escritura.',
  },
]

export default function Sell() {
  const [tipo, setTipo] = useState('Casa')
  const [bairro, setBairro] = useState('')
  const [preco, setPreco] = useState('')
  const [quartos, setQuartos] = useState('')
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [detalhes, setDetalhes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    track('form_submit', { form: 'anuncie_imovel', tipo, bairro })

    const msg = `Olá! Quero anunciar um imóvel com a Mais Imóveis Jaú.%0A%0A*Dados do Imóvel:*%0A- Tipo: ${tipo}%0A- Bairro: ${bairro || 'Não informado'}%0A- Pretensão de valor: ${preco || 'A definir'}%0A- Quartos: ${quartos || 'Não informado'}%0A- Detalhes: ${detalhes || 'Sem observações'}%0A%0A*Contato do proprietário:*%0A- Nome: ${nome || 'Não informado'}%0A- WhatsApp: ${whatsapp || 'Não informado'}`

    window.open(`https://wa.me/${site.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Seo
        title="Anuncie seu Imóvel em Jaú/SP | Mais Imóveis Jaú"
        description="Quer vender ou alugar seu imóvel em Jaú? Anuncie com corretores credenciados, fotos de qualidade e atendimento focado em resultados."
        path="/anuncie"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sand pb-16 pt-32 md:pb-24 md:pt-40">
        <HeroBackground src="/hero/anuncie.jpg" alt="Estádio de Jaú com arco-íris" position="object-[center_40%]" />
        <div className="container-site relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Anuncie seu Imóvel</p>
            <h1 className="display max-w-[20ch]">
              Venda ou alugue seu imóvel com quem conhece cada canto de Jaú.
            </h1>
            <p className="lead mt-6">
              Divulgação com qualidade fotográfica, atendimento por corretores credenciados e condução
              segura de cada etapa da negociação.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 Passos */}
      <section className="section-y bg-white border-b border-line">
        <div className="container-site">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Processo Simples</p>
              <h2 className="title-lg">Como anunciamos seu patrimônio</h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((st, i) => (
              <Reveal key={st.number} delay={i * 0.08}>
                <div className="relative flex flex-col rounded-[var(--radius-lg)] border border-line bg-sand/40 p-7">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-deep font-mono text-base font-semibold text-white">
                    {st.number}
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-brand-deep">{st.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{st.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário e Benefícios */}
      <section className="section-y bg-sand">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Formulário Interativo */}
          <Reveal className="rounded-[var(--radius-lg)] border border-line bg-white p-7 sm:p-10 shadow-hairline lg:col-span-7">
            <h2 className="title-lg !text-2xl">Cadastre os dados preliminares</h2>
            <p className="mt-2 text-sm text-stone">
              Envie as informações básicas. Um de nossos corretores entrará em contato para agendar a visita.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-tipo" className="block text-sm font-medium text-brand-deep">
                    Tipo do imóvel *
                  </label>
                  <select
                    id="form-tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  >
                    <option value="Casa">Casa</option>
                    <option value="Sobrado">Sobrado</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Chácara">Chácara</option>
                    <option value="Comercial">Ponto Comercial</option>
                    <option value="Outro">Outro tipo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-bairro" className="block text-sm font-medium text-brand-deep">
                    Bairro em Jaú *
                  </label>
                  <input
                    id="form-bairro"
                    type="text"
                    required
                    placeholder="Ex: Jardim Jorge Atalla, Taiuva..."
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="form-preco" className="block text-sm font-medium text-brand-deep">
                    Pretensão de Valor (R$)
                  </label>
                  <input
                    id="form-preco"
                    type="text"
                    placeholder="Ex: 450.000 ou A avaliar"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-quartos" className="block text-sm font-medium text-brand-deep">
                    Número de quartos
                  </label>
                  <input
                    id="form-quartos"
                    type="text"
                    placeholder="Ex: 3 quartos (1 suíte)"
                    value={quartos}
                    onChange={(e) => setQuartos(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="form-detalhes" className="block text-sm font-medium text-brand-deep">
                  Observações ou diferenciais
                </label>
                <textarea
                  id="form-detalhes"
                  rows={3}
                  placeholder="Ex: Aceita permuta, recém reformado, armários embutidos..."
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 border-t border-line pt-4">
                <div>
                  <label htmlFor="form-nome" className="block text-sm font-medium text-brand-deep">
                    Seu nome completo *
                  </label>
                  <input
                    id="form-nome"
                    type="text"
                    required
                    placeholder="Nome e sobrenome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-whatsapp" className="block text-sm font-medium text-brand-deep">
                    WhatsApp para contato *
                  </label>
                  <input
                    id="form-whatsapp"
                    type="tel"
                    required
                    placeholder="(14) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-line bg-sand/30 px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" $variant="whatsapp" $size="lg" $block>
                  <Send size={18} strokeWidth={1.75} aria-hidden />
                  Enviar dados para a imobiliária
                </Button>
                <p className="mt-3 text-center text-xs text-stone">
                  Ao clicar, você será direcionado para o WhatsApp com os dados preenchidos para validação.
                </p>
              </div>
            </form>
          </Reveal>

          {/* Vantagens */}
          <Reveal delay={0.08} className="space-y-6 lg:col-span-5">
            <div>
              <p className="eyebrow mb-3">Vantagens</p>
              <h2 className="title-lg">Por que anunciar com a Mais Imóveis Jaú?</h2>
            </div>

            <div className="space-y-4">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-[var(--radius-md)] border border-line bg-white p-5 shadow-hairline">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                      {b.icon}
                    </div>
                    <h3 className="font-medium text-brand-deep">{b.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{b.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[var(--radius-lg)] border border-line bg-brand-deep p-6 text-white">
              <h3 className="text-lg font-medium text-white">Prefere falar direto com um corretor?</h3>
              <p className="mt-2 text-sm text-white/70">
                Ligue agora ou chame no WhatsApp para conversarmos sem compromisso.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=Olá! Gostaria de falar sobre anunciar meu imóvel.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
                  onClick={() => track('whatsapp_click', { origin: 'sell-direct' })}
                >
                  <MessageCircle size={16} aria-hidden />
                  Chamar no WhatsApp
                </a>
                <a
                  href={`tel:${site.phones[0].tel}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  onClick={() => track('contact_click', { origin: 'sell-direct', channel: 'phone' })}
                >
                  <Phone size={16} aria-hidden />
                  {site.phones[0].label}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
