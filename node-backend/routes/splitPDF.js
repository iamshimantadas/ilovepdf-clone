const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const projectPath = path.join(__dirname, "..");
const { PDFDocument } = require("pdf-lib");

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

/** It will split all pages into single pdfs. */
router.get("/split-pdf-all", upload.single('pdf'), async function (req, res, next) {
    const pdf = req.file;
    const pdf_path = "uploads/" + pdf.filename;
    const number = await getTotalFiles();
    const outputPath = "split-" + number + "-new.pdf";

    try {
        const inputPdfBytes = fs.readFileSync(pdf_path);
        const pdfDoc = await PDFDocument.load(inputPdfBytes);

        const totalPages = pdfDoc.getPageCount();
        console.log(`Total pages: ${totalPages}`);
        const splitFiles = [];

        for (let i = 0; i < totalPages; i++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(copiedPage);
            const pdfBytes = await newPdf.save();
            const number = await getTotalFiles();
            const fileName = 'uploads/'+`pdf_${i + 1 + number}.pdf`;
            fs.writeFileSync(fileName, pdfBytes);

            splitFiles.push(fileName);
        }

        res.send({
            "status":"success",
            "message": "PDF split successfully",
            "files": splitFiles,
        }, 201);

    } catch (err) {
        console.error(err);
        res.send({"status":"success", "message": "Failed to split PDF" });
    }
    let hostAddress = req.protocol+"://"+req.get("host");

    res.send({ "status": "success", "split_pdf_url": hostAddress + "/uploads/" + outputPath, "message": "pdf generated successfully" }, 201);
});

module.exports = router;