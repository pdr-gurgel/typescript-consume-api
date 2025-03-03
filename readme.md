# 🐸 | Pokémon API

Este é um projeto de uma API para gerenciar dados de Pokémons. A API permite adicionar, listar e deletar Pokémons, utilizando dados da [PokeAPI](https://pokeapi.co/) para preencher as informações de cada Pokémon. O projeto foi desenvolvido usando Node.js, Fastify, MySQL e testes com Jest.

## Usando o Projeto

- **Subindo o Servidor**: npx ts-node src/server.ts
- **Ativando os testes unitários**: npm test

## Funcionalidades

- **Adicionar um Pokémon**: Permite adicionar um Pokémon ao banco de dados, buscando informações na [PokeAPI](https://pokeapi.co/).
- **Listar Pokémons**: Exibe todos os Pokémons cadastrados ou filtra por tipo.
- **Deletar um Pokémon**: Remove um Pokémon do banco de dados.

## Estrutura do Projeto

- **controllers**: Contém a lógica de controle para manipulação de dados de Pokémons.
  - `pokemonControllers.ts`: Define os controladores para adicionar, listar e deletar Pokémons.
  
- **models**: Contém a lógica de interação com o banco de dados MySQL.
  - `pokemonModels.ts`: Define os métodos para salvar, listar e deletar Pokémons no banco de dados.
  
- **routes**: Define as rotas da API.
  - `pokemonRoutes.ts`: Define as rotas relacionadas ao gerenciamento de Pokémons.
  
- **database**: Contém a configuração do banco de dados.
  - `database.ts`: Conexão com o banco de dados MySQL.

- **tests**: Contém os testes unitários.
  - `pokemonControllers.test.ts`: Testa a lógica dos controladores de Pokémon.
  - `pokemonModels.test.ts`: Testa a lógica dos modelos de Pokémon.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web rápido e eficiente para Node.js.
- **MySQL**: Banco de dados relacional para armazenar informações dos Pokémons.
- **Jest**: Framework para testes unitários.

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL com o nome configurado na variável de ambiente `DB_DATABASE`.
2. Crie a tabela `pokemons` com a seguinte estrutura:

```sql
CREATE TABLE pokemons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pokedexNumber INT NOT NULL,
    abilities TEXT NOT NULL,
    types TEXT NOT NULL
);
