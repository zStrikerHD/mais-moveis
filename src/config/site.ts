export const site = {
  name: 'Mais Imóveis Jaú',
  shortName: 'Mais Imóveis',
  creci: '045793-J',
  url: 'https://www.maisimoveisjau.com.br',
  city: 'Jaú',
  state: 'SP',
  /** Número usado em todos os links de WhatsApp (somente dígitos, com DDI). */
  whatsapp: '5514991960770',
  phones: [
    { label: '(14) 98116-9810', tel: '+5514981169810' },
    { label: '(14) 99196-0770', tel: '+5514991960770' },
  ],
  email: 'vendas@maisimoveisjau.com.br',
  address: 'Avenida Doutor Quinzinho, 995, Jardim Jorge Atalla — Jaú/SP',
  /** Preencher quando existirem. Itens vazios não são exibidos. */
  social: { instagram: '', facebook: '' },
  /** Placeholders explícitos: substitua pelos dados reais quando disponíveis. */
  placeholders: {
    horario: '[Horário de atendimento — preencher]',
  },
} as const

export const nav = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/imoveis' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Financie', to: '/financiamento' },
  { label: 'Anuncie', to: '/anuncie' },
  { label: 'Contato', to: '/contato' },
] as const
