const express = require('express');
const router = express.Router();
const userRoutes = require('./v1/userRoutes');

router.use('/v1/user',userRoutes);

module.exports = router;