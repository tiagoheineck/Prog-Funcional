const somar = a => b => a + b;

const somar5 = somar(5);

console.log(somar5(10)); // Output: 15
console.log(somar5(20)); // Output: 25

console.log(somar(2)); // Output: [Function (anonymous)];

console.log(somar(3)(4)); // Output: 7

// QUAL A MÁGICA?

const retornaA = a => b => a;

const retornaB = a => b => b;

console.log(retornaA(1)(2)); // Output: 1
console.log(retornaB(1)(2)); // Output: 2

const deixaClaro = a => b => `O valor de a é ${a} e o valor de b é ${b}`;

console.log(deixaClaro(10)(20)); 
// Output: "O valor de a é 10 e o valor de b é 20"