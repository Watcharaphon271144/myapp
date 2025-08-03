const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');
const authMiddleware = require('../middlewares/auth');

// Create Shop (POST /shops) - Require token
router.post('/shops', authMiddleware, async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }
    const newShop = await Shop.create({ name, address });
    res.status(201).json({ message: 'Shop created successfully', shop: newShop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Shops (GET /shops) - Support query ?name=xxx
router.get('/shops', async (req, res) => {
  try {
    const { name } = req.query;
    let shops;
    if (name) {
      shops = await Shop.findAll({ where: { name } });
      if (shops.length === 0) return res.status(404).json({ message: 'No shops found with that name' });
    } else {
      shops = await Shop.findAll();
    }
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Shop (PUT /shops/:id) - Require token
router.put('/shops/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const shop = await Shop.findByPk(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.name = name || shop.name;
    shop.address = address || shop.address;
    await shop.save();

    res.json({ message: 'Shop updated successfully', shop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Shop (DELETE /shops/:id) - Require token
router.delete('/shops/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    await shop.destroy();
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
