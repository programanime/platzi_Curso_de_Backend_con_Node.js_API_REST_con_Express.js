const Joi=require("joi");

const createProductSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(3),
  image: Joi.string().uri(),
});

const updateProductSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(3),
  firstName: Joi.string().min(3),
  price: Joi.number().min(0)
})

const getProductSchema = Joi.object({
  id: Joi.string().max(3).required()
})


module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}
