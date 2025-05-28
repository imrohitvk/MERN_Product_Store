import Product from "../models/product.model.js"; // Import the Product model
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.status(200).json({ success: true, data: products }); // Send the products as a response
  } catch (error) {
    console.log("Error in Get products:", error.message); // Log the error message for debugging
    console.error("Error in Get products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; //user will send this data
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({ success:false, message: "please provide all fields"});
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct});
  }
  catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({success: false, message: "Server Error"});
  }
};

export const updateProduct = async (req, res) => {
  const {id} = req.params; // Extract the product ID from the request parameters

  const product = req.body; // Get the updated product data from the request body

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID" }); // Check if the ID is valid
  }

  try{
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); // Find the product by ID and update it with the new data
    res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" }); // Send the updated product as a respons
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params; // Extract the product ID from the request parameters
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product ID" }); // Check if the ID is valid
  }

  try {
    const product = await Product.findByIdAndDelete(id); // Find and delete the product by ID
    res.status(200).json({ success: true, data: product, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in Delete product:", error.message);
    console.error("Error in Delete product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
