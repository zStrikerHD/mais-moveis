import type { Imovel } from '@/types/imovel'

/**
 * ============================================================================
 *  CATÁLOGO DE IMÓVEIS — único arquivo que precisa ser editado na manutenção.
 * ============================================================================
 *
 *  ADICIONAR   → copie um bloco, mude `id` e `codigo`, ajuste os campos.
 *  REMOVER     → apague o bloco (ou troque `status` para "vendido").
 *  PREÇO       → altere `preco` (use `null` para "sob consulta").
 *  FOTOS       → coloque os arquivos em `public/imoveis/<codigo>/` e liste em
 *                `imagens`. Para cada `01.webp`, crie também `01-sm.webp`
 *                (versão ~640px usada nos cards). Veja `README.md`.
 *  DESTAQUE    → `destaque: true`.
 *  PERTO DE VOCÊ → `proximo: true` (curadoria manual da seção da home).
 *
 *  Nenhum componente precisa ser alterado: páginas, cards, filtros e seções
 *  são gerados a partir desta lista. Fotos, preços e descrições abaixo foram
 *  importados do site atual (maisimoveisjau.com.br) — confira antes de publicar.
 */

const CORRETOR_ROBSON = { nome: 'Robson Fernando Roda', creci: '273696 F' }
const CORRETOR_ANDRE = { nome: 'André Zapatero Spatti', creci: '90264F' }

const fotos = (codigo: string, total: number): string[] =>
  Array.from({ length: total }, (_, i) => `/imoveis/${codigo}/${String(i + 1).padStart(2, '0')}.webp`)

