import { useMemo, useState } from 'react'
import { Calculator, HelpCircle, MessageCircle } from 'lucide-react'
import { site } from '@/config/site'
import { formatPrice } from '@/utils/format'
import { whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { HeroBackground } from '@/components/ui/HeroBackground'

const steps = [
  {
    num: '01',
    title: 'Escolha e Enquadramento',
    description:
      'Definição do imóvel pretendido e verificação se a propriedade possui documentação apta para alienação fiduciária.',
  },
  {
    num: '02',
    title: 'Simulação Inicial',
    description:
      'Cálculo das condições de entrada, valor financiado, prazo ideal e estimativa da parcela conforme a renda familiar.',
  },
  {
    num: '03',
    title: 'Documentação do Proponente',
    description:
      'Reunião de comprovantes de renda, documentos pessoais, certidões e formulários do banco escolhido.',
  },
  {
    num: '04',
    title: 'Análise de Crédito Bancário',
    description:
      'A instituição financeira analisa o score, histórico financeiro e capacidade de pagamento do comprador.',
  },
  {
    num: '05',
    title: 'Engenharia e Avaliação',
    description:
      'Um engenheiro credenciado pelo banco visita o imóvel para avaliar o valor de mercado e as condições estruturais.',
  },
  {
    num: '06',
    title: 'Contrato e Registro em Cartório',
    description:
      'Emissão do contrato com força de escritura pública, recolhimento do ITBI e registro no Cartório de Registro de Imóveis.',
  },
]

const faqs = [
  {
    q: 'Posso usar o saldo do FGTS na compra?',
    a: 'Sim, desde que o imóvel seja residencial urbano, esteja situado onde você mora ou trabalha, e você preencha os requisitos do SFH (não possuir outro imóvel residencial no mesmo município).',
  },
  {
    q: 'É possível compor renda com outra pessoa?',
    a: 'Sim, a maioria dos bancos permite compor renda com cônjuge, companheiro(a) ou familiares, aumentando o limite aprovado.',
  },
  {
    q: 'Qual o valor mínimo de entrada exigido pelos bancos?',
    a: 'Geralmente, o percentual mínimo de entrada varia de 10% a 20% do valor de avaliação do imóvel, dependendo da instituição e do sistema de amortização.',
  },
  {
    q: 'O que é a Tabela SAC e a Tabela Price?',
    a: 'Na tabela SAC as parcelas são decrescentes ao longo do tempo. Na Tabela Price, as parcelas são fixas/constantes (reajustadas pela taxa de inflação estipulada em contrato).',
  },
]

export default function Financing() {
  const [propertyPrice, setPropertyPrice] = useState(350000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [termYears, setTermYears] = useState(30)
  const [annualRate, setAnnualRate] = useState(9.9)

  const downPayment = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPercent) / 100)
  }, [propertyPrice, downPaymentPercent])

  const financedAmount = useMemo(() => {
    return Math.max(0, propertyPrice - downPayment)
  }, [propertyPrice, downPayment])

  const monthlyCalculation = useMemo(() => {
    const months = termYears * 12
    const monthlyRate = annualRate / 100 / 12

    if (financedAmount <= 0 || months <= 0) {
      return { monthlyPayment: 0, minIncome: 0 }
    }

    if (monthlyRate === 0) {
      const pmt = financedAmount / months
      return { monthlyPayment: pmt, minIncome: pmt / 0.3 }
    }

    // Tabela Price: PMT = P * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]
    const factor = Math.pow(1 + monthlyRate, months)
    const pmt = financedAmount * ((monthlyRate * factor) / (factor - 1))
    const minIncome = pmt / 0.3 // Renda familiar máxima recomendada com comprometimento de 30%

    return {
      monthlyPayment: Math.round(pmt),
      minIncome: Math.round(minIncome),
    }
  }, [financedAmount, termYears, annualRate])

  const simulationMessage = useMemo(() => {
    return `Olá! Estive no site da Mais Imóveis Jaú e fiz uma simulação de financiamento:%0A- Valor do imóvel: ${formatPrice(propertyPrice)}%0A- Entrada estimada (${downPaymentPercent}%): ${formatPrice(downPayment)}%0A- Financiamento: ${formatPrice(financedAmount)} em ${termYears} anos%0APodem me orientar sobre as opções reais de financiamento?`
  }, [propertyPrice, downPaymentPercent, downPayment, financedAmount, termYears])

  return (
    <>
      <Seo
        title="Financiamento Imobiliário em Jaú/SP | Mais Imóveis Jaú"
        description="Simulador de financiamento e passo a passo claro para financiar sua casa ou apartamento em Jaú com segurança e orientação profissional."
        path="/financiamento"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sand pb-16 pt-32 md:pb-24 md:pt-40">
        <HeroBackground src="/hero/financiamento.png" alt="Vista noturna panorâmica de Jaú" position="object-center" />
        <div className="container-site relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Financiamento Imobiliário</p>
            <h1 className="display max-w-[20ch]">
              Financiamento imobiliário, sem mistério e com suporte completo.
            </h1>
            <p className="lead mt-6">
              Orientamos cada etapa da compra financiada em Jaú: da escolha do imóvel à simulação,
              análise bancária e assinatura do contrato.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Simulador Interativo */}
      <section className="section-y bg-white">
        <div className="container-site">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Simulador Informativo</p>
              <h2 className="title-lg">Estime as parcelas do seu novo imóvel</h2>
              <p className="lead mt-3">
                Ajuste os valores abaixo para visualizar uma estimativa de parcela e valor financiado.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Controles do Simulador */}
            <Reveal className="rounded-[var(--radius-lg)] border border-line bg-paper p-6 sm:p-8 lg:col-span-7">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="sim-price" className="font-medium text-brand-deep">
                      Valor do Imóvel
                    </label>
                    <span className="font-semibold text-brand-deep">{formatPrice(propertyPrice)}</span>
                  </div>
                  <input
                    id="sim-price"
                    type="range"
                    min={100000}
                    max={2000000}
                    step={10000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="mt-3 w-full accent-brand cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-xs text-stone">
                    <span>R$ 100 mil</span>
                    <span>R$ 2 milhões</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="sim-down" className="font-medium text-brand-deep">
                      Entrada: {downPaymentPercent}% ({formatPrice(downPayment)})
                    </label>
                    <span className="text-xs text-stone">Mínimo comum: 20%</span>
                  </div>
                  <input
                    id="sim-down"
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="mt-3 w-full accent-brand cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-xs text-stone">
                    <span>10%</span>
                    <span>60%</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sim-years" className="block text-sm font-medium text-brand-deep">
                      Prazo do Financiamento
                    </label>
                    <select
                      id="sim-years"
                      value={termYears}
                      onChange={(e) => setTermYears(Number(e.target.value))}
                      className="mt-2 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                    >
                      <option value={10}>10 anos (120 meses)</option>
                      <option value={15}>15 anos (180 meses)</option>
                      <option value={20}>20 anos (240 meses)</option>
                      <option value={25}>25 anos (300 meses)</option>
                      <option value={30}>30 anos (360 meses)</option>
                      <option value={35}>35 anos (420 meses)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sim-rate" className="block text-sm font-medium text-brand-deep">
                      Taxa de Juros Estimada (% a.a.)
                    </label>
                    <select
                      id="sim-rate"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(Number(e.target.value))}
                      className="mt-2 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-brand-deep focus:border-brand focus:outline-none"
                    >
                      <option value={8.5}>8,5% a.a. (Taxa reduzida)</option>
                      <option value={9.5}>9,5% a.a. (Média de mercado)</option>
                      <option value={9.9}>9,9% a.a. (Padrão)</option>
                      <option value={10.5}>10,5% a.a.</option>
                      <option value={11.5}>11,5% a.a.</option>
                    </select>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Resultado do Cálculo */}
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="rounded-[var(--radius-lg)] border border-gold/30 bg-brand-deep p-7 text-white shadow-float md:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  <Calculator size={16} aria-hidden />
                  Resultado Estimado (Price)
                </div>

                <div className="mt-6 border-b border-white/10 pb-6">
                  <p className="text-sm text-white/70">Parcela mensal inicial estimada</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {formatPrice(monthlyCalculation.monthlyPayment)}
                    <span className="text-sm font-normal text-white/60"> /mês</span>
                  </p>
                </div>

                <div className="mt-6 space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Valor financiado:</span>
                    <span className="font-semibold text-white">{formatPrice(financedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Entrada sugerida ({downPaymentPercent}%):</span>
                    <span className="font-semibold text-white">{formatPrice(downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Prazo escolhido:</span>
                    <span className="font-semibold text-white">{termYears} anos ({termYears * 12} meses)</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-white/70">Renda bruta recomendada:</span>
                    <span className="font-semibold text-gold">{formatPrice(monthlyCalculation.minIncome)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${simulationMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white"
                    onClick={() => track('whatsapp_click', { origin: 'financing-simulator' })}
                  >
                    <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                    Validar simulação com corretor
                  </a>
                </div>

                <p className="mt-5 text-[0.75rem] leading-relaxed text-white/50">
                  * Simulação com fins puramente informativos e comparativos. Não inclui custos de cartório,
                  ITBI, avaliação de engenharia, seguros obrigatórios (MIP e DFI) ou tarifas bancárias. A
                  concessão de crédito depende de análise cadastral individual pelo agente financeiro.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="section-y bg-sand">
        <div className="container-site">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Como Funciona</p>
              <h2 className="title-lg">As 6 etapas do financiamento imobiliário</h2>
              <p className="lead mt-3">
                Conheça a jornada completa desde o primeiro interesse até a entrega das chaves.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((st, i) => (
              <Reveal key={st.num} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-md)] border border-line bg-white p-6 shadow-hairline">
                  <div>
                    <span className="font-mono text-2xl font-bold text-gold-deep">{st.num}</span>
                    <h3 className="mt-3 text-lg font-medium text-brand-deep">{st.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">{st.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-white">
        <div className="container-site max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-4">Dúvidas Frequentes</p>
            <h2 className="title-lg">Perguntas comuns sobre financiamento</h2>
          </Reveal>

          <div className="mt-10 divide-y divide-line">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06} className="py-6">
                <h3 className="text-base font-semibold text-brand-deep sm:text-lg flex items-start gap-3">
                  <HelpCircle size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
                  {faq.q}
                </h3>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-stone sm:text-base">{faq.a}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-[var(--radius-lg)] border border-line bg-sand p-6 text-center sm:p-8">
            <h3 className="text-lg font-medium text-brand-deep">Ficou com alguma dúvida específica?</h3>
            <p className="mt-2 text-sm text-stone">
              Nossa equipe orienta você sobre as exigências documentais e possibilidades para o seu perfil.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                as="a"
                href={whatsappUrl('Olá! Gostaria de tirar dúvidas sobre financiamento de imóveis em Jaú.')}
                target="_blank"
                rel="noopener noreferrer"
                $variant="whatsapp"
                $size="lg"
                onClick={() => track('whatsapp_click', { origin: 'financing-faq' })}
              >
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
                Falar com especialista
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
