const express = require('express');
const router = express.Router();
const db = require('../models');
const { Categories } = db;

// Fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Add a new category
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = await Categories.create({
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).send({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send({ message: 'Error adding category' });
  }
});

module.exports = router;
