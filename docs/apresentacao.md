# COMO VOCÊ SABE? — apresentação

Arquivo único, sem dependências. As fontes estão embutidas: **depois que a página carrega, nada mais é baixado** — se o wi-fi cair no meio do seminário, a apresentação continua.

## Deploy

Repo com este `index.html` na raiz → importar na Vercel → Framework Preset **Other**, sem build command, sem output directory. Pronto.

Para servir dentro de um site existente, o mesmo arquivo funciona em `public/epistemologia/apresentacao/index.html` (Next.js ou Vite) ou em qualquer pasta de host estático.

## Teclas

| tecla | ação |
|---|---|
| `→` `espaço` | avança (respeita os passos dentro de cada tela) |
| `←` | volta |
| `F` | tela cheia |
| `T` | cronômetro regressivo de 18:30 (começa no primeiro avanço) |
| `N` | notas do apresentador |
| `B` | menu das seis fontes de conhecimento · `Esc` volta |
| `Home` | reinicia |

Clique na faixa esquerda volta, no resto avança. No celular, deslize.

## Telas que pedem digitação

- **Nuvem de palavras** (depois da revelação): o operador digita cada palavra dita em voz alta e dá Enter. Palavra repetida cresce.
- **Termômetro** (minuto 16:30): três campos — contagem no início, contagem agora, total de pessoas.

Enquanto um campo estiver focado, as setas **não** trocam de slide.

## Antes de apresentar

1. Abra em tela cheia no computador da sala e passe da primeira à última tela uma vez.
2. Confira que `VERDADEIRO` na tela do eixo está do mesmo lado da parede onde está a folha `VERDADEIRO`.
3. Veja se alguém em pé bloqueia o projetor na altura da linha — a revelação acontece com a turma de pé.
