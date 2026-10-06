import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, ShieldCheck, Users } from 'lucide-react'
import { site } from '@/config/site'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { HeroBackground } from '@/components/ui/HeroBackground'
import { ContactBlock } from '@/components/home/ContactBlock'

const brokers = [
  {
    nome: 'Robson Fernando Roda',
    creci: '273696 F',
    cargo: 'Corretor de Imóveis',
    telefone: '(14) 98116-9810',
    link: 'https://wa.me/5514981169810',
  },
  {
    nome: 'André Zapatero Spatti',
    creci: '90264F',
    cargo: 'Corretor de Imóveis',
    telefone: '(14) 99196-0770',
    link: 'https://wa.me/5514991960770',
  },
]

const pillars = [
  {
    title: 'Conhecimento Local',
    description:
      'Atuação concentrada em Jaú e cidades vizinhas. Conhecemos a vocação de cada bairro, condomínio e região em desenvolvimento.',
  },
  {
    title: 'Transparência Total',
    description:
      'Cada imóvel listado possui fotos reais, código de referência claro, descrição honesta e corretor responsável identificado.',
  },
  {
    title: 'Atendimento Direto',
    description:
      'Sem intermediários impessoais ou filas automáticas: você conversa diretamente com corretores credenciados pelo CRECI.',
  },
  {
    title: 'Segurança Jurídica',
    description:
      'Acompanhamento documental do início ao fim da transação imobiliária para garantir tranquilidade a compradores e vendedores.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="Sobre a Imobiliária | Mais Imóveis Jaú"
        description="Conheça a Mais Imóveis Jaú: corretores credenciados, atendimento humanizado e profundo conhecimento do mercado imobiliário de Jaú/SP."
        path="/sobre"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sand pb-16 pt-32 md:pb-24 md:pt-40">
        <HeroBackground src="/hero/sobre.jpg" alt="Monumento Eu Amo Jaú" position="object-[center_40%]" />
        <div className="container-site relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Sobre a Mais Imóveis Jaú</p>
            <h1 className="display max-w-[20ch]">
              Atendimento próximo de quem vive e conhece o mercado de Jaú.
            </h1>
            <p className="lead mt-6">
              A {site.name} nasceu com o propósito de conectar pessoas aos melhores imóveis da cidade de
              forma simples, segura e com atendimento personalizado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Identidade e Credenciais */}
      <section className="section-y border-b border-line bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="title-lg">
              Compromisso com seriedade, clareza e credibilidade.
            </h2>
            <div className="mt-6 space-y-4 text-stone leading-relaxed">
              <p>
                Comprar, vender ou alugar um imóvel é um dos passos mais importantes na vida de uma família ou
                investidor. Por isso, na {site.name}, cada atendimento é conduzido com o máximo de transparência
                e dedicação.
              </p>
              <p>
                Nossos corretores são devidamente credenciados perante o Conselho Regional de Corretores de Imóveis
                (CRECI), garantindo que todas as etapas da negociação respeitem as normas vigentes e a segurança do
                seu patrimônio.
              </p>
              <p>
                Nosso escritório está estrategicamente localizado na Avenida Doutor Quinzinho, 995, facilitando seu
                acesso para um café e uma conversa sobre seus objetivos imobiliários.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-sand px-4 py-2 text-sm font-medium text-brand-deep">
                <ShieldCheck size={18} className="text-gold-deep" aria-hidden />
                CRECI Jurídico: {site.creci}
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-sand px-4 py-2 text-sm font-medium text-brand-deep">
                <MapPin size={18} className="text-gold-deep" aria-hidden />
                {site.city} — {site.state}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-[var(--radius-md)] border border-line bg-sand/60 p-6 transition-all hover:bg-sand"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <CheckCircle2 size={20} strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-brand-deep">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{pillar.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Equipe de Corretores */}
      <section className="section-y bg-sand">
        <div className="container-site">
          <Reveal>
            <div className="max-w-[32rem]">
              <p className="eyebrow mb-4">Nossa Equipe</p>
              <h2 className="title-lg">Corretores identificados e prontos para atender você.</h2>
              <p className="lead mt-4">
                Você sabe exatamente com quem está conversando. Fale direto com nossos profissionais.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl">
            {brokers.map((broker, idx) => (
              <Reveal key={broker.creci} delay={idx * 0.08}>
                <div className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-line bg-white p-7 shadow-hairline">
                  <div>
                    <div className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                      <Users size={24} strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="mt-5 text-xl font-medium text-brand-deep">{broker.nome}</h3>
                    <p className="text-sm font-medium text-gold-deep">{broker.cargo}</p>
                    <p className="mt-3 text-sm text-stone">CRECI: {broker.creci}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-line">
                    <a
                      href={broker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-soft px-4 py-2.5 text-sm font-medium text-brand-deep transition-colors hover:bg-gold hover:text-white"
                      onClick={() => track('whatsapp_click', { origin: `about-broker-${broker.creci}` })}
                    >
                      <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
                      Falar com {broker.nome.split(' ')[0]}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA para catálogo */}
      <section className="section-y bg-brand-deep text-white">
        <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <p className="eyebrow !text-gold mb-3">Imóveis em Jaú</p>
            <h2 className="title-lg !text-white max-w-[22ch]">
              Encontre a casa ou terreno ideal para sua família.
            </h2>
            <p className="mt-3 max-w-[42ch] text-white/70">
              Confira nossa seleção de imóveis disponíveis em bairros nobres e condomínios de Jaú.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} to="/imoveis" $size="lg" className="bg-white !text-brand-deep hover:bg-gold hover:!text-white">
                Ver catálogo completo
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </Button>
              <Button
                as="a"
                href={whatsappUrl(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                $size="lg"
                $variant="whatsapp"
                onClick={() => track('whatsapp_click', { origin: 'about-cta' })}
              >
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                Falar no WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contato padrão */}
      <ContactBlock headingId="contato-sobre" title="Visite ou fale com a nossa equipe." />
    </>
  )
}
