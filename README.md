# Desafio Backend - Let's Code

## Rodando o projeto

Para rodar o projeto é necessário primeiro ter [node](https://nodejs.org/), [yarn](https://yarnpkg.com/) e [docker](https://www.docker.com/) instalados.

Primeiro será necessário clonar o projeto. Para isso navegue até uma pasta desejada, e execute o seguinte código:

```shell
$ git clone https://github.com/hmathsan/desafio-backend-lc.git
```

Assim que ambos estiverem instalados será necessário criar um arquivo `.env` na pasta `BACK` que armazenará as variáveis de ambiente utilizadas na aplicação, contendo os seguintes valores: 

```
JWT_SECRET=jwtsecret
TOKEN_TEMPO=600000

DEFAULT_LOGIN=letscode
DEFAULT_SENHA=lets@123
```

- A variável `JWT_SECRET` será o segredo utilizado para gerar os tokens de autorização JWT.

- A variável `TOKEN_TEMPO` define em quanto tempo **(em milissegundos)** o token JWT deverá expirar (caso não seja informado, o padrão será 10 minutos).

- As variáveis `DEFAULT_LOGIN` e `DEFAULT_SENHA` são o login e senha utilizados para autorizar e gerar o token JWT ao chamar o endpoint `/login`

#

Após a criar o arquivo das variáveis de ambiente, basta rodar o docker-compose que se encontra na base do repositório rodando o seguinte comando:

```shell
$ docker-compose up -d --build
```

O `docker-compose` possui o banco de dados, a aplicação front-end e a aplicação back-end. Após a execução do comando basta entrar no endereço `http://localhost:3000` para executar a aplicação front-end já se comunicando com o back-end.

#

Caso queira rodar o front-end e back-end sem container do docker, utilizando o yarn, basta utilizar o comando: 

```shell
$ docker-compose up -d postgres pgadmin
```

Este comando iniciará apenas o banco de dados.

E para rodar as aplicações separadamente basta utilizar os comandos

Para o Back-end:
```shell
$ cd BACK
$ yarn dev
```

Para o Front-end:
```shell
$ cd FRONT
$ yarn start
```

## Realizando requisições

A pasta `Collections` possui um arquivo que pode ser importado no [Insomnia](https://insomnia.rest/download) já possuindo todos os endpoints prontos para serem testados.

### Swagger

Para mais informações sobre as requisições, enquanto a aplicação estiver em execução basta navegar até o endereço `http://localhost:5000/docs/`, onde possui um swagger para informações sobre as endpoints, suas requests e suas respostas.

*Obs:* Por falta de tempo não consegui realizar a configuração do token de segurança nos endpoints do Swagger, então não é possível retornar 200 a menos que seja no endpoint de `login`.

# O que não foi implementado?

Todas as features foram implementadas.

Por falta de tempo não consegui implementar os testes unitários e de integração.