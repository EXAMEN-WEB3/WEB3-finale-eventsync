import { useEffect, useState, useRef } from 'react'

export function useLiveStatus(sessionIds, intervalMs = 10000) {
  const [liveMap, setLiveMap] = useState({})
  
  
  const idsKey = sessionIds.join(',')
  const idsKeyRef = useRef(idsKey)
  idsKeyRef.current = idsKey

  useEffect(() => {
    if (!idsKey) return

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/sessions/live-status?ids=${idsKeyRef.current}`)
        if (res.ok) {
          const data = await res.json()
          setLiveMap(data)
        }
      } catch (error) {
        console.error('useLiveStatus error:', error)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, intervalMs)
    return () => clearInterval(interval)
  
  }, [idsKey, intervalMs])

  return liveMap
}
