export const module2 = {
  id: "modulo-2",
  short: "M2",
  title: "Modelagem de Processos com BPMN",
  subtitle: "BPM, elementos gráficos e o processo de reembolso",
  emoji: "🔄",
  icon: "mdi:sitemap-outline",
  summary:
    "Como representar processos de negócio de ponta a ponta com uma notação que tanto a área de negócio quanto a TI entendem.",
  theory: [
    {
      type: "callout",
      variant: "exam",
      title: "O que mais cai",
      items: [
        "Pool x Lane (piscina x raia).",
        "Diferença entre gateway **exclusivo (X)** e **inclusivo (O)**.",
        "Saber desenhar/interpretar o **fluxo de reembolso** com decisões e retornos.",
        "Reconhecer símbolos: evento de início (círculo fino), intermediário (duplo), fim (grosso).",
      ],
    },
    { type: "h2", text: "1. BPM: Gerenciamento de Processos de Negócio" },
    {
      type: "p",
      text: "**BPM** (Business Process Management) reúne técnicas e ferramentas para **analisar, modelar, publicar, executar e melhorar** processos organizacionais. O ciclo de vida clássico passa por modelagem → implantação → monitoramento → otimização.",
    },
    { type: "h2", text: "2. BPMN: a notação" },
    {
      type: "p",
      text: "**BPMN** (Business Process Model and Notation) é um **padrão gráfico internacional intuitivo** criado para **facilitar o entendimento** entre técnicos e pessoas de negócio. É hoje mantido pela OMG (a mesma organização da UML).",
    },
    { type: "h3", text: "Categorias de elementos" },
    { type: "ul", items: [
      "**Objetos de fluxo:** Atividades, Eventos e Gateways.",
      "**Objetos de conexão:** Fluxo de sequência (seta cheia), fluxo de mensagem (tracejada) e associação.",
      "**Swimlanes (raias):** Pool e Lane.",
      "**Artefatos:** Anotações de texto e grupos.",
    ]},
    { type: "h2", text: "3. Elementos gráficos essenciais" },
    {
      type: "table",
      headers: ["Elemento", "Forma", "Significado"],
      rows: [
        ["**Pool (piscina)**", "retângulo grande", "Representa um **processo** ou uma **organização/participante**."],
        ["**Lane (raia)**", "subdivisão do pool", "Categoriza atividades por **papel/departamento** dentro do mesmo processo."],
        ["**Atividade**", "retângulo arredondado", "Trabalho realizado: **Tarefa** ou Subprocesso (com `+`)."],
        ["**Evento de início**", "círculo de borda **fina**", "Dispara o processo."],
        ["**Evento intermediário**", "círculo de borda **dupla**", "Acontece no meio do fluxo (ex.: temporizador, mensagem)."],
        ["**Evento de fim**", "círculo de borda **grossa**", "Encerra um caminho do processo."],
        ["**Gateway**", "losango", "Controle de fluxo / decisão."],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      title: "Convenção de tamanho x espessura",
      text: "Atenção: no BPMN a **espessura da borda** do círculo distingue os eventos (fina = início, dupla = intermediário, grossa = fim). O **tamanho** do círculo não importa; o que importa é a espessura.",
    },
    { type: "h3", text: "Gateways (desvios)" },
    {
      type: "table",
      headers: ["Gateway", "Marcador", "Comportamento"],
      rows: [
        ["**Exclusivo**", "`X`", "Apenas **um** caminho é seguido (OU exclusivo)."],
        ["**Inclusivo**", "`O`", "**Um ou mais** caminhos em paralelo (E/OU)."],
        ["**Paralelo**", "`+`", "**Todos** os caminhos simultaneamente (E)."],
        ["**Complexo**", "`*`", "Regras avançadas de fusão/ramificação, sem semântica simples."],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Mnemônico",
      text: "**X** de e**X**clusivo (só um). **O** = e/OU (um ou mais). **+** = todos em paralelo. Complexo só aparece quando as regras não cabem nos outros.",
    },
    { type: "h2", text: "4. Estudo de Caso: Processo de Reembolso" },
    { type: "p", text: "Fluxo clássico cobrado na disciplina:" },
    { type: "ol", items: [
      "**Início:** o funcionário preenche e envia o formulário de solicitação de despesas.",
      "**Análise do gerente:** se **aprovado**, segue para o financeiro; se **rejeitado**, o funcionário é notificado e o processo **encerra**.",
      "**Validação do financeiro:** confere comprovantes e notas. Se houver **pendência**, o fluxo **retorna ao funcionário** para correção; se estiver **correto**, efetua o pagamento.",
      "**Fim:** o funcionário recebe a notificação de pagamento efetuado.",
    ]},
    {
      type: "mermaid",
      caption: "Processo de reembolso com pool e raias (Funcionário, Gerente, Financeiro).",
      code: `flowchart TD
    subgraph P["Pool: Processo de Reembolso"]
      direction TB
      subgraph L1["Lane: Funcionário"]
        S((Início))
        Fill[Preencher formulário de despesas]
        NotifyRej[Receber notificação de rejeição]
        Fix[Corrigir documentação]
        NotifyPay[Receber notificação de pagamento]
        E1((Fim))
      end
      subgraph L2["Lane: Gerente"]
        Analyze[Analisar solicitação]
        G1{Decisão}
      end
      subgraph L3["Lane: Financeiro"]
        Validate[Validar comprovantes/notas]
        G2{Pendência?}
        Pay[Efetuar pagamento]
      end
    end
    S --> Fill --> Analyze --> G1
    G1 -- Rejeitado --> NotifyRej --> E1
    G1 -- Aprovado --> Validate --> G2
    G2 -- Sim, com pendência --> Fix --> Fill
    G2 -- Não --> Pay --> NotifyPay --> E1`,
    },
    {
      type: "callout",
      variant: "warn",
      title: "Cuidado ao desenhar",
      text: "O gateway de decisão precisa ter **todas as saídas nomeadas** (ex.: \"Aprovado\" / \"Rejeitado\") e, quando o fluxo reencontra outro ponto, deve-se usar um **gateway de convergência** para evitar caminhos inconsistentes.",
    },
  ],

  cheat: [
    {
      title: "BPM x BPMN",
      items: [
        "**BPM:** disciplina de gestão de processos (analisar, modelar, melhorar).",
        "**BPMN:** a **notação** gráfica padronizada (OMG).",
        "Objetivo: linguagem comum entre negócio e TI.",
      ],
    },
    {
      title: "Símbolos",
      items: [
        "**Pool** = processo/organização; **Lane** = papel/departamento.",
        "**Atividade** = retângulo arredondado.",
        "**Início** = círculo borda fina; **Fim** = borda grossa; **Intermediário** = borda dupla.",
        "Gateway **X** = só um caminho; **O** = um ou mais; **+** = todos.",
      ],
    },
    {
      title: "Reembolso",
      items: [
        "Funcionário envia formulário.",
        "Gerente aprova → financeiro; rejeita → notifica e fim.",
        "Financeiro valida: pendência → volta ao funcionário; ok → paga.",
        "Funcionário recebe notificação de pagamento.",
      ],
    },
  ],

  diagrams: [
    {
      title: "Reembolso (fluxo simplificado)",
      description: "Com decision gateways exclusivos e retorno por pendência.",
      code: `flowchart TB
    S((Início)) --> F[Funcionário preenche formulário]
    F --> G{Gerente aprova?}
    G -- Não --> R[Notificar rejeição] --> E((Fim))
    G -- Sim --> V[Financeiro valida notas]
    V --> P{Documentos pendentes?}
    P -- Sim --> C[Funcionário corrige] --> V
    P -- Não --> PG[Efetuar pagamento] --> N[Notificar pagamento] --> E`,
    },
    {
      title: "Gateways",
      description: "Exclusivo (X) x Inclusivo (O) x Paralelo (+).",
      code: `flowchart TD
    A([Entrada]) --> X{Gateway Exclusivo X}
    X -->|opção 1| B[Tarefa B]
    X -->|opção 2| C[Tarefa C]
    B --> O{Gateway Inclusivo O}
    C --> O
    O -->|caminho 1| D[Tarefa D]
    O -->|caminho 2| E[Tarefa E]
    D --> Plus{Gateway Paralelo +}
    E --> Plus
    Plus --> F[Tarefa F]
    Plus --> G[Tarefa G]
    F --> H([Fim])
    G --> H`,
    },
  ],

  quiz: {
    mcq: [
      {
        q: "Em BPMN, qual elemento subdivide o pool para atribuir atividades a papéis ou departamentos?",
        options: ["Gateway", "Lane (raia)", "Evento intermediário", "Artefato"],
        answer: 1,
        explain:
          "A **Lane (raia)** é a subpartição dentro do **Pool**, usada para organizar as atividades por responsável/departamento.",
      },
      {
        q: "Um gateway que permite que um ou mais caminhos sejam seguidos em paralelo (E/OU) é o:",
        options: ["Exclusivo (X)", "Inclusivo (O)", "Paralelo (+)", "Complexo (*)"],
        answer: 1,
        explain:
          "O **Inclusivo (O)** permite **um ou mais** caminhos simultâneos (e/ou). O Paralelo (+) faz todos; o Exclusivo (X) faz só um.",
      },
      {
        q: "Sobre a distinção dos eventos em BPMN, o evento de fim é representado por um círculo de borda:",
        options: ["fina", "dupla", "grossa", "tracejada"],
        answer: 2,
        explain:
          "Borda **fina** = início; **dupla** = intermediário; **grossa** = fim.",
      },
      {
        q: "No processo de reembolso estudado, o que ocorre quando o financeiro identifica documentos pendentes?",
        options: [
          "O pagamento é efetuado mesmo assim.",
          "O processo é encerrado imediatamente.",
          "O fluxo retorna ao funcionário para correção.",
          "O gerente refaz a análise do zero.",
        ],
        answer: 2,
        explain:
          "Havendo pendência, o fluxo **retorna ao funcionário** para correção antes de nova validação.",
      },
      {
        q: "Qual é o principal objetivo da BPMN?",
        options: [
          "Substituir a UML na modelagem de classes.",
          "Padronizar graficamente processos de negócio para entendimento entre negócio e TI.",
          "Definir a arquitetura física de servidores.",
          "Gerenciar exclusivamente o backlog ágil.",
        ],
        answer: 1,
        explain:
          "A BPMN é um padrão gráfico **intuitivo** que aproxima a linguagem de negócio da linguagem técnica.",
      },
      {
        q: "Um gateway exclusivo (X) caracteriza-se por:",
        options: [
          "seguir todos os caminhos simultaneamente.",
          "seguir apenas um dos caminhos possíveis.",
          "seguir um ou mais caminhos.",
          "combinar regras sem semântica definida.",
        ],
        answer: 1,
        explain:
          "O exclusivo (X) representa um **OU exclusivo**: apenas **um** caminho é escolhido.",
      },
    ],
    discursive: [
      {
        q: "Explique a diferença entre Pool e Lane em BPMN, exemplificando.",
        answer:
          "O Pool delimita o processo como um todo ou uma organização/participante; a Lane é uma subdivisão interna do Pool usada para separar as tarefas por papel ou departamento. Ex.: no processo de reembolso, o Pool é o \"Processo de Reembolso\" e as Lanes são Funcionário, Gerente e Financeiro.",
        topics: [
          "Pool = processo/organização.",
          "Lane = subpartição por papel.",
          "Exemplo coerente.",
        ],
      },
      {
        q: "Descreva o fluxo completo do processo de solicitação de reembolso, incluindo os pontos de decisão.",
        answer:
          "O funcionário preenche e envia o formulário. O gerente analisa: se rejeitar, o funcionário é notificado e o processo termina; se aprovar, vai ao financeiro. O financeiro valida comprovantes: havendo pendência, o processo retorna ao funcionário para correção; estando correto, efetua o pagamento e o funcionário é notificado, encerrando o processo.",
        topics: [
          "Etapas do funcionário, gerente e financeiro.",
          "Duas decisões (aprovação e pendência).",
          "Retorno por pendência e encerramento.",
        ],
      },
      {
        q: "Compare os gateways exclusivo, inclusivo e paralelo.",
        answer:
          "Exclusivo (X): apenas um caminho é seguido (OU). Inclusivo (O): um ou mais caminhos seguem em paralelo (E/OU). Paralelo (+): todos os caminhos seguem simultaneamente (E). O exclusivo decide; o inclusivo combina condições; o paralelo apenas sincroniza caminhos independentes.",
        topics: [
          "Semântica de cada gateway.",
          "Marcadores X, O e +.",
          "Exemplo de uso.",
        ],
      },
      {
        q: "O que é BPM e qual seu ciclo de melhoria?",
        answer:
          "BPM é o gerenciamento de processos de negócio: conjunto de técnicas e ferramentas para analisar, modelar, publicar e melhorar processos organizacionais. O ciclo típico inclui modelagem, implantação/execução, monitoramento e otimização contínua.",
        topics: [
          "Definição de BPM.",
          "Ciclo modelar → implantar → monitorar → otimizar.",
          "Foco em melhoria contínua.",
        ],
      },
      {
        q: "Por que a BPMN é considerada uma linguagem de integração entre negócio e TI?",
        answer:
          "Porque usa símbolos gráficos padronizados e intuitivos que a área de negócio compreende, ao mesmo tempo em que possui rigor formal suficiente para modelagem e automatização por parte da TI. Assim, ambos usam o mesmo modelo como referência.",
        topics: [
          "Padronização.",
          "Intuitividade para o negócio.",
          "Rigor para a técnica.",
        ],
      },
      {
        q: "Desenhe textualmente (em passos e com gateways) um processo de aprovação simples: pedido online com decisão de crédito e pagamento.",
        answer:
          "Início → cliente envia pedido → gateway exclusivo \"crédito aprovado?\": se não, notificar recusa e fim; se sim, reservar estoque em paralelo (gateway paralelo +) com gerar cobrança → gateway de convergência → emitir nota → enviar → fim. Pontos de decisão usam gateways exclusivos; tarefas independentes usam gateway paralelo.",
        topics: [
          "Presença de evento de início e fim.",
          "Uso correto de gateway exclusivo para decisão e paralelo para concorrência.",
          "Sequência coerente.",
        ],
      },
    ],
  },
};
