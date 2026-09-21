import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Slide } from '../slides/types'

type Cursor = { index: number; step: number }
type Shared = { cursor: Cursor; startedAt: number | null }
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
}

/**
 * Estado do deck, compartilhado entre as duas janelas por BroadcastChannel:
 * o telão na tela 2 e o apresentador na tela 1 andam juntos, e qualquer uma
 * das duas pode navegar. Quem chega depois pede o estado com um `hello`.
 */
export function useDeck(deck: Slide[]): DeckState {
  const [shared, setShared] = useState<Shared>({ cursor: { index: 0, step: 0 }, startedAt: null })
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

  const offsets = useMemo(() => {
    let acc = 0
    return deck.map((s) => {
      const start = acc
      acc += s.steps
      return start
    })
  }, [deck])

  const totalSteps = useMemo(() => deck.reduce((a, s) => a + s.steps, 0), [deck])

  const next = useCallback(() => {
    setShared(({ cursor: { index, step }, startedAt }) => {
      const at = startedAt ?? Date.now()
      if (step + 1 < deck[index].steps) return { cursor: { index, step: step + 1 }, startedAt: at }
      if (index + 1 < deck.length) return { cursor: { index: index + 1, step: 0 }, startedAt: at }
      return { cursor: { index, step }, startedAt: at }
    })
  }, [deck])

  const prev = useCallback(() => {
    setShared(({ cursor: { index, step }, startedAt }) => {
      if (step > 0) return { cursor: { index, step: step - 1 }, startedAt }
      if (index > 0) return { cursor: { index: index - 1, step: deck[index - 1].steps - 1 }, startedAt }
      return { cursor: { index, step }, startedAt }
    })
  }, [deck])

  const home = useCallback(
    () => setShared((s) => ({ cursor: { index: 0, step: 0 }, startedAt: s.startedAt })),
    [],
  )

  const { index, step } = shared.cursor

  return {
    index,
    step,
    slide: deck[index],
    upcoming: deck[index + 1],
    progress: offsets[index] + step + 1,
    totalSteps,
    next,
    prev,
    home,
    startedAt: shared.startedAt,
  }
}
