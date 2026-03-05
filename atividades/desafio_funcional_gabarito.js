/**
 * ============================================================
 * GABARITO - DESAFIO DE PROGRAMAÇÃO FUNCIONAL 
 * Sistema de Análise de Vendas de E-commerce
 * ============================================================
 * Este arquivo contém as soluções comentadas para todos os desafios
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

console.log('=== GABARITO - DESAFIO DE PROGRAMAÇÃO FUNCIONAL ===\n');

/**
 * ============================================================
 * SOLUÇÃO DESAFIO 1: Cálculo de Valor Total com Desconto
 * ============================================================
 */

const vendasComTotal = vendas.map(venda => ({
    ...venda, // Spread operator mantém todas as propriedades originais
    valorTotal: Number((venda.preco * venda.quantidade * (1 - venda.desconto)).toFixed(2))
}));

console.log('--- DESAFIO 1: Vendas com Valor Total ---');
console.log(vendasComTotal);

/**
 * EXPLICAÇÃO:
 * - map() transforma cada venda em uma nova venda
 * - Spread operator (...venda) copia todas as propriedades
 * - Adiciona nova propriedade valorTotal calculada
 * - Number() e toFixed(2) garantem 2 casas decimais
 * - Mantém imutabilidade (não modifica array original)
 */


/**
 * ============================================================
 * SOLUÇÃO DESAFIO 2: Top 3 Vendas por Valor
 * ============================================================
 */

const top3Vendas = [...vendasComTotal] // Spread cria cópia para não mutar o original
    .sort((a, b) => b.valorTotal - a.valorTotal) // Ordena decrescente
    .slice(0, 3) // Pega os 3 primeiros
    .map(venda => ({ // Simplifica o objeto
        produto: venda.produto,
        vendedor: venda.vendedor,
        valorTotal: venda.valorTotal
    }));

console.log('\n--- DESAFIO 2: Top 3 Maiores Vendas ---');
console.log(top3Vendas);

/**
 * EXPLICAÇÃO:
 * - [...vendasComTotal] cria cópia para evitar mutação
 * - sort() ordena por valorTotal (decrescente: b - a)
 * - slice(0, 3) retorna apenas os 3 primeiros
 * - map() cria objetos simplificados com apenas 3 propriedades
 */


/**
 * ============================================================
 * SOLUÇÃO DESAFIO 3: Receita por Categoria
 * ============================================================
 */

const receitaPorCategoria = vendasComTotal.reduce((acumulador, venda) => {
    // Se a categoria ainda não existe no acumulador, inicializa com 0
    if (!acumulador[venda.categoria]) {
        acumulador[venda.categoria] = 0;
    }
    // Soma o valor total à categoria correspondente
    acumulador[venda.categoria] += venda.valorTotal;
    // Arredonda para 2 casas decimais
    acumulador[venda.categoria] = Number(acumulador[venda.categoria].toFixed(2));
    return acumulador;
}, {}); // Objeto vazio como valor inicial

console.log('\n--- DESAFIO 3: Receita por Categoria ---');
console.log(receitaPorCategoria);

/**
 * EXPLICAÇÃO:
 * - reduce() transforma array em objeto
 * - Acumulador começa como objeto vazio {}
 * - Para cada venda, verifica se categoria já existe
 * - Se não existe, inicializa com 0
 * - Soma o valorTotal à categoria correspondente
 * - Retorna objeto com categorias como chaves e receitas como valores
 * 
 * ALTERNATIVA MAIS FUNCIONAL (sem if):
 */

const receitaPorCategoriaFuncional = vendasComTotal.reduce((acc, venda) => ({
    ...acc,
    [venda.categoria]: Number(((acc[venda.categoria] || 0) + venda.valorTotal).toFixed(2))
}), {});

console.log('\nAlternativa funcional:');
console.log(receitaPorCategoriaFuncional);


/**
 * ============================================================
 * SOLUÇÃO DESAFIO 4: Desempenho dos Vendedores
 * ============================================================
 */

const desempenhoVendedores = Object.entries(
    // Primeiro: agrupa vendas por vendedor
    vendasComTotal.reduce((acc, venda) => {
        if (!acc[venda.vendedor]) {
            acc[venda.vendedor] = {
                quantidadeVendas: 0,
                receitaTotal: 0
            };
        }
        acc[venda.vendedor].quantidadeVendas += 1;
        acc[venda.vendedor].receitaTotal += venda.valorTotal;
        return acc;
    }, {})
)
    // Transforma de [chave, valor] para objeto
    .map(([vendedor, dados]) => ({
        vendedor,
        quantidadeVendas: dados.quantidadeVendas,
        receitaTotal: Number(dados.receitaTotal.toFixed(2)),
        ticketMedio: Number((dados.receitaTotal / dados.quantidadeVendas).toFixed(2))
    }))
    // Ordena por receita total (decrescente)
    .sort((a, b) => b.receitaTotal - a.receitaTotal);

console.log('\n--- DESAFIO 4: Desempenho dos Vendedores ---');
console.log(desempenhoVendedores);

/**
 * EXPLICAÇÃO:
 * 1. reduce() agrupa vendas por vendedor em objeto
 * 2. Object.entries() transforma objeto em array de [chave, valor]
 * 3. map() transforma cada entrada em objeto com formato desejado
 * 4. Calcula ticketMedio = receitaTotal / quantidadeVendas
 * 5. sort() ordena por receitaTotal decrescente
 */


