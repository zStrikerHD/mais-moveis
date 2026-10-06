/**
 * Modelo de dados dos imóveis.
 * Para cadastrar/editar um imóvel, mexa APENAS em `src/data/properties.ts`.
 */

export type PropertyStatus = 'disponivel' | 'reservado' | 'vendido' | 'sob-consulta'

export interface Corretor {
  nome: string
  creci?: string
}

export interface Imovel {
  id: number
  /** Referência exibida ao cliente (ex.: "1948"). Também compõe a URL. */
  codigo: string
  titulo: string
  /** "Casa", "Apartamento", "Terreno", "Chácara", "Sobrado", "Edícula"... */
  tipo: string
  bairro: string
  cidade: string
  /** `null` = sob consulta */
  preco: number | null
  quartos?: number
  suites?: number
  banheiros?: number
  vagas?: number
  areaTotal?: number
  areaConstruida?: number
  financiamento?: boolean
  permuta?: boolean
  negociavel?: boolean
  /** Entra na seleção em destaque da home */
  destaque?: boolean
  lancamento?: boolean
  /** Imóvel para reforma/construção */
  reforma?: boolean
  /** Entra em "Imóveis perto de você" (curadoria manual) */
  proximo?: boolean
  status: PropertyStatus
  descricao: string
  imagens: string[]
  /** Itens como "Espaço gourmet", "Quintal"… */
  caracteristicas?: string[]
  corretor?: Corretor
  /** ISO (AAAA-MM-DD). Define "mais recentes". */
  publicadoEm?: string
}

/** Filtros aplicáveis ao catálogo. Tudo opcional e serializável em URL. */
export interface PropertyFilters {
  q?: string
  cidade?: string
  bairro?: string
  tipo?: string
  min?: number
  max?: number
  quartos?: number
  suites?: number
  banheiros?: number
  vagas?: number
  amin?: number
  amax?: number
  fin?: boolean
  perm?: boolean
  lanc?: boolean
  reforma?: boolean
  status?: PropertyStatus
}

export type SortKey = 'recentes' | 'menor-preco' | 'maior-preco' | 'area' | 'quartos'