export const imoveis: Imovel[] = [
  {
    id: 1948,
    codigo: '1948',
    titulo: 'Casa com 3 quartos no Condomínio Taiuva',
    tipo: 'Casa',
    bairro: 'Condomínio Taiuva',
    cidade: 'Jaú',
    preco: 960000,
    quartos: 3,
    suites: 1,
    banheiros: 2,
    vagas: 2,
    areaTotal: 165,
    areaConstruida: 130,
    financiamento: true,
    destaque: true,
    proximo: true,
    status: 'disponivel',
    descricao:
      'Acabamento de primeira e muito conforto em cada detalhe.\n\nSão 3 quartos, sendo 1 suíte com closet, jardim de inverno, sala planejada ampla com pé-direito alto, cozinha planejada, banheiro social e lavanderia. A área gourmet é integrada, com churrasqueira e espaço coberto. Garagem para 2 carros, em terreno de 165 m².\n\nAceita financiamento.',
    caracteristicas: [
      'Suíte com closet',
      'Jardim de inverno',
      'Sala planejada',
      'Cozinha planejada',
      'Área gourmet com churrasqueira',
      'Lavanderia',
    ],
    corretor: CORRETOR_ROBSON,
    imagens: fotos('1948', 12),
  },
  {
    id: 1941,
    codigo: '1941',
    titulo: 'Chácara com 5 quartos no Morada do Sol',
    tipo: 'Chácara',
    bairro: 'Residencial Morada do Sol',
    cidade: 'Jaú',
    preco: 1690000,
    quartos: 5,
    suites: 3,
    banheiros: 2,
    vagas: 6,
    areaTotal: 2000,
    areaConstruida: 700,
    permuta: true,
    negociavel: true,
    destaque: true,
    status: 'disponivel',
    descricao:
      'Chácara em condomínio, com conforto, privacidade, lazer completo e estrutura sustentável.\n\nA casa principal tem 3 suítes com móveis planejados, salas de estar, TV e jantar, cozinha ampla, lavanderia e varanda em toda a casa. A casa de hóspedes tem 2 quartos, sala, cozinha e banheiro.\n\nA área de lazer reúne piscina com bar molhado, hidromassagem e cascata, espaço gourmet e banheiro com quarto de apoio. Há ainda sistema de energia fotovoltaica (economia aproximada de R$ 1.200 por mês, segundo o anúncio), cisterna de 35.000 litros, pomar formado, paisagismo, lago de carpas e oficina/depósito.\n\nEstuda propostas: aceita imóvel de menor valor, veículo e possibilidade de parcelamento.',
    caracteristicas: [
      'Piscina com hidromassagem',
      'Casa de hóspedes',
      'Energia fotovoltaica',
      'Cisterna de 35.000 L',
      'Pomar e lago de carpas',
      'Espaço gourmet',
      'Oficina / depósito',
    ],
    corretor: CORRETOR_ROBSON,
    imagens: fotos('1941', 12),
  },
  {
    id: 1938,
    codigo: '1938',
    titulo: 'Casa com 2 quartos no Condomínio Taiuva',
    tipo: 'Casa',
    bairro: 'Jardim Europa',
    cidade: 'Jaú',
    preco: 750000,
    quartos: 2,
    suites: 1,
    banheiros: 1,
    vagas: 2,
    areaTotal: 180,
    areaConstruida: 140,
    financiamento: true,
    permuta: true,
    negociavel: true,
    proximo: true,
    status: 'disponivel',
    descricao:
      'Casa no Condomínio Residencial Taiuva, com 140 m² de construção, 2 quartos (1 suíte), 1 banheiro e 2 vagas.\n\nR$ 750.000 à vista. Com permuta, R$ 850.000. Possibilidade de financiamento.',
    corretor: CORRETOR_ROBSON,
    imagens: fotos('1938', 12),
  },
  {
    id: 1934,
    codigo: '1934',
    titulo: 'Casa com 2 quartos no Jardim das Paineiras',
    tipo: 'Casa',
    bairro: 'Jardim das Paineiras',
    cidade: 'Jaú',
    preco: 295000,
    quartos: 2,
    banheiros: 2,
    vagas: 4,
    areaTotal: 138,
    areaConstruida: 91,
    financiamento: true,
    proximo: true,
    status: 'disponivel',
    descricao:
      'Casa no Jardim das Paineiras, com 138 m² de terreno e 91 m² de construção, 2 quartos, 2 banheiros e 4 vagas.\n\nPossibilidade de financiamento. Agende uma visita.',
    corretor: CORRETOR_ANDRE,
    imagens: fotos('1934', 6),
  },
  {
    id: 1930,
    codigo: '1930',
    titulo: 'Sobrado com 3 quartos no Jardim Dona Emília',
    tipo: 'Sobrado',
    bairro: 'Jardim Dona Emília',
    cidade: 'Jaú',
    preco: 650000,
    quartos: 3,
    suites: 2,
    banheiros: 3,
    vagas: 3,
    areaTotal: 207,
    areaConstruida: 163,
    financiamento: true,
    destaque: true,
    proximo: true,
    status: 'disponivel',
    descricao:
      'Sobrado no Jardim Dona Emília, com 163 m² construídos, 3 quartos (2 suítes), 3 banheiros e 3 vagas.\n\nConta com espaço gourmet e amplo quintal. Possibilidade de financiamento. Agende sua visita.',
    caracteristicas: ['Espaço gourmet', 'Quintal', 'Varanda', 'Vista panorâmica'],
    corretor: CORRETOR_ROBSON,
    imagens: fotos('1930', 12),
  },
  {
    id: 1918,
    codigo: '1918',
    titulo: 'Casa com 4 quartos no Jardim América',
    tipo: 'Casa',
    bairro: 'Jardim América',
    cidade: 'Jaú',
    preco: 1200000,
    quartos: 4,
    suites: 2,
    banheiros: 5,
    vagas: 3,
    areaTotal: 412,
    areaConstruida: 231,
    financiamento: true,
    destaque: true,
    proximo: true,
    status: 'disponivel',
    descricao:
      'Casa no Jardim América, com 231 m² construídos, 4 quartos (2 suítes), 5 banheiros e 3 vagas.\n\nTem espaço gourmet, amplo quintal e escritório. Piscina, churrasqueira e ar-condicionado completam a área de lazer e o conforto da casa. Possibilidade de financiamento.',
    caracteristicas: [
      'Ar condicionado',
      'Área de serviço',
      'Churrasqueira',
      'Escritório',
      'Espaço gourmet',
      'Hidromassagem',
      'Interfone',
      'Lavanderia',
      'Piscina',
      'Piso de madeira',
      'Quarto de despejo',
      'Quintal',
      'Sala de jantar',
      'Sala de TV',
      'Suíte master (closet + hidro)',
    ],
    corretor: CORRETOR_ROBSON,
    imagens: fotos('1918', 12),
  },
  {
    id: 1917,
    codigo: '1917',
    titulo: 'Casa com 3 suítes na Avenida do Jardim Alvorada',
    tipo: 'Casa',
    bairro: 'Jardim Alvorada',
    cidade: 'Jaú',
    preco: 2650000,
    quartos: 3,
    suites: 3,
    banheiros: 6,
    vagas: 3,
    areaTotal: 900,
    areaConstruida: 500,
    permuta: true,
    destaque: true,
    status: 'disponivel',
    descricao:
      'Casa em avenida do Jardim Alvorada, em terreno de 900 m² (30 x 30) com 500 m² de construção, 3 suítes, 6 banheiros no total e 3 vagas.\n\nAmplo quintal com piscina, área de churrasco e varanda.\n\nAceita imóvel até R$ 800 mil como parte do pagamento.',
    caracteristicas: ['Piscina', 'Área de churrasco', 'Varanda', 'Amplo quintal'],
    corretor: CORRETOR_ANDRE,
    imagens: fotos('1917', 12),
  },
  {
    id: 1914,
    codigo: '1914',
    titulo: 'Edícula com 1 quarto no Jardim Parati',
    tipo: 'Edícula',
    bairro: 'Jardim Parati',
    cidade: 'Jaú',
    preco: null,
    quartos: 1,
    banheiros: 2,
    vagas: 6,
    areaTotal: 440,
    financiamento: true,
    status: 'sob-consulta',
    descricao:
      'Edícula no Jardim Parati, com 440 m², 1 quarto, 2 banheiros e 6 vagas.\n\nValor sob consulta. Possibilidade de financiamento. Agende uma visita.',
    corretor: CORRETOR_ANDRE,
    imagens: fotos('1914', 12),
  },
]
