"use strict";

var asyncHandler = require("express-async-handler");

var Product = require("../models/productModel"); // Add Product


var addProduct = asyncHandler(function _callee(req, res) {
  var _req$body, name, type, sku, image_url, description, quantity, price, product;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, type = _req$body.type, sku = _req$body.sku, image_url = _req$body.image_url, description = _req$body.description, quantity = _req$body.quantity, price = _req$body.price;

          if (!(!name || !type || !sku || !image_url || !description || quantity == null || price == null)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error("Cannot Add Product");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Product.create({
            name: name,
            type: type,
            sku: sku,
            image_url: image_url,
            description: description,
            quantity: quantity,
            price: price
          }));

        case 6:
          product = _context.sent;

          if (!product) {
            _context.next = 11;
            break;
          }

          res.status(201).json({
            product_id: product._id,
            message: "Product created successfully"
          });
          _context.next = 13;
          break;

        case 11:
          res.status(400);
          throw new Error("Product not created");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Update Product Quantity

var updateProductQuantity = asyncHandler(function _callee2(req, res) {
  var id, quantity, product, updated;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          quantity = req.body.quantity;

          if (!(quantity == null)) {
            _context2.next = 5;
            break;
          }

          res.status(400);
          throw new Error("Quantity is required");

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(Product.findById(id));

        case 7:
          product = _context2.sent;

          if (product) {
            _context2.next = 11;
            break;
          }

          res.status(404);
          throw new Error("Product not found");

        case 11:
          product.quantity = quantity;
          _context2.next = 14;
          return regeneratorRuntime.awrap(product.save());

        case 14:
          updated = _context2.sent;
          res.status(200).json(updated);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Get All Products

var getProducts = asyncHandler(function _callee3(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.find());

        case 2:
          products = _context3.sent;
          res.status(200).json(products);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = {
  addProduct: addProduct,
  updateProductQuantity: updateProductQuantity,
  getProducts: getProducts
};