# COMO VOCÊ SABE? — telão

Apresentação interativa de epistemologia. Seminário de 18:30 para turma de Pedagogia.
Estado atual: passos 1 e 2 da ordem de construção (motor de slides + a revelação).

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de produção em dist/
npm run preview  # serve o build
```

## Apresentar

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
