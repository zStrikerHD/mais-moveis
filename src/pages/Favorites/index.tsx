import { Heart } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { useFavorites } from '@/hooks/useFavorites'
import { allProperties } from '@/utils/catalog'

export default function Favorites() {
  const { ids, clear } = useFavorites()
  const items = allProperties().filter((p) => ids.includes(p.id))

  return (
    <>
      <Seo title="Seus favoritos" description="Imóveis que você salvou neste aparelho." path="/favoritos" noindex />
      <section className="bg-sand pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="container-site flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">Salvos neste aparelho</p>
            <h1 className="display !text-[clamp(2rem,4.4vw,3.25rem)]">Seus favoritos</h1>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clear} className="text-sm font-medium text-brand underline decoration-gold underline-offset-4">
              Remover todos
            </button>
          )}
        </div>
      </section>
      <section className="section-y !pt-10">
        <div className="container-site">
          {items.length > 0 ? (
            <PropertyGrid items={items} />
          ) : (
            <EmptyState
              icon={<Heart size={22} strokeWidth={1.5} />}
              title="Você ainda não adicionou nenhum imóvel aos favoritos."
              text="Toque no coração de qualquer imóvel para guardá-lo aqui. Sem cadastro."
              actionLabel="Ver imóveis"
              to="/imoveis"
            />
          )}
        </div>
      </section>
    </>
  )
}
