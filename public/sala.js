/**
 * Transporte da sala — Supabase REST, sem SDK.
 *
 * Nenhuma dependência de runtime: `fetch` e mais nada, para a apresentação
 * continuar sendo um arquivo que abre sozinho. A chave abaixo é publicável
 * por design (RLS permite insert e select na tabela, nunca update ou delete).
 *
 * Anonimato é requisito pedagógico, não detalhe técnico: nada aqui envia nome,
 * e-mail, id de dispositivo ou qualquer coisa que ligue uma resposta a alguém.
 */
window.SALA = (function () {
  var URL_BASE = 'https://frsidsdrexolvcfxzroe.supabase.co'
  var CHAVE = 'sb_publishable_xgr6ki59dLrTcdjDlmEtZA_LAF6m1BC'
  var TABELA = '/rest/v1/eusei_votos'

  var params = new URLSearchParams(location.search)
  var sala = params.get('sala') || 'seminario'
  /** ?transport=offline desliga a rede: o celular vira cartaz e o operador conta. */
  var modo = params.get('transport') === 'offline' ? 'offline' : 'supabase'

  function cabecalho(extra) {
    var h = { apikey: CHAVE, Authorization: 'Bearer ' + CHAVE }
    for (var k in extra) h[k] = extra[k]
    return h
  }

  /** Envia uma resposta. Resolve com true/false — nunca lança, nunca trava a tela. */
  function enviar(linha) {
    if (modo === 'offline') return Promise.resolve(false)
    linha.sala = sala
    return fetch(URL_BASE + TABELA, {
      method: 'POST',
      headers: cabecalho({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify(linha),
    })
      .then(function (r) {
        return r.ok
      })
      .catch(function () {
        return false
      })
  }

  /** Lê tudo o que a sala respondeu. Resolve com [] se a rede não cooperar. */
  function ler(tipo) {
    if (modo === 'offline') return Promise.resolve([])
    var q =
      TABELA +
      '?sala=eq.' +
      encodeURIComponent(sala) +
      (tipo ? '&tipo=eq.' + encodeURIComponent(tipo) : '') +
      '&select=tipo,pergunta,opcao,confianca,texto,criado_em&order=criado_em.asc'
    return fetch(URL_BASE + q, { headers: cabecalho({}) })
      .then(function (r) {
        return r.ok ? r.json() : []
      })
      .catch(function () {
        return []
      })
  }

  /**
   * Chama `cb` com as linhas a cada `ms`. Devolve uma função que para.
   * Sondagem em vez de websocket: com vinte pessoas o custo é irrelevante e
   * uma rede de faculdade derruba websocket muito mais fácil que um GET.
   */
  function acompanhar(tipo, cb, ms) {
    var vivo = true
    var timer = null
    function ciclo() {
      if (!vivo) return
      ler(tipo).then(function (linhas) {
        if (!vivo) return
        cb(linhas)
        timer = setTimeout(ciclo, ms || 2000)
      })
    }
    ciclo()
    return function () {
      vivo = false
      if (timer) clearTimeout(timer)
    }
  }

  return { sala: sala, modo: modo, enviar: enviar, ler: ler, acompanhar: acompanhar }
})()
