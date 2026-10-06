export const categories = {
  estrutural: { label: "UML Estrutural", color: "bg-brand-100 text-brand-700" },
  comportamental: { label: "UML Comportamental", color: "bg-emerald-100 text-emerald-700" },
  bpmn: { label: "BPMN / Processos", color: "bg-amber-100 text-amber-700" },
};

export const diagramGuide = [
  {
    id: "casos-de-uso",
    title: "Casos de Uso",
    category: "comportamental",
    objective:
      "Mostra quais funcionalidades o sistema entrega e quem interage com cada uma. A leitura é externa: não entra em classes, telas ou banco de dados.",
    when:
      "No começo do projeto, durante a elicitação e a análise de requisitos, para alinhar o escopo com o cliente e os usuários.",
    scenario:
      "Na padaria Pão Amanhecido, a equipe lista os atores Cliente, Funcionário e Gerente e os objetivos Fazer Pedido, Validar Pagamento e Gerenciar Estoque. Fazer Pedido sempre passa por Validar Pagamento (include); cupom de desconto só aparece às vezes (extend).",
    elements: [
      "Ator: papel externo que interage com o sistema (pessoa, outro software ou hardware).",
      "Caso de uso: objetivo completo do ponto de vista do ator (a elipse).",
      "Fronteira: retângulo que separa o que está dentro do sistema.",
      "«include»: execução obrigatória do caso incluído.",
      "«extend»: execução opcional, disparada em um ponto de extensão.",
    ],
    code: `flowchart TB
    Cliente(("Cliente"))
    Gerente(("Gerente"))
    subgraph S["Sistema de Padaria"]
      UC1(("Fazer Pedido"))
      UC2(("Validar Pagamento"))
      UC3(("Gerenciar Estoque"))
    end
    Cliente --> UC1
    UC1 -.->|«include»| UC2
    Gerente --> UC3`,
  },
  {
    id: "classes",
    title: "Classes",
    category: "estrutural",
    objective:
      "Desenha a estrutura estática do sistema: as classes, o que cada uma guarda (atributos), o que faz (métodos) e como se relacionam.",
    when:
      "Na fase de projeto orientado a objetos, antes de escrever o código, para definir o modelo de dados e as responsabilidades de cada classe.",
    scenario:
      "No sistema de locação de veículos, as classes Cliente, Veiculo e Locacao guardam dados como placa, valor da caução e datas. Um cliente tem várias locações e cada locação aponta para um veículo.",
    elements: [
      "Nome da classe: substantivo no singular, com a primeira letra maiúscula.",
      "Atributos: dados mantidos pelos objetos.",
      "Métodos: operações que a classe executa.",
      "Visibilidade: + público, # protegido, - privado.",
      "Relacionamentos: associação, agregação, composição, herança e dependência.",
      "Multiplicidade: 1, 0..1, 1..*, 0..*, m..n.",
    ],
    code: `classDiagram
    class Veiculo {
      +String placa
      +String modelo
      +Boolean disponivel
      +verificarCondicao()
    }
    class Locacao {
      +Date dataInicio
      +Double valorCaucao
      +finalizar()
    }
    class Cliente {
      +String cpf
      +String nome
    }
    Cliente "1" --> "0..*" Locacao
    Locacao "1" --> "1" Veiculo`,
  },
  {
    id: "sequencia",
    title: "Sequência",
    category: "comportamental",
    objective:
      "Mostra a troca de mensagens entre objetos ao longo do tempo, na ordem em que acontecem, para detalhar um caso de uso.",
    when:
      "Quando o diagrama de classes já existe e falta entender a ordem das chamadas de um fluxo específico, como uma validação de pagamento.",
    scenario:
      "Ao confirmar uma locação, a tela chama o controller, o controller consulta o banco e devolve a confirmação. O diagrama deixa claro quem chama quem e em que momento.",
    elements: [
      "Linha de vida: cada participante (ator ou objeto) na parte de cima.",
      "Barra de ativação: período em que o objeto está executando algo.",
      "Seta cheia: mensagem síncrona (quem chama espera resposta).",
      "Seta tracejada: mensagem de retorno.",
      "Autonumber: numeração que marca a ordem das mensagens.",
    ],
    code: `sequenceDiagram
    autonumber
    actor Cliente
    participant UI as TelaLocacao
    participant Controller as LocacaoController
    participant BD as BancoDeDados
    Cliente->>UI: Solicitar Locação
    UI->>Controller: validarDados(veiculoId)
    Controller->>BD: consultarDisponibilidade()
    BD-->>Controller: Disponível
    Controller-->>UI: Confirmação
    UI-->>Cliente: Exibir sucesso`,
  },
  {
    id: "maquina-de-estados",
    title: "Máquina de Estados",
    category: "comportamental",
    objective:
      "Modela o ciclo de vida de um objeto que muda de comportamento conforme o estado em que se encontra.",
    when:
      "Quando um mesmo objeto passa por estados bem definidos e as regras dependem do estado atual, como pedidos, pagamentos ou locações.",
    scenario:
      "O status da locação começa em Solicitada. Quando o veículo é retirado, vira Em Andamento. Depois da devolução, Finalizada. Se o cliente desiste antes da retirada, Cancelada.",
    elements: [
      "Estado inicial: círculo cheio que marca onde o ciclo começa.",
      "Estado: situação em que o objeto permanece até um evento.",
      "Transição: seta com o evento que provoca a mudança.",
      "Estado final: círculo com borda dupla que encerra o ciclo.",
      "Guarda: condição que precisa ser verdadeira para a transição ocorrer.",
    ],
    code: `stateDiagram-v2
    [*] --> Solicitada
    Solicitada --> EmAndamento: Veículo retirado
    EmAndamento --> Finalizada: Veículo devolvido
    Solicitada --> Cancelada: Cliente desistiu
    Finalizada --> [*]
    Cancelada --> [*]`,
  },
  {
    id: "atividades",
    title: "Atividades",
    category: "comportamental",
    objective:
      "Desenha o passo a passo de um algoritmo ou fluxo de trabalho, com decisões e caminhos alternativos, parecido com um fluxograma.",
    when:
      "Para explicar a sequência de passos de uma regra de negócio, com pontos de decisão, antes de detalhar mensagens entre objetos.",
    scenario:
      "No processo de reembolso, o funcionário envia o formulário, o gerente decide se aprova e o resultado segue para pagamento ou para notificação de rejeição.",
    elements: [
      "Nó inicial: círculo que dispara o fluxo.",
      "Ação: retângulo arredondado com um passo do trabalho.",
      "Decisão: losango com uma pergunta e saídas nomeadas (Sim/Não).",
      "Barras de sincronização: marcam início e fim de passos paralelos.",
      "Nó final: círculo que encerra o fluxo.",
    ],
    code: `flowchart TD
    A([Início: Solicitar reembolso]) --> B[Preencher formulário]
    B --> C{Gerente aprovou?}
    C -- Sim --> D[Enviar ao Financeiro]
    C -- Não --> E[Notificar rejeição]
    D --> F([Fim: pagamento efetuado])
    E --> G([Fim: reembolso rejeitado])`,
  },
  {
    id: "pacotes",
    title: "Pacotes",
    category: "estrutural",
    objective:
      "Organiza o sistema em grupos lógicos e camadas, mostrando as dependências entre eles.",
    when:
      "No projeto da arquitetura, para separar responsabilidades e evitar que a interface conheça detalhes do banco de dados.",
    scenario:
      "A aplicação fica dividida em Apresentação (telas), Negócio (controllers e services) e Dados (DAOs e repositories). Cada camada só enxerga a que está logo abaixo.",
    elements: [
      "Pacote: agrupamento lógico de classes ou módulos.",
      "Camadas comuns: Visão, Controle, Domínio e Persistência.",
      "Dependência: seta que indica quem conhece quem.",
      "Direção das setas: aponta da camada que chama para a camada chamada.",
    ],
    code: `flowchart TB
    subgraph Visao["Camada de Apresentação"]
      UI["Componentes UI / Telas"]
    end
    subgraph Dominio["Camada de Negócio"]
      Regras["Controllers / Services"]
    end
    subgraph Persistencia["Camada de Dados"]
      DAO["DAOs / Repositories"]
    end
    Visao --> Dominio
    Dominio --> Persistencia`,
  },
  {
    id: "componentes",
    title: "Componentes",
    category: "estrutural",
    objective:
      "Mostra como o código se organiza em módulos, bibliotecas e serviços reutilizáveis, e como esses pedaços se conectam.",
    when:
      "No desenho da arquitetura de software, quando é preciso enxergar os módulos que serão desenvolvidos e implantados separadamente.",
    scenario:
      "Uma API REST conversa com o serviço de autenticação e com o módulo de locação, e este último fala com o driver do MySQL. Cada peça pode ser trocada sem reescrever as demais.",
    elements: [
      "Componente: peça de software com interface bem definida.",
      "Interface fornecida: serviço que o componente expõe.",
      "Interface requerida: serviço que o componente consome.",
      "Conector: ligação entre componentes.",
    ],
    code: `flowchart TB
    API["API REST"]
    Auth["Serviço de Autenticação"]
    Loc["Módulo de Locação"]
    DB["Driver MySQL"]
    API --> Auth
    API --> Loc
    Loc --> DB`,
  },
  {
    id: "implantacao",
    title: "Implantação",
    category: "estrutural",
    objective:
      "Descreve a infraestrutura física: servidores, nós de rede e onde cada parte do software vai rodar.",
    when:
      "Na fase de implantação e operação, para planejar servidores, portas, protocolos e distribuição dos componentes.",
    scenario:
      "O navegador do usuário acessa o servidor da aplicação por HTTPS, e o servidor acessa o banco de dados por TCP/IP. Cada retângulo representa uma máquina ou ambiente.",
    elements: [
      "Nó: recurso de hardware ou ambiente onde o software roda.",
      "Artefato: arquivo ou componente instalado no nó.",
      "Conexão: ligação física entre nós, com protocolo indicado.",
      "Protocolos comuns: HTTP/HTTPS, TCP/IP.",
    ],
    code: `flowchart TB
    subgraph CN["Nó do Cliente: Navegador Web"]
      AppUI["React App"]
    end
    subgraph SN["Nó do Servidor: AWS EC2"]
      Web["Nginx / Node.js"]
    end
    subgraph DN["Nó de Banco: AWS RDS"]
      DB[("MySQL")]
    end
    AppUI -- HTTPS --> Web
    Web -- TCP/IP --> DB`,
  },
  {
    id: "bpmn",
    title: "BPMN",
    category: "bpmn",
    objective:
      "Modela processos de negócio de ponta a ponta com uma notação que a área de negócio e a área técnica entendem do mesmo jeito.",
    when:
      "Quando o objetivo é descrever um processo organizacional, com responsáveis por etapa e pontos de decisão, e não a estrutura de um software.",
    scenario:
      "No processo de reembolso, o funcionário envia o pedido, o gerente aprova ou rejeita e o financeiro efetua o pagamento. Cada área ocupa uma raia do processo.",
    elements: [
      "Pool: representa o processo ou a organização participante.",
      "Lane (raia): subdivisão do pool por papel ou departamento.",
      "Atividade: trabalho executado, em retângulo arredondado.",
      "Eventos: círculos de início, intermediário e fim.",
      "Gateway exclusivo (X): só um caminho é seguido.",
      "Gateway inclusivo (O): um ou mais caminhos em paralelo.",
    ],
    code: `flowchart TB
    subgraph P["Pool: Processo de Reembolso"]
      direction TB
      subgraph L1["Raia: Funcionário"]
        S((Início))
        Fill["Enviar pedido de reembolso"]
        Notify["Receber notificação"]
        End((Fim))
      end
      subgraph L2["Raia: Gerente"]
        G{"Gerente aprova?"}
      end
      subgraph L3["Raia: Financeiro"]
        Pay["Efetuar pagamento"]
      end
    end
    S --> Fill --> G
    G -- Não --> Notify --> End
    G -- Sim --> Pay --> Notify`,
  },
];

