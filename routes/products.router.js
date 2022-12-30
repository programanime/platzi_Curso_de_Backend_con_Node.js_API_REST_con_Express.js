const express=require("express");

const ProductService = require("../services/product.service")
const router = express.Router();
const service = new ProductService();
const faker=require("faker");
const { validatorHandler } = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");

// curl -X GET -H "Content-Type: application/json" http://localhost:3000/v1/products
router.get(
  "/",
  async (req, res, next) => {
    try{
      const size = req.query.size || 1;
      const products = await service.find(size);
      res.json(products)
    }catch(e){
      next(e);
    }
  }
);

// curl -X GET -H "Content-Type: application/json" http://localhost:3000/v1/products/filter
router.get("/filter", async (req, res, next) => {
  try{
    res.send({
      id: 1,
      name: faker.name.firstName(),
      price: parseInt(faker.commerce.price())
    });
  }catch(e){
    next(e);
  }
});

// curl -X GET -H "Content-Type: application/json" http://localhost:3000/v1/products/1
// curl -X GET -H "Content-Type: application/json" http://localhost:3000/v1/products/101010
// curl -I -X GET -H "Content-Type: application/json" http://localhost:3000/v1/products/0
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try{
      const id = req.params.id;
      const product = await service.findOne(id);
      if(product){
        res.json(product)
      }else{
        res.status(404).json({});
      }
    }catch(e){
      next(e);
    }
  }
);

// curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"1\",\"name\":\"daniel\"}" http://localhost:3000/v1/products
// curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"1\",\"name\":\"daniel\",\"price\":10}" http://localhost:3000/v1/products
router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try{
      const body = req.body;
      await service.create(body);
      res.json({
        message: "created",
        data: body
      })
    }catch(e){
      next(e);
    }
  }
)

// curl -X PUT -H "Content-Type: application/json" -d "{\"id\":\"1\",\"name\":\"daniel molina\"}" http://localhost:3000/v1/products/1
// curl -X PUT -H "Content-Type: application/json" -d "{\"id\":\"1\",\"name\":\"daniel molina\"}" http://localhost:3000/v1/products/1
router.put(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try{
      const id = req.params.id;
      const body = req.body;
      const product = await service.update(id, body);

      res.json({
        id,
        data:product,
        message: "update"
      })
    }catch(error){
      next(error);
    }
  }
)

// curl -X PATCH -H "Content-Type: application/json" -d "{\"id\":\"1\",\"firstName\":\"daniel\"}" http://localhost:3000/v1/products/1
router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try{
      const id = req.params.id;
      const body = req.body;
      await service.partialUpdate(id, body);

      res.json({
        id,
        data:body,
        message: "partial update"
      })
    }catch(e){
      next(e);
    }
  }
)

// curl -X DELETE -H "Content-Type: application/json" -d "{\"id\":\"1\",\"name\":\"daniel molina\"}" http://localhost:3000/v1/products/1
router.delete("/:id", async (req, res, next) => {
  try{
    const id = req.params.id;
    await service.delete(id)
    res.json({
      id,
      message: "deleted"
    })
  }catch(e){
    next(e);
  }
})


module.exports = router;
