interface HeroBackgroundProps {
  src: string
  alt?: string
  position?: string
  className?: string
}

export function HeroBackground({
  src,
  alt = '',
  position = 'object-center',
  className = '',
}: HeroBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${position}`}
        loading="eager"
      />
      {/* Camada translúcida sofisticada para garantir leitura confortável mantendo a foto visível */}
      <div className="absolute inset-0 bg-gradient-to-r from-sand/92 via-sand/75 to-sand/40 max-sm:bg-sand/85" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-sand to-transparent" />
    </div>
  )
}
