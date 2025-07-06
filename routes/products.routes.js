const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

// Buscar por nombre en lugar de ID
router.get('/', controller.getAllProducts);
router.get('/:nombre', controller.getProductByName);
router.post('/', controller.createProduct);
router.put('/:nombre', controller.updateProduct);
router.delete('/:nombre', controller.deleteProduct);

module.exports = router;
