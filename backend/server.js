import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

//middelware
app.use(cors());
app.use(express.json());

//connectDB
mongoose.connect('mongodb://localhost:27017/product_item')
    .then(() => console.log("MongoDataBase Connected"));

//schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    id: Number,
    description: String,
    quntity: Number,
    categori: String,
});
const Product = mongoose.model("Product", productSchema);

//----------------------API----------------------
//POST API
app.post("/product", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ messege: "Product Insreted", product });
});

//GET API
app.get("/product", async (req, res) => {
    const product = await Product.find();
    res.json(product);
});

//PUT API
app.put("/product/:id", async (req, res) => {
    const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Product Updated", update });
});

//DELETE API
app.delete("/product/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
});

//Server Start
app.listen(3000, () => console.log("Server is running on port number 3000...."));