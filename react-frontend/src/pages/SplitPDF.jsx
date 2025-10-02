import { useState } from "react";
import { Link } from "react-router";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";
import loader from '../assets/loader.gif';

export const SplitPDF = () => {

    const [file, setFile] = useState();
    const [download_btn, showBtn] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDownloadZip = async (files) => {
        const zip = new JSZip();

        for (let i = 0; i < files.length; i++) {
            const url = files[i];
            const filename = url.split("/").pop();
            const response = await fetch(url);
            const blob = await response.blob();
            zip.file(filename, blob);
        }

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "split_pdfs.zip");
        window.location.reload(true);
    };

    const handleSplit = async () => {
        console.log("split pdf process 1");
        document.getElementById("loader-section").style.display = "block";
        document.getElementById('upload_pdf').style.display = 'none';
        const formData = new FormData();
        formData.append("pdf", file);

        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_SERVER_URL}/split-pdf`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            showBtn(res.data);
            handleDownloadZip(res.data.files);

        }).catch((err) => {
            console.error(err);
        })

    };

    return (
        <>

            <div className="container mt-5" id="upload_pdf">
                <h2 className="text-center mb-4">Upload PDF</h2>
                <div className="file-input-wrapper text-center">
                    <label htmlFor="file-input" className="custom-file-upload">
                        Choose PDF & Split Pdf
                    </label>
                    <input type="file" id="file-input" accept="application/pdf" onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                {file ? <>
                    <div className="text-center mt-4">
                        <button className="btn btn-dark" onClick={handleSplit}>
                            Split Into PDFs
                        </button>
                    </div>
                </> : ''}

            </div>

            <br />
            <br />


            <div className="text-center" id="loader-section" style={{ display: "none" }}>
                <img src={loader} alt="" />
            </div>



        </>
    )
}
