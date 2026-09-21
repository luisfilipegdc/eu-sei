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

Estado atual: passos 1 e 2 da ordem de construção (motor de slides + a revelação),
mais as seis telas de fonte e a janela do apresentador.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de produção em dist/
npm run preview  # serve o build
```

## Apresentar em duas telas

Duas rotas, uma de cada lado:

| Rota | Onde | O que mostra |
|---|---|---|
| `/` | tela 2, projetada | o telão |
| `/apresentador` | tela 1, seu notebook | notas, cronômetro, a próxima tela, o resumo e as seis fontes |

Abra `/apresentador` no notebook e clique em **abrir o telão** — arraste essa
janela para o projetor e aperte `F`. As duas andam juntas: avançar de qualquer
uma move a outra, e uma janela aberta no meio da apresentação entra no passo
certo, com o cronômetro já correndo. Isso vale entre abas do mesmo navegador,
na mesma máquina; não é sincronia pela rede.

## Apresentar em uma tela só

Abra `/`, aperte **F** para tela cheia e apresente pelo teclado:
`→` avança (respeita os passos internos da tela), `←` volta, `F` tela cheia,
`T` liga o cronômetro regressivo de 18:30 (só corre depois do primeiro avanço),
`N` mostra a nota do apresentador da tela atual, `B` abre as fontes,
`Esc` fecha overlay, `Home` reinicia. Também funciona por clique
(os 25% da esquerda voltam, o resto avança) e por deslize no touch.

## Trocar o transporte

Ainda não implementado (passos 4 e 5). Quando existir, o modo virá de
`?transport=offline` na URL ou de `VITE_TRANSPORT`, e trocar de modo no meio da
apresentação não pode quebrar nada.

## Se a rede cair no meio

O telão é estático e roda offline depois que a página carregou — a apresentação
continua sem rede. As votações (passos 4 a 6) terão entrada manual no telão:
o operador conta as telas erguidas e digita o total.

## Deploy

Vercel, preset Vite, sem variáveis de ambiente por enquanto. `vercel.json` já
reescreve todas as rotas para `index.html` (a página `/votar` chega no passo 4).