export const diagramQuiz = [
  {
    q: "No início do projeto, a equipe precisa apresentar ao cliente todas as funcionalidades do sistema e quem interage com cada uma, sem entrar em detalhes técnicos. Qual diagrama usar?",
    options: ["Diagrama de Classes", "Diagrama de Casos de Uso", "Diagrama de Implantação", "Diagrama de Pacotes"],
    answer: 1,
    explain:
      "O diagrama de casos de uso dá a visão externa das funcionalidades e dos atores, e é o mais indicado para alinhar escopo com o cliente.",
  },
  {
    q: "Antes de programar, a equipe precisa definir as classes, seus atributos, seus métodos e como se relacionam. Qual diagrama usar?",
    options: ["Diagrama de Atividades", "Diagrama de Sequência", "Diagrama de Classes", "BPMN"],
    answer: 2,
    explain:
      "O diagrama de classes descreve a estrutura estática orientada a objetos, com classes, atributos, métodos e relacionamentos.",
  },
  {
    q: "É preciso mostrar a ordem exata das mensagens entre tela, controller e banco de dados ao confirmar uma locação. Qual diagrama usar?",
    options: ["Diagrama de Máquina de Estados", "Diagrama de Pacotes", "Diagrama de Componentes", "Diagrama de Sequência"],
    answer: 3,
    explain:
      "O diagrama de sequência detalha a troca de mensagens entre objetos ao longo do tempo, na ordem em que acontecem.",
  },
  {
    q: "O status de uma locação passa por Solicitada, Em Andamento, Finalizada ou Cancelada, conforme os eventos. Qual diagrama usar?",
    options: ["Diagrama de Máquina de Estados", "Diagrama de Casos de Uso", "Diagrama de Implantação", "Diagrama de Classes"],
    answer: 0,
    explain:
      "A máquina de estados modela o ciclo de vida de um objeto e as transições entre seus estados.",
  },
];
