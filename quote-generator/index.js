const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/quote-generator", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Models
const Quote = require("./models/Quote");

app.get("/quote/getAll", async (req, res) => {
  const quotes = await Quote.find();

  res.json(quotes);
});

app.post("/quote/add", (req, res) => {
  const quote = new Quote({
    quote: req.body.quote,
    author: req.body.author,
  });

  quote.save();

  res.json(quote);
});
app.listen(3000);
