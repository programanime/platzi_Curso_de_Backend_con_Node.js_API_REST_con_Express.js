var faker=require("faker");
var boom=require("@hapi/boom");

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for(let i=0; i<limit; i++){
      this.products.push({
        // id: faker.datatype.uuid(),
        id: i,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.lorem.sentence(),
        isBlock: faker.datatype.boolean() || (i%20 == 0)
      });
    }
  }

  create(product) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = {
          id: faker.random.uuid(),
          ...product
        }
        this.products.push(newProduct);
        resolve(newProduct)
      }, 5000);
    });
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product =  this.products.find(product => product.id == id);
    if(!product){
      throw boom.notFound("product not found");
    }else{
      if(product.isBlock){
        throw boom.conflict("product is block");
      }
    }
    return product;
  }

  async update(id, product) {
    const index = this.products.findIndex(product => product.id == id);
    if(index === -1){
      throw boom.notFound("product not found")
    }else{
      this.products.splice(index, 1, product);
    }
    return product;
  }

  async partialUpdate(id, product){
    const currentProduct = this.findOne(id)
    Object.assign(currentProduct, product)
  }

  async delete(id) {
    this.products = this.products.filter(product => product.id !== id)
  }
}

module.exports = ProductService;
