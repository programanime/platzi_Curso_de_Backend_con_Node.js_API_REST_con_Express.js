const express=require("express");
const router = express.Router();

// curl -X GET -H "Content-Type: application/json" http://localhost:3000/v1/categories/1/products/1
router.get("/:categoryId/products/:productId", (req, res) => {
  res.json({
    categoryId: req.params.categoryId,
    productId: req.params.productId,
    name: "product 2",
    price: 200
  })
});


module.exports = router;
