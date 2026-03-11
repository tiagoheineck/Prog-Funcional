// MONAD: UM FUNCTOR QUE TAMBÉM SABE SE "ACHATAR" (FLATTEN)
// RESOLVE O PROBLEMA DE FUNCTORS ANINHADOS: Maybe(Maybe(x))
//
// TODA MONAD TEM:
//   map   — transforma o valor interno (herdado do functor)
//   of    — embala um valor na monad
//   chain — como map, mas a função já retorna uma monad (evita o aninhamento)

// =============================
// O PROBLEMA: map com função que retorna uma monad cria aninhamento
// =============================

const Maybe = valor => ({
    valor,
    isNada:   () => valor === null || valor === undefined,
    map:      fn  => Maybe(valor === null || valor === undefined ? null : fn(valor)),
    chain:    fn  => valor === null || valor === undefined ? Maybe(null) : fn(valor),
    getOu:    pad => valor === null || valor === undefined ? pad : valor,
    toString: ()  => valor === null || valor === undefined ? "Maybe(nada)" : `Maybe(${valor})`,
});

Maybe.of = x => Maybe(x);

const buscarUsuario = id =>
    id === 1 ? Maybe.of({ nome: "Ana", enderecoId: 10 }) : Maybe.of(null);

const buscarEndereco = id =>
    id === 10 ? Maybe.of({ rua: "Rua das Flores", cidade: "SP" }) : Maybe.of(null);

// COM map: resulta em Maybe(Maybe(endereco)) — aninhado, difícil de usar
const aninhado = buscarUsuario(1).map(u => buscarEndereco(u.enderecoId));
console.log(aninhado.toString()); // Maybe([object Object]) — Maybe contém outro Maybe

// COM chain: a monad "achata" automaticamente — Maybe(endereco)
const achatado = buscarUsuario(1).chain(u => buscarEndereco(u.enderecoId));
console.log(achatado.toString()); // Maybe({"rua":"Rua das Flores","cidade":"SP"})

// =============================
// PIPELINE REAL COM CHAIN
// CADA ETAPA PODE FALHAR — A MONAD PROPAGA O ERRO SEM if/else
// =============================

const parsearId = entrada => {
    const n = Number(entrada);
    return Number.isNaN(n) ? Maybe.of(null) : Maybe.of(n);
};

const validarId = id =>
    id > 0 ? Maybe.of(id) : Maybe.of(null);

const nomeDoUsuario = entrada =>
    parsearId(entrada)
        .chain(validarId)
        .chain(buscarUsuario)
        .map(u => u.nome)
        .getOu("usuário não encontrado");

console.log(nomeDoUsuario("1"));    // "Ana"
console.log(nomeDoUsuario("99"));   // "usuário não encontrado" (id não existe)
console.log(nomeDoUsuario("-5"));   // "usuário não encontrado" (id inválido)
console.log(nomeDoUsuario("abc"));  // "usuário não encontrado" (não é número)

// =============================
// LEIS DA MONAD
// =============================

const f = x => Maybe.of(x * 2);
const g = x => Maybe.of(x + 10);

// LEI 1 — IDENTIDADE ESQUERDA: of(a).chain(f) === f(a)
const leiEsq = Maybe.of(5).chain(f).getOu(0);
const direto = f(5).getOu(0);
console.log(leiEsq === direto); // true

// LEI 2 — IDENTIDADE DIREITA: m.chain(of) === m
const m = Maybe.of(5);
const leiDir = m.chain(Maybe.of).getOu(0);
console.log(leiDir === m.getOu(0)); // true

// LEI 3 — ASSOCIATIVIDADE: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
const esq = Maybe.of(5).chain(f).chain(g).getOu(0);
const dir = Maybe.of(5).chain(x => f(x).chain(g)).getOu(0);
console.log(esq === dir); // true

// =============================
// PROMISE: A MONAD NATIVA DO JAVASCRIPT PARA CÓDIGO ASSÍNCRONO
// then === chain  |  Promise.resolve === of
// =============================

// Cada .then recebe o valor desembalado — não Promise(Promise(x))
Promise.resolve(5)
    .then(x => Promise.resolve(x * 2))  // chain: retorna Promise, não aninha
    .then(x => Promise.resolve(x + 1))  // chain: continua achatado
    .then(x => console.log(x));         // 11
