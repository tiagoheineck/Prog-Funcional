const logOperation = (operation) => {
  console.log(`Operation: ${operation}`);
};

const createProduct = (name) => {
  logOperation(`Creating product: ${name}`);
  return { name };
};

const createFactory = (factoryName) => {
  logOperation(`Creating factory: ${factoryName}`);
  return {
    name: factoryName,
    createProduct: (productName) => createProduct(productName),
  };
};

// Example usage
const myFactory = createFactory('My Factory');
const product1 = myFactory.createProduct('Product 1');
const product2 = myFactory.createProduct('Product 2');

console.log(product1); // { name: 'Product 1' }
console.log(product2); // { name: 'Product 2' }     