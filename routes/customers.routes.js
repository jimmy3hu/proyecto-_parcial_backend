const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/customers.controller');

router.get('/', controller.getAllCustomers);
router.get('/:id', controller.getCustomerById);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('phone').notEmpty().withMessage('Teléfono requerido')
  ],
  controller.createCustomer
);

router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;
