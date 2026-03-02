const posts = [
    { titulo: 'JS e o Futuro', curtidas: 150, categoria: 'Tecnologia' },
    { titulo: 'Receita de Bolo', curtidas: 80, categoria: 'Culinaria' },
    { titulo: 'Clean Code', curtidas: 200, categoria: 'Tecnologia' },
    { titulo: 'Dicas de Viagem', curtidas: 50, categoria: 'Entretenimento' },
    { titulo: 'React Hooks', curtidas: 300, categoria: 'Tecnologia' }
];

// --- RESOLUÇÃO DO DESAFIO ---

const totalCurtidasTech = posts
    // 1. Filtramos apenas os objetos que pertencem à categoria 'Tecnologia'
    .filter(post => post.categoria === 'Tecnologia')
    
    // 2. Transformamos o array de objetos em um array de números (curtidas)
    // Resultado intermediário: [150, 200, 300]
    .map(post => post.curtidas)
    
    // 3. Somamos todos os valores do array resultante
    // O 0 no final é o valor inicial do acumulador (boa prática!)
    .reduce((acumulador, curtidas) => acumulador + curtidas, 0);

console.log(`Total de curtidas em Tecnologia: ${totalCurtidasTech}`); 
// Saída esperada: 650