const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();
const PORT = 5600;

// Middleware to parse JSON data

app.use(cors());

app.use(express.json());

// Use the API routes

app.get('/api', (req, res) => {
  res.redirect('/api/images');
});

app.get('/', (req, res) => {
  res.redirect('/api/images');
});

app.use('/api', apiRoutes);

const username = encodeURIComponent('naman');
 const password = encodeURIComponent('Up@12345678');

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${username}:${password}@naman.4nxbgrp.mongodb.net/AugxProject?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
