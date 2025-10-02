const express = require('express');
const router = express();
const pdf = require('../routes/pdf.js');

router.use(pdf);

module.exports = router;