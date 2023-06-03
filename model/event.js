// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: Number, required: true },
  password: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
