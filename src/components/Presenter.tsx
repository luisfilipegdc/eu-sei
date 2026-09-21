import { useEffect, useState } from 'react'
import { deck } from '../slides/deck'
import { headline } from '../slides/headline'
import { objetivo, resumo } from '../slides/resumo'
import { sources } from '../slides/sources'
import { useDeck } from './useDeck'
import { useTimer } from './useTimer'

function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null
  if (!el) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
}

/**
 * Tela 1, a do apresentador. O telão fica na tela 2, em /.
 * As duas janelas andam juntas: navegar aqui move lá, e vice-versa.
 */
export default function Presenter() {
  const { index, step, slide, upcoming, progress, totalSteps, next, prev, home, startedAt } =
    useDeck(deck)
  const { remaining, running, label } = useTimer(startedAt)
  const [painel, setPainel] = useState<'resumo' | 'fontes'>('resumo')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isTyping()) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        home()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, home])

  return (
    <div className="pres">
      <header className="pres__top">
        <div className={`pres__clock${remaining < 0 ? ' is-over' : ''}`}>{label}</div>
        <div className="pres__meta">
          <span className="label">
            tela {slide.id} · {index + 1} de {deck.length}
            {slide.steps > 1 ? ` · passo ${step + 1}/${slide.steps}` : ''}
          </span>
          <span className="label">
            {running ? 'regressivo de 18:30' : 'o cronômetro começa no primeiro avanço'}
          </span>
        </div>
        <button
          type="button"
          className="pres__btn"
          onClick={() => window.open('/', 'telao', 'noopener')}
        >
          abrir o telão
        </button>
      </header>

      <div className="pres__bar">
        <i style={{ width: `${(progress / totalSteps) * 100}%` }} />
      </div>

      <main className="pres__main">
        <section className="pres__now">
          <p className="label">no ar agora</p>
          <p className="pres__headline">{headline(slide)}</p>
          <p className="label">nota</p>
          <p className="pres__note">{slide.note}</p>
          <div className="pres__nav">
            <button type="button" className="pres__btn" onClick={prev}>
              ← volta
            </button>
            <button type="button" className="pres__btn pres__btn--go" onClick={next}>
              avança →
            </button>
            <button type="button" className="pres__btn" onClick={home}>
              Home reinicia
            </button>
          </div>
        </section>

        <section className="pres__side">
          <p className="label">a seguir</p>
          {upcoming ? (
            <p className="pres__nextline">
              <b>{upcoming.id}</b> {headline(upcoming)}
            </p>
          ) : (
            <p className="pres__nextline pres__nextline--end">fim do recorte construído</p>
          )}

          <div className="pres__tabs">
            <button
              type="button"
              className={`pres__tab${painel === 'resumo' ? ' is-on' : ''}`}
              onClick={() => setPainel('resumo')}
            >
              resumo
            </button>
            <button
              type="button"
              className={`pres__tab${painel === 'fontes' ? ' is-on' : ''}`}
              onClick={() => setPainel('fontes')}
            >
              fontes (B)
            </button>
          </div>

          <div className="pres__panel">
            {painel === 'resumo' ? (
              <>
                <p className="pres__h">O que é este ensaio</p>
                <p>{objetivo.o_que}</p>
                <p>{objetivo.como}</p>
                <p className="pres__h">Objetivo</p>
                <p className="pres__strong">{objetivo.objetivo}</p>
                <p>{objetivo.criterio}</p>
                <p className="pres__h">{resumo.titulo}</p>
                <p>{resumo.definicao}</p>
                <dl className="pres__dl">
                  {resumo.problemas.map((p) => (
                    <div key={p.q}>
                      <dt>{p.q}</dt>
                      <dd>{p.a}</dd>
                    </div>
                  ))}
                </dl>
                <p>{resumo.fecho}</p>
              </>
            ) : (
              <dl className="pres__dl">
                {sources.map((s) => (
                  <div key={s.id}>
                    <dt>
                      {s.title} <span className="label">{s.kind}</span>
                    </dt>
                    <dd>{s.lead}</dd>
                    <dd>{s.follow}</dd>
                    <dd className="pres__pouso">{s.pouso}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
