require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Url = require("./models/url"); // Import the model

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// --- IMPORTANT ---
// Use the variable from the .env file
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('Could not connect to MongoDB.', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---

// Serve the static frontend file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Use the API route for shortening URLs
const urlRoutes = require("./routes/url");
app.use("/api", urlRoutes);

// Redirection Route: Handles the short URL clicks
app.get("/:shortUrlId", async (req, res) => {
  try {
    // Find the URL document by its short ID
    const url = await Url.findOne({ shortUrlId: req.params.shortUrlId });

    if (url) {
      // Increment the click count
      url.clicks++;
      await url.save();

      // Redirect to the original URL
      return res.redirect(url.originalUrl);
    } else {
      // If not found, send a 404 error
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
