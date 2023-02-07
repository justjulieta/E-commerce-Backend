const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags + its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find all tags + its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.creat(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!tagsData) {
    res.status(404).json({ message: 'No tags have been found with this ID.'})
  }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
