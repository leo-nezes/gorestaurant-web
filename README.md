<h1 align="center">
  GoRestaurant
</h1>

![gobarber-web](https://github.com/leo-nezes/images-for-readme/blob/master/gorestaurant-web/GoRestaurant.png)

O GoRestaurant é uma aplicação que se conecta a uma fake API, exibe os pratos de comida criados e permite a criação, remoção e atualização desses pratos.

## Iniciando

As instruções abaixo vão orientá-lo a copiar o projeto e executar na sua máquina local para fins de desenvolvimento e testes.

### 1. Pré-requisitos

Intalação dos seguntes softwares:

1.1 Ambiente
- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/download)

### 2. Configurando ambiente

Baixar as seguintes dependências para o VSCode:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

2.1 Aplicação

Clonar o projeto e baixar as dependências de desenvolvimento:

`$ yarn`

### 3. Executando aplicação

Executar a fake API no PowerShell:
`$ yarn json-server server.json -p 3333`

Executar a aplicação:

`$ yarn start`
