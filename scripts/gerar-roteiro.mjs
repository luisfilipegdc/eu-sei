/**
 * Extrai as telas da apresentação para o roteiro de palco (/roteiro).
 *
 * A nota de cada tela já mora no `data-note` de public/index.html — é ela que a
 * tecla N mostra. Gerar daqui evita a única coisa que estraga um roteiro: ele
 * divergir da apresentação depois de uma edição. Mexeu na nota, roda `npm run
 * roteiro` e o celular acompanha.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8')

/** Tempo e orador por tela, na ordem do deck. Ver /elenco. */
const ELENCO = [
  { t: '00:00', quem: 'Luis' }, // 01 eu sei
  { t: '00:40', quem: 'Luis' }, // 02 afirmação 1
  { t: '01:10', quem: 'Luis' }, // 03 afirmação 2
  { t: '01:50', quem: 'Luis' }, // 04 afirmação 3
  { t: '02:30', quem: 'Luis' }, // 05 recap
  { t: '03:10', quem: 'Luis' }, // 06 a linha
  { t: '06:30', quem: 'Luis' }, // 07 troquem
  { t: '06:50', quem: 'Luis' }, // 07b vazia
  { t: '07:45', quem: 'Carlos' }, // 08 os sentidos
  { t: '08:00', quem: 'Carlos' }, // 09 ilusão
  { t: '08:20', quem: 'Luis' }, // 10 hipótese
  { t: '08:30', quem: 'Luis' }, // 11 referência
  { t: '08:40', quem: 'Luis' }, // 12 não provado
  { t: '08:50', quem: 'Luis' }, // 13 wason
  { t: '09:00', quem: 'Luis', pico: true }, // 14 revelação
  { t: '09:20', quem: 'Luis', pico: true }, // 15
  { t: '09:35', quem: 'Luis', pico: true }, // 16
  { t: '09:40', quem: 'Luis' }, // 17 nuvem
  { t: '10:40', quem: 'Renata' }, // 18 definição
  { t: '11:05', quem: 'Renata' }, // 19 etimologia
  { t: '11:40', quem: 'Rebeca' }, // 20 tríade
  { t: '12:00', quem: 'Rebeca' }, // 21 acertaram
  { t: '12:20', quem: 'Rebeca' }, // 22 mênon
  { t: '12:35', quem: 'Rebeca' }, // 23 gettier (oculta)
  { t: '12:40', quem: 'Mariana' }, // 24 não escreveu
  { t: '13:00', quem: 'Mariana' }, // 25 maiêutica
  { t: '13:30', quem: 'Mariana' }, // 26 versus
  { t: '14:00', quem: 'Dalila' }, // 27 por que
  { t: '14:50', quem: 'Dalila' }, // 28 empirismo
  { t: '15:30', quem: 'Dalila' }, // 29 que tipo
  { t: '16:30', quem: 'Luis' }, // 30 termômetro
  { t: '17:00', quem: 'Luis' }, // 30b gráfico
  { t: '17:10', quem: 'Luis', pico: true }, // 31 antirrelativismo
  { t: '17:30', quem: 'Luis' }, // 32 como você sabe
  { t: '17:50', quem: 'Luis', pico: true }, // 33 frase final
  { t: '18:20', quem: 'Luis' }, // 34 eu sei?
  { t: '18:30', quem: 'Luis' }, // 35 créditos
]

/** tira tags e normaliza espaço, para o resumo do que aparece na tela */
function texto(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rarr;/g, '→')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

const telas = []
const partes = html.split(/<section class="s(?=[" ])/).slice(1)

for (const parte of partes) {
  const corpo = parte.slice(0, parte.indexOf('</section>'))
  const cabeca = corpo.slice(0, corpo.indexOf('>') + 1)

  const nota = /data-note="([^"]*)"/.exec(cabeca)
  const passos = /data-steps="(\d+)"/.exec(cabeca)
  const id = /\bid="([^"]+)"/.exec(cabeca)
  const escura = /^\s*dark/.test(cabeca) || cabeca.includes(' dark"')

  // o que a sala vê: etiqueta + a frase de maior peso da tela
  const etiqueta = /<p class="tag">([\s\S]*?)<\/p>/.exec(corpo)

  // frases de destaque
  const frases = [
    ...corpo.matchAll(
      /<(?:p|div|h1)[^>]*class="(?:claim|big[^"]*|mega[^"]*|eusei|mid|wason-semente)"[^>]*>([\s\S]*?)<\/(?:p|div|h1)>/g,
    ),
  ]
    .map((m) => texto(m[1]))
    .filter(Boolean)

  // listas e blocos: as cinco perguntas da revelação, a tríade, o eixo, a
  // amarra. Sem isso as telas mais importantes ficariam sem "o que aparece".
  const itens = [
    ...corpo.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g),
    ...corpo.matchAll(/<span class="axis__pole[^"]*"[^>]*>([\s\S]*?)<\/span>/g),
    ...corpo.matchAll(/<span class="(?:box|tether__box)"[^>]*>([\s\S]*?)<\/span>/g),
    ...corpo.matchAll(/<b>([\s\S]*?)<\/b>/g),
  ]
    .map((m) => texto(m[1]))
    .filter((s) => s && s.length > 1)

  if (!frases.length && itens.length) frases.push(itens.slice(0, 6).join(' · '))

  telas.push({
    id: id ? id[1] : null,
    escura,
    passos: passos ? Number(passos[1]) + 1 : 1,
    etiqueta: etiqueta ? texto(etiqueta[1]) : '',
    tela: frases.slice(0, 3),
    nota: nota ? texto(nota[1]) : '',
  })
}

telas.forEach((t, i) => {
  const e = ELENCO[i] || {}
  t.t = e.t || ''
  t.quem = e.quem || ''
  t.pico = e.pico === true
  t.n = i + 1
})

writeFileSync(
  new URL('../public/roteiro/telas.js', import.meta.url),
  '// GERADO por scripts/gerar-roteiro.mjs a partir das notas de public/index.html.\n' +
    '// Não edite à mão: edite a nota da tela e rode `npm run roteiro`.\n' +
    'window.TELAS = ' +
    JSON.stringify(telas) +
    '\n',
)

console.log('roteiro gerado:', telas.length, 'telas')
const semNota = telas.filter((t) => !t.nota).length
if (semNota) console.log('atenção:', semNota, 'tela(s) sem nota')
