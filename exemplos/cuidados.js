const lista = [1,2,3,4,5,6];

lista.push(7); // Modificando a lista original, estado mutável
console.log("Cuidado com mutabilidade!");
console.log(lista); // [1, 2, 3, 4, 5, 6, 7]

// PQ É ADICIONADO UM ELEMENTO A MAIS? PORQUE O PUSH MODIFICA A LISTA ORIGINAL, AO INVÉS DE CRIAR UMA NOVA LISTA COM O ELEMENTO ADICIONADO. ISSO PODE LEVAR A PROBLEMAS SE OUTRAS PARTES DO CÓDIGO TAMBÉM ESTIVEREM USANDO ESSA MESMA LISTA, POIS ELAS VÃO VER A LISTA MODIFICADA, O QUE PODE CAUSAR COMPORTAMENTOS INESPERADOS.

lista.slice(0, 3); // Modificando a lista original, estado mutável
console.log("Cuidado com mutabilidade!");
console.log(lista); // [1, 2, 3, 4, 5, 6, 7]

// O SLICE NÃO MODIFICA A LISTA ORIGINAL, ELE RETORNA UMA NOVA LISTA COM OS ELEMENTOS SELECIONADOS. ENTÃO A LISTA ORIGINAL PERMANECE INALTERADA. ISSO É UM EXEMPLO DE COMO
// Por que não é recomendado usar slice, mesmo retornando uma nova lista?

// O SLICE É UMA FUNÇÃO IMUTÁVEL, O QUE SIGNIFICA QUE ELA NÃO MODIFICA A LISTA ORIGINAL. NO ENTANTO, SE VOCÊ USAR O SLICE DE FORMA INADEQUADA, COMO POR EXEMPLO, ATRIBUINDO O RESULTADO DO SLICE A UMA VARIÁVEL E DEPOIS MODIFICANDO ESSA VARIÁVEL, VOCÊ PODE ACABAR MODIFICANDO A LISTA ORIGINAL SEM QUERER. POR ISSO É IMPORTANTE ENTENDER COMO AS FUNÇÕES IMUTÁVEIS FUNCIONAM E USÁ-LAS DE FORMA CORRETA PARA EVITAR PROBLEMAS DE MUTABILIDADE.
let listaPequena = lista.slice(0, 3); // Criando uma nova lista com os primeiros 3 elementos
listaPequena[2] = 10; // Modificando a nova lista, não afeta a lista original
console.log("Cuidado com mutabilidade!");
console.log(lista); // [1, 2, 3, 4, 5, 6, 7]
console.log(listaPequena); // [1, 2, 10]

// O SLICE É UMA FUNÇÃO IMUTÁVEL, O QUE SIGNIFICA QUE ELA NÃO MODIFICA A LISTA ORIGINAL. NO ENTANTO, SE VOCÊ USAR O SLICE DE FORMA INADEQUADA, COMO POR EXEMPLO, ATRIBUINDO O RESULTADO DO SLICE A UMA VARIÁVEL E DEPOIS MODIFICANDO ESSA VARIÁVEL, VOCÊ PODE ACABAR MODIFICANDO A LISTA ORIGINAL SEM QUERER. POR ISSO É IMPORTANTE ENTENDER COMO AS FUNÇÕES IMUTÁVEIS FUNCIONAM E USÁ-LAS DE FORMA CORRETA PARA EVITAR PROBLEMAS DE MUTABILIDADE.

var x = 5; // Variável mutável

function incrementar() {
    x++; // Modificando a variável global, estado mutável
}

incrementar();

console.log("Cuidado com mutabilidade!");
console.log(x); // 6

let y = 5;
function decrementar(a) {
     let y  = a - 1;
     console.log("Dentro da função, y é:", y); // 4
}

decrementar(y);

console.log("Cuidado com mutabilidade!");
console.log(y); // 5

