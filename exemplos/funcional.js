const numeros = [1, 2, 3, 4, 5, 6];

// Declarativo, imutável e usa funções puras
const dobroDosPares = numeros
    .filter(n => n % 2 === 0) // Filtra pares
    .map(n => n * 2);        // Dobra

console.log("Funcional, imutável e usa funções puras");
console.log(dobroDosPares); // [4, 8, 12]