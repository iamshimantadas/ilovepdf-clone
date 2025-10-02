const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const projectPath = path.join(__dirname, "..");
const { PDFDocument } = require('pdf-lib');

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

/** pdf merge config */
async function mergePDFs(pdfPaths, outputPath) {
    const mergedPdf = await PDFDocument.create();
    for (const pdfPath of pdfPaths) {
        const pdfBytes = fs.readFileSync(pdfPath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedPdfBytes);
    return outputPath;
}

async function mergeAndSavePDFs(pdfPaths, outputPath) {
    try {
        const mergedFileName = await mergePDFs(pdfPaths, "uploads/" + outputPath);
        return mergedFileName;
    } catch (error) {
        throw error;
    }
}

async function getTotalFiles() {
    try {
        const files = await fsPromises.readdir(projectPath + "/uploads/");
        let fileCount = 0;
        for (const file of files) {
            const filePath = path.join(projectPath + "/uploads/", file);
            const stat = await fsPromises.stat(filePath);
            if (stat.isFile()) {
                fileCount++;
            }
        }
        return fileCount;
    } catch (err) {
        throw err;
    }
}

/** routes */
router.get("/merge-pdf", upload.array('pdf', process.env.PDF_UPLOAD_FILES_MAX_LIMIT), async function (req, res, next) {
    const pdfs = req.files;
    if(pdfs.length > process.env.PDF_UPLOAD_FILES_MAX_LIMIT){
        res.send({"status":"failed", "message":`Upload maximum ${process.env.PDF_UPLOAD_FILES_MAX_LIMIT} files at a time`}, 501);
    }
    
    const pdfPaths = [];
    pdfs.forEach((x, y) => {
        pdfPaths.push("uploads/" + x.filename);
    });
    const number = await getTotalFiles();
    const outputPath = "merge-" + number + "-new.pdf";

    await mergeAndSavePDFs(pdfPaths, outputPath)
    .then(mergedFileName => {})
    .catch(error => {
    console.log(error)
    });
    let hostAddress = req.protocol+"://"+req.get("host");

    res.send({"status":"success", "merge_pdf_url": hostAddress+"/uploads/"+outputPath , "message":"pdf generated successfully"}, 201);
});


module.exports = router;