/**
 * Material de consulta do apresentador — aparece na janela de controle, nunca
 * projetado. A regra do CLAUDE.md §3 vale para o telão: uma tela, uma ideia,
 * nunca mais de nove palavras. Aqui não há projetor, então cabe texto inteiro.
 */
export const resumo = {
  titulo: 'Epistemologia — resumo de consulta',
  definicao:
    'Epistemologia (do grego epistéme, "conhecimento" ou "ciência", e lógos, "estudo" ou "discurso") é o ramo da filosofia dedicado a investigar a natureza, as origens, os limites e a validade do conhecimento humano. Também conhecida como Teoria do Conhecimento, ela busca responder a perguntas fundamentais sobre como passamos a saber o que sabemos.',
  problemas: [
    {
      q: 'O que é o conhecimento?',
      a: 'Define a diferença entre crença, opinião e conhecimento verdadeiro e justificado.',
    },
    {
      q: 'Qual é a origem do conhecimento?',
      a: 'Contrapõe o racionalismo (a razão e a lógica como fontes primárias) e o empirismo (a experiência sensorial e a observação).',
    },
    {
      q: 'Quais são os limites do saber?',
      a: 'Examina até onde a mente humana compreende a realidade e se existem coisas inerentemente incognoscíveis (ceticismo, agnosticismo).',
    },
    {
      q: 'Como justificamos nossas crenças?',
      a: 'Analisa os critérios de verdade e a validade das evidências, do raciocínio e do método científico.',
    },
  ],
  fecho:
    'A epistemologia serve como fundação não apenas para a filosofia, mas para todas as ciências: ela estabelece as regras e métodos que determinam o que pode ser aceito como verdade científica ou fato demonstrável.',
} as const

/** O que este ensaio é e qual é o objetivo — a primeira coisa na tela de controle. */
export const objetivo = {
  o_que:
    'Seminário de epistemologia para uma turma de Pedagogia. Dezoito minutos e trinta, slot rígido das 19:00 às 19:20, até vinte pessoas.',
  como:
    'A turma vive um problema epistemológico antes de saber que ele tem nome: responde três afirmações, se posiciona numa linha entre VERDADEIRO e FALSO, troca a ficha com quem concluiu o contrário.',
  objetivo:
    'Que eles sintam a pergunta, não que guardem uma definição. No minuto nove descobrem que o que fizeram se chama epistemologia.',
  criterio:
    'Se alguém sair dizendo "então não dá para saber nada", o seminário falhou. O trabalho não é desistir de saber — é saber por quê.',
} as const
