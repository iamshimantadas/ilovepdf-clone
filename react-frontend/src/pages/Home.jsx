export const Home = () => {
  return (
    <>
    
        <section className="hero">
          <div className="container">
            <h1>Merge PDF Files Easily</h1>
            <p className="lead">
              Combine multiple PDF documents into one file — fast, secure, and free.
            </p>
            <a href="#features" className="btn btn-warning btn-lg">
              Learn How
            </a>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <h2 className="fw-semibold">How does Merge PDF work?</h2>
                <p className="text-muted">
                  Our tool lets you upload two or more PDF files, arrange them in the
                  desired order, and download a single merged document. It’s perfect
                  for reports, e-books, contracts, and study material.
                </p>
                <ul className="list-unstyled text-muted">
                  <li>✔ Upload multiple PDFs at once</li>
                  <li>✔ Drag-and-drop to reorder pages</li>
                  <li>✔ Works on any device — no installation required</li>
                  <li>✔ Free &amp; secure</li>
                </ul>
                <a href="#" className="btn btn-primary mt-3">
                  Try Merging Now
                </a>
              </div>
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=800"
                  alt="Merging PDF demo"
                  className="img-fluid feature-img"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Extra Info */}


        <section id="features" className="py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <h2 className="fw-semibold">What is Split PDF?</h2>
                <p className="text-muted">
                  Splitting a PDF means dividing a large document into smaller files.
                  You can take out specific pages, break a report into chapters, or
                  extract only the sections you need without editing the entire file.
                </p>
                <h5 className="mt-4">How does it work?</h5>
                <ul className="list-unstyled text-muted">
                  <li>✔ Upload your PDF file</li>
                  <li>✔ Select page ranges (e.g., 1–3, 5–7)</li>
                  <li>✔ Download the new smaller PDFs instantly</li>
                </ul>
                <h5 className="mt-4">Why use Split PDF?</h5>
                <ul className="list-unstyled text-muted">
                  <li>✔ Share only the necessary pages</li>
                  <li>✔ Remove unwanted sections</li>
                  <li>✔ Organize large documents into chapters</li>
                </ul>
              </div>
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=800"
                  alt="Split PDF"
                  className="img-fluid feature-img"
                />
              </div>
            </div>
          </div>
        </section>


        <section id="features" className="py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <h2 className="fw-semibold">What is Compress PDF?</h2>
                <p className="text-muted">
                  Compressing a PDF means making the file smaller by optimizing images,
                  fonts, and removing unused data. The content of your file stays the
                  same, but the storage size is reduced.
                </p>
                <h5 className="mt-4">How does it work?</h5>
                <ul className="list-unstyled text-muted">
                  <li>✔ Upload your PDF file</li>
                  <li>✔ Choose a compression level (high, medium, low)</li>
                  <li>✔ Download the optimized smaller PDF</li>
                </ul>
                <h5 className="mt-4">Why use Compress PDF?</h5>
                <ul className="list-unstyled text-muted">
                  <li>✔ Share PDFs quickly by email or chat</li>
                  <li>✔ Save storage space on your device</li>
                  <li>✔ Faster uploading and downloading on websites</li>
                </ul>
              </div>
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=800"
                  alt="Compress PDF"
                  className="img-fluid feature-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <h3 className="mb-4 text-center">Why choose PDFify?</h3>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <img
                  src="https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=400"
                  className="img-fluid feature-img mb-3"
                  alt="Secure PDF"
                />
                <h5>Secure</h5>
                <p className="small text-muted">
                  Your files are never shared and are deleted automatically after
                  processing.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=400"
                  className="img-fluid feature-img mb-3"
                  alt="Fast PDF tool"
                />
                <h5>Fast</h5>
                <p className="small text-muted">
                  Get your merged document within seconds, no matter the size.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=400"
                  className="img-fluid feature-img mb-3"
                  alt="Easy PDF merge"
                />
                <h5>Easy to Use</h5>
                <p className="small text-muted">
                  Simple UI designed for everyone, from students to professionals.
                </p>
              </div>
            </div>
          </div>
        </section>
    
    </>
  )
}
