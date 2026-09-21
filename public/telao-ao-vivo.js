/**
 * Camada ao vivo do telão. Não altera nenhuma tela da apresentação: encontra
 * as que precisam de dado da sala e pendura o que falta.
 *
 * Regra do CLAUDE.md §6, e ela é a parte que mais importa: durante a votação
 * das três afirmações o telão mostra SÓ QUANTAS respostas chegaram, nunca o
 * resultado. Mostrar o resultado no minuto 2 mata a dinâmica inteira — a linha,
 * a troca de fichas e a revelação dependem de ninguém saber ainda quem acertou.
 * O resultado aparece uma vez só, no termômetro do minuto 16:30.
 *
 * Se a rede cair, tudo aqui vira silêncio: a apresentação segue igual e o
 * operador conta as mãos, como manda o §6.
 */
(function () {
  var css = document.createElement('style')
  css.textContent = [
    '.ao-vivo{position:absolute;left:7vmin;right:7vmin;bottom:6vmin;display:flex;',
    'justify-content:space-between;align-items:flex-end;gap:3vmin;pointer-events:none}',
    '.ao-vivo .url{font-family:"JetBrains Mono",monospace;font-size:clamp(11px,2vmin,24px);',
    'letter-spacing:.04em;color:var(--ink)}',
    '.ao-vivo .url b{color:var(--acc)}',
    '.ao-vivo .url span{display:block;font-size:clamp(9px,1.4vmin,16px);letter-spacing:.14em;',
    'text-transform:uppercase;color:var(--mut);margin-bottom:.6vmin}',
    '.ao-vivo .conta{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;',
    'font-size:clamp(22px,7vmin,92px);line-height:.9;letter-spacing:-.04em;text-align:right;',
    'font-variant-numeric:tabular-nums}',
    '.ao-vivo .conta u{display:block;text-decoration:none;font-family:"JetBrains Mono",monospace;',
    'font-weight:400;font-size:clamp(9px,1.4vmin,16px);letter-spacing:.14em;text-transform:uppercase;',
    'color:var(--mut);margin-top:.8vmin}',
    '.ao-vivo.off .conta{color:var(--mut);font-size:clamp(11px,2vmin,22px);font-family:"JetBrains Mono",monospace;font-weight:400}',
  ].join('')
  document.head.appendChild(css)

  var origem = location.origin
  var enderecoCurto = origem.replace(/^https?:\/\//, '') + '/v'

  /** Acha as telas pelo texto da etiqueta, sem depender de id que não existe. */
  function secaoPorTag(texto) {
    var todas = document.querySelectorAll('#deck .s')
    for (var i = 0; i < todas.length; i++) {
      var tag = todas[i].querySelector('.tag')
      if (tag && tag.textContent.trim().toLowerCase().indexOf(texto) === 0) return todas[i]
    }
    return null
  }

  var telas = [
    { sec: secaoPorTag('afirmação 1'), q: 'a1' },
    { sec: secaoPorTag('afirmação 2'), q: 'a2' },
    { sec: secaoPorTag('afirmação 3'), q: 'a3' },
  ].filter(function (t) {
    return t.sec
  })

  // a tela do recap mostra o total das três
  var recap = document.querySelector('#deck .three')
  if (recap) telas.push({ sec: recap.closest('.s'), q: null })

  telas.forEach(function (t) {
    var faixa = document.createElement('div')
    faixa.className = 'ao-vivo'
    faixa.innerHTML =
      '<div class="url"><span>responda no celular</span><b>' + enderecoCurto + '</b></div>' +
      '<div class="conta" data-conta>—<u>respostas</u></div>'
    t.sec.appendChild(faixa)
    t.faixa = faixa
  })

  function atualiza(linhas) {
    var porPergunta = {}
    linhas.forEach(function (l) {
      if (l.tipo !== 'voto') return
      porPergunta[l.pergunta] = (porPergunta[l.pergunta] || 0) + 1
    })
    telas.forEach(function (t) {
      var n = t.q ? porPergunta[t.q] || 0 : porPergunta['a1'] || 0
      var alvo = t.faixa.querySelector('[data-conta]')
      alvo.innerHTML = n + '<u>' + (n === 1 ? 'resposta' : 'respostas') + '</u>'
      t.faixa.classList.remove('off')
    })
    termometro(linhas)
    nuvem(linhas)
  }

  function semRede() {
    telas.forEach(function (t) {
      t.faixa.classList.add('off')
      t.faixa.querySelector('[data-conta]').textContent = 'sem rede — conte as mãos'
    })
  }

  /* ---------- termômetro (tela 30): o único lugar onde o resultado aparece ---------- */

  function termometro(linhas) {
    var n1 = document.getElementById('n1')
    var n2 = document.getElementById('n2')
    var nt = document.getElementById('nt')
    if (!n1 || !n2 || !nt) return
    // não atropela o operador: se ele digitou algo, a digitação manda
    if (n1.dataset.manual === '1') return

    var antes = linhas.filter(function (l) {
      return l.tipo === 'voto' && l.pergunta === 'a2'
    })
    var depois = linhas.filter(function (l) {
      return l.tipo === 'voto' && l.pergunta === 'a2_depois'
    })
    if (!antes.length) return

    var vAntes = antes.filter(function (l) {
      return l.opcao === 'V'
    }).length
    var vDepois = depois.filter(function (l) {
      return l.opcao === 'V'
    }).length

    n1.value = vAntes
    n2.value = depois.length ? vDepois : ''
    nt.value = Math.max(antes.length, depois.length)
    n1.dispatchEvent(new Event('input', { bubbles: true }))
  }

  ;['n1', 'n2', 'nt'].forEach(function (id) {
    var el = document.getElementById(id)
    if (!el) return
    el.addEventListener('keydown', function () {
      el.dataset.manual = '1'
      var p = document.getElementById('n1')
      if (p) p.dataset.manual = '1'
    })
  })

  /* ---------- nuvem (tela 17) ---------- */

  var cloud = document.getElementById('cloud')
  var campo = document.getElementById('cin')

  // o operador continua digitando o que for dito em voz alta, mas agora a
  // palavra vai para a mesma sala das que vieram por celular
  if (campo) {
    campo.addEventListener(
      'keydown',
      function (e) {
        if (e.key !== 'Enter') return
        e.stopImmediatePropagation()
        var p = campo.value.trim()
        campo.value = ''
        if (p) window.SALA.enviar({ tipo: 'palavra', texto: p })
      },
      true,
    )
  }

  function normaliza(p) {
    return p
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim()
  }

  function nuvem(linhas) {
    if (!cloud) return
    var contagem = {}
    var rotulo = {}
    linhas.forEach(function (l) {
      if (l.tipo !== 'palavra' || !l.texto) return
      var k = normaliza(l.texto)
      if (!k) return
      contagem[k] = (contagem[k] || 0) + 1
      if (!rotulo[k]) rotulo[k] = l.texto.trim()
    })
    var chaves = Object.keys(contagem)
    if (!chaves.length) return
    var max = Math.max.apply(
      null,
      chaves.map(function (k) {
        return contagem[k]
      }),
    )
    cloud.innerHTML = ''
    chaves.forEach(function (k) {
      var nivel = Math.min(4, Math.max(1, Math.ceil((contagem[k] / max) * 4)))
      var s = document.createElement('span')
      s.className = 'c' + nivel
      s.textContent = rotulo[k]
      cloud.appendChild(s)
    })
  }

  /* ---------- liga ---------- */

  if (!window.SALA || window.SALA.modo === 'offline') {
    semRede()
    return
  }

  // `linhas` vem null quando o navegador está sem rede: aí o telão avisa o
  // operador para contar as mãos, em vez de mostrar um zero que mente
  window.SALA.acompanhar(
    null,
    function (linhas) {
      if (linhas === null) return semRede()
      atualiza(linhas)
    },
    2000,
  )
})()
