/**
 * Modelo das telas do telão.
 *
 * Toda tela tem `id`, `variant`, `steps` e `note`:
 *  - `id`    é o número do roteiro (CLAUDE.md §4), fixo e não reordenável.
 *  - `steps` é quantos avanços internos a tela consome. 1 = a tela inteira de uma vez.
 *  - `note`  é a fala do apresentador, visível só para ele com a tecla N.
 */
export type SlideCommon = {
  id: string
  steps: number
  note: string
  /** Só as telas da revelação (14, 15, 16) são pretas. Não escurecer mais nada. */
  dark?: boolean
}

export type Slide =
  | (SlideCommon & { variant: 'eusei'; text: string })
  | (SlideCommon & { variant: 'axis'; left: string; right: string; caption?: string })
  | (SlideCommon & { variant: 'illusion' })
  | (SlideCommon & { variant: 'dark-list'; items: string[] })
  | (SlideCommon & { variant: 'dark-two-line'; lines: [string, string] })
  | (SlideCommon & { variant: 'dark-mega'; text: string })

export type SlideVariant = Slide['variant']

/** Props que todo componente de tela recebe. `step` é 0-indexado dentro da tela. */
export type ScreenProps<V extends SlideVariant> = {
  slide: Extract<Slide, { variant: V }>
  step: number
}
