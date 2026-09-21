import type { Slide } from './types'

/** Resumo de uma tela em uma linha, para a janela do apresentador. */
export function headline(slide: Slide): string {
  switch (slide.variant) {
    case 'eusei':
    case 'dark-mega':
      return slide.text
    case 'axis':
      return `${slide.left} ——— ${slide.right}`
    case 'illusion':
      return 'dois quadrados sobre o degradê — no avanço eles encostam'
    case 'dark-list':
      return slide.items.join(' · ')
    case 'dark-two-line':
      return slide.lines.join(' / ')
  }
}
