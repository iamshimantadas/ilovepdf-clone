import { Header } from "./Header"
import { Footer } from "./Footer"
import { Routes, Route } from "react-router"
import { Home } from "./pages/Home"
import { MergePDF } from "./pages/MergePDF"
import { SplitPDF } from "./pages/SplitPDF"
import { CompressPDF } from "./pages/CompressPDF"

function App() {

  return (
    <>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merge-pdf" element={<MergePDF />} />
        <Route path="/split-pdf" element={<SplitPDF />} />
        <Route path="/compress-pdf" element={<CompressPDF />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
