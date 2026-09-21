/**
 * As seis telas de reserva atrás da tecla B — o repertório maiêutico do
 * Bloco C do roteiro, na ordem dele.
 *
 * Não entram na ordem do deck: o operador chama uma quando alguém diz de onde
 * veio o que sabe, na maiêutica de pé. É conversa com uma pessoa de cada vez,
 * então a tela carrega só a pergunta — nunca a resposta.
 *
 * `pouso` é a conclusão do apresentador. Aparece só para ele, com a tecla N,
 * pela mesma razão que as notas das telas do deck.
 */
export type Source = {
  id: string
  title: string
  kind: string
  lead: string
  follow: string
  pouso: string
}

export const sources: Source[] = [
  {
    id: 'vi',
    title: 'EU VI',
    kind: 'percepção',
    lead: 'Você já viu alguma coisa que depois descobriu que não era o que parecia?',
    follow: 'Naquela hora, você tinha alguma sensação de estar vendo errado?',
    pouso: 'Ver é uma fonte, não um critério. Falta alguma coisa entre as duas.',
  },
  {
    id: 'ens',
    title: 'ME ENSINARAM',
    kind: 'testemunho',
    lead: 'E quem te ensinou aprendeu com quem?',
    follow:
      'Em algum ponto essa corrente encosta em alguma coisa que não é "alguém me contou". Encosta em quê?',
    pouso:
      'Não é a corrente que está errada — é ela ser invisível. Quem nunca olhou para os elos não escolheu confiar; herdou.',
  },
  {
    id: 'pes',
    title: 'PESQUISEI',
    kind: 'busca',
    lead: 'Você pesquisou até achar a resposta — ou até achar a resposta que já esperava?',
    follow: 'Se o segundo resultado dissesse o contrário do primeiro, o que você teria feito?',
    pouso:
      'Pesquisar é uma ação. O critério é o que você faz quando encontra discordância. Sem isso, pesquisar é confirmar.',
  },
  {
    id: 'cie',
    title: 'A CIÊNCIA DIZ',
    kind: 'autoridade',
    lead: 'Qual estudo? Com quantas pessoas?',
    follow: 'Quando a ciência muda de opinião — ela falhou ou ela funcionou?',
    pouso:
      'Revisão é o mecanismo, não o defeito. Use este fio sempre que sentir a sala escorregando para o relativismo.',
  },
  {
    id: 'ia',
    title: 'A IA RESPONDEU',
    kind: 'fluência',
    lead: 'A resposta veio bem escrita. Isso tem alguma relação com estar certa?',
    follow:
      'Como você checaria? E se para checar você já precisasse saber a resposta — para que serviu perguntar?',
    pouso:
      'É a única fonte da lista que produz confiança sem produzir justificação.',
  },
  {
    id: 'todos',
    title: 'TODO MUNDO SABE',
    kind: 'consenso',
    lead: 'Quantas pessoas precisam acreditar numa coisa para ela virar verdade?',
    follow:
      'Tem alguma coisa que todo mundo já acreditou e hoje a gente sabe que era falsa? Então o número mede o quê?',
    pouso: 'Mede difusão, não verdade.',
  },
]
