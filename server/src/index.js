const createApp = require('../src/createApp');
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./utility/db")
const express = require('express')
const path = require('path')

const app = createApp();

connectDb();

const PORT = process.env.PORT || 3000;


// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