/**
 * ============================================================
 * SOLUÇÃO DESAFIO 5: Composição de Funções
 * ============================================================
 */

// 1. Função que retorna função (Higher-Order Function / Currying)
const filtrarPorCategoria = (categoria) => {
    return (vendas) => vendas.filter(venda => venda.categoria === categoria);
};

// 2. Função pura que calcula receita
const calcularReceita = (vendas) => {
    return vendas.reduce((total, venda) => {
        const valorVenda = venda.preco * venda.quantidade * (1 - venda.desconto);
        return total + valorVenda;
    }, 0);
};

// 3. Função que retorna função para aplicar desconto
const aplicarDescontoAdicional = (percentual) => {
    return (vendas) => vendas.map(venda => ({
        ...venda,
        desconto: venda.desconto + percentual - (venda.desconto * percentual)
        // Fórmula: novo desconto considera o desconto já existente
    }));
};

// Composição manual das funções
const eletronicos = filtrarPorCategoria('Eletrônicos')(vendas);
const eletronicosComDescontoExtra = aplicarDescontoAdicional(0.05)(eletronicos);
const receitaEletronicosComDescontoExtra = Number(calcularReceita(eletronicosComDescontoExtra).toFixed(2));

console.log('\n--- DESAFIO 5: Composição de Funções ---');
console.log('Receita de Eletrônicos com 5% desconto adicional:', receitaEletronicosComDescontoExtra);

/**
 * EXPLICAÇÃO:
 * - filtrarPorCategoria retorna uma função que filtra vendas
 * - aplicarDescontoAdicional retorna uma função que aplica desconto
 * - Compõe as funções: primeiro filtra, depois aplica desconto, depois calcula
 * - Cada função é pura e reutilizável
 * - Isso é CURRYING: funções que retornam funções
 */


/**
 * ============================================================
 * SOLUÇÃO DESAFIO BÔNUS: Pipeline de Transformação
 * ============================================================
 */

// Implementação da função pipe
const pipe = (...funcoes) => {
    return (valorInicial) => {
        return funcoes.reduce((valor, funcao) => funcao(valor), valorInicial);
    };
};

/**
 * EXPLICAÇÃO DO PIPE:
 * - Recebe N funções como argumentos
 * - Retorna uma função que recebe um valor inicial
 * - Aplica cada função no resultado da anterior (reduce)
 * - É o padrão "Pipeline" ou "Function Composition"
 */

// Funções auxiliares para o pipeline
const filtrarComDesconto = (vendas) => 
    vendas.filter(venda => venda.desconto > 0);

const calcularEconomia = (vendas) => 
    vendas.map(venda => ({
        ...venda,
        economia: Number((venda.preco * venda.quantidade * venda.desconto).toFixed(2))
    }));

const agruparPorVendedor = (vendas) => {
    return Object.entries(
        vendas.reduce((acc, venda) => {
            if (!acc[venda.vendedor]) {
                acc[venda.vendedor] = {
                    vendedor: venda.vendedor,
                    economiaTotal: 0,
                    vendasComDesconto: 0
                };
            }
            acc[venda.vendedor].economiaTotal += venda.economia;
            acc[venda.vendedor].vendasComDesconto += 1;
            return acc;
        }, {})
    ).map(([vendedor, dados]) => ({
        ...dados,
        economiaTotal: Number(dados.economiaTotal.toFixed(2))
    }));
};

const ordenarPorEconomia = (vendedores) => 
    [...vendedores].sort((a, b) => b.economiaTotal - a.economiaTotal);

// Usando o pipe para criar o relatório
const relatorioEconomia = pipe(
    filtrarComDesconto,
    calcularEconomia,
    agruparPorVendedor,
    ordenarPorEconomia
)(vendas);

console.log('\n--- DESAFIO BÔNUS: Economia Gerada por Descontos ---');
console.log(relatorioEconomia);

/**
 * EXPLICAÇÃO DO PIPELINE:
 * 1. filtrarComDesconto: remove vendas sem desconto
 * 2. calcularEconomia: adiciona propriedade 'economia' em cada venda
 * 3. agruparPorVendedor: agrupa por vendedor e soma economias
 * 4. ordenarPorEconomia: ordena por economia total decrescente
 * 
 * VANTAGENS DO PIPE:
 * - Código declarativo e legível
 * - Funções pequenas e reutilizáveis
 * - Fácil adicionar/remover etapas
 * - Testável (cada função pode ser testada isoladamente)
 */


/**
 * ============================================================
 * PONTUAÇÃO SUGERIDA:
 * ============================================================
 * Desafio 1: 1.5 pontos (básico - map)
 * Desafio 2: 2.0 pontos (intermediário - sort + slice + map)
 * Desafio 3: 2.0 pontos (intermediário - reduce com objeto)
 * Desafio 4: 2.5 pontos (avançado - reduce + entries + map + sort)
 * Desafio 5: 1.5 pontos (avançado - composição e currying)
 * Desafio Bônus: 0.5 pontos extras (muito avançado - pipe)
 * 
 * TOTAL: 10 pontos (+ 0.5 bônus)
 * ============================================================
 * 
 * CRITÉRIOS DE AVALIAÇÃO:
 * ✓ Código funciona corretamente
 * ✓ Não usa mutação de dados
 * ✓ Usa apenas programação funcional (sem loops)
 * ✓ Funções são puras
 * ✓ Código é legível e bem estruturado
 * ✓ Usa arrow functions adequadamente
 * ============================================================
 */
