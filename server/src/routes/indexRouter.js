const express = require('express');
const router = express.Router();
const UserRoutes = require('./userRoutes')



router.use("/user",UserRoutes);


module.exports = router; 