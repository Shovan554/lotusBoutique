const express = require('express');
const router = express.Router();
const db = require('../models');
const { Products, Categories } = db;

// Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, sku, stockquantity, size, categoryID, imageurl } = req.body;

    console.log("Received data:", req.body);

    // Check if the category exists
    const category = await Categories.findByPk(categoryID);
    if (!category) {
      return res.status(400).json({ message: 'Category does not exist' });
    }

    const product = await Products.create({
      name,
      description,
      price: parseFloat(price),
      sku,
      stockquantity: parseInt(stockquantity, 10),
      size,
      imageurl,
      categoryID: parseInt(categoryID, 10)
    });

    res.json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
