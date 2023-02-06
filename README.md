# Boas vindas ao Projeto Store Manager !

Aqui você vai encontrar os detalhes de como foi minha experiência durante o desenvolvimento deste projeto, stacks utilizadas e uma breve documentação sobre como utilizar este projeto em pleno funcionamento.

# Sobre o projeto

Este projeto teve como objetivo contruir uma API de um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Nesse projeto foi utilizada uma arquitetura de software do tipo MSC (model, service e controller), além de testes unitários utilizando as libes Chai, Mocha e Sinon para cobrir todo o código backend desenvolvido em Node.js e para fazer a conexão com o banco de dados MySQL. Também neste projeto foi utilizado o ESlint para deixar o código mais coeso e de fácil manutenção/alteração.

# Stacks utilizadas

* Node.js
* Chai
* Mocha
* Sinon
* Express.js
* MySQL
* Docker

# Documentação

Para a execução deste propjeto é necessário ter o Docker e o Docker-Compose instalados na sua máquina. Portanto confira a documentação oficial para a instalação.

## Instalando Dependências

> Docker

[Link](https://docs.docker.com/engine/install/) para a documentação oficial

> Docker-Compose

[Link](https://docs.docker.com/compose/install/#install-compose) para a documentação oficial

## Executando aplicação

1. Clone o repositório (caso esteja usando chave SSH)
```
git clone git@github.com:Gabriel-Puttin/Store_Manager.git
```
2. Entre na pasta que você acabou de clonar
```
cd Store_Manager
```
3. Suba a aplicação com o docker-compose
```
docker-compose up -d
```
4. Acesse o terminal do container backend criado
```
docker exec -it store_manager bash
```
5. Instale as dependências
```
npm install
```
6. Crie e gere o banco de dados no container
```
npm run migration && npm run seed
```
7. Rode a aplicação
```
npm start
```
