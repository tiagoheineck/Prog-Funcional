/**
 * ============================================================
 * DESAFIO DE PROGRAMAÇÃO FUNCIONAL - QUINTA FASE
 * Sistema de Análise de Vendas de E-commerce
 * ============================================================
 * 
 * OBJETIVO: Aplicar conceitos avançados de programação funcional
 * incluindo composição de funções, higher-order functions, 
 * currying, imutabilidade e transformações de dados.
 * 
 * INSTRUÇÕES:
 * - Use APENAS programação funcional (nada de loops ou mutação)
 * - Prefira arrow functions e encadeamento de métodos
 * - Mantenha funções puras (sem efeitos colaterais)
 * - Evite mutação de dados originais
 * ============================================================
 */

const vendas = [
    { id: 1, produto: 'Notebook', categoria: 'Eletrônicos', preco: 3500, quantidade: 2, desconto: 0.10, vendedor: 'Ana' },
    { id: 2, produto: 'Mouse', categoria: 'Eletrônicos', preco: 80, quantidade: 5, desconto: 0, vendedor: 'Carlos' },
    { id: 3, produto: 'Teclado', categoria: 'Eletrônicos', preco: 250, quantidade: 3, desconto: 0.05, vendedor: 'Ana' },
    { id: 4, produto: 'Cadeira Gamer', categoria: 'Móveis', preco: 1200, quantidade: 1, desconto: 0.15, vendedor: 'Beatriz' },
    { id: 5, produto: 'Mesa', categoria: 'Móveis', preco: 800, quantidade: 2, desconto: 0, vendedor: 'Carlos' },
    { id: 6, produto: 'Monitor', categoria: 'Eletrônicos', preco: 1500, quantidade: 1, desconto: 0.20, vendedor: 'Ana' },
    { id: 7, produto: 'Webcam', categoria: 'Eletrônicos', preco: 300, quantidade: 4, desconto: 0.10, vendedor: 'Beatriz' },
    { id: 8, produto: 'Luminária', categoria: 'Decoração', preco: 150, quantidade: 3, desconto: 0, vendedor: 'Carlos' },
    { id: 9, produto: 'Headset', categoria: 'Eletrônicos', preco: 400, quantidade: 2, desconto: 0.05, vendedor: 'Ana' },
    { id: 10, produto: 'Estante', categoria: 'Móveis', preco: 600, quantidade: 1, desconto: 0.10, vendedor: 'Beatriz' }
];

console.log('=== DESAFIO DE PROGRAMAÇÃO FUNCIONAL ===\n');

/**
 * ============================================================
 * DESAFIO 1: Cálculo de Valor Total com Desconto
 * ============================================================
 * Crie uma função que calcule o valor total de cada venda
 * considerando: (preco * quantidade) * (1 - desconto)
 * 
 * DICA: Use map() para transformar o array
 * 
 * RESULTADO ESPERADO: Array de objetos com propriedade 'valorTotal'
 */

// TODO: Implemente aqui
const vendasComTotal = null;

console.log('--- DESAFIO 1: Vendas com Valor Total ---');
// console.log(vendasComTotal);


/**
 * ============================================================
 * DESAFIO 2: Top 3 Vendas por Valor
 * ============================================================
 * A partir das vendas com valor total, identifique as 3 maiores
 * vendas e retorne apenas: produto, vendedor e valorTotal
 * 
 * DICA: Use sort() e slice() - lembre-se da imutabilidade!
 * Cuidado: sort() muta o array original, use spread operator [...]
 * 
 * RESULTADO ESPERADO: Array com 3 objetos simplificados
 */

// TODO: Implemente aqui
const top3Vendas = null;

console.log('\n--- DESAFIO 2: Top 3 Maiores Vendas ---');
// console.log(top3Vendas);


/**
 * ============================================================
 * DESAFIO 3: Receita por Categoria
 * ============================================================
 * Agrupe as vendas por categoria e calcule a receita total de cada uma
 * 
 * DICA: Use reduce() para criar um objeto com categorias como chaves
 * e o valor total como valores
 * 
 * RESULTADO ESPERADO: 
 * { 
 *   Eletrônicos: XXXX, 
 *   Móveis: YYYY, 
 *   Decoração: ZZZZ 
 * }
 */

