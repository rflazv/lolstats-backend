# lolStats-backend

## Descrição do Projeto
O projeto **lolStats-backend** é uma API desenvolvida para fornecer estatísticas e informações relacionadas ao jogo League of Legends (LoL). Ele serve como backend para um sistema que coleta, processa e disponibiliza dados úteis para jogadores e entusiastas do jogo.

## Funcionalidades Implementadas
- **Autenticação de Usuários**: Sistema de login e registro com autenticação segura.
- **Consulta de Estatísticas**: Endpoints para buscar estatísticas de jogadores, partidas e campeões.
- **Integração com API da Riot Games**: Comunicação com a API oficial da Riot para obter dados atualizados.
- **Gerenciamento de Usuários**: CRUD para perfis de usuários.
- **Histórico de Partidas**: Armazenamento e consulta de partidas jogadas.
- **Filtragem e Ordenação**: Suporte para filtros e ordenação de dados retornados.

## Tecnologias Utilizadas
- **Linguagem**: [Node.js]
- **Framework**: [Express]
- **Banco de Dados**: [MongoDB]
- **Integrações**: API da Riot Games & Liquipedia*
- **Outras Ferramentas**: [Docker*]

## Como Executar o Projeto
1. Clone o repositório:
    ```bash
    git clone https://github.com/rflazv/lolstats-backend.git
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor:
    ```bash
    npm run dev
    ```

## Estrutura de Pastas
- `/src`: Código-fonte principal
  - `/modules`: Módulos do sistema
    - `/champions`: Funcionalidades relacionadas aos campeões
    - `/user`: Funcionalidades relacionadas aos usuários
  - `/infrastructure`: Infraestrutura geral do sistema
    - `/http`: Rotas e middlewares da aplicação
    - `/database`: Configuração do banco de dados e modelos
  - `/config`: Configurações e variáveis de ambiente do sistema
  - `/core`: Tipos, classes base e lógica central do domínio
  - `/adapter`: Adaptações de bibliotecas externas para uso interno
  - `/shared`: Utilitários e funções compartilhadas