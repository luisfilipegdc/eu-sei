import type { ScreenProps } from '../slides/types'

/* ---------- telas claras ---------- */

export function EuSei({ slide }: ScreenProps<'eusei'>) {
  return (
    <section className="slide slide--center">
      <h1 className="mega eusei appear">{slide.text}</h1>
      {slide.foot || slide.qr ? (
        <div className="eusei__end appear">
          {slide.foot ? <p className="label">{slide.foot}</p> : null}
          {slide.qr ? <p className="eusei__url">{slide.qr}</p> : null}
        </div>
      ) : null}
    </section>
  )
}

/** 02, 03, 04 — uma afirmação por tela, com a linha da ficha embaixo. */
export function Claim({ slide }: ScreenProps<'claim'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <p className="claim appear">{slide.text}</p>
      <p className="label">( ) Verdadeiro &nbsp; ( ) Falso &nbsp;&nbsp; Confiança ___ / 100</p>
    </section>
  )
}

/** 05 — as três juntas, durante a contagem de mãos. */
export function Recap({ slide }: ScreenProps<'recap'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <ol className="recap">
        {slide.items.map((item, i) => (
          <li key={item} className="appear">
            <b>{i + 1}</b>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Axis({ slide, step }: ScreenProps<'axis'>) {
  // o eixo encolhe conforme o comprimento dos polos: EMPIRISMO ——— EPISTEMOLOGIA
  // não cabe em 1024px no corpo de VERDADEIRO ——— FALSO
  const sum = { '--sum': slide.left.length + slide.right.length } as React.CSSProperties
  return (
    <section className="slide slide--center">
      <div className="axis appear" style={sum}>
        <span className="axis__pole axis__pole--a">{slide.left}</span>
        <span className="axis__rule" />
        <span className="axis__pole axis__pole--b">{slide.right}</span>
      </div>
      {slide.caption ? <p className="axis__caption">{slide.caption}</p> : null}
      {slide.foot && step >= 1 ? <p className="line appear axis__foot">{slide.foot}</p> : null}
    </section>
  )
}

export function Mega({ slide }: ScreenProps<'mega'>) {
  return (
    <section className="slide slide--center">
      <h1 className="mega mega--sm appear">{slide.text}</h1>
      {slide.foot ? <p className="label">{slide.foot}</p> : null}
    </section>
  )
}

/** 07b — vazia de propósito, e clara: o preto é só da revelação. */
export function Blank() {
  return <section className="slide" />
}

export function TwoLine({ slide, step }: ScreenProps<'two-line'>) {
  return (
    <section className="slide">
      {slide.foot ? <p className="tag appear">{slide.foot}</p> : null}
      <p className="line appear">{slide.lines[0]}</p>
      {step >= 1 ? <p className="line appear">{slide.lines[1]}</p> : null}
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
      <p className="tag">Qual dos dois é mais escuro?</p>
      <div className="illusion appear">
        <div className="illusion__square" style={{ left: together ? 'calc(50% - 16vmin)' : '6%' }} />
        <div className="illusion__square" style={{ left: together ? '50%' : 'calc(94% - 16vmin)' }} />
      </div>
      {together ? <p className="label appear">a mesma cor · #8A8A8A nos dois</p> : null}
    </section>
  )
}

export function Question({ slide, step }: ScreenProps<'question'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <p className="xl appear">{slide.text}</p>
      {slide.foot && step >= 1 ? <p className="label appear">{slide.foot}</p> : null}
    </section>
  )
}

/** 11 — a referência completa, sozinha. A única tela que pode passar de nove palavras. */
export function Reference({ slide }: ScreenProps<'reference'>) {
  return (
    <section className="slide">
      <blockquote className="ref appear">
        <span>{slide.authors}</span>
        <b>“{slide.title}”</b>
        <i>{slide.where}</i>
      </blockquote>
    </section>
  )
}

/** 13 — moldura do Wason. A lista de trios e o contador entram no passo 6. */
export function Wason({ slide }: ScreenProps<'wason'>) {
  return (
    <section className="slide slide--center">
      <p className="tag appear">{slide.tag}</p>
      <p className="wason__seed appear">{slide.seed.join(' · ')}</p>
      <p className="label">{slide.foot}</p>
    </section>
  )
}

/** 17 — moldura da nuvem. As palavras ao vivo entram no passo 6. */
export function Cloud({ slide }: ScreenProps<'cloud'>) {
  return (
    <section className="slide slide--center">
      <p className="tag appear">{slide.tag}</p>
      <div className="cloud" />
    </section>
  )
}

/** 20 — crença · verdade · justificação, uma coluna por avanço. */
export function Triad({ slide, step }: ScreenProps<'triad'>) {
  return (
    <section className="slide">
      <div className="triad">
        {slide.items.map((item, i) => (
          <div
            key={item.term}
            className={`triad__col${i <= step ? ' appear' : ' is-hidden'}${
              i === slide.items.length - 1 ? ' triad__col--hi' : ''
            }`}
          >
            <b>{item.term}</b>
            <span>{item.gloss}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/** 22 — opinião verdadeira amarrada pela razão. */
export function Tether({ slide, step }: ScreenProps<'tether'>) {
  return (
    <section className="slide">
      <div className="tether appear">
        <span className="tether__box">{slide.left}</span>
        <span className={`tether__link${step >= 1 ? ' appear' : ' is-hidden'}`}>
          <b>{slide.link}</b>
        </span>
        <span className="tether__box">{slide.right}</span>
      </div>
      <p className="label">{slide.foot}</p>
    </section>
  )
}

/** 23 — a coda de Gettier, oculta por padrão. */
export function Optional({ slide }: ScreenProps<'optional'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <p className="xl appear">{slide.text}</p>
      <p className="label">{slide.foot}</p>
    </section>
  )
}

/** 26 — epistemologia ≠ maiêutica. */
export function Versus({ slide, step }: ScreenProps<'versus'>) {
  const cols = [slide.left, slide.right]
  return (
    <section className="slide">
      <div className="versus">
        <div className={`versus__col${step >= 0 ? ' appear' : ''}`}>
          <b>{cols[0].term}</b>
          <span>{cols[0].gloss}</span>
        </div>
        <div className={`versus__mark${step >= 1 ? ' appear' : ' is-hidden'}`}>≠</div>
        <div className={`versus__col${step >= 2 ? ' appear' : ' is-hidden'}`}>
          <b>{cols[1].term}</b>
          <span>{cols[1].gloss}</span>
        </div>
      </div>
    </section>
  )
}

/** 30 — moldura do termômetro. As barras entram no passo 6. */
export function Thermometer({ slide }: ScreenProps<'thermometer'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <div className="therm">
        <div className="therm__row">
          <span className="label">no início</span>
          <span className="therm__track" />
        </div>
        <div className="therm__row therm__row--after">
          <span className="label">agora</span>
          <span className="therm__track" />
        </div>
      </div>
    </section>
  )
}

/** 33 — a frase final, em quatro passos. */
export function Final({ slide, step }: ScreenProps<'final'>) {
  return (
    <section className="slide">
      {slide.lines.slice(0, step + 1).map((l, i) => (
        <p
          key={l}
          className={`appear ${i === slide.lines.length - 1 ? 'label' : i === 2 ? 'line' : 'final__mid'}`}
        >
          {l}
        </p>
      ))}
    </section>
  )
}

export function Credits({ slide }: ScreenProps<'credits'>) {
  return (
    <section className="slide">
      <p className="tag appear">{slide.tag}</p>
      <div className="credits appear">
        {slide.names.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </section>
  )
}

/* ---------- a revelação: o único preto do deck ---------- */

/** Tela 14: as cinco perguntas, uma a uma. */
export function DarkList({ slide, step }: ScreenProps<'dark-list'>) {
  return (
    <section className="slide">
      <ol className="dark-list">
        {slide.items.slice(0, step + 1).map((item, i) => (
          <li key={item} className={`dark-list__item appear${i < step ? ' fade-out' : ''}`}>
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
