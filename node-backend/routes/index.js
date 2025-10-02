const express = require('express');
const router = express();
const pdfmerge = require('../routes/pdfMerge');
const splitpdf = require('../routes/splitPDF');
const compresspdf = require('../routes/compressPDF');

router.use(pdfmerge);
router.use(splitpdf);
router.use(compresspdf);

module.exports = router;