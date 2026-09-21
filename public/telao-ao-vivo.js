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
  /**
   * A faixa de participação.
   *
   * A versão anterior tinha a hierarquia invertida: o contador de respostas
   * ocupava 7vmin e a instrução que faz a pessoa agir ("aponte a câmera")
   * ocupava 1.4vmin. O número grande serve ao operador; a instrução serve à
   * sala — e é a sala que precisa fazer alguma coisa. Aqui o convite é o
   * elemento dominante e o contador vira dado discreto.
   *
   * A promessa de anonimato fica no telão, não só no celular: ela é o que
   * derruba a objeção, e precisa estar visível no instante em que a pessoa
   * decide se pega o telefone — não três telas depois, quando já decidiu não.
   */
  var css = document.createElement('style')
  css.textContent = [
    '.ao-vivo{position:absolute;left:7vmin;right:7vmin;bottom:5.5vmin;display:flex;',
    'justify-content:space-between;align-items:flex-end;gap:4vmin;pointer-events:none}',
    '.ao-vivo .qr{display:flex;align-items:center;gap:2.6vmin}',
    '.ao-vivo .qr svg{width:19vmin;height:19vmin;display:block;shape-rendering:crispEdges;',
    'border:0.7vmin solid var(--paper);outline:1px solid rgba(16,19,25,.12)}',
    '.ao-vivo .url{max-width:34ch}',
    '.ao-vivo .url .chamada{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;',
    'font-size:clamp(20px,4.2vmin,54px);line-height:1;letter-spacing:-.03em;color:var(--ink);',
    'display:block;margin-bottom:1vmin}',
    '.ao-vivo .url .promessa{font-family:"Archivo",sans-serif;font-weight:500;',
    'font-size:clamp(13px,2.1vmin,26px);color:#5A6070;display:block;line-height:1.35}',
    '.ao-vivo .url b{display:block;font-family:"JetBrains Mono",monospace;font-weight:400;',
    'font-size:clamp(11px,1.7vmin,20px);color:var(--acc);margin-top:.9vmin;letter-spacing:.02em}',
    '.ao-vivo .conta{font-family:"JetBrains Mono",monospace;font-weight:500;',
    'font-size:clamp(14px,2.6vmin,32px);line-height:1;text-align:right;color:var(--mut);',
    'font-variant-numeric:tabular-nums;white-space:nowrap}',
    '.ao-vivo .conta u{display:block;text-decoration:none;font-size:clamp(9px,1.3vmin,15px);',
    'letter-spacing:.14em;text-transform:uppercase;color:var(--mut);margin-top:.6vmin;opacity:.8}',
    '.ao-vivo.off .qr svg{opacity:.25}',
    '.ao-vivo.off .conta{color:var(--sig)}',
    // nas telas de afirmação o bloco de resposta ocupa a coluna da direita,
    // que antes ficava vazia, em vez de se espremer sob a frase
    '.ao-vivo--lado{left:auto;right:7vmin;top:50%;bottom:auto;transform:translateY(-50%);',
    'width:min(34vw,40ch);flex-direction:column;align-items:flex-start;gap:var(--e4,2.8vmin)}',
    '.ao-vivo--lado .qr{flex-direction:column;align-items:flex-start;gap:var(--e3,2.1vmin)}',
    '.ao-vivo--lado .qr svg{width:27vmin;height:27vmin}',
    '.ao-vivo--lado .url{max-width:none}',
    '.ao-vivo--lado .conta{text-align:left;padding-top:var(--e2,1.6vmin);',
    'border-top:1px solid rgba(16,19,25,.14);width:100%}',
    '.ao-vivo--lado .conta u{display:inline;margin-left:.7em}',
    // em 4:3 não há largura para duas colunas: o bloco volta para o rodapé
    '@media (max-aspect-ratio:4/3){',
    '.ao-vivo--lado{left:7vmin;right:7vmin;top:auto;bottom:5.5vmin;transform:none;',
    'width:auto;flex-direction:row;align-items:flex-end;justify-content:space-between}',
    '.ao-vivo--lado .qr{flex-direction:row;align-items:center}',
    '.ao-vivo--lado .qr svg{width:19vmin;height:19vmin}',
    '.ao-vivo--lado .conta{width:auto;text-align:right;border-top:0;padding-top:0}',
    '.ao-vivo--lado .conta u{display:block;margin-left:0}',
    '}',
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

  // o convite muda com a atividade: pedir "responda" na tela do Wason não diz
  // o que fazer, e instrução vaga é fricção
  var CHAMADAS = {
    wason: { chamada: 'Mande um trio', promessa: 'três números · quantos quiser' },
    palavra: { chamada: 'Mande uma palavra', promessa: 'uma só · sem nome, sem cadastro' },
    depois: { chamada: 'Responda de novo', promessa: 'a mesma afirmação, agora · sem nome' },
  }
  var PADRAO = { chamada: 'Responda no seu celular', promessa: 'sem nome, sem cadastro, sem login' }

  telas.forEach(function (t) {
    var qr = qrs[t.qr || 'votar']
    var endereco = qr ? qr.url.replace(/^https?:\/\//, '') : enderecoCurto
    var texto = CHAMADAS[t.qr] || PADRAO
    var faixa = document.createElement('div')
    // só as telas de afirmação têm coluna livre à direita; as outras usam a
    // faixa de rodapé, porque o conteúdo delas ocupa a largura toda
    faixa.className = 'ao-vivo' + (t.qr && t.qr.indexOf('a') === 0 && t.qr.length === 2 ? ' ao-vivo--lado' : '')
    faixa.innerHTML =
      '<div class="qr">' +
      (qr ? qr.svg : '') +
      '<div class="url">' +
      '<span class="chamada">' + texto.chamada + '</span>' +
      '<span class="promessa">' + texto.promessa + '</span>' +
      '<b>' + endereco + '</b>' +
      '</div>' +
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
      // linguagem de sala, não de operador: quem lê o telão é a turma
      var chamada = t.faixa.querySelector('.chamada')
      var promessa = t.faixa.querySelector('.promessa')
      if (chamada) chamada.textContent = 'Mão para cima'
      if (promessa) promessa.textContent = 'sem rede agora — respondemos contando as mãos'
      t.faixa.querySelector('[data-conta]').innerHTML = 'offline<u>conte as mãos</u>'
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

    // antes da segunda rodada não existe "agora": mostrar 0 diria que a sala
    // inteira mudou para falso, e a frase do fecho sairia errada
    if (!depois.length) {
      var v2 = document.getElementById('v2')
      var f2 = document.getElementById('f2')
      var d = document.getElementById('tdelta')
      if (v2) v2.textContent = '—'
      if (f2) f2.style.width = '0%'
      if (d) d.innerHTML = '&nbsp;'
    }
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
    { q: 'a1', frase: 'Usamos apenas 10% do nosso cérebro.', curta: '10% do cérebro' },
    {
      q: 'a2',
      frase: 'O aluno aprende mais quando o ensino é adaptado ao estilo dele.',
      curta: 'estilos de aprendizagem',
    },
    { q: 'a3', frase: 'Sócrates nunca escreveu um livro.', curta: 'Sócrates' },
  ]

  var grade = document.getElementById('placar-grade')
  var gradeRecap = document.getElementById('recap-grade')

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
    if (!grade && !gradeRecap) return
    var dados = AFIRMACOES.map(function (a) {
      var votos = linhas.filter(function (l) {
        return l.tipo === 'voto' && l.pergunta === a.q
      })
      return {
        frase: a.frase,
        curta: a.curta,
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
    var semNada = document.getElementById('placar-sem')
    if (semNada) semNada.style.display = total ? 'none' : ''
    if (!total) {
      // zerou (ou ainda não chegou nada): as barras antigas têm que sair junto
      ;[grade, gradeRecap].forEach(function (el) {
        if (!el) return
        el.innerHTML = ''
        delete el.dataset.assinatura
      })
      return
    }

    var assinatura = dados
      .map(function (d) {
        return d.v + '/' + d.f
      })
      .join('|')

    // o mesmo gráfico serve as duas telas: a do recap, onde o operador decide
    // abrir, e a de depois do termômetro, que revela uma linha por avanço
    ;[
      { alvo: grade, passoAPasso: true },
      { alvo: gradeRecap, passoAPasso: false },
    ].forEach(function (destino) {
      var el = destino.alvo
      if (!el || el.dataset.assinatura === assinatura) return
      el.dataset.assinatura = assinatura
      el.innerHTML = ''
      dados.forEach(function (d, i) {
        var n = d.v + d.f
        var pv = n ? (d.v / n) * 100 : 0
        var linha = document.createElement('div')
        // no recap o container inteiro é que entra, então as linhas já nascem visíveis
        linha.className = 'placar-linha' + (destino.passoAPasso ? '' : ' in')
        // no recap a frase já está escrita na lista acima: aqui basta o número
        var rotulo = destino.passoAPasso
          ? d.frase
          : '<span class="marcador">' + (i + 1) + '</span>' + d.curta
        linha.innerHTML =
          '<div class="placar-cab">' +
          '<span class="frase">' + rotulo + '</span>' +
          '<span class="n">' + n + (n === 1 ? ' resposta' : ' respostas') + '</span>' +
          '</div>' +
          '<div class="barra-empilhada">' +
          '<i class="v' + (d.v ? '' : ' vazio') + '" style="width:' + pv + '%">' +
          (d.v ? d.v : '') + '</i>' +
          '<i class="f' + (d.f ? '' : ' vazio') + '" style="width:' + (100 - pv) + '%">' +
          (d.f ? d.f : '') + '</i>' +
          '</div>'
        el.appendChild(linha)
      })
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

  /* ---------- zerar a sala (tecla Z) ---------- */

  /**
   * Zerar sem apagar.
   *
   * O §2.1 fixa que a RLS permite insert e select e nunca delete — então não
   * existe "apagar os votos" pelo navegador, e é bom que não exista: apagar
   * resposta de gente no meio de um seminário é irreversível e ninguém quer
   * descobrir na herrada que apertou a tecla sem querer.
   *
   * Em vez disso, guardamos um instante de corte: tudo o que chegou antes
   * dele deixa de ser contado. A tela zera na hora, o banco fica intacto, e a
   * tecla U traz tudo de volta enquanto a marca ainda estiver na memória.
   */
  var CHAVE_CORTE = 'eusei:corte:' + ((window.SALA && window.SALA.sala) || 'seminario')
  var corte = null
  try {
    corte = localStorage.getItem(CHAVE_CORTE)
  } catch (e) {
    corte = null
  }

  function guardaCorte(valor) {
    corte = valor
    try {
      if (valor) localStorage.setItem(CHAVE_CORTE, valor)
      else localStorage.removeItem(CHAVE_CORTE)
    } catch (e) {
      /* navegador sem storage: o corte vale só nesta sessão, e tudo bem */
    }
  }

  function depoisDoCorte(linhas) {
    if (!corte) return linhas
    return linhas.filter(function (l) {
      return l.criado_em > corte
    })
  }

  /** força o redesenho de tudo, inclusive do que só muda por assinatura */
  function redesenha() {
    if (grade) delete grade.dataset.assinatura
    if (gradeRecap) delete gradeRecap.dataset.assinatura
    if (wlista) wlista.innerHTML = ''
    if (cloud) cloud.innerHTML = ''
    ;['n1', 'n2', 'nt'].forEach(function (id) {
      var el = document.getElementById(id)
      if (!el) return
      el.value = ''
      delete el.dataset.manual
    })
    var d = document.getElementById('tdelta')
    if (d) d.innerHTML = '&nbsp;'
    ;['v1', 'v2'].forEach(function (id) {
      var el = document.getElementById(id)
      if (el) el.textContent = '—'
    })
    ;['f1', 'f2'].forEach(function (id) {
      var el = document.getElementById(id)
      if (el) el.style.width = '0%'
    })
    telas.forEach(function (t) {
      t.faixa.querySelector('[data-conta]').innerHTML = '0<u>' + (t.conta || 'respostas') + '</u>'
    })
  }

  var aviso = document.createElement('div')
  aviso.id = 'zerar-aviso'
  aviso.hidden = true
  document.body.appendChild(aviso)
  var estiloAviso = document.createElement('style')
  estiloAviso.textContent = [
    '#zerar-aviso{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;',
    'background:var(--ink);color:var(--paper);padding:3vmin 4vmin;max-width:44ch;',
    'font-family:"Archivo",sans-serif;font-size:clamp(14px,2.4vmin,28px);line-height:1.4;',
    'box-shadow:0 1vmin 4vmin rgba(0,0,0,.3)}',
    '#zerar-aviso[hidden]{display:none}',
    '#zerar-aviso b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;',
    'font-size:clamp(20px,4vmin,48px);letter-spacing:-.03em;margin-bottom:1.4vmin;line-height:1}',
    '#zerar-aviso kbd{font-family:"JetBrains Mono",monospace;background:#8FA4FF;color:var(--ink);',
    'padding:.1em .45em;font-size:.9em}',
    '#zerar-aviso small{display:block;margin-top:1.6vmin;color:#9AA1B4;font-size:.78em}',
  ].join('')
  document.head.appendChild(estiloAviso)

  var esperandoConfirmacao = false
  var sumir = null

  function mostra(html, ms) {
    aviso.innerHTML = html
    aviso.hidden = false
    if (sumir) clearTimeout(sumir)
    if (ms) sumir = setTimeout(function () { aviso.hidden = true }, ms)
  }

  function digitando() {
    var el = document.activeElement
    return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
  }

  document.addEventListener(
    'keydown',
    function (e) {
      if (digitando()) return

      if (e.key === 'z' || e.key === 'Z') {
        e.stopImmediatePropagation()
        if (!esperandoConfirmacao) {
          esperandoConfirmacao = true
          mostra(
            '<b>Zerar a sala?</b>Some tudo o que já foi respondido — votos, trios e palavras.' +
              '<kbd>Z</kbd> de novo confirma · <kbd>Esc</kbd> cancela' +
              '<small>Nada é apagado do banco: fica guardado e a tecla U traz de volta.</small>',
          )
          return
        }
        esperandoConfirmacao = false
        guardaCorte(new Date().toISOString())
        redesenha()
        mostra('<b>Zerado.</b>A sala está limpa. <kbd>U</kbd> desfaz.', 4000)
        return
      }

      if (e.key === 'u' || e.key === 'U') {
        if (!corte) return
        e.stopImmediatePropagation()
        guardaCorte(null)
        redesenha()
        mostra('<b>Desfeito.</b>As respostas anteriores voltaram.', 3000)
        return
      }

      if (e.key === 'Escape' && (esperandoConfirmacao || !aviso.hidden)) {
        e.stopImmediatePropagation()
        esperandoConfirmacao = false
        aviso.hidden = true
      }
    },
    true,
  )

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
      atualiza(depoisDoCorte(linhas))
    },
    2000,
  )
})()
