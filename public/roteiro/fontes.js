/**
 * Fontes, dados e perguntas prováveis, tela por tela.
 *
 * Isto NÃO é gerado: é material que não existe em nenhum outro lugar do
 * projeto. A nota diz o que fazer; aqui está o que sustenta o que você vai
 * dizer, e o que responder se alguém puxar.
 *
 * A chave é o NÚMERO SEQUENCIAL da tela no roteiro (1 a 37), não o id do
 * roteiro original. Para conferir o alinhamento: `npm run conferir-fontes`.
 *
 * Cada item tem um grau:
 *   'solido'   — bem estabelecido, pode afirmar sem ressalva
 *   'cuidado'  — verdadeiro com ressalva, e a ressalva importa
 *   'consulte' — não afirme de cabeça; se perguntarem, diga que vai verificar
 *
 * O grau existe porque seria constrangedor levar afirmação mal justificada
 * para um seminário sobre justificação.
 */
window.FONTES = {
  1: {
    titulo: 'EU SEI. — a tela que já está lá quando eles entram',
    itens: [
      { grau: 'solido', t: 'A tela não explica nada de propósito. Ela funciona como pergunta implícita: a pessoa lê "eu sei" e, sem perceber, testa a frase em si mesma.' },
      { grau: 'solido', t: 'A mesma tipografia volta no fim, com um ponto de interrogação no lugar do ponto final (tela 36). O deck inteiro cabe nessa troca de pontuação.' },
      { grau: 'cuidado', t: 'Não diga o tema agora, nem por gentileza. Toda a virada do minuto nove depende de ninguém saber que isto é sobre epistemologia.' },
    ],
    perguntar: [
      { p: '"É sobre o quê?"', r: '"Já já." Nada além disso — e não sorria como quem tem um segredo, porque isso avisa que tem um.' },
    ],
  },

  2: {
    titulo: 'Afirmação 1 — os 10% do cérebro',
    veredito: 'FALSO',
    itens: [
      { grau: 'solido', t: 'Não existe região do cérebro que fique ociosa. Lesões em praticamente qualquer área produzem algum déficit, e neuroimagem mostra atividade distribuída — inclusive durante o sono.' },
      { grau: 'solido', t: 'O cérebro é cerca de 2% da massa do corpo e consome cerca de 20% da energia em repouso. Manter 90% de um órgão tão caro sem função é evolutivamente implausível.' },
      { grau: 'cuidado', t: 'A frase é frequentemente atribuída a Einstein, mas não há registro de que ele a tenha dito. A origem exata é obscura — não afirme uma origem específica.' },
      { grau: 'solido', t: 'Esta é a afirmação mais fácil do trio, e é de propósito: ela aquece a turma sem custo político nenhum. Ninguém se ofende por descobrir que o mito é mito.' },
    ],
    perguntar: [
      { p: '"Mas a gente não usa tudo ao mesmo tempo, né?"', r: 'Verdade — e isso é diferente. Regiões diferentes ativam para tarefas diferentes. "Não usar tudo ao mesmo tempo" não é "90% inativo para sempre".' },
    ],
  },

  3: {
    titulo: 'Afirmação 2 — estilos de aprendizagem',
    veredito: 'A EVIDÊNCIA NÃO SUSTENTA',
    itens: [
      { grau: 'solido', t: 'PASHLER, H.; McDANIEL, M.; ROHRER, D.; BJORK, R. "Learning Styles: Concepts and Evidence". Psychological Science in the Public Interest, v. 9, n. 3, p. 105–119, 2008.' },
      { grau: 'solido', t: 'O que foi testado é a hipótese de correspondência (meshing): que ensinar no estilo preferido faz aprender MAIS. Testar isso exige um desenho cruzado — dois grupos, dois métodos. Os autores encontraram quase nenhum estudo com esse desenho, e os que encontraram não sustentaram a hipótese.' },
      { grau: 'solido', t: 'Preferências existem e são reais. O que não se sustenta é a ponte entre preferência e desempenho.' },
      { grau: 'solido', t: 'É esta a afirmação que volta na linha, na troca de fichas e no termômetro. As outras duas existem para ela não ficar sozinha.' },
      { grau: 'cuidado', t: 'A crença é muito difundida entre professores em vários países. Se for citar um percentual de pesquisa, confira a fonte antes — os números variam muito entre estudos.' },
    ],
    perguntar: [
      { p: '"Então estilos não existem?"', r: 'Preferências existem. O que não se sustenta é que ensinar no estilo preferido faça aprender mais. São duas afirmações diferentes.' },
      { p: '"Mas eu vejo na prática."', r: 'Não corrija. Pergunte: "o que você veria se fosse o contrário?" — é a quinta pergunta do cartão.' },
      { p: '"Tem teste que mede isso."', r: 'Use o atalho do teste de ansiedade do TikTok. Existir um teste não prova que ele mede algo real.' },
    ],
  },

  4: {
    titulo: 'Afirmação 3 — Sócrates não escreveu',
    veredito: 'VERDADEIRO',
    itens: [
      { grau: 'solido', t: 'Sócrates (c. 470–399 a.C.) não deixou nenhum escrito. Tudo o que se sabe dele vem de terceiros: Platão, Xenofonte e Aristófanes — e os três o retratam de formas diferentes.' },
      { grau: 'solido', t: 'Isso tem nome próprio: o "problema socrático" — a dificuldade de separar o Sócrates histórico do personagem de Platão.' },
      { grau: 'solido', t: 'É a melhor afirmação do trio: quase todos acertam, e quase ninguém consegue justificar. Crença verdadeira sem justificação — exatamente o que o Mênon descreve.' },
    ],
    perguntar: [
      { p: '"Como sabem que ele existiu?"', r: 'Pelas três fontes independentes e por Aristóteles. É uma pergunta ótima — e ela mesma é epistemológica.' },
    ],
  },

  5: {
    titulo: 'Contagem de mãos — e o gráfico que você pode não abrir',
    itens: [
      { grau: 'solido', t: 'Contar em voz alta torna a crença pública e contável sem nenhum julgamento. É o número da afirmação 2 que você vai comparar no fim.' },
      { grau: 'cuidado', t: 'O avanço desta tela abre o gráfico da sala. A partir daí, a linha e a troca de fichas acontecem com todo mundo já sabendo onde a sala está — e as duas cenas perdem força. Se quiser preservar, não avance.' },
      { grau: 'solido', t: 'A regra do projeto (CLAUDE.md §6) é que durante a votação o telão mostra só quantas respostas chegaram, nunca o resultado.' },
    ],
    perguntar: [
      { p: '"Tá certo?"', r: '"Depois." É a terceira vez que você usa essa palavra nos primeiros minutos, e ela é parte do roteiro.' },
    ],
  },

  6: {
    titulo: 'A linha — por que não são dois grupos',
    itens: [
      { grau: 'solido', t: 'A linha é contínua e o meio é "não faço ideia". Dois grupos obrigariam todo mundo a ter opinião e criariam times — e em time a pessoa defende o lado em vez de examinar a própria razão.' },
      { grau: 'solido', t: 'A linha mede grau, não direção. Por isso "quem quer mudar de lugar?" funciona depois: mudar é dar um passo, não atravessar a sala admitindo erro na frente de todos.' },
      { grau: 'solido', t: 'Você entrar na linha desarma metade do risco de "pegadinha" antes de ele existir.' },
      { grau: 'cuidado', t: 'Diga "se posicionem" e fique dez segundos calado. A vontade de preencher esse silêncio com instrução extra é grande e estraga a cena.' },
    ],
    perguntar: [
      { p: '"Aprendi na faculdade."', r: 'Repertório 02: "e a professora aprendeu com quem? Em algum ponto essa corrente encosta em algo que não é alguém me contou. Encosta em quê?"' },
      { p: '"Eu vejo na prática."', r: 'É a resposta mais provável desta turma. Não corrija: pergunte o que ela veria se fosse o contrário.' },
      { p: '"Faz sentido, né?"', r: 'Plausibilidade não é evidência. Pergunte: "o que faz uma coisa parecer que faz sentido?"' },
    ],
  },

  7: {
    titulo: 'TROQUEM — a instrução tem que ser uma só',
    itens: [
      { grau: 'solido', t: 'Uma palavra na tela porque a instrução é falada e a sala está de pé. Texto longo aqui competiria com você no pior momento possível.' },
      { grau: 'solido', t: 'A escolha é dirigida: "alguém do lado oposto". Sem isso, todo mundo troca com o vizinho, que pensa igual, e a cena não produz nada.' },
      { grau: 'cuidado', t: 'Deixe o caos acontecer por uns quinze segundos. Organizar a travessia mata o efeito.' },
    ],
  },

  8: {
    titulo: 'A tela vazia — e por que ela é clara',
    itens: [
      { grau: 'solido', t: 'Vazia de propósito: durante a leitura da ficha do colega, qualquer coisa projetada rouba a atenção do papel na mão.' },
      { grau: 'solido', t: 'E CLARA, não preta. O §7 exige que a revelação (telas 15 a 17) seja o único preto do deck. Um preto aqui queimaria o efeito nove minutos antes.' },
      { grau: 'solido', t: 'O produto desta cena é o silêncio de três segundos no fim, não a discussão. Não peça comentários depois de "agora olhem a sua de novo".' },
    ],
    perguntar: [
      { p: '"É a mesma coisa que eu escrevi!"', r: 'A melhor coisa que pode acontecer. "Interessante. Duas pessoas, o mesmo tipo de razão, conclusões opostas. Então a razão não decidiu nada."' },
      { p: '"A minha é melhor."', r: '"Por quê? Qual é o critério?" Não deixe passar — é exatamente o ponto.' },
      { p: '"A pessoa escreveu sei lá."', r: '"Ela foi mais honesta que a maioria." Guarde essa, ela volta.' },
    ],
  },

  9: {
    titulo: 'Os sentidos — a ponte com o seminário passado',
    itens: [
      { grau: 'solido', t: 'A ponte é com o empirismo, que eles viram na semana anterior. Reconhecer que os sentidos são fonte de conhecimento — "e foram mesmo" — evita que o seminário pareça ataque ao que já estudaram.' },
      { grau: 'solido', t: 'A mão levantada de "já achei que vi alguém conhecido e não era" é a melhor evidência possível aqui: o material é a memória deles, não um estímulo que você trouxe.' },
      { grau: 'solido', t: 'A formulação exata importa: os sentidos INFORMAM, a pergunta é o que eles GARANTEM. Ver aconteceu — só não bastou.' },
    ],
  },

  10: {
    titulo: 'A ilusão dos dois quadrados',
    itens: [
      { grau: 'solido', t: 'É contraste simultâneo: o sistema visual julga claridade por comparação com o entorno, não em valor absoluto. Os dois quadrados são #8A8A8A — idênticos.' },
      { grau: 'solido', t: 'Parente famoso: o tabuleiro de Adelson (checker-shadow, 1995), em que dois quadrados de xadrez da mesma cor parecem muito diferentes.' },
      { grau: 'cuidado', t: 'Não diga "seus olhos mentem". Eles não mentem: fazem exatamente o que evoluíram para fazer, estimar cor sob iluminação variável. O ponto é que ver é uma fonte, não um critério.' },
      { grau: 'solido', t: 'A prova acontece na tela, no avanço. Não explique antes de mostrar.' },
    ],
  },

  11: {
    titulo: 'Hipótese de correspondência — separando o que está em jogo',
    itens: [
      { grau: 'solido', t: 'Esta tela existe para o seminário não virar "seu professor mentiu". O que foi testado não é se preferências existem; é se ensinar no estilo preferido faz aprender mais.' },
      { grau: 'solido', t: 'O nome técnico é meshing hypothesis. Nomeá-la deixa claro que existe uma afirmação precisa sendo avaliada, e não uma opinião geral sobre ensino.' },
      { grau: 'cuidado', t: 'Resista a resumir como "estilos de aprendizagem são mito". A frase é imprecisa e é o tipo de simplificação que o seminário está ensinando a desconfiar.' },
    ],
  },

  12: {
    titulo: 'A referência completa',
    itens: [
      { grau: 'solido', t: 'PASHLER, H.; McDANIEL, M.; ROHRER, D.; BJORK, R. Psychological Science in the Public Interest, v. 9, n. 3, p. 105–119, 2008.' },
      { grau: 'solido', t: 'A revista é de revisões encomendadas e revisadas por pares, da Association for Psychological Science. Não é opinião de autor.' },
      { grau: 'solido', t: 'Mostrar a referência inteira é performativo de propósito: você está fazendo, na frente deles, o que pediu que fizessem — dar a conta do que afirma. "Eu trouxe a fonte justamente para não pedir que vocês acreditem em mim."' },
      { grau: 'solido', t: 'É a única tela do deck que pode passar de nove palavras. O §3 abre essa exceção só para a referência.' },
    ],
  },

  13: {
    titulo: 'Não está provado que é falso',
    itens: [
      { grau: 'solido', t: 'É a frase mais importante do bloco e, segundo o roteiro, é ela própria a aula de epistemologia: separa você de quem troca uma crença mal justificada por outra.' },
      { grau: 'solido', t: 'Ausência de evidência de efeito não é evidência de ausência de efeito. O que se afirma é mais modesto e mais forte: a crença é muito mais difundida do que a evidência que a sustenta.' },
      { grau: 'cuidado', t: 'Depois desta tela, volte ao eixo com a seta esquerda e pergunte "quem quer mudar de lugar?". Espere até dez segundos. Quando alguém se mover: não comente, não agradeça, não sorria demais — comentar transforma a pessoa em exemplo e a próxima não se mexe.' },
    ],
  },

  14: {
    titulo: 'Wason 2·4·6',
    itens: [
      { grau: 'solido', t: 'WASON, P. C. "On the failure to eliminate hypotheses in a conceptual task". Quarterly Journal of Experimental Psychology, v. 12, n. 3, p. 129–140, 1960.' },
      { grau: 'solido', t: 'A regra real é "qualquer sequência crescente". A maioria anuncia uma regra mais específica e errada, porque só testou casos que a confirmavam.' },
      { grau: 'solido', t: 'O nome do fenômeno é viés de confirmação: procurar o que confirma em vez do que poderia derrubar. Em vocabulário popperiano, é a falta de tentativa de falsificação.' },
      { grau: 'solido', t: 'O placar do telão separa os trios em dois: os que só podiam dar sim (passo 2 em toda parte) e os que podiam dar não. Essa razão é a evidência do viés, ao vivo.' },
      { grau: 'cuidado', t: 'Não confunda com a "tarefa de seleção de Wason", das quatro cartas — é outro experimento do mesmo autor.' },
      { grau: 'cuidado', t: 'Orçamento de 90 segundos. Se estourar, corte o placar, nunca a atividade.' },
    ],
    perguntar: [
      { p: '"Por que ninguém testa o que derruba?"', r: 'Porque confirmar dá sensação de progresso. Cada "sim" parece uma vitória, e não é: um sim que não podia ser não, não informa nada.' },
      { p: '"Qual era a regra?"', r: 'Diga só no fecho, e emende na quinta pergunta do cartão: o que me faria mudar de ideia?' },
    ],
  },

  15: {
    titulo: 'A revelação — as cinco perguntas',
    veredito: 'DECORADA',
    itens: [
      { grau: 'solido', t: 'São as cinco perguntas que você fez nos nove minutos anteriores, agora nomeadas: como você sabe? quem te contou? que evidência você tem? e se você estiver errado? isso basta?' },
      { grau: 'solido', t: 'Primeira tela preta do deck, e o corte é o efeito. O §7 exige que a revelação seja o único preto — é ele que marca a virada.' },
      { grau: 'solido', t: 'A turma está DE PÉ. Não mande sentar antes da tela 17.' },
      { grau: 'cuidado', t: 'Esta é a única parte do seminário que se decora palavra por palavra. São 40 segundos, dos quais cerca de onze são silêncio. Ensaie com cronômetro: se você preencher o silêncio, perde tudo o que construiu.' },
    ],
  },

  16: {
    titulo: 'Vocês passaram nove minutos fazendo isto',
    itens: [
      { grau: 'solido', t: 'Duas linhas, com pausa entre elas. A segunda — "isto tem um nome" — é a dobradiça do seminário inteiro.' },
      { grau: 'solido', t: 'A ordem importa: primeiro a constatação do que eles fizeram, depois a informação de que aquilo tem nome, e só então o nome. Inverter mata a surpresa.' },
    ],
  },

  17: {
    titulo: 'VOCÊ ACABOU DE FAZER EPISTEMOLOGIA',
    itens: [
      { grau: 'solido', t: 'Três segundos de silêncio depois da frase, antes de "podem sentar". Não corte logo.' },
      { grau: 'solido', t: 'A tela está no singular ("você acabou"), por decisão do CLAUDE.md §4, embora o roteiro falado use o plural. A tela fala com cada um; você fala com a sala.' },
      { grau: 'solido', t: 'Pedagogicamente, é o momento em que o conceito chega DEPOIS da experiência. Se a palavra viesse no começo, seria mais uma matéria para decorar.' },
    ],
  },

  18: {
    titulo: 'A nuvem — de onde veio o que você sabe',
    itens: [
      { grau: 'solido', t: 'Uma palavra por pessoa, 60 segundos, no máximo quinze palavras. O telão agrupa ignorando acento e caixa, e a repetida cresce.' },
      { grau: 'solido', t: 'O fecho é o que dá sentido à cena: "isto na tela é uma lista de fontes de conhecimento. Vocês acabaram de produzir uma."' },
      { grau: 'solido', t: 'As palavras chegam por celular e pela sua digitação ao mesmo tempo — o campo no telão existe para o que for dito em voz alta, e para quando a rede não cooperar.' },
      { grau: 'cuidado', t: 'Se aparecerem palavras muito diferentes entre si, não hierarquize. A lista é o dado; julgá-la na hora desfaz o que ela demonstra.' },
    ],
  },

  19: {
    titulo: 'Epistemologia — a definição',
    itens: [
      { grau: 'solido', t: 'Investiga a origem, a natureza, o valor e os limites do conhecimento. Definição próxima da que a Aula 2 usa, citando SOUZA (1995, p. 73).' },
      { grau: 'solido', t: 'A distinção que a tela carrega: não investiga O QUE sabemos — isso é conteúdo —, e sim o que faz uma coisa CONTAR como conhecimento.' },
      { grau: 'solido', t: 'ESTEBAN (2003, p. 13), citado na Aula 2: "uma forma de compreender e explicar como conhecemos o que sabemos". É o título do seminário, dito pelo material deles.' },
      { grau: 'cuidado', t: 'A Aula 2 trata de ontologia E epistemologia. Vocês fazem só a metade epistemológica — vale dizer isso em uma frase, para não parecer omissão.' },
    ],
  },

  20: {
    titulo: 'epistḗmē × dóxa, e o lógos',
    itens: [
      { grau: 'solido', t: 'A oposição entre conhecimento (epistḗmē) e opinião (dóxa) atravessa Platão, em especial a República e o Mênon. É a linha que eles atravessaram com o corpo.' },
      { grau: 'solido', t: 'A palavra "epistemologia" foi cunhada em 1854 por James Frederick Ferrier, em Institutes of Metaphysic. As raízes são gregas; a palavra é do século XIX.' },
      { grau: 'solido', t: 'lógos não é só "estudo": é palavra, razão, e a conta que se dá de uma coisa. Juntando: epistemologia é dar conta do que se sabe — foi o que fizeram ao ler a folha do colega.' },
      { grau: 'cuidado', t: 'A Aula 2 traduz lógos como "tratado". Acrescente, não corrija em voz alta.' },
      { grau: 'cuidado', t: 'A data e o nome de Ferrier ficam só na fala. A tela não os mostra, e não precisa.' },
    ],
  },

  21: {
    titulo: 'Crença, verdade, justificação',
    itens: [
      { grau: 'solido', t: 'A tríade é a formulação clássica do conhecimento como crença verdadeira justificada.' },
      { grau: 'solido', t: 'A pergunta "onde a gente falha mais?" quase sempre chega em justificação — e a razão é estrutural: as duas primeiras a pessoa resolve sozinha; a terceira é a única que precisa ser mostrada para alguém.' },
      { grau: 'cuidado', t: 'Não diga que Platão definiu conhecimento como crença verdadeira justificada. Ele examina e rejeita candidatos no Teeteto, que termina sem definição. A fórmula é leitura da tradição.' },
    ],
  },

  22: {
    titulo: 'Vocês acertaram. Mas vocês sabiam?',
    itens: [
      { grau: 'solido', t: 'A sequência é obrigatória: revele que a afirmação 3 é verdadeira, deixe comemorar, PERGUNTE POR QUÊ, espere o silêncio — e só então avance a tela.' },
      { grau: 'solido', t: 'O silêncio é quase garantido, e é ele a cena. Quem chutou tem crença e verdade, e não tem justificação.' },
      { grau: 'cuidado', t: 'Se você avançar antes do silêncio, a tela responde a pergunta que a sala ainda não sentiu. É o erro mais fácil de cometer aqui.' },
    ],
  },

  23: {
    titulo: 'Mênon 97a–98a — a amarra',
    itens: [
      { grau: 'solido', t: 'PLATÃO, Mênon, 97a–98a: a opinião verdadeira guia tão bem quanto o conhecimento — enquanto permanece. Ela foge, como as estátuas de Dédalo, que diziam sair andando se não fossem amarradas.' },
      { grau: 'solido', t: 'Amarrar é dar a razão. Opinião verdadeira amarrada pela razão vira conhecimento. É a resposta direta a quem acertou a afirmação 3 por chute.' },
      { grau: 'solido', t: 'É também a justificativa de por que a terceira peça existe: sem ela, não há como distinguir quem sabe de quem teve sorte.' },
    ],
    perguntar: [
      { p: '"E a resposta certa na prova, prova o quê?"', r: 'Deixe no ar. É incômoda de propósito e é o melhor gancho para o bloco de Pedagogia.' },
    ],
  },

  24: {
    titulo: 'Gettier — a coda oculta',
    veredito: 'OPCIONAL',
    itens: [
      { grau: 'solido', t: 'GETTIER, E. "Is Justified True Belief Knowledge?" Analysis, v. 23, n. 6, p. 121–123, 1963. Três páginas.' },
      { grau: 'solido', t: 'Mostra casos em que há crença, verdade E justificação, e ainda assim hesitamos em chamar de conhecimento. Abriu décadas de literatura.' },
      { grau: 'cuidado', t: 'A afirmação 3 NÃO é um caso de Gettier: lá falta justificação. Gettier é o passo seguinte, não a explicação do que acabou de acontecer.' },
      { grau: 'cuidado', t: 'Esta tela é oculta por padrão e é a primeira coisa a cortar se atrasar. É sobremesa, não âncora.' },
    ],
  },

  25: {
    titulo: 'Ele não escreveu nada',
    itens: [
      { grau: 'solido', t: 'Sócrates viveu em Atenas no século V a.C. e não deixou escrito nenhum. Conhecemos por Platão, Xenofonte e Aristófanes.' },
      { grau: 'solido', t: 'Isso é, em si, um problema epistemológico sobre o próprio Sócrates — e é a resposta da afirmação 3, agora justificada.' },
      { grau: 'solido', t: 'A pergunta que abre o bloco é sua: "e por que eu perguntei tanto em vez de explicar?" Ela liga a forma do seminário ao conteúdo dele.' },
    ],
  },

  26: {
    titulo: 'Maiêutica e o ovo de vento',
    itens: [
      { grau: 'solido', t: 'PLATÃO, Teeteto, por volta de 149a–151d: Sócrates se diz filho da parteira Fenarete e descreve sua arte como parteira de ideias — ele não pare nenhuma, ajuda a parir.' },
      { grau: 'solido', t: 'A segunda metade é a que todo mundo esquece: depois de nascida, ele testa se a ideia se sustenta ou se é "ovo de vento" (anemiaion) — a que parece viva e não é.' },
      { grau: 'solido', t: 'Na Apologia (por volta de 21d) ele não diz "só sei que nada sei". Diz que sua vantagem é não achar que sabe o que não sabe.' },
      { grau: 'cuidado', t: 'Se estiver atrasado, corte a Apologia e o ovo de vento. Mantenha "ele não escreveu nada", a parteira, e a distinção da tela seguinte inteira.' },
    ],
    perguntar: [
      { p: '"Mas todo mundo fala que ele disse isso."', r: 'Exemplo ao vivo: uma frase que todo mundo repete, atribuída a quem não a disse. É o seminário acontecendo na sala.' },
    ],
  },

  27: {
    titulo: 'Epistemologia ≠ maiêutica',
    veredito: 'NUNCA CORTE',
    itens: [
      { grau: 'solido', t: 'Epistemologia é O QUE se investiga: o conhecimento. Maiêutica é UM COMO: uma forma de investigar, pela pergunta.' },
      { grau: 'solido', t: 'Dá para fazer epistemologia sem maiêutica nenhuma — lendo, escrevendo, analisando. E dá para usar maiêutica para investigar justiça, coragem, qualquer coisa.' },
      { grau: 'solido', t: 'É o item conceitual que a professora está esperando, e o roteiro marca como o que nunca sai, mesmo estourando o tempo.' },
      { grau: 'solido', t: 'A frase que fecha: "ela foi a ferramenta. Não era o assunto."' },
    ],
  },

  28: {
    titulo: 'Por que um professor precisa pensar nisso',
    itens: [
      { grau: 'solido', t: 'Material da Aula 2, em cinco palavras: "Não existe educação e nem docência neutra!"' },
      { grau: 'solido', t: 'LIBÂNEO (2004, p. 74), citado na Aula 2: "é preciso desenvolver o hábito de desconfiar das aparências, desconfiar da normalidade das coisas".' },
      { grau: 'solido', t: 'FREIRE, P. Pedagogia da autonomia, 2005, p. 38–39: o pensar certo "não é presente dos deuses nem se acha nos guias de professores"; é produzido pelo próprio aprendiz.' },
      { grau: 'solido', t: 'ARISTÓTELES, citado na abertura da Aula 2: "todos os homens têm, por natureza, o desejo de conhecer".' },
      { grau: 'cuidado', t: 'Escute duas respostas e não hierarquize. Se passou de 14:40, corte a pergunta aberta e vire afirmação — economiza 50 segundos sem perder conceito.' },
    ],
  },

  29: {
    titulo: 'Empirismo — a ponte, sem competição',
    itens: [
      { grau: 'solido', t: 'O empirismo dá uma resposta importante ao problema: o conhecimento vem da experiência. Não é resposta menor — é uma das grandes.' },
      { grau: 'solido', t: 'O que o seminário fez foi a PERGUNTA que torna essa resposta necessária: o que transforma percepção, experiência ou testemunho em conhecimento justificável?' },
      { grau: 'cuidado', t: 'Não oponha epistemologia e empirismo como rivais. Um é o campo, o outro é uma posição dentro dele. Tratar como disputa confundiria o que eles viram na semana passada.' },
    ],
  },

  30: {
    titulo: 'Que tipo de conhecimento é este',
    itens: [
      { grau: 'solido', t: 'A pergunta é epistemológica, não metodológica, e vem ANTES da escolha do método. É a contribuição original do seminário ao que eles já viram na Aula 2.' },
      { grau: 'cuidado', t: 'Evite a versão fácil ("transmitir é ruim, construir é bom"): não se sustenta, e todo mundo na sala já concorda — ninguém pensa enquanto concorda.' },
      { grau: 'cuidado', t: 'O Quadro 1 da Aula 2 (CUNHA, 2007) opõe reprodutivista e transformador, e o Quadro 2 (BROOKS e BROOKS, 1999) repete como tradicional × progressista. Eles estudaram isso. Não trate como espantalho: mostre o andar de baixo do quadro.' },
      { grau: 'solido', t: 'Depois desta tela, fale sem apoio: "eu escolhi começar com um problema em vez de uma definição, e isso teve um preço" — e nomeie o preço. É uma decisão epistemológica tomada na frente deles.' },
    ],
  },

  31: {
    titulo: 'O termômetro — antes × agora',
    itens: [
      { grau: 'solido', t: 'Reabre a afirmação 2 e compara com o voto do minuto 2, automaticamente. O QR desta tela leva direto à pergunta certa no celular.' },
      { grau: 'solido', t: 'Se ninguém mudar, o texto é "ninguém mudou — e isso é uma pergunta melhor que qualquer número". Está no §6 e é verdade: não mudar também é dado.' },
      { grau: 'cuidado', t: 'NUNCA comemore o número. Comemorar transforma mudar de ideia em performance para agradar o apresentador — que é o oposto do que o seminário quer.' },
      { grau: 'cuidado', t: 'As duas rodadas podem ter quantidades diferentes de respostas. Se a segunda tiver bem menos gente, prefira falar em contagem, não em proporção.' },
    ],
  },

  32: {
    titulo: 'O gráfico das três afirmações',
    conferido: true, // título não repete palavra da tela; alinhamento verificado à mão
    itens: [
      { grau: 'solido', t: 'Aparece só aqui, depois do termômetro, porque agora o resultado é fecho e não spoiler. Uma afirmação por avanço.' },
      { grau: 'solido', t: 'A afirmação 1 é a ponte para a tela seguinte: muita gente marcou verdadeiro numa coisa sem nenhuma evidência — e isso não é burrice, é como a crença se espalha.' },
      { grau: 'cuidado', t: 'Não comente número. Deixe eles lerem: a barra fala sozinha, e o silêncio faz o trabalho.' },
    ],
  },

  33: {
    titulo: 'Antirrelativismo',
    conferido: true, // título não repete palavra da tela; alinhamento verificado à mão
    veredito: 'OBRIGATÓRIA',
    itens: [
      { grau: 'solido', t: 'É a tela que impede o desfecho mais provável de uma dinâmica de epistemologia mal fechada: "então cada um tem a sua verdade".' },
      { grau: 'solido', t: 'A assimetria é o argumento: "a Terra é redonda" e "usamos 10% do cérebro" têm quantidades muito diferentes de evidência sustentando. Duvidar bem é comparar essas quantidades, não desistir delas.' },
      { grau: 'solido', t: 'O teste prático que você entrega: "o que me faria mudar de ideia?" Se a resposta for "nada", aquilo não é conhecimento — é identidade.' },
      { grau: 'cuidado', t: 'Nunca corte, mesmo estourando o tempo. Se precisar, tire trinta segundos do bloco de Sócrates.' },
    ],
  },

  34: {
    titulo: 'Como você sabe que aquilo que você sabe é verdade?',
    itens: [
      { grau: 'solido', t: 'É a mesma pergunta do começo, na mesma tipografia e no mesmo lugar da tela. O deck inteiro é a distância entre as duas aparições.' },
      { grau: 'solido', t: 'A fala é curta de propósito: "faz dezoito minutos. Acho que a pergunta ficou mais difícil."' },
      { grau: 'cuidado', t: 'Comece a distribuir os cartões AQUI, falando. Parar para distribuir mata o fecho — ou entregue a pilha para duas pessoas passarem.' },
    ],
  },

  35: {
    titulo: 'A frase final',
    conferido: true, // título não repete palavra da tela; alinhamento verificado à mão
    veredito: 'NO CLIQUE',
    itens: [
      { grau: 'solido', t: 'Quatro passos, no clique, nunca automático: a epistemologia não começa quando a gente duvida de tudo; começa quando a gente para de perguntar só "o que eu sei?" e passa a perguntar o que me autoriza a chamar isso de conhecimento.' },
      { grau: 'solido', t: 'A última linha entra depois de três segundos de silêncio. Depois dela, só "obrigado".' },
      { grau: 'cuidado', t: 'Não explique o cartão depois de entregá-lo. A frase final é a última coisa que eles ouvem, e é ela que sai da sala com eles.' },
    ],
  },

  36: {
    titulo: 'EU SEI? — e o QR das referências',
    conferido: true, // título não repete palavra da tela; alinhamento verificado à mão
    itens: [
      { grau: 'solido', t: 'A mesma tela da abertura, com um ponto de interrogação no lugar do ponto final. O seminário inteiro cabe nessa troca de pontuação.' },
      { grau: 'solido', t: 'O QR leva à página /referencias: as cinco perguntas comentadas, as três afirmações com veredito e fonte, o conceito, o Wason explicado e o fecho antirrelativista.' },
      { grau: 'cuidado', t: 'Deixe no ar enquanto eles saem — é o tempo de leitura do QR. Sair rápido daqui desperdiça a única chance de o material continuar depois da aula.' },
    ],
  },

  37: {
    titulo: 'Créditos',
    itens: [
      { grau: 'solido', t: 'Luis · Carlos · Malu · Renata · Rebeca · Mariana · Dalila.' },
      { grau: 'cuidado', t: 'Se a professora exigir identificação no início, mostre esta tela por três segundos ANTES da primeira e volte com Home. Ela não pode abrir o seminário no lugar do "EU SEI.".' },
    ],
  },
}
