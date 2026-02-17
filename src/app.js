require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/product.routes");

app.use(express.json());

app.use("/api", routes);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Router Working ...!" });
});

console.log(process.env.MONGO_DB);

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Error while connecting mongo DB...?");
    process.exit(1);
  }
}

connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`server in running on ${process.env.PORT}`);
});
