# 🚀 Desafio de Programação Funcional - Quinta Fase

## 📋 Descrição

Desafio progressivo de programação funcional em JavaScript focado em análise de dados de e-commerce. Desenvolvido para estudantes da quinta fase de Ciência da Computação.

## 📂 Arquivos

- **`desafio_funcional.js`** - Arquivo do desafio para os estudantes
- **`desafio_funcional_gabarito.js`** - Gabarito com soluções comentadas (apenas para professores)

## 🎯 Objetivos de Aprendizado

Os estudantes irão praticar:

- ✅ **Imutabilidade** - Trabalhar sem modificar dados originais
- ✅ **Higher-Order Functions** - Funções que recebem/retornam funções
- ✅ **Map, Filter, Reduce** - Operações fundamentais em arrays
- ✅ **Composição de Funções** - Combinar funções pequenas para resolver problemas complexos
- ✅ **Currying** - Funções que retornam funções
- ✅ **Pipeline de Transformação** - Encadear múltiplas operações
- ✅ **Arrow Functions** - Sintaxe moderna e concisa
- ✅ **Spread Operator** - Cópia e manipulação de dados

## 📊 Estrutura do Desafio

### Nível Básico
**Desafio 1**: Cálculo de valor total com desconto usando `map()`

### Nível Intermediário
**Desafio 2**: Top 3 vendas usando `sort()` e `slice()`  
**Desafio 3**: Receita por categoria usando `reduce()`

### Nível Avançado
**Desafio 4**: Análise de desempenho usando múltiplas operações encadeadas  
**Desafio 5**: Composição de funções e currying

### Nível Muito Avançado (Bônus)
**Desafio Bônus**: Implementação de função `pipe()` para pipeline de transformações

## 💻 Como Executar

### Desafio (estudantes):
```bash
node atividades/desafio_funcional.js
```

### Gabarito (professores):
```bash
node atividades/desafio_funcional_gabarito.js
```

## 📈 Pontuação Sugerida

| Desafio | Conceito | Pontos |
|---------|----------|--------|
| Desafio 1 | Map | 1.5 |
| Desafio 2 | Sort + Slice + Map | 2.0 |
| Desafio 3 | Reduce com objeto | 2.0 |
| Desafio 4 | Operações múltiplas | 2.5 |
| Desafio 5 | Composição/Currying | 1.5 |
| Bônus | Pipeline (pipe) | +0.5 |
| **TOTAL** | | **10.0 (+0.5)** |

## ✅ Critérios de Avaliação

- [ ] Código funciona corretamente
- [ ] Não usa mutação de dados
- [ ] Usa apenas programação funcional (sem `for`, `while`, etc.)
- [ ] Funções são puras (sem efeitos colaterais)
- [ ] Código é legível e bem estruturado
- [ ] Usa arrow functions adequadamente
- [ ] Mantém imutabilidade com spread operator quando necessário

## 🎓 Conceitos Trabalhados por Desafio

### Desafio 1 - Transformação Simples
- `map()` para transformar elementos
- Spread operator para copiar objetos
- Cálculo aritmético com múltiplas variáveis

### Desafio 2 - Ordenação e Seleção
- Imutabilidade com spread operator `[...]`
- `sort()` para ordenação
- `slice()` para seleção de subarray
- Encadeamento de métodos

### Desafio 3 - Agregação
- `reduce()` para criar estrutura de dados diferente
- Acumulador como objeto
- Computed property names `[venda.categoria]`

### Desafio 4 - Pipeline Complexo
- `reduce()` para agrupamento
- `Object.entries()` para transformar objeto em array
- Múltiplas transformações encadeadas
- Cálculos derivados (ticket médio)

### Desafio 5 - Programação Funcional Avançada
- Currying (funções que retornam funções)
- Higher-order functions
- Composição manual de funções
- Funções puras e reutilizáveis

### Desafio Bônus - Meta-programação
- Implementação de `pipe()`
- Function composition pattern
- Variadic functions (rest parameters)
- Pipeline de transformação de dados

## 💡 Dicas para os Estudantes

1. **Teste incrementalmente**: Resolva um desafio por vez, descomentar os `console.log()` para ver os resultados
2. **Consulte a documentação MDN**: Pesquise sobre `map()`, `filter()`, `reduce()`, etc.
3. **Mantenha funções pequenas**: Uma função, uma responsabilidade
4. **Evite mutação**: Use spread operator `...` para criar cópias
5. **Pense declarativamente**: "O QUE fazer" não "COMO fazer"
6. **Evite variáveis temporárias**: Encadeie operações quando possível

## 🔍 Exemplos de Conceitos

### Imutabilidade
```javascript
// ❌ Errado - muta o original
const sorted = vendas.sort();

// ✅ Correto - cria cópia
const sorted = [...vendas].sort();
```

### Currying
```javascript
// Função que retorna função
const filtrarPor = (campo) => (valor) => (array) => 
    array.filter(item => item[campo] === valor);

const filtrarPorCategoria = filtrarPor('categoria');
const filtrarEletronicos = filtrarPorCategoria('Eletrônicos');
```

### Composição
```javascript
const resultado = pipe(
    operacao1,
    operacao2,
    operacao3
)(dados);
```

## 📚 Recursos Complementares

- [MDN - Array.prototype.map()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN - Array.prototype.filter()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN - Array.prototype.reduce()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)

## 🤝 Como Contribuir

Sugestões de melhorias no desafio são bem-vindas! Considere:
- Novos desafios com níveis diferentes de dificuldade
- Casos de teste automatizados
- Exemplos adicionais
- Melhorias na documentação

---

**Criado para**: Estudantes da Quinta Fase de Ciência da Computação  
**Tempo estimado**: 2-4 horas  
**Pré-requisitos**: JavaScript básico, ES6+, conceitos de arrays
