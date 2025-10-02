import { Links, Link } from "react-router"
import { Home } from "./pages/Home"
import { MergePDF } from "./pages/MergePDF"
import { SplitPDF } from "./pages/SplitPDF"
import { CompressPDF } from "./pages/CompressPDF"


export const Header = () => {
    return (
        <>
            <header className="p-3 text-bg-dark" style={{
                background: "linear-gradient(90deg, #0d6efd 0%, #1c1f26 100%)"
            }}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        {/* Logo / Brand */}
                        
                            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg
                                className="bi me-2"
                                width={40}
                                height={32}
                                role="img"
                                aria-label="Bootstrap"
                            >
                                <use xlinkHref="#bootstrap" />
                            </svg>
                            <span className="fs-4 fw-bold">PDFify</span>
                            </Link>
                       

                        {/* Navigation */}
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ms-4">
                            <li>
                                <Link to="/" className="nav-link px-3 text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/merge-pdf" className="nav-link px-3 text-white">
                                    Merge PDF
                                </Link>
                            </li>
                            <li>
                                <Link to="/split-pdf" className="nav-link px-3 text-white">
                                    Split PDF
                                </Link>
                            </li>
                            <li>
                                <Link to="/compress-pdf" className="nav-link px-3 text-white">
                                    Compress PDF
                                </Link>
                            </li>
                        </ul>

                        {/* Buttons */}
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">
                                Login
                            </button>
                            <button type="button" className="btn btn-warning">
                                Sign-up
                            </button>
                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}
