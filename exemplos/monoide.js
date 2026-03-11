// MONOIDE: UMA ESTRUTURA COM DUAS REGRAS SIMPLES
//   1. OPERAÇÃO BINÁRIA ASSOCIATIVA — combina dois valores do mesmo tipo
//   2. ELEMENTO IDENTIDADE (NEUTRO)  — combinado com qualquer valor, não o altera

// =============================
// EXEMPLO 1: STRING — monoide nativo do JavaScript
// operação: concatenação (+)
// identidade: "" (string vazia)
// =============================

const concatString = (a, b) => a + b;

console.log(concatString("olá", " mundo")); // "olá mundo"
console.log(concatString("olá", ""));       // "olá"  — identidade não altera
console.log(concatString("", "olá"));       // "olá"  — identidade nos dois lados

// ASSOCIATIVIDADE: a ordem de agrupamento não importa
const a = "um";
const b = " dois";
const c = " três";

console.log(concatString(concatString(a, b), c)); // "um dois três"
console.log(concatString(a, concatString(b, c))); // "um dois três" — mesmo resultado

// =============================
// EXEMPLO 2: NÚMERO — dois monoides diferentes sobre o mesmo tipo
// =============================

// Monoide da SOMA
const Soma = valor => ({
    valor,
    concat:   outro => Soma(valor + outro.valor),
    toString: ()    => `Soma(${valor})`,
});
Soma.identidade = Soma(0); // neutro da soma é 0

// Monoide do PRODUTO
const Produto = valor => ({
    valor,
    concat:   outro => Produto(valor * outro.valor),
    toString: ()    => `Produto(${valor})`,
});
Produto.identidade = Produto(1); // neutro do produto é 1

console.log(Soma(3).concat(Soma(4)).valor);               // 7
console.log(Soma(3).concat(Soma.identidade).valor);       // 3  — identidade
console.log(Produto(3).concat(Produto(4)).valor);         // 12
console.log(Produto(3).concat(Produto.identidade).valor); // 3  — identidade

// =============================
// EXEMPLO 3: FOLD — REDUZINDO UMA LISTA COM UM MONOIDE
// sem monoide, você precisaria saber qual valor inicial usar no reduce
// com monoide, você sempre usa a identidade como valor inicial
// =============================

const fold = (monoide, identidade, lista) =>
    lista.reduce((acc, x) => acc.concat(monoide(x)), identidade);

const numeros = [1, 2, 3, 4, 5];

const totalSoma    = fold(Soma,    Soma.identidade,    numeros).valor; // 15
const totalProduto = fold(Produto, Produto.identidade, numeros).valor; // 120

console.log(totalSoma);    // 15
console.log(totalProduto); // 120

// MESMO PARA STRINGS
const palavras     = ["programação", " ", "funcional", " ", "em", " JS"];
const frase        = fold(x => Soma(x), Soma(""), palavras).valor;

console.log(frase); // "programação funcional em JS"

// =============================
// EXEMPLO 4: ANY e ALL — monoides booleanos
// =============================

const Any = valor => ({
    valor,
    concat:   outro => Any(valor || outro.valor),
});
Any.identidade = Any(false); // false não altera o OR

const All = valor => ({
    valor,
    concat:   outro => All(valor && outro.valor),
});
All.identidade = All(true); // true não altera o AND

const flags = [false, false, true, false];

const algumVerdadeiro = fold(Any, Any.identidade, flags).valor;
const todosVerdadeiros = fold(All, All.identidade, flags).valor;

console.log(algumVerdadeiro);  // true  (tem pelo menos um true)
console.log(todosVerdadeiros); // false (nem todos são true)
