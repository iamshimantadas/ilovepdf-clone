
export const Footer = () => {
  return (
    <>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark text-light">
    <p class="col-md-4 mb-0 text-light">© 2025 Company, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none" aria-label="Bootstrap">
      <svg class="bi me-2" width="40" height="32" aria-hidden="true">
        <use xlink:href="#bootstrap"></use>
      </svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-light">About</a></li>
    </ul>
  </footer>
    </>
  )
}
