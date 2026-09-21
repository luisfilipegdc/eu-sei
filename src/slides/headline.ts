import type { Slide } from './types'

/** Resumo de uma tela em uma linha, para a janela do apresentador. */
export function headline(slide: Slide): string {
  switch (slide.variant) {
    case 'eusei':
    case 'dark-mega':
    case 'mega':
      return slide.text
    case 'claim':
    case 'question':
    case 'optional':
      return `${slide.tag} — ${slide.text}`
    case 'recap':
      return slide.items.join(' · ')
    case 'axis':
      return `${slide.left} ——— ${slide.right}`
    case 'blank':
      return 'tela vazia, durante a troca de fichas'
    case 'illusion':
      return 'dois quadrados sobre o degradê — no avanço eles encostam'
    case 'reference':
      return `${slide.authors} — ${slide.title}`
    case 'wason':
      return `${slide.seed.join(' · ')} — mandem trios`
    case 'dark-list':
      return slide.items.join(' · ')
    case 'two-line':
    case 'dark-two-line':
      return slide.lines.join(' / ')
    case 'cloud':
      return slide.tag
    case 'triad':
      return slide.items.map((i) => i.term).join(' · ')
    case 'tether':
      return `${slide.left} —${slide.link}— ${slide.right}`
    case 'versus':
      return `${slide.left.term} ≠ ${slide.right.term}`
    case 'thermometer':
      return slide.tag
    case 'final':
      return slide.lines.join(' ')
    case 'credits':
      return slide.names.join(' · ')
  }
}
