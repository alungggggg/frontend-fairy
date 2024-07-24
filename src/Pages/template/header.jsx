const Header = () => {
  return (
    <>
      <header className="sticky-top fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-night">
          <section className="container">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <img
                src="https://buku.kemdikbud.go.id/assets/image/logo-sibi.png"
                height={50}
                alt="Logo"
              />
              <section className="navbar-dark" style={{ fontSize: "0.95rem" }}>
                <section>Sistem Informasi</section>
                <section className="fw-bold">Perbukuan Indonesia</section>
              </section>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <section className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-1">
                  <a href="/" className="nav-link fw-bold">
                    Beranda
                  </a>
                </li>
                <li className="nav-item dropdown mx-1">
                  <a href="/katalog" className="nav-link" role="button">
                    Katalog Buku
                  </a>
                </li>
                <li className="nav-item dropdown mx-1">
                  <a
                    href="/petunjuk"
                    className="nav-link dropdown-toggle dropdown-mobile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Petunjuk
                  </a>
                  <ul
                    className="dropdown-menu px-2"
                    aria-labelledby="dropdownCatalogue"
                  >
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2020.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Siswa</span>
                      </a>
                    </li>
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2021.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Guru</span>
                      </a>
                    </li>
                    <li>
                      <a href="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2022.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Orang Tua</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item mx-1">
                  <section className="nav-link" style={{ cursor: "pointer" }}>
                    Profil
                  </section>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0 text-center text-xl-start">
                <li className="nav-item ms-3 pt-1">
                  <a href="/login" className="btn btn-sm btn-outline-light">
                    Masuk
                  </a>
                </li>
              </ul>
            </section>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Header;
