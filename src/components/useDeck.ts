import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Slide } from '../slides/types'

type Cursor = { index: number; step: number }
type Shared = { cursor: Cursor; startedAt: number | null; coda: boolean }
type Msg = { t: 'state'; state: Shared } | { t: 'hello' }

const CHANNEL = 'eu-sei'

export type DeckState = {
  index: number
  step: number
  slide: Slide
  /** a próxima tela, para a janela do apresentador */
  upcoming: Slide | undefined
  /** quantos avanços já foram dados no deck inteiro, para a barra de progresso */
  progress: number
  totalSteps: number
  next: () => void
  prev: () => void
  home: () => void
  startedAt: number | null
  /** a coda de Gettier (tela 23) entra no fluxo */
  coda: boolean
  toggleCoda: () => void
}

/**
 * Estado do deck, compartilhado entre as duas janelas por BroadcastChannel:
 * o telão na tela 2 e o apresentador na tela 1 andam juntos, e qualquer uma
 * das duas pode navegar. Quem chega depois pede o estado com um `hello`.
 */
export function useDeck(deck: Slide[]): DeckState {
  const [shared, setShared] = useState<Shared>({
    cursor: { index: 0, step: 0 },
    startedAt: null,
    coda: false,
  })
  const chan = useRef<BroadcastChannel | null>(null)
  const fromRemote = useRef(false)
  const latest = useRef(shared)
  latest.current = shared

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const c = new BroadcastChannel(CHANNEL)
    chan.current = c
    c.onmessage = (e: MessageEvent<Msg>) => {
      if (e.data.t === 'hello') {
        c.postMessage({ t: 'state', state: latest.current } satisfies Msg)
        return
      }
      fromRemote.current = true
      setShared(e.data.state)
    }
    c.postMessage({ t: 'hello' } satisfies Msg)
    return () => {
      chan.current = null
      c.close()
    }
  }, [])

  useEffect(() => {
    if (fromRemote.current) {
      fromRemote.current = false
      return
    }
    chan.current?.postMessage({ t: 'state', state: shared } satisfies Msg)
  }, [shared])

  // a barra ignora a coda enquanto ela estiver oculta, senão nunca chega ao fim
  const visible = useMemo(
    () => deck.map((s) => (s.optional === true && !shared.coda ? 0 : s.steps)),
    [deck, shared.coda],
  )

  const offsets = useMemo(() => {
    let acc = 0
    return visible.map((n) => {
      const start = acc
      acc += n
      return start
    })
  }, [visible])

  const totalSteps = useMemo(() => visible.reduce((a, n) => a + n, 0), [visible])

  /** telas ocultas (a coda) só entram no fluxo quando o operador liga */
  const skip = useCallback(
    (i: number, coda: boolean) => deck[i].optional === true && !coda,
    [deck],
  )

  const seek = useCallback(
    (from: number, dir: 1 | -1, coda: boolean) => {
      let i = from
      while (i >= 0 && i < deck.length && skip(i, coda)) i += dir
      return i >= 0 && i < deck.length ? i : null
    },
    [deck, skip],
  )

  const next = useCallback(() => {
    setShared((s) => {
      const { index, step } = s.cursor
      const at = s.startedAt ?? Date.now()
      if (step + 1 < deck[index].steps) return { ...s, cursor: { index, step: step + 1 }, startedAt: at }
      const i = seek(index + 1, 1, s.coda)
      if (i === null) return { ...s, startedAt: at }
      return { ...s, cursor: { index: i, step: 0 }, startedAt: at }
    })
  }, [deck, seek])

  const prev = useCallback(() => {
    setShared((s) => {
      const { index, step } = s.cursor
      if (step > 0) return { ...s, cursor: { index, step: step - 1 } }
      const i = seek(index - 1, -1, s.coda)
      if (i === null) return s
      return { ...s, cursor: { index: i, step: deck[i].steps - 1 } }
    })
  }, [deck, seek])

  const home = useCallback(() => setShared((s) => ({ ...s, cursor: { index: 0, step: 0 } })), [])

  const toggleCoda = useCallback(() => setShared((s) => ({ ...s, coda: !s.coda })), [])

  const { index, step } = shared.cursor
  const upcomingIndex = seek(index + 1, 1, shared.coda)

  return {
    index,
    step,
    slide: deck[index],
    upcoming: upcomingIndex === null ? undefined : deck[upcomingIndex],
    progress: offsets[index] + step + 1,
    totalSteps,
    next,
    prev,
    home,
    startedAt: shared.startedAt,
    coda: shared.coda,
    toggleCoda,
  }
}
