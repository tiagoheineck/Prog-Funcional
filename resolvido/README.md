# Resolvido - Projeto Pratico (PBL)

Este diretorio contem uma resolucao completa baseada no enunciado do PDF em `teste/plano_pbl_funcional.pdf`.

## Conteudo

- `atividade_resolvida.js`
  - 5 funcoes puras do modulo 1
  - `pipe` implementado sem bibliotecas
  - 2 pipelines com pelo menos 3 estagios
  - 1 estagio novo (`totalPorVendedor`)
  - tratamento funcional de falha com `Maybe`
  - testes isolados com `console.assert`

## Como executar

```bash
node resolvido/atividade_resolvida.js
```

## Desafio complementar: aplicacao web

Arquivos da interface em `resolvido/web`:

- `index.html`: estrutura da pagina
- `styles.css`: visual e responsividade
- `app.js`: processamento e renderizacao dos dados
- `server.js`: servidor HTTP simples com endpoint `/api/vendas`

Para rodar:

```bash
npm run web
```

Depois, abra no navegador:

```text
http://localhost:4173
```

## Observacoes

- Dados lidos de `teste/produtos.json`.
- Nao usa `for`, `while` ou `forEach`.
- Evita mutacao do array original.
