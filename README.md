# Boas vindas ao Projeto TrybeSmith !

Aqui você vai encontrar os detalhes de como foi minha experiência durante o desenvolvimento deste projeto, stacks utilizadas e uma breve documentação sobre como utilizar este projeto em pleno funcionamento.

# Sobre o projeto

Este projeto teve como objetivo realizar um CRUD (Create, Read, Update e Delete) de uma API Rest, aplicando o paradgima de programação orientada a objetos (POO), utilizando o Typescript durante o desenvolvimento do backend para fazer a conexão com um banco de dados MySQL. Também neste projeto foi utilizado a biblioteca jsonwebtoken para gerar um token de autenticação e autorização do usuário e o ESlint para deixar o código mais coeso e de fácil manutenção/alteração.

# Stacks utilizadas

* Typescript
* Express.js
* MySQL
* Docker
* Node.js
* ESlint
* jsonwebtoken

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
git clone git@github.com:Gabriel-Puttin/Project_TrybeSmith.git
```
2. Entre na pasta que você acabou de clonar
```
cd Project_TrybeSmith
```
3. Suba a aplicação com o docker-compose
```
docker-compose up -d
```
4. Acesse o terminal do container backend criado
```
docker exec -it trybesmith bash
```
5. Instale as dependências
```
npm install
```
6. Rode a aplicação
```
npm start
```
