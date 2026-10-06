export const module3 = {
  id: "modulo-3",
  short: "M3",
  title: "Metodologias Ágeis e Lean",
  subtitle: "DSDM, Kanban, Lean, XP, ASD e Crystal",
  emoji: "⚙️",
  icon: "mdi:sync-circle",
  summary:
    "Frameworks e valores que organizam o trabalho de software em ciclos curtos, com foco em valor, pessoas e melhoria contínua.",
  theory: [
    {
      type: "callout",
      variant: "exam",
      title: "O que mais cai",
      items: [
        "Priorização **MoSCoW** do DSDM (nome de cada letra).",
        "**WIP** e sistema **puxado (pull)** do Kanban.",
        "Práticas do **XP** e seus limites (>12 pessoas, cliente on-site).",
        "**Ciclo triplo do ASD**: Especular → Colaborar → Aprender.",
        "**Cores do Crystal** por tamanho do time e a **comunicação osmótica**.",
        "Os **4 valores** e os **12 princípios** do Manifesto Ágil.",
      ],
    },
    { type: "h2", text: "0. Manifesto Ágil (2001)" },
    {
      type: "p",
      text: "Base teórica de todas as metodologias ágeis. Assinado em 2001, valoriza:",
    },
    { type: "ol", items: [
      "**Indivíduos e interações** mais que processos e ferramentas.",
      "**Software funcionando** mais que documentação abrangente.",
      "**Colaboração com o cliente** mais que negociação de contratos.",
      "**Responder a mudanças** mais que seguir um plano.",
    ]},
    {
      type: "callout",
      variant: "warn",
      title: "Não é \"não\" aos itens da direita",
      text: "O Manifesto diz que, embora os itens à direita tenham valor, os da **esquerda valem mais**. Não significa ignorar processos ou documentação.",
    },
    { type: "h2", text: "1. DSDM: Dynamic Systems Development Method" },
    { type: "p", text: "Foco em **desenvolvimento iterativo e incremental** com **participação ativa do usuário**. O tempo é fixo e o escopo é ajustável." },
    { type: "h3", text: "Priorização MoSCoW" },
    {
      type: "table",
      headers: ["Letra", "Categoria", "Significado"],
      rows: [
        ["**M**", "Must have", "**Obrigatório**: sem isso não há entrega."],
        ["**S**", "Should have", "**Importante**, mas contornável."],
        ["**C**", "Could have", "**Desejável**: só se sobrar tempo."],
        ["**W**", "Won't have", "**Fora do escopo** atual (mas pode voltar)."],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Estudo de caso",
      text: "Aplicado no sistema de **Pet Shop**: o usuário participa ativamente definindo o que é Must/Should/Could, permitindo entregas incrementais dentro do timebox.",
    },
    { type: "h2", text: "2. Kanban" },
    {
      type: "p",
      text: "Originado do **Sistema Toyota de Produção** (Taiichi Ohno). É uma abordagem de **fluxo contínuo** com **quadro visual** e **limites de WIP**.",
    },
    { type: "keyvals",
      items: [
        { k: "Quadro visual", v: "Colunas típicas: **A Fazer → Em progresso → Concluído**." },
        { k: "Limite de WIP", v: "Work In Progress: limita quantos itens ficam abertos por etapa." },
        { k: "Sistema puxado (pull)", v: "Novo trabalho só puxado quando há capacidade livre, evitando gargalos." },
        { k: "Vantagens", v: "Flexibilidade contínua e redução de reuniões desnecessárias." },
      ],
    },
    {
      type: "callout",
      variant: "warn",
      title: "Por que limitar o WIP?",
      text: "Muitas tarefas em paralelo geram **multitarefa**, filas e gargalos. Limitar o WIP força a equipe a **terminar** antes de começar, aumentando o fluxo.",
    },
    { type: "h2", text: "3. Filosofia Lean" },
    {
      type: "p",
      text: "Lean (enxuto) é sobre entregar valor eliminando **desperdício**. Cinco princípios:",
    },
    { type: "ol", items: [
      "**Valor**: definido sob a ótica do cliente.",
      "**Mapeamento do fluxo de valor**: enxergar todas as etapas.",
      "**Fluxo contínuo**: fazer o trabalho andar sem interrupções.",
      "**Produção puxada**: produzir conforme a demanda.",
      "**Melhoria contínua (Kaizen)**: aperfeiçoamento constante.",
    ]},
    { type: "h3", text: "Desperdícios a eliminar" },
    { type: "ul", items: [
      "**Superprodução** (fazer mais que o necessário).",
      "**Espera** (tempo parado).",
      "**Estoque** (trabalho acumulado).",
      "**Defeitos** (retrabalho).",
      "**Conhecimento não aproveitado** (ideias ignoradas).",
    ]},
    { type: "h2", text: "4. Extreme Programming (XP)" },
    {
      type: "p",
      text: "Criada por **Kent Beck**, é uma metodologia ágil focada em **engenharia de software com rigor técnico**, **código limpo** e **ciclos curtos de feedback** (1 a 2 semanas).",
    },
    {
      type: "table",
      headers: ["Prática", "O que é"],
      rows: [
        ["**TDD / Testes automatizados**", "Testes unitários escritos **antes** do código de produção."],
        ["**Programação em par**", "Dois desenvolvedores ativos no mesmo computador (um dirige, outro revisa)."],
        ["**Refatoração**", "Melhoria contínua da estrutura do código sem mudar comportamento."],
        ["**Integração contínua**", "Integrar e testar o código **várias vezes ao dia**."],
      ],
    },
    {
      type: "keyvals",
      items: [
        { k: "Pontos fortes", v: "Altíssima qualidade de código, drástica redução de bugs em produção e disseminação rápida de conhecimento na equipe." },
        { k: "Fraquezas/custos", v: "Exige **cliente on-site** constante, pode causar desgaste mental na programação em par e **não escala** para equipes grandes." },
        { k: "Tamanho ideal", v: "Times de até **12 pessoas**." },
      ],
    },
    {
      type: "mermaid",
      caption: "Ciclo de feedback do XP (TDD + integração contínua).",
      code: `flowchart TB
    T[Escrever teste RED] --> C[Implementar código GREEN]
    C --> R[Refatorar REFACTOR]
    R --> I[Integração contínua]
    I --> P[Pequeno release]
    P --> T`,
    },
    { type: "h2", text: "5. Adaptive Software Development (ASD)" },
    { type: "h3", text: "Contexto e origem" },
    {
      type: "p",
      text: "Criada por **Jim Highsmith e Sam Bayer**, publicada na obra *Adaptive Software Development: A Collaborative Approach to Managing Complex Systems* (2000). Tem raízes no método **RAD (Rapid Application Development)** dos anos 1990. Em **2001**, Highsmith assinou o **Manifesto Ágil**, consolidando o ASD como uma de suas fundações.",
    },
    {
      type: "p",
      text: "Premissa central: é **impossível prever todas as variáveis** no início de um projeto. Por isso o ASD substitui a noção de **\"planejar\"** pela de **\"especular\"**, encarando o plano como **hipótese** sujeita a adaptação contínua.",
    },
    { type: "h3", text: "Fundamentação: Sistemas Adaptativos Complexos (CAS)" },
    {
      type: "p",
      text: "O ASD trata a construção de software como um **organismo vivo**, baseado na teoria dos **CAS (Complex Adaptive Systems)**. Quatro características:",
    },
    {
      type: "keyvals",
      items: [
        { k: "Não linearidade", v: "Pequenas ações podem gerar grandes impactos, e vice-versa." },
        { k: "Comportamento emergente", v: "Os resultados surgem da interação entre pessoas e módulos." },
        { k: "Adaptabilidade", v: "Os agentes ajustam-se continuamente às mudanças do ambiente." },
        { k: "Limite do caos", v: "O desempenho ideal ocorre na zona de equilíbrio entre a **rigidez burocrática** e o **caos descontrolado**." },
      ],
    },
    { type: "h3", text: "O Ciclo Tríplice" },
    {
      type: "ol",
      items: [
        "**Especular:** assume a incerteza. Em vez de congelar escopos, estabelece **hipóteses de trabalho** e metas flexíveis para ciclos curtos.",
        "**Colaborar:** ênfase no trabalho em equipe, comunicação transparente e alinhamento constante entre desenvolvedores, clientes e partes interessadas.",
        "**Aprender:** retrospectivas e análises ao fim de cada entrega para absorver **lições**, validar premissas e ajustar a direção.",
      ],
    },
    {
      type: "table",
      headers: ["Fase", "Foco", "Como funciona"],
      rows: [
        ["**Especular (Speculate)**", "Missões e hipóteses", "Planejamento em **timeboxes**; reconhece a incerteza em vez de prever tudo."],
        ["**Colaborar (Collaborate)**", "Pessoas no centro", "Decisão conjunta, comunicação e confiança na equipe."],
        ["**Aprender (Learn)**", "Aprendizado contínuo", "Revisões críticas, lições aprendidas e ajuste do rumo."],
      ],
    },
    {
      type: "mermaid",
      caption: "Ciclo tríplice do ASD: Especular → Colaborar → Aprender.",
      code: `flowchart TB
    S["Especular<br/>(missões e hipóteses)"] --> C["Colaborar<br/>(pessoas no centro)"]
    C --> L["Aprender<br/>(revisão crítica)"]
    L --> S`,
    },
    { type: "h3", text: "Estudo de caso: Sistema \"Auto Mecânica\"" },
    {
      type: "p",
      text: "Sistema de gestão para **oficina mecânica**, desenvolvido em **PHP e MySQL**.",
    },
    {
      type: "ol",
      items: [
        "**Cenário:** exigiu-se uma funcionalidade de **auditoria** no sistema.",
        "**Implementação:** a equipe criou **triggers e views** no banco para registrar automaticamente o histórico de alterações de status, com integridade relacional.",
        "**Problema:** ao implantar a demonstração em uma **hospedagem gratuita restrita**, a importação do banco travou por falta de suporte a triggers e views.",
        "**Aprendizado (fase Aprender):** ambientes de **demo** e de **produção** têm naturezas e requisitos distintos. A demo serve para exibir o progresso; a produção exige **infraestrutura dedicada** apropriada.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Lição do estudo de caso",
      text: "O problema não invalidou a solução: o ciclo **Aprender** revelou que a escolha de infraestrutura deve ser validada conforme o ambiente. É a lógica do ASD: adaptar a direção a partir do aprendizado.",
    },

    { type: "h2", text: "6. Metodologia Crystal (agilidade com foco nas pessoas)" },
    { type: "h3", text: "Conceito e origem" },
    {
      type: "p",
      text: "Criada por **Alistair Cockburn** na década de 1990, a Crystal é uma **família de abordagens ágeis**. Parte de uma ideia simples: cada projeto é único. Em vez de impor um processo fixo, ela ajusta o rigor ao **tamanho do time**, à **complexidade** e à **criticidade** do sistema, colocando o talento humano e a comunicação acima da burocracia.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Pessoas em primeiro lugar",
      text: "A Crystal trata o time como o centro do sucesso. As pessoas precisam de autonomia para propor, perguntar e errar sem medo de punição.",
    },
    { type: "h3", text: "A família de cores (peso do processo)" },
    {
      type: "p",
      text: "As cores indicam o peso do processo. Quanto mais escura a cor, mais estruturado e documentado o projeto deve ser.",
    },
    {
      type: "table",
      headers: ["Cor", "Tamanho", "Características"],
      rows: [
        ["**Crystal Clear**", "1 a 6 pessoas", "Ultra-leve, baixa documentação, **comunicação osmótica** e entregas frequentes."],
        ["**Crystal Yellow**", "7 a 20 pessoas", "Propriedade de código (*code ownership*), testes automatizados e integração contínua."],
        ["**Crystal Orange**", "21 a 50 pessoas", "Subtimes por funcionalidade, papéis especialistas (arquiteto, designer, testador) e releases de 3 a 4 meses."],
        ["**Crystal Orange Web**", "21 a 50 pessoas", "Variação para a web, com deploy contínuo e ciclos curtos."],
        ["**Crystal Red**", "50 a 80 pessoas", "Auditorias de segurança, revisões formais de código e reuniões estruturadas de integração."],
        ["**Maroon / Blue / Sapphire**", "80 a centenas", "Sistemas críticos (bancos, aviação, saúde), com rastreabilidade e *compliance* rigorosos."],
      ],
    },
    {
      type: "mermaid",
      caption: "Família Crystal: quanto mais escura a cor, maior o rigor do processo.",
      code: `flowchart TB
    C1["Crystal Clear<br/>1 a 6 pessoas<br/>Comunicação osmótica"] --> C2["Crystal Yellow<br/>7 a 20<br/>Code ownership + CI"]
    C2 --> C3["Crystal Orange<br/>21 a 50<br/>Subtimes e especialistas"]
    C3 --> C4["Crystal Red<br/>50 a 80<br/>Auditorias e revisões"]
    C4 --> C5["Maroon / Blue / Sapphire<br/>80 ou mais<br/>Crítico e compliance"]`,
    },
    { type: "h3", text: "Características e valores" },
    {
      type: "ul",
      items: [
        "**Comunicação osmótica:** a informação é absorvida naturalmente pela proximidade dos membros, na mesma sala ou em um canal aberto.",
        "**Segurança pessoal:** ambiente onde é possível errar, perguntar e discordar sem punição.",
        "**Melhoria reflexiva:** reuniões periódicas para ajustar o próprio processo de trabalho.",
        "**Entregas frequentes:** validação de software funcional em ciclos curtos.",
      ],
    },
    { type: "h3", text: "Pontos fortes e limitações" },
    {
      type: "keyvals",
      items: [
        { k: "Pontos fortes", v: "Baixo custo financeiro (sem licenças ou certificações obrigatórias), flexibilidade e foco no valor humano." },
        { k: "Limitações", v: "Exige maturidade técnica e de liderança. A comunicação osmótica enfraquece no trabalho remoto sem cultura digital forte, e o modelo conflita com governança corporativa tradicional." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "No projeto integrador",
      text: "A Crystal ajuda a dimensionar escopo e tempo conforme o tamanho real do time e o conhecimento disponível, o que reduz o risco de atrasos na entrega.",
    },

    { type: "h2", text: "7. Quadro comparativo: UML x ASD" },
    {
      type: "table",
      headers: ["Dimensão", "Casos de Uso", "Classes", "ASD"],
      rows: [
        ["**Foco**", "Funcionalidades externas / visão do usuário.", "Estrutura lógica estática (OO).", "Gestão ágil do ciclo de vida e mudanças."],
        ["**Fase**", "Elicitação e análise de requisitos.", "Projeto e modelagem estática.", "Condução e gestão de todo o projeto."],
        ["**Chave**", "Atores, UC, «include», «extend».", "Classes, atributos, métodos, relacionamentos.", "Especular, Colaborar, Aprender."],
        ["**Premissa**", "Mapear o que o sistema faz externamente.", "Mapear como o sistema se estrutura internamente.", "Reconhecer a incerteza e adaptar continuamente."],
      ],
    },
  ],

  cheat: [
    {
      title: "DSDM",
      items: [
        "Iterativo/incremental com **usuário ativo**.",
        "Timebox fixo, escopo variável.",
        "**MoSCoW:** Must / Should / Could / Won't have.",
        "Caso: Pet Shop.",
      ],
    },
    {
      title: "Kanban",
      items: [
        "Origem: **Toyota** (Taiichi Ohno).",
        "Quadro visual: A fazer / Em progresso / Concluído.",
        "**Limite de WIP** evita gargalos.",
        "Fluxo **puxado (pull)**, sem reuniões excessivas.",
      ],
    },
    {
      title: "Lean",
      items: [
        "5 princípios: Valor, Fluxo de valor, Fluxo contínuo, Produção puxada, Kaizen.",
        "Desperdícios: superprodução, espera, estoque, defeitos, conhecimento não usado.",
      ],
    },
    {
      title: "XP",
      items: [
        "Autor: **Kent Beck**.",
        "Práticas: **TDD**, **Pair Programming**, Refatoração, Integração Contínua.",
        "Time < 12 pessoas; cliente on-site; alta qualidade e poucos bugs.",
      ],
    },
    {
      title: "ASD",
      items: [
        "Autores: **Highsmith e Bayer** (2000); raízes no **RAD**; signatário do Manifesto (2001).",
        "Substitui *planejar* por **especular** (plano = hipótese).",
        "Base: **CAS** (não linearidade, comportamento emergente, adaptabilidade, limite do caos).",
        "Ciclo: **Especular → Colaborar → Aprender**.",
        "Caso: Auto Mecânica (PHP/MySQL → triggers/views → demo x produção).",
      ],
    },
    {
      title: "Crystal",
      items: [
        "Autor: **Alistair Cockburn** (anos 1990).",
        "Princípio: cada projeto é único; o processo se adapta ao tamanho e à criticidade.",
        "Cores por peso: **Clear** (1-6) → **Yellow** (7-20) → **Orange** (21-50) → **Red** (50-80) → **Maroon/Blue/Sapphire** (80+).",
        "**Comunicação osmótica:** informação absorvida pela proximidade.",
        "**Segurança pessoal** e **melhoria reflexiva**.",
        "Sem licenças pagas; exige maturidade; sofre no trabalho remoto.",
      ],
    },
  ],

  diagrams: [
    {
      title: "Quadro Kanban",
      description: "Colunas com limites de WIP.",
      code: `flowchart TB
    subgraph Backlog["A Fazer (WIP: ∞)"]
      A1[Login]
      A2[Relatório]
    end
    subgraph Doing["Em Progresso (WIP: 2)"]
      B1[Carrinho]
      B2[Pagamento]
    end
    subgraph Done["Concluído"]
      C1[Cadastro]
    end
    A1 -.-> B1
    B1 -.-> C1`,
    },
    {
      title: "Lean: fluxo de valor",
      description: "Da necessidade do cliente à entrega.",
      code: `flowchart TB
    V[Valor] --> M[Mapear fluxo]
    M --> F[Fluxo contínuo]
    F --> P[Produção puxada]
    P --> K[Kaizen]`,
    },
    {
      title: "XP",
      description: "TDD e integração contínua.",
      code: `flowchart TB
    T[Teste RED] --> C[Código GREEN] --> R[Refatoração] --> I[Integração contínua] --> T`,
    },
    {
      title: "Família Crystal",
      description: "Cores por tamanho do time e rigor do processo.",
      code: `flowchart TB
    Clear["Crystal Clear<br/>1 a 6"] --> Yellow["Crystal Yellow<br/>7 a 20"]
    Yellow --> Orange["Crystal Orange<br/>21 a 50"]
    Orange --> Red["Crystal Red<br/>50 a 80"]
    Red --> Maroon["Maroon / Blue / Sapphire<br/>80 ou mais"]`,
    },
  ],

  quiz: {
    mcq: [
      {
        q: "Na priorização MoSCoW do DSDM, a letra \"W\" representa:",
        options: ["Will have", "Won't have", "Work in progress", "Weak priority"],
        answer: 1,
        explain:
          "**Won't have**: itens **fora do escopo** desta entrega (podem retornar depois). Must = obrigatório, Should = importante, Could = desejável.",
      },
      {
        q: "O Kanban tem origem no Sistema Toyota de Produção e um de seus pilares é:",
        options: [
          "limite de WIP e fluxo puxado (pull).",
          "programação em par obrigatória.",
          "cliente on-site em tempo integral.",
          "priorização exclusiva por MoSCoW.",
        ],
        answer: 0,
        explain:
          "O Kanban usa **quadro visual**, **limite de WIP** e **sistema puxado**, eliminando gargalos.",
      },
      {
        q: "Qual prática do XP consiste em escrever os testes unitários antes do código de produção?",
        options: ["Refatoração", "Integração contínua", "TDD", "Programação em par"],
        answer: 2,
        explain:
          "**TDD (Test-Driven Development)**: primeiro o teste (RED), depois o código (GREEN), depois refatorar.",
      },
      {
        q: "O ciclo triplo do ASD é composto por:",
        options: [
          "Planejar, Executar, Verificar.",
          "Especular, Colaborar, Aprender.",
          "Analisar, Projetar, Codificar.",
          "Iniciar, Monitorar, Encerrar.",
        ],
        answer: 1,
        explain:
          "ASD (Highsmith e Bayer): **Especular → Colaborar → Aprender**, operando no \"limite do caos\".",
      },
      {
        q: "Uma limitação importante do XP é que ele:",
        options: [
          "não usa testes automatizados.",
          "não escala bem para equipes grandes (ideal < 12 pessoas).",
          "não permite refatoração.",
          "exige documentação pesada e rígida.",
        ],
        answer: 1,
        explain:
          "O XP **não escala** bem e exige **cliente on-site**; é ideal para times pequenos (até ~12 pessoas).",
      },
      {
        q: "Sobre o Manifesto Ágil, assinale a alternativa correta:",
        options: [
          "Descarta totalmente processos e documentação.",
          "Valoriza mais indivíduos, software funcionando, colaboração com o cliente e resposta a mudanças.",
          "Prioriza contratos rígidos sobre a colaboração.",
          "Foi criado pelo PMI para substituir o PMBOK.",
        ],
        answer: 1,
        explain:
          "São os **4 valores** do Manifesto (2001): itens da esquerda valem mais, sem descartar os da direita.",
      },
      {
        q: "Sobre as cores da família Crystal, é correto afirmar que:",
        options: [
          "Clear atende times grandes e Orange atende times pequenos.",
          "Quanto mais escura a cor, maior o rigor e a documentação exigidos.",
          "Todas as cores usam o mesmo processo, mudando apenas o nome.",
          "Maroon, Blue e Sapphire são aplicadas a equipes de 1 a 6 pessoas.",
        ],
        answer: 1,
        explain:
          "A cor indica o peso do processo. **Clear** atende 1 a 6 pessoas com baixa documentação; **Orange** atende 21 a 50, com subtimes, especialistas e releases de 3 a 4 meses. Sistemas críticos usam **Maroon/Blue/Sapphire**.",
      },
      {
        q: "O conceito de comunicação osmótica no Crystal Clear significa que a equipe:",
        options: [
          "troca informações por documentos formais e atas de reunião.",
          "absorve informação naturalmente por estar na mesma sala ou canal aberto.",
          "depende de um gerente para repassar cada informação.",
          "usa apenas ferramentas assíncronas de gestão.",
        ],
        answer: 1,
        explain:
          "A **comunicação osmótica** é a absorção natural de informação pela proximidade dos membros, sem depender de documentos formais. É um pilar do Crystal Clear e explica a dificuldade do modelo no trabalho remoto.",
      },
    ],
    discursive: [
      {
        q: "Explique a priorização MoSCoW e dê um exemplo em um projeto.",
        answer:
          "MoSCoW classifica requisitos em Must have (obrigatórios), Should have (importantes, mas contornáveis), Could have (desejáveis) e Won't have (fora do escopo atual). Ex.: num app de Pet Shop, agendamento de banho é Must have; fidelidade é Should; chat com o veterinário é Could; integração com redes sociais é Won't.",
        topics: [
          "Nomear as quatro categorias.",
          "Explicar cada uma.",
          "Exemplo aplicado.",
        ],
      },
      {
        q: "O que é limite de WIP no Kanban e por que ele melhora o fluxo?",
        answer:
          "WIP (Work In Progress) é a quantidade de itens em andamento numa etapa. Limitar o WIP restringe quantos itens ficam abertos ao mesmo tempo, evitando multitarefa e formação de filas/gargalos. Assim a equipe termina antes de começar algo novo, o fluxo se torna puxado (pull) e a entrega se torna mais previsível.",
        topics: [
          "Definição de WIP.",
          "Relação com gargalos/multitarefa.",
          "Fluxo puxado e previsibilidade.",
        ],
      },
      {
        q: "Descreva as principais práticas do XP e seus pontos fortes.",
        answer:
          "Práticas centrais: TDD (testes antes do código), programação em par, refatoração constante e integração contínua, além de ciclos curtos de 1-2 semanas. Pontos fortes: alta qualidade de código, redução drástica de bugs em produção e rápida disseminação de conhecimento entre a equipe.",
        topics: [
          "TDD, par, refatoração, integração contínua.",
          "Ciclos curtos de feedback.",
          "Qualidade e redução de bugs.",
        ],
      },
      {
        q: "Explique o modelo de ASD e seu ciclo triplo, relacionando com a ideia de \"limite do caos\".",
        answer:
          "ASD assume que o software é um Sistema Adaptativo Complexo, operando no \"limite do caos\", entre a ordem rígida e o caos total, onde a mudança é constante. Seu ciclo triplo: Especular (definir missões/hipóteses em timeboxes, reconhecendo a incerteza), Colaborar (decisão conjunta, pessoas no centro) e Aprender (revisões críticas e ajuste contínuo).",
        topics: [
          "Base em CAS e limite do caos.",
          "Especular, Colaborar, Aprender.",
          "Aprendizado e adaptação contínua.",
        ],
      },
      {
        q: "Compare Kanban e XP quanto a foco e adequação de uso.",
        answer:
          "Kanban foca no **fluxo contínuo**, na **visualização** do trabalho e no **limite de WIP**, sendo útil para melhorar processos existentes e reduzir gargalos. XP foca na **excelência técnica** (TDD, par, refatoração, integração contínua), sendo adequado a equipes pequenas com cliente engajado e necessidade de alta qualidade. Kanban é mais sobre gestão de fluxo; XP, sobre práticas de engenharia.",
        topics: [
          "Kanban: fluxo, WIP, visual.",
          "XP: práticas técnicas, qualidade.",
          "Contextos de uso diferentes.",
        ],
      },
      {
        q: "Liste os 5 princípios Lean e explique dois desperdícios a eliminar.",
        answer:
          "Princípios: Valor, Mapeamento do fluxo de valor, Fluxo contínuo, Produção puxada e Melhoria contínua (Kaizen). Dois desperdícios: **Espera**: tempo parado por dependências ou gargalos, que atrasa a entrega sem agregar valor. **Defeitos**: erros que geram retrabalho e consomem esforço sem valor percebido. Ambos devem ser identificados e eliminados para aumentar o fluxo.",
        topics: [
          "Cinco princípios enumerados.",
          "Dois desperdícios explicados.",
          "Relação com valor e fluxo.",
        ],
      },
      {
        q: "Diferencie Crystal Clear de Crystal Orange e explique o conceito de comunicação osmótica.",
        answer:
          "Crystal Clear é a abordagem mais leve, indicada para times de 1 a 6 pessoas, com baixa documentação, comunicação osmótica e entregas frequentes. Crystal Orange atende times de 21 a 50 pessoas, divididos em subtimes por funcionalidade, com papéis especialistas (arquiteto, designer, testador) e releases de 3 a 4 meses. A comunicação osmótica é a absorção natural de informação pela proximidade dos membros, na mesma sala ou em um canal aberto. Ela funciona bem em times pequenos e presenciais e enfraquece no trabalho remoto sem uma cultura digital forte.",
        topics: [
          "Tamanho e características de Clear e de Orange.",
          "Definição de comunicação osmótica.",
          "Relação entre proximidade e tamanho do time.",
        ],
      },
    ],
  },
};
