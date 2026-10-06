import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { track } from '@/utils/analytics'

const KEY = 'mij:favoritos:v1'

interface FavoritesValue {
  ids: number[]
  has: (id: number) => boolean
  toggle: (id: number, codigo?: string) => void
  clear: () => void
}

const FavoritesContext = createContext<FavoritesValue | null>(null)

const read = (): number[] => {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number') : []
  } catch {
    return []
  }
}

/** Favoritos persistidos em localStorage — sem login, sem backend. */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* armazenamento indisponível (modo privado): segue só em memória */
    }
  }, [ids])

  // Sincroniza entre abas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const idsRef = useRef(ids)
  idsRef.current = ids

  const toggle = useCallback((id: number, codigo?: string) => {
    const adding = !idsRef.current.includes(id)
    track('property_favorite', { id, codigo, action: adding ? 'add' : 'remove' })
    setIds((prev) => (adding ? [...prev.filter((x) => x !== id), id] : prev.filter((x) => x !== id)))
  }, [])

  const value = useMemo<FavoritesValue>(
    () => ({ ids, has: (id) => ids.includes(id), toggle, clear: () => setIds([]) }),
    [ids, toggle],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>')
  return ctx
}
