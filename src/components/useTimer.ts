import { useEffect, useState } from 'react'

/** 18:30 regressivo. O cronômetro só começa no primeiro avanço. */
export const TALK_SECONDS = 18 * 60 + 30

export function useTimer(running: boolean) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => window.clearInterval(id)
  }, [running])

  const remaining = TALK_SECONDS - elapsed
  const sign = remaining < 0 ? '-' : ''
  const abs = Math.abs(remaining)
  const mm = String(Math.floor(abs / 60)).padStart(2, '0')
  const ss = String(abs % 60).padStart(2, '0')

  return { remaining, label: `${sign}${mm}:${ss}` }
}
