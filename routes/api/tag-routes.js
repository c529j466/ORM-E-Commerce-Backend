const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET route for all tags
router.get('/', async (req, res) => {
  try {
    //  findAll tags
    const tagData = await Tag.findAll({
      // Include its Products
      include: [{ model: Product, through: ProductTag, as: "tagged_products" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for single tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // Include its associated Product data
      include: [{ model: Product, through: ProductTag, as: "tagged_products" }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // UPDATE route to create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE route for a tag's name by its `id` value
router.put('/:id', (req, res) => {
  
});

// DELETE route for tag by its `id` value
router.delete('/:id', (req, res) => {
  
});

module.exports = router;
