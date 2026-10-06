import type { Imovel } from '@/types/imovel'
import { PropertyCard } from './PropertyCard'

export function PropertyGrid({ items }: { items: Imovel[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.id}>
          <PropertyCard property={p} priority={i < 3} />
        </li>
      ))}
    </ul>
  )
}
