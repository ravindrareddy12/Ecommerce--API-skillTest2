// routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// Create a new product
router.post('/create', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = new Product({ name, quantity });
    await product.save();
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update the quantity of a product
router.post('/:id/update_quantity', async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.query;
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { quantity: Number(number) } },
      { new: true }
    );
    res.json({ product, message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
