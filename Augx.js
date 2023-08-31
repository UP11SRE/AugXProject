const axios = require('axios');
const mongoose = require('mongoose');

// Define the schema for your data
const imageSchema = new mongoose.Schema({
  id: String,
  author: String,
  width: Number,
  height: Number,
  url: String,
  download_url: String
});

// Replace special characters in username and password with URL-encoded equivalents
const username = encodeURIComponent('naman');
const password = encodeURIComponent('Up@12345678');

// Construct the MongoDB Atlas connection string
const atlasConnectionString = `mongodb+srv://${username}:${password}@naman.4nxbgrp.mongodb.net/AugxProject?retryWrites=true&w=majority`;

// Connect to MongoDB Atlas
mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a model based on the schema
const Image = mongoose.model('Image', imageSchema);

// Fetch data from the API
async function fetchData() {
  try {
    const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=100');
    const data = response.data;

    // Insert data into the MongoDB collection
    await Image.insertMany(data);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error fetching or inserting data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

fetchData();
