const express = require('express');
const router = express.Router();
// We will import nanoid dynamically inside the route handler
const Url = require('../models/url');

// Simple URL validation
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

// @route   POST /api/shorten
// @desc    Create a short URL
router.post('/shorten', async (req, res) => {
  // Dynamically import nanoid at the start of the function
  const { nanoid } = await import('nanoid');
  
  const { originalUrl } = req.body;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid original URL provided.' });
  }

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ originalUrl });

    if (url) {
      // If it exists, return the existing short URL
      res.json({ shortUrl: `${baseUrl}/${url.shortUrlId}` });
    } else {
      // If not, create a new short URL ID
      const shortUrlId = nanoid(7); // Generate a 7-character ID
      
      url = new Url({
        originalUrl,
        shortUrlId,
      });

      await url.save();
      res.status(201).json({ shortUrl: `${baseUrl}/${url.shortUrlId}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.'});
  }
});

module.exports = router;
