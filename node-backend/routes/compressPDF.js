const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const projectPath = path.join(__dirname, "..");
const { promisify } = require("util");
const { execFile } = require("child_process");
const execFileAsync = promisify(execFile);

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

router.get("/compress-pdf", upload.single('pdf'), async function (req, res, next) {
    try {
        const inputPath = path.resolve("uploads", req.file.filename);
        const number = await getTotalFiles();
        const outputPath = path.resolve("uploads", `compress-${number}-new.pdf`);

        const gsBinary = "gswin64c";
        const gsArgs = [
            "-q",
            "-dNOPAUSE",
            "-dBATCH",
            "-dSAFER",
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.4",
            "-dPDFSETTINGS=/ebook",
            "-dEmbedAllFonts=true",
            "-dSubsetFonts=true",
            "-dAutoRotatePages=/None",
            "-dColorImageDownsampleType=/Bicubic",
            "-dColorImageResolution=100",
            "-dGrayImageDownsampleType=/Bicubic",
            "-dGrayImageResolution=100",
            "-dMonoImageDownsampleType=/Bicubic",
            "-dMonoImageResolution=100",
            `-sOutputFile=${outputPath}`,
            inputPath
        ];
        await execFileAsync(gsBinary, gsArgs);

        let hostAddress = req.protocol + "://" + req.get("host");

        res.send({ status: "success", compress_pdf_url: hostAddress + "/uploads/" + `compress-${number}-new.pdf`, message: "PDF compressed successfully" }, 201);

    } catch (err) {
        console.error("Error compressing PDF:", err);
        res.send({ status: "error", message: err.message }, 500);
    }
});

module.exports = router;