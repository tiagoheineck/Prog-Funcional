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
