import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import loader from '../assets/loader.gif';

export const CompressPDF = () => {

    const [file, setFile] = useState();
    const [download_btn, showBtn] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCompress = async () => {
        console.log("split pdf process 1");
        document.getElementById("loader-section").style.display = "block";
        document.getElementById('upload_pdf').style.display = 'none';
        const formData = new FormData();
        formData.append("pdf", file);

        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_SERVER_URL}/compress-pdf`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            console.warn(res.data.compress_pdf_url);
            document.getElementById("loader-section").style.display = "none";
            showBtn(res.data.compress_pdf_url);
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
                        Choose PDF For Compress
                    </label>
                    <input type="file" id="file-input" accept="application/pdf" onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                {file ? <>
                    <div className="text-center mt-4">
                        <button className="btn btn-dark" onClick={handleCompress}>
                            Compress PDF
                        </button>
                    </div>
                </> : ''}

            </div>

            <br />
            <br />

            <div className="text-center" id="loader-section" style={{ display: "none" }}>
                <img src={loader} alt="" />
            </div>

            {download_btn ? <>
                <div className="text-center">
                    <Link to={download_btn} className="btn btn-danger " download>Download pdf</Link>
                </div>
            </> : ''}        

        </>
    )
}
