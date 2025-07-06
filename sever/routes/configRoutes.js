const express = require('express');
const { getEmailJsConfig } = require('../controller/configController');

const router = express.Router();

router.get('/emailjs', getEmailJsConfig);

module.exports = router;