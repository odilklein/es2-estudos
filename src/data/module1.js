export const module1 = {
  id: "modulo-1",
  short: "M1",
  title: "Modelagem de Requisitos e UML",
  subtitle: "Casos de Uso, Classes, Sequência e demais diagramas",
  emoji: "🧩",
  icon: "mdi:shape-outline",
  summary:
    "Por que projetar software, o que é a UML e como representar requisitos (visão externa) e estrutura (visão estática e dinâmica).",
  theory: [
    {
      type: "callout",
      variant: "exam",
      title: "O que mais cai",
      items: [
        "Por que sistemas complexos exigem projeto (diferente de uma obra simples).",
        "Diferença entre **«include»** (obrigatório) e **«extend»** (opcional/condicional).",
        "Diferença entre **agregação** (fraca) e **composição** (forte).",
        "Multiplicidades (`1`, `0..1`, `1..*`, `0..*`, `m..n`).",
        "Análise gramatical: substantivo → classe/atributo; verbo → método; adjetivo/tipo → tipo de dado.",
        "Os três diagramas fundamentais: **Casos de Uso, Classes e Sequência**.",
      ],
    },

    { type: "h2", text: "1. Por que projetar software?" },
    {
      type: "p",
      text: "Nem todo projeto precisa de planta detalhada. Uma **obra simples** (um muro, uma reforma pequena) pode ser executada por conhecimento empírico direto. Já um **software** envolve fatores dinâmicos e interdependentes que tornam o projeto estruturado indispensável.",
    },
    {
      type: "table",
      headers: ["Projetos simples", "Projetos complexos (software)"],
      rows: [
        ["Executável por conhecimento empírico direto.", "Exige etapas formais de **elicitação e análise de requisitos**."],
        ["Escopo e regras estáveis e previsíveis.", "Exige gestão rigorosa de **prazos, custos e documentação**."],
        ["Baixa dependência de reuso e adaptações.", "Demanda alta **manutenção e reusabilidade** de código."],
      ],
    },
    { type: "p", text: "Além da complexidade intrínseca, o software sofre **pressões externas** que exigem mudança contínua:" },
    {
      type: "ul",
      items: [
        "**Clientes:** pedem modificações, novas funcionalidades e melhor usabilidade.",
        "**Mercado:** impõe novas estratégias de negócio e diferenciais competitivos rápidos.",
        "**Governo:** altera leis, regulamentações, impostos e alíquotas que impactam as regras de negócio.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "É justamente essa complexidade + mudança constante que exige uma **linguagem padronizada** para modelar, documentar e visualizar o software antes e durante a construção.",
    },

    { type: "h2", text: "2. O que é a UML?" },
    {
      type: "p",
      text: "A **UML (Unified Modeling Language / Linguagem de Modelagem Unificada)** é uma linguagem **visual de propósito geral** de **modelagem**, aplicável a todos os domínios. Ela descreve o sistema, e não substitui uma linguagem de programação.",
    },
    {
      type: "p",
      text: "Seu objetivo é ajudar o engenheiro a definir com precisão: **requisitos, comportamento, estrutura lógica, dinâmica dos processos** e até **necessidades físicas de hardware** (implantação).",
    },
    { type: "h3", text: "Os três diagramas fundamentais" },
    {
      type: "keyvals",
      items: [
        { k: "Casos de Uso", v: "Elicitação/análise → funcionalidades sob a ótica do usuário (visão **externa**)." },
        { k: "Classes", v: "Estrutura lógica **estática** → classes, atributos, métodos e conexões." },
        { k: "Sequência", v: "Visão **dinâmica** → troca de mensagens entre objetos ao longo do tempo." },
      ],
    },

    { type: "h2", text: "3. Diagrama de Casos de Uso" },
    {
      type: "p",
      text: "Dá uma **visão externa geral** das funcionalidades que o sistema deve oferecer, **sem detalhes de implementação**. Usado nas fases de **elicitação e análise de requisitos**, serve de guia para os demais diagramas.",
    },
    { type: "h3", text: "O que é um ator" },
    {
      type: "p",
      text: "**Atores** são papéis desempenhados por entidades externas que interagem com o sistema (pessoas, outros softwares ou hardwares especiais). Para descobri-los, pergunte:",
    },
    {
      type: "ul",
      items: [
        "Que **tipos de usuários** poderão utilizar o sistema?",
        "Quais usuários estão interessados em quais **funcionalidades/serviços**?",
        "Quem **fornece** informações ao sistema?",
        "Quem **utiliza** as informações do sistema?",
        "Quem pode **alterar ou excluir** informações?",
        "Existe **outro software** que interage com o sistema?",
        "Existe algum **hardware especial** (ex.: robô) que interage com o software?",
      ],
    },
    { type: "h3", text: "Inclusão x Extensão" },
    {
      type: "table",
      headers: ["Relacionamento", "Conceito", "Comportamento", "Condição de execução"],
      rows: [
        ["**«include»**", "Obrigatoriedade", "O caso de uso base **obriga** a execução do incluído.", "Executado **sempre** que o UC base for acionado."],
        ["**«extend»**", "Opcionalidade/condicional", "Cenários opcionais que **estendem** o UC base.", "Executado só em situações específicas, no **ponto de extensão**."],
      ],
    },
    {
      type: "mermaid",
      caption: "Casos de Uso: visão geral com include, extend e herança de ator.",
      code: `flowchart TB
    Cliente["Ator: Cliente"]
    VIP["Ator: Cliente VIP"]
    Func["Ator: Funcionário"]

    subgraph Sistema["Fronteira do Sistema"]
      direction TB
      UC1(("Comprar Produto"))
      UC2(("Autenticar"))
      UC3(("Aplicar Cupom"))
      UC4(("Gerenciar Estoque"))
    end

    VIP -. "herda" .-> Cliente
    Cliente --> UC1
    Func --> UC4
    UC1 -. "include" .-> UC2
    UC3 -. "extend" .-> UC1`,
    },
    { type: "h3", text: "Documentação textual do caso de uso" },
    {
      type: "p",
      text: "O diagrama é complementado por **texto em linguagem simples**. Não há formato único exigido pela UML, mas ele costuma conter:",
    },
    { type: "ol", items: [
      "**Função geral** do caso de uso.",
      "**Atores** envolvidos.",
      "**Passo a passo** das etapas executadas pelo ator e pelo sistema.",
      "**Parâmetros** de entrada.",
      "**Restrições e validações** do processo.",
    ]},
    {
      type: "callout",
      variant: "tip",
      text: "A documentação pode ser complementada por **diagramas de sequência, atividades ou máquinas de estados** para detalhar o comportamento dinâmico.",
    },

    { type: "h2", text: "4. Diagrama de Classes" },
    {
      type: "p",
      text: "Um dos mais importantes da UML. Apresenta a **visão estática** e organiza a **estrutura lógica** por classes, atributos, métodos e relacionamentos. Uma **classe** é a representação conceitual de um item do mundo real; cada instância concreta é um **objeto**.",
    },
    { type: "h3", text: "Anatomia da classe (3 partes)" },
    {
      type: "ul",
      items: [
        "**Nome:** vocabulário do domínio. Convenção: **substantivo no singular**, primeira letra maiúscula (ex.: `Pessoa`, `ContaComum`).",
        "**Atributos:** características/estado mantidos pelos objetos (ex.: `+ nome: String`).",
        "**Métodos:** operações/comportamentos oferecidos (ex.: `- getNome() : String`).",
      ],
    },
    { type: "h3", text: "Visibilidade" },
    {
      type: "table",
      headers: ["Símbolo", "Nome", "Escopo de acesso"],
      rows: [
        ["`+`", "**Público**", "Visível e acessível por **qualquer** classe de qualquer pacote."],
        ["`#`", "**Protegido**", "Visível por classes do **mesmo pacote** (e subclasses)."],
        ["`-`", "**Privado**", "Visível **estritamente dentro da própria classe**."],
      ],
    },
    { type: "h3", text: "Da gramática para o diagrama" },
    {
      type: "keyvals",
      items: [
        { k: "Substantivos", v: "→ **Classes** ou **Atributos**." },
        { k: "Verbos e ações", v: "→ **Métodos** ou **Associações**." },
        { k: "Adjetivos e tipos", v: "→ **Tipos de dados** (ex.: String, Inteiro, Booleano)." },
        { k: "Restrições / RNF", v: "→ Regras e limites de propriedades, métodos e associações." },
      ],
    },
    { type: "h3", text: "Exemplo de extração: Sistema de Biblioteca" },
    {
      type: "p",
      text: "Requisito: *\"O sistema gerencia **Livros** e **Usuários**. Para cada Livro, armazena-se **título, autor, ISBN e disponibilidade**. O **Usuário** pode **realizar empréstimos** e **solicitar devoluções**. O **Bibliotecário herda de Funcionário** e **cadastra livros**.\"*",
    },
    {
      type: "table",
      headers: ["Elemento", "O que foi extraído"],
      rows: [
        ["**Classes**", "Livro, Usuario, Bibliotecario (herda de Funcionario)."],
        ["**Atributos**", "Livro: `titulo: String`, `autor: String`, `isbn: String`, `estaDisponivel: Booleano` · Usuario: `nome`, `numCarteirinha: Inteiro`."],
        ["**Métodos**", "Livro: `marcarComoEmprestado()`, `marcarComoDevolvido()` · Usuario: `realizarEmprestimo()`, `solicitarDevolucao()` · Bibliotecario: `cadastrarLivro()`."],
      ],
    },
    {
      type: "mermaid",
      caption: "Diagrama de classes do Sistema de Biblioteca.",
      code: `classDiagram
    class Funcionario {
      +String nome
      +String cpf
    }
    class Bibliotecario {
      +cadastrarLivro()
    }
    class Usuario {
      +String nome
      +int numCarteirinha
      +realizarEmprestimo()
      +solicitarDevolucao()
    }
    class Livro {
      +String titulo
      +String autor
      +String isbn
      +boolean estaDisponivel
      +marcarComoEmprestado()
      +marcarComoDevolvido()
    }
    class Endereco {
      +String rua
      +int numero
    }
    Funcionario <|-- Bibliotecario
    Funcionario "1" o-- "1" Endereco : possui
    Bibliotecario "1" --> "0..*" Livro : cadastra
    Usuario "1" --> "0..*" Livro : empresta`,
    },

    { type: "h2", text: "5. Relacionamentos e multiplicidade" },
    {
      type: "p",
      text: "Relacionamentos indicam como os objetos trocam informação e compartilham estrutura. Cada um tem descrição, sentido de leitura, **navegabilidade** (seta), papéis e **multiplicidade**.",
    },
    { type: "h3", text: "Multiplicidade" },
    {
      type: "table",
      headers: ["Notação", "Significado"],
      rows: [
        ["`1`", "Exatamente um."],
        ["`0..1`", "Zero ou um."],
        ["`1..*`", "Um ou mais."],
        ["`0..*` ou `*`", "Zero ou muitos."],
        ["`m..n`", "Faixa específica (ex.: `4..7`)."],
      ],
    },
    { type: "h3", text: "Tipos de relacionamento" },
    {
      type: "table",
      headers: ["Relacionamento", "Símbolo", "Natureza"],
      rows: [
        ["**Associação simples**", "linha", "Ligação direta de uso ou posse entre duas classes."],
        ["**Agregação**", "losango vazio `◇`", "Todo-parte **fraco**: a parte sobrevive sem o todo."],
        ["**Composição**", "losango cheio `◆`", "Todo-parte **forte**: a parte morre com o todo."],
        ["**Generalização/Especialização**", "seta vazada `▷`", "Herança: subclasse herda atributos e métodos da superclasse."],
        ["**Dependência**", "seta pontilhada `⇢`", "Cliente usa serviços do fornecedor; mudar o fornecedor afeta o cliente."],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      title: "Agregação x Composição (decisiva na prova)",
      items: [
        "**Agregação (fraco):** a parte pode existir sem o todo e pode pertencer a vários todos. Ex.: **Endereço** existe no mundo real independentemente de haver um **Funcionário** vinculado. Pode até virar associação simples.",
        "**Composição (forte):** a parte pertence a **um único** todo e compartilha seu tempo de vida. Ex.: o papel de **Titular** só existe se a **ContaComum** existir; sem a conta, a titularidade deixa de existir.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Como decidir",
      text: "Pergunte: *se o todo for destruído, a parte deixa de existir?* **Não** → agregação. **Sim** → composição.",
    },
    {
      type: "mermaid",
      caption: "Locação de veículos: associações, agregação e composição.",
      code: `classDiagram
    class Cliente {
      +String nome
      +String cpf
      +solicitarLocacao()
    }
    class Funcionario {
      +String matricula
      +gerenciarVeiculos()
    }
    class Locacao {
      +Date dataRetirada
      +Date dataDevolucao
      +float valorCaucao
      +calcularDiarias()
      +registrarDevolucao()
    }
    class Veiculo {
      +String placa
      +String modelo
      +float kmAtual
      +disponivel() bool
    }
    class Manutencao {
      +Date data
      +String descricao
    }
    Cliente "1" --> "0..*" Locacao : realiza
    Funcionario "1" --> "0..*" Locacao : atende
    Locacao "1" --> "1" Veiculo : refere
    Veiculo "1" *-- "0..*" Manutencao : possui
    Funcionario "1" o-- "0..*" Veiculo : gerencia`,
    },

    { type: "h2", text: "6. Diagrama de Sequência (visão dinâmica)" },
    {
      type: "p",
      text: "Complementa o diagrama de classes mostrando **como os objetos interagem ao longo do tempo** por troca de **mensagens**. É um diagrama **comportamental/dinâmico**, muito usado para detalhar um caso de uso.",
    },
    {
      type: "ul",
      items: [
        "**Linha de vida:** participante (objeto/ator) com uma barra de ativação.",
        "**Mensagem síncrona:** seta cheia (espera resposta).",
        "**Mensagem de retorno:** seta tracejada.",
        "**Ordem temporal:** de cima para baixo.",
      ],
    },
    {
      type: "mermaid",
      caption: "Sequência: realizar empréstimo de livro.",
      code: `sequenceDiagram
    actor U as Usuário
    participant UI as Tela de Empréstimo
    participant S as ServicoEmprestimo
    participant L as Livro
    U->>UI: solicitarEmprestimo(isbn)
    UI->>S: realizarEmprestimo(isbn, usuario)
    S->>L: estaDisponivel()
    L-->>S: true
    S->>L: marcarComoEmprestado()
    L-->>S: ok
    S-->>UI: confirmação
    UI-->>U: empréstimo registrado`,
    },

    { type: "h2", text: "7. Outros diagramas UML" },
    {
      type: "ul",
      items: [
        "**Máquina de Estados:** comportamento de um elemento por **transições entre estados finitos** (evento → transição → novo estado).",
        "**Atividades:** fluxo de passos, semelhante a fluxograma/algoritmo; modela **paralelismo**.",
        "**Pacotes:** divisão lógica em camadas (Visão, Controle, Domínio e Persistência).",
        "**Componentes:** estrutura física/lógica dos módulos, bibliotecas e executáveis.",
        "**Implantação:** mapeamento físico de hardware, servidores e nós.",
      ],
    },
    {
      type: "mermaid",
      caption: "Máquina de Estados de um Pedido.",
      code: `stateDiagram-v2
    [*] --> Criado
    Criado --> Pago : efetuarPagamento()
    Criado --> Cancelado : cancelar()
    Pago --> Enviado : despachar()
    Enviado --> Entregue : confirmarEntrega()
    Entregue --> [*]
    Cancelado --> [*]`,
    },
    {
      type: "mermaid",
      caption: "Diagrama de Atividades: pedido online.",
      code: `flowchart TB
    Start([Início]) --> Add[Carrinho]
    Add --> Dec{Cliente confirmou?}
    Dec -- Não --> Add
    Dec -- Sim --> Pay[Processar pagamento]
    Pay --> Check{Pagamento aprovado?}
    Check -- Não --> Cancel[Cancelar pedido]
    Check -- Sim --> Produce[Produzir/Pack]
    Produce --> Ship[Enviar]
    Ship --> End([Fim])
    Cancel --> End`,
    },
    {
      type: "mermaid",
      caption: "Diagrama de Pacotes em camadas.",
      code: `flowchart TB
    V["«pacote» Apresentação (Visão)"] --> C["«pacote» Controle"]
    C --> D["«pacote» Domínio"]
    D --> P["«pacote» Persistência"]`,
    },
    {
      type: "mermaid",
      caption: "Componentes e Implantação (visão física).",
      code: `flowchart TB
    subgraph PC["«nó» Cliente Web"]
      B["«componente» UI"]
    end
    subgraph SRV["«nó» Servidor de Aplicação"]
      A["«componente» API"]
      DB[("«componente» Banco")]
    end
    B -- HTTPS --> A
    A -- SQL --> DB`,
    },

    { type: "h2", text: "8. Quadro comparativo" },
    {
      type: "table",
      headers: ["Dimensão", "Casos de Uso", "Classes", "Sequência"],
      rows: [
        ["**Foco**", "Funcionalidades externas e visão do usuário.", "Estrutura lógica estática (OO).", "Interação dinâmica entre objetos no tempo."],
        ["**Fase**", "Elicitação e análise de requisitos.", "Projeto e modelagem estática.", "Detalhamento do comportamento."],
        ["**Chave**", "Atores, UC, «include», «extend».", "Classes, atributos, métodos, relacionamentos.", "Linhas de vida e mensagens."],
      ],
    },
  ],

  cheat: [
    {
      title: "Por que projetar?",
      items: [
        "Obra simples = empírico; software = complexo e interdependente.",
        "Complexidade: requisitos, prazos, custos, documentação, manutenção e reuso.",
        "Pressões: **clientes, mercado e governo**.",
      ],
    },
    {
      title: "UML",
      items: [
        "Linguagem visual de modelagem; não é linguagem de programação.",
        "Define requisitos, comportamento, estrutura, processos e implantação.",
        "3 fundamentais: **Casos de Uso, Classes e Sequência**.",
      ],
    },
    {
      title: "Casos de Uso",
      items: [
        "Visão **externa**; elicitação/análise.",
        "Perguntas-chave identificam atores (quem usa, fornece, altera, outros softwares/hardwares).",
        "**«include»**: sempre executa (base → incluído).",
        "**«extend»**: às vezes executa (extensão → base).",
        "Documentar: função, atores, passos, parâmetros, restrições.",
      ],
    },
    {
      title: "Classes",
      items: [
        "Visão **estática**; nome / atributos / métodos.",
        "`+` público · `#` protegido · `-` privado.",
        "Substantivo → classe/atributo; verbo → método/associação; adjetivo → tipo.",
        "Multiplicidade: `1`, `0..1`, `1..*`, `0..*`, `m..n`.",
        "**Agregação** ◇ fraco (parte sobrevive). **Composição** ◆ forte (parte morre).",
        "Herança = \"é um\"; Dependência = uso via método.",
      ],
    },
    {
      title: "Sequência & demais",
      items: [
        "Sequência: mensagens entre objetos ao longo do tempo (dinâmico).",
        "Estados, Atividades, Pacotes, Componentes, Implantação.",
      ],
    },
  ],

  diagrams: [
    {
      title: "Casos de Uso",
      description: "include, extend e herança de ator.",
      code: `flowchart TB
    Cliente["Cliente"]
    VIP["Cliente VIP"]
    subgraph S["Sistema (fronteira)"]
      UC1(("Comprar Produto"))
      UC2(("Autenticar"))
      UC3(("Aplicar Cupom"))
    end
    VIP -.->|herda| Cliente
    Cliente --> UC1
    UC1 -.->|include| UC2
    UC3 -.->|extend| UC1`,
    },
    {
      title: "Classes: Biblioteca",
      description: "Herança, associação e agregação.",
      code: `classDiagram
    class Funcionario { +String nome +String cpf }
    class Bibliotecario { +cadastrarLivro() }
    class Endereco { +String rua +int numero }
    class Livro { +String titulo +boolean estaDisponivel +marcarComoEmprestado() }
    Funcionario <|-- Bibliotecario
    Funcionario "1" o-- "1" Endereco : possui
    Bibliotecario "1" --> "0..*" Livro : cadastra`,
    },
    {
      title: "Sequência: Empréstimo",
      description: "Interação dinâmica entre objetos.",
      code: `sequenceDiagram
    actor U as Usuário
    participant UI as Tela
    participant S as Serviço
    participant L as Livro
    U->>UI: solicitarEmprestimo(isbn)
    UI->>S: realizarEmprestimo()
    S->>L: estaDisponivel()
    L-->>S: true
    S-->>UI: confirmação
    UI-->>U: registrado`,
    },
    {
      title: "Máquina de Estados: Pagamento",
      description: "Ciclo de vida de uma transação.",
      code: `stateDiagram-v2
    [*] --> Pendente
    Pendente --> Autorizado : aprovar()
    Pendente --> Recusado : recusar()
    Autorizado --> Estornado : estornar()
    Autorizado --> [*]
    Recusado --> [*]
    Estornado --> [*]`,
    },
  ],

  quiz: {
    mcq: [
      {
        q: "Sobre o relacionamento «include» no diagrama de casos de uso, é correto afirmar que:",
        options: [
          "representa um comportamento opcional que só ocorre sob certas condições.",
          "indica execução obrigatória: o caso de uso base sempre depende do incluído.",
          "é usado apenas entre atores, nunca entre casos de uso.",
          "substitui a herança de atores.",
        ],
        answer: 1,
        explain:
          "`«include»` é **obrigatório**. Sempre que o caso de uso base for executado, o incluído também será. O comportamento opcional/condicional é papel do `«extend»`.",
      },
      {
        q: "Em um diagrama de classes, a relação em que a parte não existe sem o todo é chamada de:",
        options: ["Associação simples", "Agregação", "Composição", "Dependência"],
        answer: 2,
        explain:
          "A **composição** é a relação todo-parte **forte** (losango cheio). Destruído o todo, a parte também é destruída. A agregação é a versão fraca.",
      },
      {
        q: "Qual visibilidade em UML restringe o acesso exclusivamente à própria classe?",
        options: ["`+` público", "`#` protegido", "`-` privado", "`~` pacote"],
        answer: 2,
        explain:
          "`-` indica **privado**, acessível somente pela própria classe. `#` é protegido (pacote/subclasses) e `+` é público.",
      },
      {
        q: "Qual diagrama fornece a visão dinâmica, detalhando a troca de mensagens entre objetos ao longo do tempo?",
        options: [
          "Diagrama de Classes",
          "Diagrama de Sequência",
          "Diagrama de Pacotes",
          "Diagrama de Implantação",
        ],
        answer: 1,
        explain:
          "O **Diagrama de Sequência** é comportamental/dinâmico e mostra mensagens e interações no tempo.",
      },
      {
        q: "Na análise gramatical dos requisitos, os verbos e ações tipicamente tornam-se:",
        options: ["Classes", "Atributos", "Métodos ou associações", "Multiplicidades"],
        answer: 2,
        explain:
          "**Substantivos** → classes/atributos; **verbos** → métodos/associações; **adjetivos/tipos** → tipos de dados.",
      },
      {
        q: "A UML é melhor descrita como:",
        options: [
          "uma linguagem de programação orientada a objetos.",
          "uma linguagem visual de modelagem de propósito geral.",
          "um processo/metodologia de desenvolvimento.",
          "um padrão exclusivo de banco de dados.",
        ],
        answer: 1,
        explain:
          "A UML é uma linguagem de modelagem visual de propósito geral, e não uma linguagem de programação nem uma metodologia.",
      },
      {
        q: "Assinale o exemplo típico de relação de COMPOSIÇÃO:",
        options: [
          "Funcionário e Endereço.",
          "Titular e ContaComum (a titularidade não existe sem a conta).",
          "Cliente e Produto em um catálogo.",
          "Biblioteca e Livro em um sistema de empréstimo.",
        ],
        answer: 1,
        explain:
          "Na composição o tempo de vida é compartilhado: sem a **ContaComum**, o papel de **Titular** deixa de existir. Funcionário e Endereço é o exemplo de agregação fraca.",
      },
    ],
    discursive: [
      {
        q: "Explique por que projetos de software exigem etapas formais de projeto, diferentemente de obras simples.",
        answer:
          "Obras simples podem ser executadas por conhecimento empírico, com escopo e regras estáveis. Software é complexo e interdependente: exige elicitação e análise de requisitos, gestão de prazos, custos e documentação, além de alta manutenção e reusabilidade, sofrendo ainda pressões de clientes, mercado e governo que mudam as regras continuamente.",
        topics: [
          "Comparação simples x complexo.",
          "Requisitos, prazos, custos, documentação, manutenção, reuso.",
          "Pressões externas (clientes, mercado, governo).",
        ],
      },
      {
        q: "Diferencie «include» de «extend», com exemplos.",
        answer:
          "`«include»` é obrigatório: o caso de uso base sempre executa o incluído (ex.: Finalizar Compra inclui Autenticar). `«extend»` é opcional/condicional: só ocorre em situações específicas, no ponto de extensão (ex.: Finalizar Compra pode ser estendido por Aplicar Cupom).",
        topics: [
          "Include = obrigatório; Extend = opcional/condicional.",
          "Direção das setas.",
          "Exemplos coerentes.",
        ],
      },
      {
        q: "Diferencie agregação de composição, usando os exemplos da disciplina.",
        answer:
          "Ambas são todo-parte. Na agregação (losango vazio) a parte existe independentemente do todo e pode pertencer a vários todos. Ex.: Endereço existe sem o Funcionário, e pode até ser modelada como associação simples. Na composição (losango cheio) a parte pertence a um único todo e compartilha seu tempo de vida. Ex.: o Titular só existe se a ContaComum existir.",
        topics: [
          "Agregação fraca; Composição forte.",
          "Tempo de vida / exclusividade.",
          "Exemplos: Endereço e Funcionário; Titular e Conta.",
        ],
      },
      {
        q: "Aplique a análise gramatical ao requisito do Sistema de Biblioteca e mostre classes, atributos e métodos.",
        answer:
          "Requisito: gerencia Livros e Usuários; Livro tem título, autor, ISBN e disponibilidade; Usuário realiza empréstimos e solicita devoluções; Bibliotecário herda de Funcionário e cadastra livros. Classes: Livro, Usuario, Bibliotecario (herda de Funcionario). Atributos: titulo/autor/isbn/estaDisponivel (Livro); nome/numCarteirinha (Usuario). Métodos: marcarComoEmprestado(), marcarComoDevolvido() (Livro); realizarEmprestimo(), solicitarDevolucao() (Usuario); cadastrarLivro() (Bibliotecario).",
        topics: [
          "Substantivos → classes/atributos.",
          "Verbos → métodos.",
          "Herança Bibliotecario-Funcionario.",
        ],
      },
      {
        q: "Descreva os elementos da documentação textual de um caso de uso.",
        answer:
          "Função geral, atores envolvidos, passo a passo das etapas (ator e sistema), parâmetros de entrada, restrições e validações. Não há formato único na UML, e pode ser complementada por diagramas de sequência, atividades ou máquinas de estados.",
        topics: [
          "Função e atores.",
          "Passos do fluxo.",
          "Parâmetros, restrições e validações.",
        ],
      },
      {
        q: "Explique o que é o Diagrama de Sequência e qual sua relação com os demais diagramas.",
        answer:
          "É um diagrama comportamental/dinâmico que mostra a troca de mensagens entre objetos ao longo do tempo, com linhas de vida e barras de ativação. Ele detalha um caso de uso específico e complementa o diagrama de classes, evidenciando como os objetos colaboram para realizar um comportamento.",
        topics: [
          "Visão dinâmica; mensagens no tempo.",
          "Linhas de vida e ativação.",
          "Relação com casos de uso e classes.",
        ],
      },
    ],
  },
};
