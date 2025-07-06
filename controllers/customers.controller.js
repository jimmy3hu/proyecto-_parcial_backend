const { getStoredCustomers, storeCustomers } = require('../data/customers');
const { validationResult } = require('express-validator');

exports.getAllCustomers = async (req, res) => {
  const customers = await getStoredCustomers();
  res.status(200).json({ customers });
};

exports.getCustomerById = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const customers = await getStoredCustomers();
  const customer = customers.find(c => c.name.trim().toLowerCase() === clave);
  if (!customer) return res.status(404).send('Cliente no encontrado');
  res.json({ customer });
};

exports.createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const customers = await getStoredCustomers();
  const { name, email, phone, address } = req.body;
  const clave = name.trim().toLowerCase();

  if (customers.some(c => c.name.trim().toLowerCase() === clave)) {
    return res.status(400).json({ message: 'Ya existe un cliente con ese nombre.' });
  }

  const newCustomer = {
    name: clave,
    email,
    phone,
    address
  };

  await storeCustomers([newCustomer, ...customers]);
  res.status(201).json({ message: 'Cliente creado.', customer: newCustomer });
};

exports.updateCustomer = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const customers = await getStoredCustomers();
  const index = customers.findIndex(c => c.name.trim().toLowerCase() === clave);
  if (index === -1) return res.status(404).send('Cliente no encontrado');

  customers[index] = { ...customers[index], ...req.body };
  await storeCustomers(customers);
  res.json(customers[index]);
};

exports.deleteCustomer = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const customers = await getStoredCustomers();
  const filtered = customers.filter(c => c.name.trim().toLowerCase() !== clave);
  await storeCustomers(filtered);
  res.status(204).send();
};
