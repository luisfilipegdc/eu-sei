import type { ScreenProps } from '../slides/types'

export function EuSei({ slide }: ScreenProps<'eusei'>) {
  return (
    <section className="slide slide--center">
      <h1 className="mega eusei appear">{slide.text}</h1>
    </section>
  )
}

export function Axis({ slide }: ScreenProps<'axis'>) {
  return (
    <section className="slide slide--center">
      <div className="axis appear">
        <span className="axis__pole axis__pole--a">{slide.left}</span>
        <span className="axis__rule" />
        <span className="axis__pole axis__pole--b">{slide.right}</span>
      </div>
      {slide.caption ? <p className="axis__caption">{slide.caption}</p> : null}
    </section>
  )
}

/**
 * Tela 09: dois quadrados do mesmo cinza (#8A8A8A) sobre um degradê.
 * No avanço eles deslizam e encostam — e o olho perde o argumento.
 */
export function Illusion({ step }: ScreenProps<'illusion'>) {
  const together = step >= 1
  return (
    <section className="slide slide--center">
      <div className="illusion appear">
        <div
          className="illusion__square"
          style={{ left: together ? 'calc(50% - 16vmin)' : '6%' }}
        />
        <div
          className="illusion__square"
          style={{ left: together ? '50%' : 'calc(94% - 16vmin)' }}
        />
      </div>
    </section>
  )
}

/** Tela 14: as cinco perguntas, uma a uma. Primeira tela preta do deck. */
export function DarkList({ slide, step }: ScreenProps<'dark-list'>) {
  return (
    <section className="slide">
      <ol className="dark-list">
        {slide.items.slice(0, step + 1).map((item, i) => (
          <li
            key={item}
            className={`dark-list__item appear${i < step ? ' fade-out' : ''}`}
          >
            <span className="dark-list__n">{String(i + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Tela 15: duas linhas, com pausa entre elas. */
export function DarkTwoLine({ slide, step }: ScreenProps<'dark-two-line'>) {
  return (
    <section className="slide">
      <p className="line appear">{slide.lines[0]}</p>
      {step >= 1 ? <p className="line appear">{slide.lines[1]}</p> : null}
    </section>
  )
}

/** Tela 16: a frase, inteira, preta. */
export function DarkMega({ slide }: ScreenProps<'dark-mega'>) {
  return (
    <section className="slide slide--center">
      <h1 className="mega appear">{slide.text}</h1>
    </section>
  )
}
