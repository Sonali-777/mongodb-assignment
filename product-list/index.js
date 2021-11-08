const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/product-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Models
const Product = require("./models/Product");

app.get("/product/getAll", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

app.post("/product/add", (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    price: req.body.price,
  });

  product.save();

  res.json(product);
});
app.listen(3000);
