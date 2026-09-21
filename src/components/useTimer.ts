import { useEffect, useState } from 'react'

/** 18:30 regressivo. O cronômetro só começa no primeiro avanço. */
export const TALK_SECONDS = 18 * 60 + 30

/**
 * `startedAt` é o instante do primeiro avanço, em ms. Vem do estado
 * compartilhado, então telão e apresentador mostram o mesmo número mesmo que
 * a segunda janela tenha sido aberta depois.
 */
export function useTimer(startedAt: number | null) {
  const [, force] = useState(0)

  useEffect(() => {
    if (startedAt === null) return
    const id = window.setInterval(() => force((n) => n + 1), 500)
    return () => window.clearInterval(id)
  }, [startedAt])

  const elapsed = startedAt === null ? 0 : Math.floor((Date.now() - startedAt) / 1000)
  const remaining = TALK_SECONDS - elapsed
  const abs = Math.abs(remaining)
  const mm = String(Math.floor(abs / 60)).padStart(2, '0')
  const ss = String(abs % 60).padStart(2, '0')

  return { remaining, running: startedAt !== null, label: `${remaining < 0 ? '-' : ''}${mm}:${ss}` }
}
