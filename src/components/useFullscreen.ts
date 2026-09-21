import { useCallback } from 'react'

export function useFullscreen() {
  return useCallback(() => {
    const el = document.documentElement
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void el.requestFullscreen?.()
    }
  }, [])
}