// TODO: Implemente aqui
const receitaPorCategoria = null;

console.log('\n--- DESAFIO 3: Receita por Categoria ---');
// console.log(receitaPorCategoria);


/**
 * ============================================================
 * DESAFIO 4: Desempenho dos Vendedores
 * ============================================================
 * Crie um relatório com o desempenho de cada vendedor contendo:
 * - nome do vendedor
 * - quantidadeVendas: número de vendas realizadas
 * - receitaTotal: soma dos valores totais
 * - ticketMedio: receitaTotal / quantidadeVendas
 * 
 * DICA: Combine reduce() para agrupar e depois Object.entries() + map()
 * para transformar em array de objetos
 * 
 * RESULTADO ESPERADO: Array de objetos ordenado por receitaTotal (decrescente)
 */

// TODO: Implemente aqui
const desempenhoVendedores = null;

console.log('\n--- DESAFIO 4: Desempenho dos Vendedores ---');
// console.log(desempenhoVendedores);


/**
 * ============================================================
 * DESAFIO 5: Composição de Funções (AVANÇADO)
 * ============================================================
 * Crie funções reutilizáveis e componha-as para resolver problemas complexos
 * 
 * Implemente as seguintes funções puras:
 * 1. filtrarPorCategoria(categoria) - retorna função que filtra vendas
 * 2. calcularReceita(vendas) - calcula receita total de um array
 * 3. aplicarDesconto(percentual) - retorna função que aplica desconto adicional
 * 
 * Use essas funções para calcular:
 * "Qual seria a receita de Eletrônicos se aplicássemos 5% de desconto adicional?"
 */

// TODO: Implemente as funções aqui

const filtrarPorCategoria = (categoria) => {
    // Retorna uma função que filtra vendas por categoria
    return null; // TODO: Implemente
};

const calcularReceita = (vendas) => {
    // Calcula a receita total (com descontos já aplicados)
    return null; // TODO: Implemente
};

const aplicarDescontoAdicional = (percentual) => {
    // Retorna uma função que aplica desconto adicional
    return null; // TODO: Implemente
};

// TODO: Componha as funções para responder à pergunta
const receitaEletronicosComDescontoExtra = null;

console.log('\n--- DESAFIO 5: Composição de Funções ---');
console.log('Receita de Eletrônicos com 5% desconto adicional:');
// console.log(receitaEletronicosComDescontoExtra);


/**
 * ============================================================
 * DESAFIO BÔNUS: Pipeline de Transformação (MUITO AVANÇADO)
 * ============================================================
 * Crie uma função 'pipe' que permite encadear múltiplas transformações
 * 
 * Exemplo de uso:
 * const resultado = pipe(
 *     operacao1,
 *     operacao2,
 *     operacao3
 * )(dados);
 * 
 * Use o pipe para criar um relatório que:
 * 1. Filtre apenas vendas com desconto > 0
 * 2. Calcule o valor economizado (preco * quantidade * desconto)
 * 3. Agrupe por vendedor
 * 4. Ordene por economia total (decrescente)
 */

// TODO: Implemente a função pipe
const pipe = (...funcoes) => {
    // A função pipe recebe N funções como argumentos e retorna uma nova função
    // que aplica essas funções em sequência, da esquerda para a direita
    return null; // TODO: Implemente
};

// TODO: Use o pipe para criar o relatório de economia
const relatorioEconomia = null;

console.log('\n--- DESAFIO BÔNUS: Economia Gerada por Descontos ---');
// console.log(relatorioEconomia);


/**
 * ============================================================
 * DICAS FINAIS:
 * ============================================================
 * 
 * 1. Teste cada desafio separadamente (descomente os console.log)
 * 2. Não modifique o array 'vendas' original
 * 3. Use const para todas as variáveis
 * 4. Evite if/else - prefira operadores ternários ou filter
 * 5. Funções devem ser puras (sem console.log dentro delas)
 * 6. Para arredondar valores: Number(valor.toFixed(2))
 * 
 * CONCEITOS PRATICADOS:
 * - Imutabilidade
 * - Higher-order functions
 * - Composição de funções
 * - Currying
 * - Pipeline de transformação
 * - Map, Filter, Reduce
 * - Arrow functions
 * - Spread operator
 * 
 * BOA SORTE! 🚀
 * ============================================================
 */
