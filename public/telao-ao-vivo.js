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
    '.ao-vivo .qr{display:flex;align-items:flex-end;gap:2vmin}',
    '.ao-vivo .qr svg{width:15vmin;height:15vmin;display:block;shape-rendering:crispEdges}',
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

  // cada afirmação tem o seu QR: escanear na tela da 2 abre a 2 no celular
  var telas = [
    { sec: secaoPorTag('afirmação 1'), q: 'a1', qr: 'a1' },
    { sec: secaoPorTag('afirmação 2'), q: 'a2', qr: 'a2' },
    { sec: secaoPorTag('afirmação 3'), q: 'a3', qr: 'a3' },
  ].filter(function (t) {
    return t.sec
  })

  // a tela do recap mostra o total das três
  var recap = document.querySelector('#deck .three')
  if (recap) telas.push({ sec: recap.closest('.s'), q: null })

  // o Wason e a nuvem têm QR próprio: a câmera leva direto para a tela certa
  var secWason = document.getElementById('wason')
  var secNuvem = document.getElementById('nuvem')
  if (secWason) telas.push({ sec: secWason, q: null, qr: 'wason', conta: 'trios' })
  if (secNuvem) telas.push({ sec: secNuvem, q: null, qr: 'palavra', conta: 'palavras' })

  // 16:30 — reabre a afirmação 2 pelo celular, em vez de contar mãos
  var secTermo = document.getElementById('termo')
  if (secTermo) telas.push({ sec: secTermo, q: 'a2_depois', qr: 'depois', conta: 'agora' })

  // os QR são gerados por scripts/gerar-qr.mjs e vêm embutidos, sem baixar imagem
  var qrs = window.QR_VOTAR || {}

  telas.forEach(function (t) {
    var qr = qrs[t.qr || 'votar']
    var endereco = qr ? qr.url.replace(/^https?:\/\//, '') : enderecoCurto
    var faixa = document.createElement('div')
    faixa.className = 'ao-vivo'
    faixa.innerHTML =
      '<div class="qr">' +
      (qr ? qr.svg : '') +
      '<div class="url"><span>aponte a câmera</span><b>' + endereco + '</b></div>' +
      '</div>' +
      '<div class="conta" data-conta>—<u>' + (t.conta || 'respostas') + '</u></div>'
    t.sec.appendChild(faixa)
    t.faixa = faixa
  })

  function atualiza(linhas) {
    var porPergunta = {}
    var nTrios = 0
    var nPalavras = 0
    linhas.forEach(function (l) {
      if (l.tipo === 'voto') porPergunta[l.pergunta] = (porPergunta[l.pergunta] || 0) + 1
      else if (l.tipo === 'wason') nTrios++
      else if (l.tipo === 'palavra') nPalavras++
    })
    telas.forEach(function (t) {
      var n =
        t.qr === 'wason' ? nTrios : t.qr === 'palavra' ? nPalavras : porPergunta[t.q || 'a1'] || 0
      var rotulo = t.conta || (n === 1 ? 'resposta' : 'respostas')
      t.faixa.querySelector('[data-conta]').innerHTML = n + '<u>' + rotulo + '</u>'
      t.faixa.classList.remove('off')
    })
    termometro(linhas)
    nuvem(linhas)
    wason(linhas)
    placar(linhas)
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

  /* ---------- Wason 2-4-6 (tela 13) ---------- */

  var wlista = document.getElementById('wlista')

  /**
   * A regra real é qualquer sequência crescente: a < b < c. É só isso.
   *
   * O contador separa os trios em dois: os que **só podiam dar sim** e os que
   * **podiam dar não**. A hipótese dominante da turma é sempre a que 2·4·6
   * sugere — soma de dois —, então um trio com passo 2 em toda parte não
   * consegue derrubar nada: ele ia dar sim de qualquer jeito. Qualquer outro
   * trio é um teste de verdade, porque poderia ter voltado não.
   *
   * Essa razão é a evidência do viés, projetada ao vivo. É ela que liga na
   * quinta pergunta do cartão: o que me faria mudar de ideia?
   */
  function crescente(t) {
    return t[0] < t[1] && t[1] < t[2]
  }

  function podiaRefutar(t) {
    return !(t[1] - t[0] === 2 && t[2] - t[1] === 2)
  }

  function wason(linhas) {
    if (!wlista) return
    var trios = []
    linhas.forEach(function (l) {
      if (l.tipo !== 'wason' || !l.texto) return
      var t = l.texto.split(',').map(Number)
      if (t.length !== 3 || t.some(isNaN)) return
      trios.push(t)
    })
    if (wlista.childElementCount === trios.length) return

    wlista.innerHTML = ''
    var confirmam = 0
    trios.forEach(function (t) {
      var sim = crescente(t)
      var testa = podiaRefutar(t)
      if (!testa) confirmam++
      var li = document.createElement('li')
      li.className = sim ? 'sim' : 'nao'
      li.innerHTML = '<span>' + t.join(' · ') + '</span><i>' + (sim ? '✓' : '✗') + '</i>'
      wlista.appendChild(li)
    })

    var c = document.getElementById('wconf')
    var r = document.getElementById('wref')
    if (c) c.textContent = confirmam
    if (r) r.textContent = trios.length - confirmam
  }

  /* ---------- o gráfico comparativo das três afirmações ---------- */

  var AFIRMACOES = [
    { q: 'a1', frase: 'Usamos apenas 10% do nosso cérebro.' },
    { q: 'a2', frase: 'O aluno aprende mais quando o ensino é adaptado ao estilo dele.' },
    { q: 'a3', frase: 'Sócrates nunca escreveu um livro.' },
  ]

  var grade = document.getElementById('placar-grade')

  /**
   * Barra empilhada por afirmação: verdadeiro contra falso, contagem direta na
   * barra. Duas séries só, com legenda e rótulo em cada segmento, então a cor
   * nunca é a única coisa que diz o que é o quê.
   *
   * Esta tela vem DEPOIS do termômetro de propósito. O §6 é explícito: durante
   * a votação o telão não mostra resultado. Aqui já passou a linha, a troca, a
   * revelação e o termômetro — agora o número é fecho, não spoiler.
   */
  function placar(linhas) {
    if (!grade) return
    var dados = AFIRMACOES.map(function (a) {
      var votos = linhas.filter(function (l) {
        return l.tipo === 'voto' && l.pergunta === a.q
      })
      return {
        frase: a.frase,
        v: votos.filter(function (l) {
          return l.opcao === 'V'
        }).length,
        f: votos.filter(function (l) {
          return l.opcao === 'F'
        }).length,
      }
    })

    var total = dados.reduce(function (s, d) {
      return s + d.v + d.f
    }, 0)
    var aviso = document.getElementById('placar-sem')
    if (aviso) aviso.style.display = total ? 'none' : ''
    if (!total) return

    var assinatura = dados
      .map(function (d) {
        return d.v + '/' + d.f
      })
      .join('|')
    if (grade.dataset.assinatura === assinatura) return
    grade.dataset.assinatura = assinatura

    grade.innerHTML = ''
    dados.forEach(function (d, i) {
      var n = d.v + d.f
      var pv = n ? (d.v / n) * 100 : 0
      var linha = document.createElement('div')
      linha.className = 'placar-linha'
      linha.dataset.i = String(i)
      linha.innerHTML =
        '<div class="placar-cab">' +
        '<span class="frase">' + d.frase + '</span>' +
        '<span class="n">' + n + (n === 1 ? ' resposta' : ' respostas') + '</span>' +
        '</div>' +
        '<div class="barra-empilhada">' +
        '<i class="v' + (d.v ? '' : ' vazio') + '" style="width:' + pv + '%">' +
        (d.v ? d.v : '') + '</i>' +
        '<i class="f' + (d.f ? '' : ' vazio') + '" style="width:' + (100 - pv) + '%">' +
        (d.f ? d.f : '') + '</i>' +
        '</div>'
      grade.appendChild(linha)
    })
    revelaPlacar()
  }

  // uma afirmação por avanço, como o resto do deck
  var secPlacar = document.getElementById('placar')
  var passos = document.getElementById('placar-passos')

  function revelaPlacar() {
    if (!grade || !secPlacar) return
    var acesos = passos ? passos.querySelectorAll('.step.in').length : 0
    var visiveis = secPlacar.classList.contains('on') ? acesos + 1 : 0
    ;[].forEach.call(grade.children, function (el, i) {
      el.classList.toggle('in', i < visiveis)
    })
  }

  // o motor do deck não avisa quando muda de passo, mas mexe na classe dos
  // marcadores e da própria tela — observar os dois basta
  if (secPlacar) {
    new MutationObserver(revelaPlacar).observe(secPlacar, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
  if (passos) {
    new MutationObserver(revelaPlacar).observe(passos, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true,
    })
  }

  /* ---------- tela 34: o QR das referências ---------- */

  // a tela final trazia um QR desenhado à mão para um site que não tem o
  // material. Troca pelo QR da página /referencias, que tem.
  ;(function trocaQrFinal() {
    var qr = qrs.referencias
    if (!qr) return
    var caixa = document.querySelector('#deck .qrbox')
    if (caixa) caixa.innerHTML = qr.svg
    var texto = document.querySelector('#deck .endrow .mini')
    if (texto) {
      texto.innerHTML =
        'as referências e as cinco perguntas<br><b>' +
        qr.url.replace(/^https?:\/\//, '') +
        '</b>'
    }
  })()

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
