const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const projectPath = path.join(__dirname, "..");
const { PDFDocument } = require('pdf-lib');
const { promisify } = require("util");
const { execFile } = require("child_process");
const execFileAsync = promisify(execFile);


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

async function mergepdf(req, res, next) {
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
}

async function compresspdf(req, res, next) {
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
}

async function splitpdf(req, res, next) {
    const pdf = req.file;
    const pdf_path = "uploads/" + pdf.filename;
    const number = await getTotalFiles();
    const outputPath = "split-" + number + "-new.pdf";
    let hostAddress = req.protocol+"://"+req.get("host");

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

            splitFiles.push(hostAddress+"/"+fileName);
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
}

module.exports = { mergepdf, compresspdf, splitpdf };