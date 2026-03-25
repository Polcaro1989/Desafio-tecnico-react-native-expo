# StoreHub

Aplicativo mobile em Expo para gerenciamento de lojas e produtos, com API mock em MirageJS.

## Visao geral

O projeto foi estruturado em duas partes:

- `frontend/`: app React Native com Expo Router, Gluestack UI e Zustand
- `backend/`: camada de mock API com MirageJS, responsavel por contratos, rotas, validacoes e seed inicial

A ideia foi tratar o mock como uma API real. O frontend consome endpoints simulados para lojas e produtos, enquanto o backend centraliza regra de dados e estrutura de resposta.

## Stack

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript
- Expo Router
- Gluestack UI
- Zustand
- MirageJS
- AsyncStorage
- Jest

## O que foi entregue

- listagem de lojas
- busca de lojas
- criacao, edicao e exclusao de loja
- listagem de produtos por loja
- busca de produtos por loja
- criacao, edicao e exclusao de produto
- persistencia local do estado do mock com AsyncStorage
- testes no backend e no frontend

## Arquitetura

### Backend

O `backend/` nao sobe um servidor HTTP real. Ele expoe uma API mock usada pelo app.

Principais responsabilidades:

- definir contratos de `Store` e `Product`
- registrar rotas `/stores` e `/products`
- validar payloads
- aplicar regras de criacao e atualizacao
- carregar seed inicial
- gerar snapshot para persistencia local

### Frontend

O `frontend/` concentra interface, navegacao e estado global.

Organizacao:

- `app/`: rotas do Expo Router
- `src/features/inventory/`: dominio de lojas e produtos
- `src/shared/`: bootstrap do mock, cliente HTTP, persistencia e componentes compartilhados

## Estrutura

```text
backend/   API mock com MirageJS
frontend/  App Expo
scripts/   Scripts auxiliares
```

## Requisitos

- Node 20+
- npm 10+

Ambiente usado na validacao:

- Node `v24.14.0`
- npm `11.9.0`

## Instalacao

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Como rodar

O frontend importa o backend compilado em `backend/dist`, entao a ordem correta e:

```bash
cd backend
npm install
npm run build

cd ../frontend
npm install
npx expo start --lan
```

Se voce alterar qualquer arquivo em `backend/src`, rode novamente:

```bash
cd backend
npm run build
```

## Comandos do backend

Typecheck:

```bash
cd backend
npm run typecheck
```

Testes:

```bash
cd backend
npm run test
```

Build:

```bash
cd backend
npm run build
```

Smoke da API mock e da seed:

```bash
cd backend
npm run smoke
```

Observacao:

- nao existe `npm run start` no backend
- a seed e carregada automaticamente pelo MirageJS

## Comandos do frontend

Typecheck:

```bash
cd frontend
npm run typecheck
```

Lint:

```bash
cd frontend
npm run lint
```

Testes:

```bash
cd frontend
npm run test
```

Expo:

```bash
cd frontend
npx expo start --lan
```

Android:

```bash
cd frontend
npm run android
```

iOS:

```bash
cd frontend
npm run ios
```

Web:

```bash
cd frontend
npm run web
```

Export web:

```bash
cd frontend
npx expo export --platform web
```

## Testes

### Backend

- Jest em `backend/tests/`
- cobre factories, validators, snapshot e inicializacao do mock

### Frontend

- Jest em `frontend/tests/`
- cobre formularios e store global

## Reset da seed

Como o estado do mock e persistido no AsyncStorage, para voltar ao estado inicial e preciso limpar os dados do app no dispositivo ou emulador. Ao abrir novamente, a seed padrao sera carregada.

