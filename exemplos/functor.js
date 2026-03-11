// FUNCTOR: QUALQUER ESTRUTURA QUE POSSUI UM MÉTODO map
// QUE APLICA UMA FUNÇÃO AO VALOR INTERNO E RETORNA UM NOVO FUNCTOR DO MESMO TIPO
// REGRA: A ESTRUTURA É PRESERVADA — SÓ O VALOR INTERNO MUDA

// =============================
// EXEMPLO 1: ARRAY JÁ É UM FUNCTOR NATIVO DO JAVASCRIPT
// map TRANSFORMA OS VALORES SEM ALTERAR A ESTRUTURA (CONTINUA SENDO UM ARRAY)
// =============================

const nums = [1, 2, 3];

const dobrados = nums.map(x => x * 2); // [2, 4, 6] — ainda é um array

console.log(nums);     // [1, 2, 3]   — imutável, original intacto
console.log(dobrados); // [2, 4, 6]

// =============================
// EXEMPLO 2: BOX — O FUNCTOR MAIS SIMPLES POSSÍVEL
// ENVOLVE UM ÚNICO VALOR E EXPÕE map PARA TRANSFORMÁ-LO
// =============================

const Box = valor => ({
    map:      fn  => Box(fn(valor)),       // aplica fn e retorna um novo Box
    getValor: ()  => valor,
    toString: ()  => `Box(${valor})`,
});

const resultado = Box(5)
    .map(x => x * 3)    // Box(15)
    .map(x => x + 1)    // Box(16)
    .map(x => `R$ ${x}`) // Box("R$ 16")
    .getValor();

console.log(resultado); // "R$ 16"

// SEM FUNCTOR, O MESMO CÓDIGO FICARIA ASSIM (DIFÍCIL DE COMPOR):
const resultadoImperativo = `R$ ${(5 * 3) + 1}`;
console.log(resultadoImperativo); // "R$ 16"

// =============================
// LEIS DO FUNCTOR — TODO FUNCTOR DEVE OBEDECÊ-LAS
// =============================

// LEI 1 — IDENTIDADE: map(x => x) não deve alterar o valor
const identidade = Box(42).map(x => x).getValor();
console.log(identidade === 42); // true

// LEI 2 — COMPOSIÇÃO: map(f).map(g) deve ser igual a map(x => g(f(x)))
const f = x => x * 2;
const g = x => x + 10;

const encadeado  = Box(5).map(f).map(g).getValor();    // map separados
const composto   = Box(5).map(x => g(f(x))).getValor(); // map combinado

console.log(encadeado === composto); // true — as leis garantem isso

// =============================
// EXEMPLO 3: FUNCTOR PARA TRATAMENTO DE ERROS — Either
// Right: caminho feliz (valor válido)
// Left:  caminho de erro (interrompe o map sem lançar exceção)
// =============================

const Right = valor => ({
    map:      fn  => Right(fn(valor)),
    getOu:    _   => valor,
    toString: ()  => `Right(${valor})`,
    isRight:  true,
});

const Left = erro => ({
    map:      _   => Left(erro),    // ignora fn, propaga o erro
    getOu:    pad => pad,
    toString: ()  => `Left(${erro})`,
    isRight:  false,
});

const parsearIdade = valor => {
    const n = Number(valor);
    if (Number.isNaN(n))  return Left("não é um número");
    if (n < 0 || n > 150) return Left("idade fora do intervalo");
    return Right(n);
};

const calcularAnoNascimento = idade => 2025 - idade;

const anoValido = parsearIdade("30")
    .map(calcularAnoNascimento)
    .getOu("entrada inválida");

const anoInvalido = parsearIdade("abc")
    .map(calcularAnoNascimento)   // não executa — é um Left
    .getOu("entrada inválida");

console.log(anoValido);   // 1995
console.log(anoInvalido); // "entrada inválida"

// =============================
// EXEMPLO 4: FUNCTOR COM OBJETO REAL
// TRANSFORMANDO DADOS DE USUÁRIO SEM MUTAR O ORIGINAL
// =============================

const usuario = { nome: "  ana silva  ", salario: 3000, ativo: true };

const BoxObj = valor => ({
    map:      fn => BoxObj(fn(valor)),
    getValor: () => valor,
});

const usuarioFormatado = BoxObj(usuario)
    .map(u => ({ ...u, nome: u.nome.trim() }))
    .map(u => ({ ...u, nome: u.nome.toUpperCase() }))
    .map(u => ({ ...u, salario: u.salario * 1.1 })) // reajuste de 10%
    .getValor();

console.log(usuario);           // { nome: "  ana silva  ", salario: 3000, ativo: true }
console.log(usuarioFormatado);  // { nome: "ANA SILVA",     salario: 3300, ativo: true }
