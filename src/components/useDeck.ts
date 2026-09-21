import { useCallback, useMemo, useState } from 'react'
import type { Slide } from '../slides/types'

type Cursor = { index: number; step: number }

export type DeckState = {
  index: number
  step: number
  slide: Slide
  /** quantos avanços já foram dados no deck inteiro, para a barra de progresso */
  progress: number
  totalSteps: number
  next: () => void
  prev: () => void
  home: () => void
  started: boolean
}

export function useDeck(deck: Slide[]): DeckState {
  const [cursor, setCursor] = useState<Cursor>({ index: 0, step: 0 })
  const [started, setStarted] = useState(false)

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
    setStarted(true)
    setCursor(({ index, step }) => {
      if (step + 1 < deck[index].steps) return { index, step: step + 1 }
      if (index + 1 < deck.length) return { index: index + 1, step: 0 }
      return { index, step }
    })
  }, [deck])

  const prev = useCallback(() => {
    setCursor(({ index, step }) => {
      if (step > 0) return { index, step: step - 1 }
      if (index > 0) return { index: index - 1, step: deck[index - 1].steps - 1 }
      return { index, step }
    })
  }, [deck])

  const home = useCallback(() => setCursor({ index: 0, step: 0 }), [])

  return {
    index: cursor.index,
    step: cursor.step,
    slide: deck[cursor.index],
    progress: offsets[cursor.index] + cursor.step + 1,
    totalSteps,
    next,
    prev,
    home,
    started,
  }
}
