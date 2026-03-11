// PROBLEMA: Null e NaN se propagam silenciosamente no código imperativo

function dividirImperativo(a, b) {
    return a / b; // Se b for 0, retorna Infinity. Se a for null, retorna NaN
}

console.log(dividirImperativo(10, 0));    // Infinity
console.log(dividirImperativo(null, 2));  // NaN
console.log(dividirImperativo(10, null)); // Infinity (null vira 0)

// =============================
// SOLUÇÃO 1: FUNÇÕES PURAS SEGURAS (SAFE FUNCTIONS)
// EM VEZ DE LANÇAR ERRO OU RETORNAR NaN, RETORNAM null EXPLICITAMENTE
// =============================

const ehNumeroValido = x => x !== null && x !== undefined && !Number.isNaN(Number(x));

const dividirSeguro = a => b => {
    if (!ehNumeroValido(a) || !ehNumeroValido(b) || b === 0) return null;
    return a / b;
};

const parsearNumero = valor => {
    const n = Number(valor);
    return Number.isNaN(n) ? null : n;
};

console.log(dividirSeguro(10)(2));    // 5
console.log(dividirSeguro(10)(0));    // null (divisão por zero)
console.log(dividirSeguro(null)(2));  // null (entrada inválida)
console.log(parsearNumero("42"));     // 42
console.log(parsearNumero("abc"));    // null (em vez de NaN)

// =============================
// SOLUÇÃO 2: MAYBE — ESTRUTURA FUNCIONAL PARA VALORES OPCIONAIS
// ENCAPSULA UM VALOR QUE PODE OU NÃO EXISTIR, EVITANDO NULL CHECKS ESPALHADOS PELO CÓDIGO
// =============================

const Maybe = valor => ({
    valor,
    isNada: () => valor === null || valor === undefined || Number.isNaN(valor),
    map:    fn  => Maybe(valor === null || valor === undefined || Number.isNaN(valor) ? null : fn(valor)),
    getOu:  pad => (valor === null || valor === undefined || Number.isNaN(valor) ? pad : valor),
    toString: () => (valor === null || valor === undefined || Number.isNaN(valor) ? "Maybe(nada)" : `Maybe(${valor})`),
});

const Nada  = Maybe(null);
const Algo  = x => Maybe(x);

console.log(Algo(10).map(x => x * 2).getOu(0));       // 20
console.log(Algo(null).map(x => x * 2).getOu(0));     // 0  (null não propaga)
console.log(Algo("abc").map(Number).map(x => x + 1).getOu(-1)); // -1 (NaN bloqueado)

// ENCADEANDO OPERAÇÕES SEM SE PREOCUPAR COM NULL EM CADA ETAPA
const resultado = Algo("5")
    .map(Number)           // "5" -> 5
    .map(x => x * 3)      // 5  -> 15
    .map(x => x - 1)      // 15 -> 14
    .getOu(0);

console.log(resultado); // 14

const resultadoInvalido = Algo("texto")
    .map(Number)           // "texto" -> NaN  (Maybe bloqueia aqui)
    .map(x => x * 3)      // não executa
    .map(x => x - 1)      // não executa
    .getOu(0);

console.log(resultadoInvalido); // 0 (valor padrão, NaN nunca propagou)

// =============================
// SOLUÇÃO 3: COMPOSIÇÃO DE FUNÇÕES SEGURAS COM PIPELINE
// CADA FUNÇÃO RECEBE null? RETORNA null. ASSIM O ERRO NÃO SE ESPALHA.
// =============================

const segura = fn => x => (x === null || x === undefined || Number.isNaN(x) ? null : fn(x));

const dobrar    = segura(x => x * 2);
const incrementar = segura(x => x + 1);
const raizQuadrada = segura(x => (x < 0 ? null : Math.sqrt(x)));

const pipeline = (...fns) => valor => fns.reduce((acc, fn) => fn(acc), valor);

const calcular = pipeline(dobrar, incrementar, raizQuadrada);

console.log(calcular(4));    // sqrt((4*2)+1) = sqrt(9) = 3
console.log(calcular(null)); // null (interrompido no início)
console.log(calcular(-5));   // null (raiz de número negativo bloqueada)

// =============================
// SOLUÇÃO 4: LISTAS COM VALORES NULOS — FILTRAR ANTES DE TRANSFORMAR
// EM VEZ DE TRATAR NULL DENTRO DO MAP, REMOVA-OS ANTES COM FILTER
// =============================

const entradas = [1, null, "3", undefined, NaN, 5, "abc", 0, ""];

const numerosValidos = entradas
    .map(parsearNumero)          // Tenta converter tudo para número (null se falhar)
    .filter(x => x !== null)     // Remove os inválidos
    .filter(x => x !== 0);       // Remove zeros se não forem úteis

console.log(numerosValidos); // [1, 3, 5]

const somaSegura = lista => lista
    .map(parsearNumero)
    .filter(x => x !== null)
    .reduce((acc, n) => acc + n, 0);

console.log(somaSegura([1, "2", null, "abc", 3])); // 6  (1 + 2 + 3)
console.log(somaSegura(["x", null, undefined]));   // 0  (nenhum válido, retorna acumulador inicial)
