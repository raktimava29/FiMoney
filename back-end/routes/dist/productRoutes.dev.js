"use strict";

var express = require('express');

var _require = require('../controllers/productController'),
    addProduct = _require.addProduct,
    updateProductQuantity = _require.updateProductQuantity,
    getProducts = _require.getProducts;

var protect = require('../config/protect');

var router = express.Router();
router.post('/products', protect, addProduct);
router.put('/products/:id/quantity', protect, updateProductQuantity);
router.get('/products', protect, getProducts);
module.exports = router;