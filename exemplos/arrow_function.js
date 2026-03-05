function exemplo() {
    console.log("Exemplo de função tradicional");
}

exemplo(); // Exemplo de função tradicional

const a = function(x) {
    return x * 2;
}

console.log(a(5)); // 10

// aqui nós usamos uma ARROW FUNCTION, que é uma forma mais concisa de escrever funções em JavaScript. As arrow functions são especialmente úteis para funções anônimas ou para funções que serão passadas como argumentos para outras funções, como no caso do filter e map. Elas também têm um comportamento diferente em relação ao this, o que pode ser vantajoso em alguns casos.
const b = (x) => {
    return x * 2;
}

console.log(b(5)); // 10

const c = x => x * 2; // Forma mais concisa, sem chaves e return explícito

console.log(c(b(5))); // 20, aqui estamos passando o resultado de b(5) para a função c, que dobra o valor novamente.