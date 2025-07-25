const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Add Product
const addProduct = asyncHandler(async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;

  if (!name || !type || !sku || !image_url || !description || quantity == null || price == null) {
    res.status(400);
    throw new Error("Cannot Add Product");
  }

  const product = await Product.create({ name, type, sku, image_url, description, quantity, price });

  if (product) {
    res.status(201).json({
      product_id: product._id,
      message: "Product created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Product not created");
  }
});

// Update Product Quantity
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity == null) {
    res.status(400);
    throw new Error("Quantity is required");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.quantity = quantity;
  const updated = await product.save();

  res.status(200).json(updated);
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

module.exports = { addProduct, updateProductQuantity, getProducts };
