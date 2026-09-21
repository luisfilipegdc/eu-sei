/**
 * Fontes, dados e perguntas prováveis, por tela.
 *
 * Isto NÃO é gerado: é material que não existe em nenhum outro lugar do
 * projeto. A nota da tela diz o que fazer; aqui está o que sustenta o que você
 * vai dizer, e o que responder se alguém puxar.
 *
 * Cada item tem um grau:
 *   'solido'  — bem estabelecido, pode afirmar sem ressalva
 *   'cuidado' — verdadeiro com ressalva, e a ressalva importa
 *   'consulte'— não afirme de cabeça; se perguntarem, diga que vai verificar
 *
 * O grau existe porque seria constrangedor levar afirmação mal justificada
 * para um seminário sobre justificação.
 */
window.FONTES = {
  2: {
    titulo: 'Afirmação 1 — os 10% do cérebro',
    veredito: 'FALSO',
    itens: [
      { grau: 'solido', t: 'Não existe região do cérebro que fique ociosa. Lesões em praticamente qualquer área produzem algum déficit, e neuroimagem mostra atividade distribuída — inclusive durante o sono.' },
      { grau: 'solido', t: 'O cérebro é cerca de 2% da massa do corpo e consome cerca de 20% da energia em repouso. Manter 90% de um órgão tão caro sem função é evolutivamente implausível.' },
      { grau: 'cuidado', t: 'A frase é frequentemente atribuída a Einstein, mas não há registro de que ele a tenha dito. A origem exata é obscura — não diga uma origem específica com segurança.' },
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
      { grau: 'solido', t: 'O que foi testado é a hipótese de correspondência (meshing): que ensinar no estilo preferido faz a pessoa aprender MAIS. Testar isso exige um desenho específico — dois grupos, dois métodos, cruzados. Os autores encontraram quase nenhum estudo com esse desenho, e os que encontraram não sustentaram a hipótese.' },
      { grau: 'solido', t: 'Preferências existem e são reais. O que não se sustenta é a ponte entre preferência e desempenho.' },
      { grau: 'cuidado', t: 'A crença é muito difundida entre professores em vários países. Se for citar um número de pesquisa, confira a fonte antes — os percentuais variam muito entre estudos e países.' },
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
      { grau: 'solido', t: 'Isso tem nome próprio na filosofia: o "problema socrático" — a dificuldade de separar o Sócrates histórico do personagem de Platão.' },
      { grau: 'solido', t: 'É por isso que esta afirmação é a melhor do trio: quase todos acertam, e quase ninguém consegue justificar. Crença verdadeira sem justificação.' },
    ],
    perguntar: [
      { p: '"Como sabem que ele existiu?"', r: 'Pelas três fontes independentes e por Aristóteles. É uma pergunta ótima — e ela mesma é epistemológica.' },
    ],
  },

  9: {
    titulo: 'A ilusão dos dois quadrados',
    itens: [
      { grau: 'solido', t: 'É contraste simultâneo: o sistema visual julga claridade por comparação com o entorno, não em valor absoluto. Os dois quadrados são #8A8A8A — idênticos.' },
      { grau: 'solido', t: 'Parente famoso: o tabuleiro de Adelson (checker-shadow, 1995), em que dois quadrados de xadrez com a mesma cor parecem muito diferentes.' },
      { grau: 'cuidado', t: 'Não diga "seus olhos mentem". Eles não mentem: eles fazem exatamente o que evoluíram para fazer, que é estimar cor sob iluminação variável. O ponto é que ver é uma fonte, não um critério.' },
    ],
  },

  11: {
    titulo: 'A referência completa',
    itens: [
      { grau: 'solido', t: 'Psychological Science in the Public Interest é uma revista de revisões encomendadas, revisadas por pares, da Association for Psychological Science. Não é opinião de autor.' },
      { grau: 'solido', t: 'Mostrar a referência na tela é performativo de propósito: você está fazendo, na frente deles, o que pediu que fizessem — dar a conta do que afirma.' },
    ],
  },

  14: {
    titulo: 'Wason 2·4·6',
    itens: [
      { grau: 'solido', t: 'WASON, P. C. "On the failure to eliminate hypotheses in a conceptual task". Quarterly Journal of Experimental Psychology, v. 12, n. 3, p. 129–140, 1960.' },
      { grau: 'solido', t: 'A regra real é "qualquer sequência crescente". A maioria das pessoas anuncia uma regra mais específica e errada, porque só testou casos que a confirmavam.' },
      { grau: 'solido', t: 'O nome do fenômeno é viés de confirmação: procurar evidência que confirma, em vez de evidência que poderia derrubar. Popper chamaria de falta de tentativa de falsificação.' },
      { grau: 'cuidado', t: 'Não confunda com a "tarefa de seleção de Wason", das quatro cartas — é outro experimento do mesmo autor. Se alguém citar as cartas, é outra coisa.' },
    ],
    perguntar: [
      { p: '"Por que ninguém testa o que derruba?"', r: 'Porque confirmar dá sensação de progresso. Cada "sim" parece uma vitória, e não é: um sim que não podia ser não, não informa nada.' },
    ],
  },

  19: {
    titulo: 'Epistemologia — definição e palavra',
    itens: [
      { grau: 'solido', t: 'Investiga a origem, a natureza, o valor e os limites do conhecimento. (Definição próxima da que o material da Aula 2 usa, citando SOUZA, 1995, p. 73.)' },
      { grau: 'solido', t: 'A palavra foi cunhada em 1854 por James Frederick Ferrier, em Institutes of Metaphysic. As raízes são gregas, a palavra é do século XIX.' },
      { grau: 'solido', t: 'ESTEBAN (2003, p. 13), citado na Aula 2: "uma forma de compreender e explicar como conhecemos o que sabemos". É o título do seu seminário, dito pelo material deles.' },
      { grau: 'cuidado', t: 'A Aula 2 traduz lógos como "tratado". Você vai além — palavra, razão, e a conta que se dá. Acrescente, não corrija.' },
    ],
  },

  20: {
    titulo: 'epistḗmē × dóxa',
    itens: [
      { grau: 'solido', t: 'A oposição entre conhecimento (epistḗmē) e opinião (dóxa) atravessa Platão, em especial a República e o Mênon.' },
      { grau: 'cuidado', t: 'Não apresente como se Platão tivesse uma definição fechada de conhecimento: o Teeteto termina sem encontrar uma.' },
    ],
  },

  21: {
    titulo: 'Crença, verdade, justificação',
    itens: [
      { grau: 'solido', t: 'A tríade é a formulação clássica do conhecimento como "crença verdadeira justificada". Ela é discutida a partir do Teeteto, mas a fórmula moderna é posterior.' },
      { grau: 'cuidado', t: 'Não diga que Platão definiu conhecimento como crença verdadeira justificada. Ele examina e rejeita candidatos no Teeteto. A fórmula é uma leitura da tradição.' },
    ],
  },

  23: {
    titulo: 'Mênon 97a–98a',
    itens: [
      { grau: 'solido', t: 'PLATÃO, Mênon, 97a–98a: a opinião verdadeira guia tão bem quanto o conhecimento — enquanto permanece. Ela foge, como as estátuas de Dédalo, que diziam sair andando se não fossem amarradas.' },
      { grau: 'solido', t: 'Amarrar é dar a razão. Opinião verdadeira amarrada pela razão vira conhecimento. É a resposta direta a quem acertou a afirmação 3 por chute.' },
    ],
    perguntar: [
      { p: '"E a resposta certa na prova, prova o quê?"', r: 'Deixe a pergunta no ar. É incômoda de propósito e é o melhor gancho para o bloco de Pedagogia.' },
    ],
  },

  24: {
    titulo: 'Gettier — a coda oculta',
    itens: [
      { grau: 'solido', t: 'GETTIER, E. "Is Justified True Belief Knowledge?" Analysis, v. 23, n. 6, p. 121–123, 1963. Três páginas.' },
      { grau: 'solido', t: 'Mostra casos em que há crença, verdade E justificação, e ainda assim hesitamos em chamar de conhecimento. Abriu décadas de literatura.' },
      { grau: 'cuidado', t: 'A afirmação 3 NÃO é um caso de Gettier: lá falta justificação. Gettier é o passo seguinte, não a explicação do que acabou de acontecer. Se misturar, confunde.' },
    ],
  },

  26: {
    titulo: 'Maiêutica e o ovo de vento',
    itens: [
      { grau: 'solido', t: 'PLATÃO, Teeteto, por volta de 149a–151d: Sócrates se diz filho da parteira Fenarete e descreve sua arte como parteira de ideias — ele não pare nenhuma, ajuda a parir.' },
      { grau: 'solido', t: 'A segunda metade é a que todo mundo esquece: depois de nascida, ele testa se a ideia se sustenta ou se é "ovo de vento" (anemiaion) — a que parece viva e não é.' },
      { grau: 'solido', t: 'Na Apologia (por volta de 21d) ele não diz "só sei que nada sei". Diz que sua vantagem é não achar que sabe o que não sabe.' },
    ],
    perguntar: [
      { p: '"Mas todo mundo fala que ele disse isso."', r: 'Ótimo exemplo ao vivo: uma frase que todo mundo repete, atribuída a alguém que não a disse. É o seminário acontecendo na sala.' },
    ],
  },

  28: {
    titulo: 'Por que um professor precisa pensar nisso',
    itens: [
      { grau: 'solido', t: 'Material da Aula 2, em cinco palavras: "Não existe educação e nem docência neutra!"' },
      { grau: 'solido', t: 'LIBÂNEO (2004, p. 74), citado na Aula 2: "é preciso desenvolver o hábito de desconfiar das aparências, desconfiar da normalidade das coisas".' },
      { grau: 'solido', t: 'FREIRE, P. Pedagogia da autonomia, 2005, p. 38–39: o pensar certo "não é presente dos deuses nem se acha nos guias de professores"; é produzido pelo próprio aprendiz.' },
      { grau: 'cuidado', t: 'O Quadro 1 da Aula 2 (CUNHA, 2007) opõe reprodutivista e transformador. Eles estudaram esse quadro. Não trate como espantalho — mostre o andar de baixo dele.' },
    ],
  },

  30: {
    titulo: 'Que tipo de conhecimento é este',
    itens: [
      { grau: 'solido', t: 'A pergunta é epistemológica, não metodológica, e vem antes da escolha do método. Esta é a contribuição original do seminário ao que eles já viram na Aula 2.' },
      { grau: 'cuidado', t: 'Evite a versão fácil ("transmitir é ruim, construir é bom"): além de não se sustentar, todo mundo na sala já concorda com ela — e ninguém pensa enquanto concorda.' },
    ],
  },

  33: {
    titulo: 'Antirrelativismo — obrigatória',
    itens: [
      { grau: 'solido', t: 'É a tela que impede o desfecho mais provável de uma dinâmica de epistemologia mal fechada: "então cada um tem a sua verdade".' },
      { grau: 'solido', t: 'A assimetria é o argumento: "a Terra é redonda" e "usamos 10% do cérebro" têm quantidades muito diferentes de evidência sustentando. Duvidar bem é comparar essas quantidades, não desistir delas.' },
      { grau: 'solido', t: 'O teste prático que você entrega: "o que me faria mudar de ideia?" Se a resposta for "nada", aquilo não é conhecimento — é identidade.' },
    ],
  },
}
