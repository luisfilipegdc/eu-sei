/**
 * Modelo das telas do telão.
 *
 * Toda tela tem `id`, `variant`, `steps` e `note`:
 *  - `id`    é o número do roteiro (CLAUDE.md §4), fixo e não reordenável.
 *  - `steps` é quantos avanços internos a tela consome. 1 = a tela inteira de uma vez.
 *  - `note`  é a fala do apresentador, exibida só para ele (tecla N ou janela de controle).
 */
export type SlideCommon = {
  id: string
  steps: number
  note: string
  /** Só as telas da revelação (14, 15, 16) são pretas. Não escurecer mais nada. */
  dark?: boolean
  /** Fora do fluxo: a navegação pula, a não ser que o operador ligue a coda. */
  optional?: boolean
}

export type Slide =
  | (SlideCommon & { variant: 'eusei'; text: string; foot?: string; qr?: string })
  | (SlideCommon & { variant: 'claim'; tag: string; text: string })
  | (SlideCommon & { variant: 'recap'; tag: string; items: string[] })
  | (SlideCommon & { variant: 'axis'; left: string; right: string; caption?: string; foot?: string })
  | (SlideCommon & { variant: 'mega'; text: string; foot?: string })
  | (SlideCommon & { variant: 'blank' })
  | (SlideCommon & { variant: 'two-line'; lines: [string, string]; foot?: string })
  | (SlideCommon & { variant: 'illusion' })
  | (SlideCommon & { variant: 'question'; tag: string; text: string; foot?: string })
  | (SlideCommon & { variant: 'reference'; authors: string; title: string; where: string })
  | (SlideCommon & { variant: 'wason'; seed: [number, number, number]; tag: string; foot: string })
  | (SlideCommon & { variant: 'dark-list'; items: string[] })
  | (SlideCommon & { variant: 'dark-two-line'; lines: [string, string] })
  | (SlideCommon & { variant: 'dark-mega'; text: string })
  | (SlideCommon & { variant: 'cloud'; tag: string })
  | (SlideCommon & { variant: 'triad'; items: { term: string; gloss: string }[] })
  | (SlideCommon & { variant: 'tether'; left: string; link: string; right: string; foot: string })
  | (SlideCommon & { variant: 'optional'; tag: string; text: string; foot: string })
  | (SlideCommon & { variant: 'versus'; left: { term: string; gloss: string }; right: { term: string; gloss: string } })
  | (SlideCommon & { variant: 'thermometer'; tag: string })
  | (SlideCommon & { variant: 'final'; lines: string[] })
  | (SlideCommon & { variant: 'credits'; tag: string; names: string[] })

export type SlideVariant = Slide['variant']

/** Props que todo componente de tela recebe. `step` é 0-indexado dentro da tela. */
export type ScreenProps<V extends SlideVariant> = {
  slide: Extract<Slide, { variant: V }>
  step: number
}
