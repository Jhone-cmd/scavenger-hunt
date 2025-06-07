# App
    - Scavenger-Hunt Api

# Description
    - A API Scavenger Hunt tem como objetivo principal simplificar a criação, o gerenciamento e a participação em gincanas temáticas de festa junina. Ela oferece uma solução digital para escolas que desejam modernizar suas atividades, tornando-as mais interativas e eficientes.

## RF (Regras Funcionais da aplicação)
 - [x] A aplicação deve registrar um conta;
 - [x] Deve ser possível realizar login com email e senha;
 - [x] Deve ser possível realizar o CRUD das contas;
 - [x] Deve ser possível realizar o CRUD das instituições;
 - [x] Deve ser possível realizar o CRUD dos turmas;
 - [x] Deve ser possível realizar o CRUD dos pontos;
 - [x] Deve ser possível realizar o CRUD dos items;
 - [x] Deve ser possível inserir pontos para uma turma;
 - [x] Deve ser possível exibir uma classificação referentes ao total de pontos das turmas;

## RN (Regras de Negócios)
 - [x] Somente uma conta autenticada pode realizar operações de CRUD nas contas;
 - [x] Somente uma conta autenticada pode realizar operações de CRUD nas instituições;
 - [x] Somente uma conta autenticada pode realizar operações de CRUD nas turmas;
 - [x] Somente uma conta autenticada pode realizar operações de CRUD nos pontos;
 - [x] Somente uma conta autenticada pode realizar a visualização dos pontos inseridos;
 - [x] Somente uma conta autenticada pode realizar operações de CRUD nas items;

## RNF (Requisitos Não Funcionais)
 - [x] A senha da conta precisa estar criptografada; 
 - [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
 - [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
 - [x] A conta deve ser autenticada por um JWT (Json Web Token);

## Tecnologias Utilizadas
 - Fastify: Framework web robusto e de alto desempenho para Node.js, escolhido pela sua velocidade e eficiência.
 - Nodejs: Ambiente de execução JavaScript no lado do servidor.
 - Zod: Uma biblioteca de declaração e validação de esquemas "TypeScript-first", usada para garantir a validação estrita de todos os dados de requisição de entrada e respostas de saída, aumentando a confiabilidade da API e a integridade dos dados.
 - Vitest: Um framework de teste rápido e moderno para JavaScript/TypeScript, usado para testes unitários.
 - Supertest: Uma biblioteca baseada em "super-agent" para testar servidores HTTP Node.js, usada para testes de integração para garantir que os endpoints da API funcionem corretamente.
 - PostgreSQL: Banco de dados NoSQL para armazenamento de dados.
 - JWT (JSON Web Tokens): Para autenticação segura de usuários.

## Instalação das Dependências
 - yarn install

## Execução dos testes
 - Unitários: yarn test
 - Integração: yarn test:e2e

## Execução para construção da build e execução do App
 - Modo development: yarn dev
 - Build: yarn build
 - Executar o App: yarn start
    