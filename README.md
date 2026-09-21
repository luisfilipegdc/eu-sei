# COMO VOCÊ SABE?

## O que é este ensaio

Seminário de epistemologia para uma turma de Pedagogia: dezoito minutos e trinta,
slot rígido das 19:00 às 19:20, até vinte pessoas. A turma vive um problema
epistemológico antes de saber que ele tem nome — responde três afirmações, se
posiciona numa linha entre VERDADEIRO e FALSO, troca a ficha com quem concluiu
o contrário — e só no minuto nove descobre que aquilo se chama epistemologia.

**Objetivo: que eles sintam a pergunta, não que guardem uma definição.** Por isso
o conceito chega depois da experiência, e não antes. O critério de fracasso é
simétrico: se alguém sair dizendo "então não dá para saber nada", o seminário
falhou. O trabalho não é desistir de saber — é saber por quê.

## As duas apresentações deste repo

| Rota | O que é | Estado |
|---|---|---|
| `/` | **a apresentação** — arquivo único, 35 telas, fontes embutidas | é esta que vai para a sala |
| `/telao` | o telão do app React | passos 1 a 3 da ordem de construção |
| `/apresentador` | a janela de controle do app React | notas, cronômetro, próxima tela |

A raiz é `public/index.html`: um arquivo só, sem dependências, com as 39 fontes
embutidas em data URI. **Depois que a página carrega, nada mais é baixado** — se
o wi-fi cair no meio do seminário, ela continua. Já traz as seis telas de fonte,
a nuvem de palavras e o termômetro com digitação pelo operador. Detalhes de
operação em [`docs/apresentacao.md`](docs/apresentacao.md).

O app React (`src/`, servido em `/telao`) tem as 36 telas do roteiro (§4), a
revelação e a janela de controle em duas telas. Três telas são moldura, à espera
dos passos 4 a 6: **13** (Wason), **17** (nuvem) e **30** (termômetro). A tela
**23** (coda de Gettier) é oculta por padrão, como manda o §4.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173 — a raiz é a apresentação
npm run build    # typecheck + build de produção em dist/
npm run preview  # serve o build
```

Em desenvolvimento, `/telao/` abre o app React e `/telao/?apresentador` abre a
janela de controle sem depender da reescrita da Vercel.

## Apresentar o app React em duas telas

Abra `/apresentador` no notebook e clique em **abrir o telão** — arraste essa
janela para o projetor e aperte `F`. As duas andam juntas: avançar de qualquer
uma move a outra, e uma janela aberta no meio da apresentação entra no passo
certo, com o cronômetro já correndo. Isso vale entre abas do mesmo navegador,
na mesma máquina; não é sincronia pela rede.

## Teclado

Aperte **F** para tela cheia e apresente pelo teclado:
`→` avança (respeita os passos internos da tela), `←` volta, `F` tela cheia,
`T` liga o cronômetro regressivo de 18:30 (só corre depois do primeiro avanço),
`N` mostra a nota do apresentador da tela atual, `B` abre as fontes,
`Esc` fecha overlay, `Home` reinicia. Também funciona por clique
(os 25% da esquerda voltam, o resto avança) e por deslize no touch.

## A votação pelo celular

| Rota | Quem usa |
|---|---|
| `/v` (ou `/votar`) | os alunos — V/F e confiança 0–100 nas três afirmações |

Sem login, sem nome, sem e-mail: nenhuma coluna da tabela liga uma resposta a
alguém. Tudo vai para `eusei_votos` no Supabase, com RLS que permite `insert` e
`select` e **nunca** `update` ou `delete`. A chave usada no navegador é
publicável por design.

**Durante a votação o telão mostra só quantas respostas chegaram, nunca o
resultado** — é a regra do CLAUDE.md §6, e o seminário inteiro depende dela: a
linha, a troca de fichas e a revelação só funcionam enquanto ninguém sabe quem
acertou. O resultado aparece uma vez, no termômetro do minuto 16:30.

No minuto 16:30, abra `/v?q=a2&rodada=depois` para reabrir só a afirmação 2. O
termômetro compara sozinho com o voto do minuto 2 e escreve *"N pessoas mudaram
de ideia em dezoito minutos"* — ou, se ninguém mudar, *"ninguém mudou, e isso é
uma pergunta melhor que qualquer número"*.

A nuvem de palavras da tela 17 junta o que vier por celular com o que o operador
digitar no telão: as duas coisas caem na mesma sala.

`?sala=xyz` separa turmas, se você rodar o seminário mais de uma vez.

## Se a rede cair no meio

A apresentação é um arquivo só: depois que carregou, ela continua inteira sem
rede. A votação tem dois planos B, e nenhum deles interrompe o seminário:

1. **`/v?transport=offline`** — o celular não fala com ninguém. Ao responder, a
   tela inteira vira azul (VERDADEIRO) ou vermelha (FALSO) com a confiança em
   número grande, legível a três metros. Vinte telas erguidas, o operador conta.
   Um toque segue para a afirmação seguinte. Isso também acontece sozinho se o
   envio falhar, sem ninguém precisar fazer nada.
2. **Entrada manual no telão** — os campos do termômetro e o campo da nuvem
   continuam lá. Se o operador digitar, a digitação manda e o automático sai
   do caminho.

## Deploy

Vercel, preset Vite, sem variáveis de ambiente por enquanto. O build do Vite
tem a entrada em `telao/index.html` e sai em `dist/telao/`, justamente para não
sobrescrever `dist/index.html`, que é a apresentação copiada de `public/`.
`vercel.json` reescreve `/apresentador` e `/telao/*` para o app React.
