'use client'

import { useState, useEffect, useCallback } from 'react'

const KEY = 'pp_favorites'

function readFavs(): string[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([])

  useEffect(() => { setFavs(readFavs()) }, [])

  const toggle = useCallback((id: string) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFav = useCallback((id: string) => favs.includes(id), [favs])

  return { favs, isFav, toggle }
}
