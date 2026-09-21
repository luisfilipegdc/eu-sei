/**
 * Gera o QR da página de votação como SVG embutido num arquivo .js.
 *
 * Roda na máquina, nunca no navegador: a biblioteca é devDependency e o que
 * chega na sala é uma string de SVG dentro de public/qr-votar.js. Assim o
 * telão continua sem baixar imagem nenhuma durante a apresentação.
 *
 *   npm run qr                       usa a URL padrão
 *   npm run qr -- https://outro/v    troca a URL
 */
import { writeFileSync } from 'node:fs'
import QRCode from 'qrcode'

const base = (process.argv[2] || 'https://eu-sei-delta.vercel.app').replace(/\/+$/, '')

/** Um QR por atividade: a câmera leva direto para a tela certa do celular. */
const alvos = {
  // um QR por afirmação: quem escaneia na tela da 2 cai na 2, não na 1
  a1: base + '/v?q=a1',
  a2: base + '/v?q=a2',
  a3: base + '/v?q=a3',
  // o das três de uma vez, para a tela do recap e para quem chegou atrasado
  votar: base + '/v',
  // a reabertura da afirmação 2 no minuto 16:30, para o termômetro
  depois: base + '/v?q=a2&rodada=depois',
  wason: base + '/v?wason',
  palavra: base + '/v?palavra',
  referencias: base + '/referencias',
}

async function gerar(url) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#101319', light: '#EFEEEA' },
  })
  // o SVG do qrcode vem com width/height fixos; tira para ele preencher a caixa
  return svg
    .replace(/<\?xml[^>]*\?>\s*/, '')
    .replace(/ width="[^"]*"/, '')
    .replace(/ height="[^"]*"/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const saida = {}
for (const [nome, url] of Object.entries(alvos)) {
  saida[nome] = { url: url, svg: await gerar(url) }
  console.log('QR', nome, '→', url)
}

writeFileSync(
  new URL('../public/qr-votar.js', import.meta.url),
  '// GERADO por scripts/gerar-qr.mjs — não edite à mão.\n' +
    '// Para trocar o domínio: npm run qr -- https://seu-dominio\n' +
    'window.QR_VOTAR = ' +
    JSON.stringify(saida) +
    '\n',
)
