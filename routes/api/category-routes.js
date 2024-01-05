const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to get all categories and their associated Products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get one category by its 'id' value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategoryData = await Category.create(req.body);

    // Respond with the newly created category data
    res.status(201).json(newCategoryData);
  } catch (err) {
    // Handle errors, e.g., validation error or database error
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to update a category by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategoryData[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to delete a category by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategoryData = await Category.destroy({
      where: { id: categoryId },
    });

    if (deletedCategoryData === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;