import { useEffect, useState } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    
    try {
      const stored = localStorage.getItem('favorites')
      if (stored) setFavorites(JSON.parse(stored))
    } catch {
      
    }
  }, [])

  const addFavorite = (id) => {
    const newFav = [...favorites, id]
    setFavorites(newFav)
    try { localStorage.setItem('favorites', JSON.stringify(newFav)) } catch {}
  }

  const removeFavorite = (id) => {
    const newFav = favorites.filter(f => f !== id)
    setFavorites(newFav)
    try { localStorage.setItem('favorites', JSON.stringify(newFav)) } catch {}
  }

  const isFavorite = (id) => favorites.includes(id)

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
