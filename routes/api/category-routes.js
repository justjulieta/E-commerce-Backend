const router = require('express').Router();
const { Category, Product } = require('../../Develop/models');

// The `/api/categories` endpoint

// find all categories + its associated Products
router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` valueits associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categorydata) {
       res.status(404).json({ message: 'No catory has been found with this ID.' });
       return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);    
      res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category have been found with this ID.'})
  }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
