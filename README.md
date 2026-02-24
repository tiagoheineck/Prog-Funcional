# Execução manual de JavaScript dentro do container

Este projeto está configurado para iniciar um container Node.js com o volume do projeto montado, para você entrar nele e executar os scripts manualmente.

## Pré-requisitos

- Docker
- Docker Compose (comando `docker compose`)

## Estrutura atual

- `exemplos/imperativa.js`
- `exemplos/funcional.js`

## 1) Iniciar o container

```bash
docker compose up -d --build
```

## 2) Entrar no container

```bash
docker compose exec js-cli sh
```

## 3) Rodar o JavaScript manualmente

```bash
node exemplos/imperativa.js
node exemplos/funcional.js
```

## Parar o ambiente

```bash
docker compose down
```

## Observações

- O container monta a pasta do projeto localmente (`volume`), então o código usado é o da sua máquina.
- O container fica ativo até você parar com `docker compose down`.

## Usar como Dev Container no VS Code

1. Instale a extensão **Dev Containers** no VS Code.
2. Abra a pasta do projeto no VS Code.
3. Execute o comando: **Dev Containers: Reopen in Container**.

Depois de abrir no container, você pode rodar com um botão:

1. Abra a aba **Run and Debug** (ícone de play com inseto).
2. Escolha uma configuração:
	- `Rodar arquivo atual (.js)`
3. Clique no botão **Play** para executar.

> Dica: deixe aberto no editor o arquivo `.js` que você quer executar e selecione `Rodar arquivo atual (.js)`.

Se a aba **Run and Debug** não aparecer:

1. Use o atalho **Ctrl+Shift+D** para abrir diretamente o painel de debug.
2. Ou abra a Paleta de Comandos (**Ctrl+Shift+P**) e execute **Debug: Select and Start Debugging**.
3. Se a barra lateral estiver oculta, vá em **View > Appearance** e habilite **Activity Bar** e **Primary Side Bar**.
