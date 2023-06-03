const express = require('express');
const router = express.Router();
const Product= require('../model/event');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'productdeleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update the email of a user
router.post('/:id/email', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { email: String(email) } },
      { new: true }
    );
    res.json({ product, message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get latest users with pagination
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const { type, limit, page, sort } = req.query;
    let query = {};

    if (type === 'latest') {
      query = Event.find().sort({ _id: sort === 'asc' ? 1 : -1 }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
    } else {
      query = Event.find().sort({ _id: sort === 'asc' ? 1 : -1 });
    }

    const events = await query;
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
 module.exports = router;
