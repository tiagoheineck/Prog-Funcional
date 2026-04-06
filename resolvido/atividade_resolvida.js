const vendas = require('../teste/produtos.json');

// Funcoes do modulo 1
// V1 (usando metodos de array)
const filtrarPorValorMinimoV1 = (min) => (lista) =>
  lista.filter((item) => Number(item.valor) >= Number(min));

const filtrarPorCategoriaV1 = (categoria) => (lista) =>
  lista.filter(
    (item) =>
      String(item.categoria).toLowerCase() === String(categoria).toLowerCase()
  );

const resumirV1 = (lista) =>
  lista.map(({ produto, valor, categoria }) => ({ produto, valor, categoria }));

// V2 (sem filter/map/reduce, com recursao e imutabilidade)
const filtrarPorValorMinimoV2 = (min) => {
  const aplicar = (lista) => {
    // [head, ...tail] é uma forma de desestruturar a lista em primeiro elemento (head) e o restante (tail)
    const processar = ([head, ...tail]) => { //isso é muito legal, mas cuidado com listas muito grandes para evitar stack overflow
      if (!head) { 
        return [];
      }

      const restante = processar(tail); // processa o restante da lista recursivamente
      return Number(head.valor) >= Number(min) ? [head, ...restante] : restante; // se o head atende a condição, inclui ele no resultado junto com o restante processado, caso contrário, retorna só o restante
    };

    return processar(lista);
  };

  return aplicar;
};

const filtrarPorCategoriaV2 = (categoria) => {
  const categoriaNormalizada = String(categoria).toLowerCase();

  const aplicar = (lista) => {
    const processar = ([head, ...tail]) => {
      if (!head) {
        return [];
      }

      const restante = processar(tail);
      return String(head.categoria).toLowerCase() === categoriaNormalizada
        ? [head, ...restante]
        : restante;
    };

    return processar(lista);
  };

  return aplicar;
};

const resumirV2 = (lista) => {
  const processar = ([head, ...tail]) => {
    if (!head) {
      return [];
    }

    const itemResumido = {
      produto: head.produto,
      valor: head.valor,
      categoria: head.categoria,
    };

    return [itemResumido, ...processar(tail)];
  };

  return processar(lista);
};

// Alias principais usados no restante do arquivo
const filtrarPorValorMinimo = filtrarPorValorMinimoV2;
const filtrarPorCategoria = filtrarPorCategoriaV2;
const resumir = resumirV2;

const totalPorCategoria = (lista) =>
  lista.reduce(
    (acc, { categoria, valor }) => ({
      ...acc,
      [categoria]: Number(((acc[categoria] || 0) + Number(valor || 0)).toFixed(2)),
    }),
    {}
  );

const ordenarPorValor = (lista) => [...lista].sort((a, b) => b.valor - a.valor);

// Funcao pipe (modulo 2)
const pipe = (...funcoes) => (valorInicial) =>
  funcoes.reduce((valor, funcao) => funcao(valor), valorInicial);

// Estagios auxiliares para pipelines
const limitar = (n) => (lista) => lista.slice(0, n);

const totalPorVendedor = (lista) =>
  lista.reduce(
    (acc, { vendedor, valor }) => ({
      ...acc,
      [vendedor]: Number(((acc[vendedor] || 0) + Number(valor || 0)).toFixed(2)),
    }),
    {}
  );

const transformarEmLista = (obj) =>
  Object.entries(obj).map(([chave, total]) => ({ chave, total }));

const ordenarPorTotal = (lista) => [...lista].sort((a, b) => b.total - a.total);

// Maybe minimalista para tratar ausencia de resultados sem try/catch
const Maybe = {
  of: (valor) => ({
    map: (fn) => (valor == null ? Maybe.of(null) : Maybe.of(fn(valor))),
    fold: (onNothing, onJust) => (valor == null ? onNothing() : onJust(valor)),
  }),
};

const categoriaNaoVazia = (categoria) =>
  pipe(
    filtrarPorCategoria(categoria),
    (lista) => (lista.length === 0 ? null : lista)
  );

// Pipeline 1: top 5 produtos tech acima de 500
const pipelineTopTechCaros = pipe(
  filtrarPorCategoria('tech'),
  filtrarPorValorMinimo(500),
  ordenarPorValor,
  resumir,
  limitar(5)
);

// Pipeline 2: total por vendedor apenas em acessorios (novo estagio: totalPorVendedor)
const pipelineTotalAcessoriosPorVendedor = pipe(
  filtrarPorCategoria('acessórios'),
  filtrarPorValorMinimo(50),
  totalPorVendedor,
  transformarEmLista,
  ordenarPorTotal
);

