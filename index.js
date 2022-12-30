const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const helmet=require("helmet");

const app = express();

const routerProducts = require("./routes/products.router")
const routerCategories = require("./routes/categories.router")
const routerUsers = require("./routes/users.router");
const { errorHandler, logErrors, boomErrorHandler } = require("./middlewares/error.handler");


const port = 3000;

const router = express.Router();

app.use(morgan("tiny"));
app.use(helmet());
app.use();
app.use(express.json());
app.use("/v1", router);

app.get("/", (req, res) => {
  res.send("server sample");
});

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/users", routerUsers);

router.use(logErrors);
router.use(boomErrorHandler);
router.use(errorHandler);


app.listen(port, () => {
  console.log("Escuchando en el puerto 3000");
});
