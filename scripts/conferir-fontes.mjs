/**
 * Confere se cada bloco de fontes está na tela certa.
 *
 * As fontes são escritas à mão e chaveadas pelo número sequencial da tela; as
 * telas são geradas da apresentação. Basta alguém inserir uma tela no meio do
 * deck para tudo deslocar — e um erro desses só apareceria na frente da turma.
 * Por isso a conferência é um comando, não uma boa intenção.
 */
import { readFileSync } from 'node:fs'

const base = new URL('../public/roteiro/', import.meta.url)
global.window = {}
eval(readFileSync(new URL('telas.js', base), 'utf8'))
eval(readFileSync(new URL('fontes.js', base), 'utf8'))

const telas = global.window.TELAS
const fontes = global.window.FONTES

let semFonte = []
let suspeitas = []

telas.forEach((t, i) => {
  const n = i + 1
  const f = fontes[n]
  if (!f) {
    semFonte.push(n)
    return
  }
  // heurística boba e eficaz: alguma palavra marcante do título tem que
  // aparecer na tela ou na nota dela
  const alvo = (t.etiqueta + ' ' + t.tela.join(' ') + ' ' + t.nota).toLowerCase()
  const palavras = f.titulo
    .toLowerCase()
    .replace(/[^\wàâãáéêíóôõúç\s]/g, ' ')
    .split(/\s+/)
    .filter((p) => p.length > 4)
  // e o contrário também: palavra marcante da tela aparecendo no título.
  // Um conferidor que grita à toa é um conferidor que ninguém lê.
  const daTela = (t.etiqueta + ' ' + (t.tela[0] || ''))
    .toLowerCase()
    .replace(/[^\wàâãáéêíóôõúç\s]/g, ' ')
    .split(/\s+/)
    .filter((p) => p.length > 4)
  const titulo = f.titulo.toLowerCase()
  const achou =
    palavras.some((p) => alvo.includes(p)) || daTela.some((p) => titulo.includes(p))
  if (!achou && !f.conferido) suspeitas.push(`${n}: "${f.titulo}" não casa com « ${(t.etiqueta || t.tela[0] || t.nota).slice(0, 46)} »`)
})

console.log('telas:', telas.length, '· com fonte:', telas.length - semFonte.length)
if (semFonte.length) console.log('SEM FONTE:', semFonte.join(', '))
if (suspeitas.length) {
  console.log('\nPOSSÍVEL DESALINHAMENTO — confira à mão:')
  suspeitas.forEach((s) => console.log('  ' + s))
} else {
  const conferidas = Object.values(fontes).filter((f) => f.conferido).length
  console.log('alinhamento: tudo casa' + (conferidas ? ' (' + conferidas + ' verificadas à mão)' : ''))
}

const graus = {}
Object.values(fontes).forEach((f) =>
  (f.itens || []).forEach((x) => (graus[x.grau] = (graus[x.grau] || 0) + 1)),
)
const perguntas = Object.values(fontes).reduce((s, f) => s + (f.perguntar || []).length, 0)
console.log('\nitens por grau:', JSON.stringify(graus), '· perguntas prováveis:', perguntas)

process.exit(semFonte.length ? 1 : 0)
