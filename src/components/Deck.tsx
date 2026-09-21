import { useCallback, useEffect, useRef, useState } from 'react'
import { deck as defaultDeck, sources } from '../slides/deck'
import type { Slide } from '../slides/types'
import { useDeck } from './useDeck'
import { useFullscreen } from './useFullscreen'
import { useTimer } from './useTimer'
import { Axis, DarkList, DarkMega, DarkTwoLine, EuSei, Illusion } from './screens'

/** Quando o foco estiver num input, as setas não podem trocar de slide. */
function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

function Screen({ slide, step }: { slide: Slide; step: number }) {
  switch (slide.variant) {
    case 'eusei':
      return <EuSei slide={slide} step={step} />
    case 'axis':
      return <Axis slide={slide} step={step} />
    case 'illusion':
      return <Illusion slide={slide} step={step} />
    case 'dark-list':
      return <DarkList slide={slide} step={step} />
    case 'dark-two-line':
      return <DarkTwoLine slide={slide} step={step} />
    case 'dark-mega':
      return <DarkMega slide={slide} step={step} />
  }
}

export default function Deck({ slides = defaultDeck }: { slides?: Slide[] }) {
  const { index, step, slide, progress, totalSteps, next, prev, home, started } = useDeck(slides)
  const toggleFullscreen = useFullscreen()

  const [notes, setNotes] = useState(false)
  const [showSources, setShowSources] = useState(false)
  const [timerOn, setTimerOn] = useState(false)
  const { remaining, label } = useTimer(timerOn && started)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isTyping()) return
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 't':
        case 'T':
          setTimerOn((v) => !v)
          break
        case 'n':
        case 'N':
          setNotes((v) => !v)
          break
        case 'b':
        case 'B':
          setShowSources((v) => !v)
          break
        case 'Escape':
          setNotes(false)
          setShowSources(false)
          break
        case 'Home':
          home()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, home, toggleFullscreen])

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('.overlay')) return
      const back = e.clientX < window.innerWidth * 0.25
      back ? prev() : next()
    },
    [next, prev],
  )

  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 48) return
    dx < 0 ? next() : prev()
  }

  const dark = slide.dark === true

  return (
    <div
      className={`deck${dark ? ' deck--dark' : ''}`}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Screen key={`${slide.id}-${step}`} slide={slide} step={step} />

      <div className="progress" style={{ width: `${(progress / totalSteps) * 100}%` }} />

      <div className="chrome chrome--counter">
        {slide.id} · {index + 1}/{slides.length}
        {slide.steps > 1 ? ` · ${step + 1}/${slide.steps}` : ''}
      </div>

      {timerOn ? (
        <div className={`chrome chrome--timer${remaining < 0 ? ' is-over' : ''}`}>{label}</div>
      ) : null}

      {notes ? (
        <aside className="overlay overlay--notes">
          <p className="overlay__title">nota · tela {slide.id}</p>
          <p style={{ margin: 0 }}>{slide.note}</p>
        </aside>
      ) : null}

      {showSources ? (
        <aside className="overlay overlay--sources">
          <p className="overlay__title">fontes · telas de reserva</p>
          <ul className="sources__list">
            {sources.map((s) => (
              <li key={s.key}>
                <kbd>{s.key}</kbd>
                {s.text}
              </li>
            ))}
          </ul>
          <div className="help">
            <span>→ avança</span>
            <span>← volta</span>
            <span>F tela cheia</span>
            <span>T cronômetro</span>
            <span>N notas</span>
            <span>B fontes</span>
            <span>Esc fecha</span>
            <span>Home reinicia</span>
          </div>
        </aside>
      ) : null}
    </div>
  )
}
