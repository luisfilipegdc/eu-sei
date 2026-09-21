import type { Slide } from './types'

/**
 * Recorte do roteiro: as três telas de exemplo do passo 1 (01, 06, 09)
 * e as três telas da revelação do passo 2 (14, 15, 16).
 * As demais 29 telas entram no passo 3 da ordem de construção.
 */
export const deck: Slide[] = [
  {
    id: '01',
    variant: 'eusei',
    text: 'EU SEI.',
    steps: 1,
    note: 'Fica no ar até 00:40. Não explique. Deixe a sala ler sozinha e esperar.',
  },
  {
    id: '06',
    variant: 'axis',
    left: 'VERDADEIRO',
    right: 'FALSO',
    steps: 1,
    note: 'No ar de 03:10 a 06:30, e volta em 08:50. Enquanto votam, não comente nada.',
  },
  {
    id: '09',
    variant: 'illusion',
    steps: 2,
    note: 'Passo 1: os dois quadrados parecem tons diferentes. Passo 2: eles encostam — mesmo cinza, #8A8A8A. Os sentidos informam; não garantem.',
  },
  {
    id: '14',
    variant: 'dark-list',
    dark: true,
    // As cinco perguntas do cartão de papel. A quinta é a que liga no Wason.
    items: [
      'Isso é verdade?',
      'Como eu sei?',
      'De onde veio o que eu sei?',
      'Isso basta para eu afirmar?',
      'O que me faria mudar de ideia?',
    ],
    steps: 5,
    note: 'Uma pergunta por avanço, sem pressa. Leia em voz alta. É a primeira tela preta do deck — deixe o corte trabalhar.',
  },
  {
    id: '15',
    variant: 'dark-two-line',
    dark: true,
    lines: ['Vocês passaram nove minutos fazendo isto.', 'Isto tem um nome.'],
    steps: 2,
    note: 'Pausa entre as duas linhas. A segunda linha é a virada do seminário.',
  },
  {
    id: '16',
    variant: 'dark-mega',
    dark: true,
    text: 'VOCÊ ACABOU DE FAZER EPISTEMOLOGIA',
    steps: 1,
    note: 'Silêncio. Conte até três antes de avançar.',
  },
]

/** Telas de reserva chamadas pela tecla B (fontes). Conteúdo entra no passo 3. */
export const sources: { key: string; text: string }[] = [
  { key: '1', text: 'Pashler, H. et al. (2008). Learning Styles: Concepts and Evidence. Psychological Science in the Public Interest, 9(3), 105–119.' },
  { key: '2', text: 'Wason, P. C. (1960). On the failure to eliminate hypotheses in a conceptual task. Quarterly Journal of Experimental Psychology, 12(3), 129–140.' },
  { key: '3', text: 'Platão. Mênon, 97a–98a.' },
  { key: '4', text: 'Gettier, E. (1963). Is Justified True Belief Knowledge? Analysis, 23(6), 121–123.' },
]
