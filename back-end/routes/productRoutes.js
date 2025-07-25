const express = require('express');
const {addProduct,updateProductQuantity,getProducts} = require('../controllers/productController');
const protect = require('../config/protect');

const router = express.Router();

router.post('/products', protect, addProduct);
router.put('/products/:id/quantity', protect, updateProductQuantity);
router.get('/products', protect, getProducts);

module.exports = router;