// Desafio de falha: categoria inexistente com Maybe
const analiseSeguraPorCategoria = (categoria) =>
  Maybe.of(vendas)
    .map(categoriaNaoVazia(categoria))
    .map(totalPorCategoria)
    .fold(
      () => ({ erro: `Nenhuma venda encontrada para a categoria "${categoria}".` }),
      (resultado) => resultado
    );

// Testes isolados (console.assert)
const snapshot = JSON.stringify(vendas);

// filtrarPorValorMinimo
console.assert(
  filtrarPorValorMinimo(3000)(vendas).length > 0,
  'filtrarPorValorMinimo deveria retornar itens acima de 3000'
);
console.assert(
  filtrarPorValorMinimo(999999)(vendas).length === 0,
  'filtrarPorValorMinimo deveria retornar vazio para limite muito alto'
);
console.assert(
  JSON.stringify(filtrarPorValorMinimoV1(500)(vendas)) ===
    JSON.stringify(filtrarPorValorMinimoV2(500)(vendas)),
  'V1 e V2 de filtrarPorValorMinimo deveriam ter o mesmo resultado'
);

// filtrarPorCategoria
console.assert(
  filtrarPorCategoria('tech')(vendas).every((item) => item.categoria === 'tech'),
  'filtrarPorCategoria deveria retornar somente categoria tech'
);
console.assert(
  filtrarPorCategoria('categoria-inexistente')(vendas).length === 0,
  'filtrarPorCategoria deveria retornar vazio para categoria inexistente'
);
console.assert(
  JSON.stringify(filtrarPorCategoriaV1('tech')(vendas)) ===
    JSON.stringify(filtrarPorCategoriaV2('tech')(vendas)),
  'V1 e V2 de filtrarPorCategoria deveriam ter o mesmo resultado'
);

// resumir
console.assert(
  Object.keys(resumir(vendas.slice(0, 1))[0]).join(',') === 'produto,valor,categoria',
  'resumir deveria manter somente produto, valor e categoria'
);
console.assert(
  resumir([]).length === 0,
  'resumir deveria retornar lista vazia para entrada vazia'
);
console.assert(
  JSON.stringify(resumirV1(vendas.slice(0, 5))) ===
    JSON.stringify(resumirV2(vendas.slice(0, 5))),
  'V1 e V2 de resumir deveriam ter o mesmo resultado'
);

// totalPorCategoria
console.assert(
  typeof totalPorCategoria(vendas).tech === 'number',
  'totalPorCategoria deveria gerar valor numerico por categoria'
);
console.assert(
  Object.keys(totalPorCategoria([])).length === 0,
  'totalPorCategoria deveria retornar objeto vazio para lista vazia'
);

// ordenarPorValor
const ordenado = ordenarPorValor(vendas);
console.assert(
  ordenado[0].valor >= ordenado[1].valor,
  'ordenarPorValor deveria ordenar de forma decrescente'
);
console.assert(
  JSON.stringify(vendas) === snapshot,
  'ordenarPorValor nao pode mutar a lista original'
);

// Teste do pipe
const resultadoPipeBasico = pipe(
  (x) => x + 2,
  (x) => x * 3,
  (x) => x - 1
)(5);
console.assert(
  resultadoPipeBasico === 20,
  'pipe(f,g,h)(x) deveria ser equivalente a h(g(f(x)))'
);

// Saidas principais
console.log('=== ATIVIDADE RESOLVIDA ===');
console.log('\nTop 5 produtos tech com valor >= 500:');
console.log(pipelineTopTechCaros(vendas));

console.log('\nTotal por vendedor em acessorios:');
console.log(pipelineTotalAcessoriosPorVendedor(vendas));

console.log('\nAnalise segura para categoria inexistente (Maybe):');
console.log(analiseSeguraPorCategoria('games'));

console.log('\nAnalise segura para categoria existente:');
console.log(analiseSeguraPorCategoria('áudio'));

module.exports = {
  filtrarPorValorMinimoV1,
  filtrarPorValorMinimoV2,
  filtrarPorValorMinimo,
  filtrarPorCategoriaV1,
  filtrarPorCategoriaV2,
  filtrarPorCategoria,
  resumirV1,
  resumirV2,
  resumir,
  totalPorCategoria,
  ordenarPorValor,
  pipe,
  pipelineTopTechCaros,
  pipelineTotalAcessoriosPorVendedor,
  analiseSeguraPorCategoria,
};
