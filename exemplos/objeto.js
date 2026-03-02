const objeto = {
    nome: 'Objeto',
    tipo: 'Exemplo',
    descricao: 'Este é um exemplo de objeto em JavaScript.',
    propriedades: {
        cor: 'azul',
        tamanho: 'médio',
        peso: 'leve'
    },
    mostrarInformacoes: function() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Descrição: ${this.descricao}`);
        console.log('Propriedades:');
        for (let chave in this.propriedades) {
            console.log(`  ${chave}: ${this.propriedades[chave]}`);
        }
    }
};

// Exibindo as informações do objeto
objeto.mostrarInformacoes();

// Modificando uma propriedade do objeto
objeto.propriedades.cor = 'vermelho';
console.log("\nApós modificar a cor:");
objeto.mostrarInformacoes();

// Adicionando uma nova propriedade ao objeto
objeto.propriedades.material = 'plástico';
console.log("\nApós adicionar a propriedade material:");
objeto.mostrarInformacoes();

// Removendo uma propriedade do objeto
delete objeto.propriedades.peso;
console.log("\nApós remover a propriedade peso:");
objeto.mostrarInformacoes();    

objeto.mostrarInformacoes = function() {
    console.log("Não quero mostrar as informações do objeto!");
};

console.log("\nApós modificar o método mostrarInformacoes:");
objeto.mostrarInformacoes();