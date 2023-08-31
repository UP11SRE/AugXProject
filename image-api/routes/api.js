const express = require('express');
const Image = require('../models/Image');

const router = express.Router();

// Define a route for paginated data

router.get('/', async (req, res) => {
  res.send('Welcome Home'); // You can customize this response
});

router.get('/images', async (req, res) => {
  // ... (rest of the code for fetching paginated data)
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const skip = (page - 1) * pageSize;

  try {
    const totalImages = await Image.countDocuments();
    const images = await Image.find().skip(skip).limit(pageSize).select('url title download_url id');

    res.json({
      images,
      currentPage: page,
      totalPages: Math.ceil(totalImages / pageSize)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// PUT route to update image title
router.put('/images/:id', async (req, res) => {
  // ... (rest of the code for updating image title)
  const imageId = req.params.id;
  const { title } = req.body;

  try {
    const updatedImage = await Image.findOneAndUpdate(
      { id: imageId },
      { title },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json(updatedImage);
  } catch (error) {
    console.error('Error updating image title:', error);
    res.status(500).json({ error: 'Error updating image title' });
  }
});

// DELETE route to delete an image
router.delete('/images/:id', async (req, res) => {
  // ... (rest of the code for deleting an image)
  const imageId = req.params.id;

  try {
    const deletedImage = await Image.findOneAndDelete({ id: imageId });

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

module.exports = router;
