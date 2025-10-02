import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

export const MergePDF = () => {

    const [files, setFiles] = useState([]);
    const [download_btn, showBtn] = useState(false);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleMerge = async () => {
        if (files.length === 0) return alert("Please select PDFs first!");
        const formData = new FormData();
        files.forEach((file) => formData.append("pdf", file));

        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_SERVER_URL}/merge-pdf`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            showBtn(res.data.merge_pdf_url);
            document.getElementById('upload_pdf').style.display = 'none';
        }).catch((err) => {
            console.error(err);
        })

    };


    return (
        <>
            <div className="container mt-5" id="upload_pdf">
                <h2 className="text-center mb-4">Upload PDFs</h2>
                <div className="file-input-wrapper text-center">
                    <label htmlFor="file-input" className="custom-file-upload">
                        Choose PDFs To Merge
                    </label>
                    <input type="file" id="file-input" multiple accept="application/pdf" onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Preview Section */}
                <div id="preview-container" className="preview-container mt-4 d-flex flex-wrap gap-3 justify-content-center">
                    {files.map((file, idx) => (
                        <div key={idx} className="text-center">
                            <img
                                src="/pdf-preview.png"
                                alt="PDF Preview"
                                className="feature-img"
                                style={{ width: "120px" }}
                            />
                            <p style={{ fontSize: "0.9rem" }}>{file.name}</p>
                        </div>
                    ))}
                </div>

                {files.length > 0 && (
                    <div className="text-center mt-4">
                        <button className="btn btn-dark" onClick={handleMerge}>
                            Merge PDFs
                        </button>
                    </div>
                )}

            </div>

            <br />
            <br />

            {download_btn ? <>
                <div className="text-center">
                    <Link to={download_btn} className="btn btn-danger " download>Download pdf</Link>
                </div>
            </> : ''}

        </>
    )
}
