const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/pdfController');

/** storage config */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


router.post("/merge-pdf", upload.array('pdf', process.env.PDF_UPLOAD_FILES_MAX_LIMIT), controller.mergepdf);
router.post("/split-pdf", upload.single('pdf'), controller.splitpdf);
router.post("/compress-pdf", upload.single('pdf'), controller.compresspdf);



module.exports = router;