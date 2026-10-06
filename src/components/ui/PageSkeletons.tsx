import { Skeleton } from '@/components/ui/Skeleton'

/** Espelha a estrutura real da página do imóvel (galeria, título, specs, card de contato). */
export function PropertyDetailSkeleton() {
  return (
    <div className="container-site pb-24 pt-28 md:pt-32" aria-busy aria-label="Carregando imóvel">
      <Skeleton $h="0.9rem" $w="16rem" className="mb-5" />
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14 xl:grid-cols-[1fr_24rem]">
        <div>
          <Skeleton $h="auto" $r="var(--radius-lg)" className="aspect-[4/3] sm:aspect-[16/10]" />
          <div className="mt-3 hidden gap-2.5 sm:flex">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} $h="4rem" $w="6rem" $r="var(--radius-sm)" />
            ))}
          </div>
          <Skeleton $h="2.2rem" $w="70%" className="mt-8" />
          <Skeleton $h="1rem" $w="40%" className="mt-3" />
          <Skeleton $h="2.8rem" $w="30%" className="mt-5" />
          <Skeleton $h="9rem" $r="var(--radius-md)" className="mt-8" />
          <Skeleton $h="1rem" className="mt-10" />
          <Skeleton $h="1rem" $w="92%" className="mt-3" />
          <Skeleton $h="1rem" $w="80%" className="mt-3" />
        </div>
        <Skeleton $h="22rem" $r="var(--radius-lg)" className="hidden lg:block" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="container-site pb-24 pt-40" aria-busy aria-label="Carregando página">
      <Skeleton $h="0.8rem" $w="7rem" />
      <Skeleton $h="3rem" $w="min(34rem,80%)" className="mt-5" />
      <Skeleton $h="1rem" $w="min(28rem,70%)" className="mt-5" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} $h="16rem" $r="var(--radius-md)" />
        ))}
      </div>
    </div>
  )
}
