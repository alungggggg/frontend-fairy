const Footer = () => {
  return (
    <>
      <footer id="footer" style={{ backgroundColor: "#2f3e59" }}>
        <section className="container">
          <section className="row justify-content-between my-5">
            <section className="col-md-4 pe-md-5">
              <img
                src="https://buku.kemdikbud.go.id/assets/image/kemendikbud.webp"
                width={100}
                alt=""
              />
              <p className="text-white my-2">
                <strong>Pusat Perbukuan</strong>
              </p>
              <p>
                <small className="text-white">
                  Badan Standar, Kurikulum, dan Asesmen Pendidikan. Kementerian
                  Pendidikan, Kebudayaan, Riset, dan Teknologi.
                </small>
              </p>
            </section>
            <section className="col-md-5 mt-4 mt-md-0">
              <h5 className="footer-title ms-3">Peta Situs</h5>
              <ul className="nav flex-column">
                <section className="row">
                  <section className="col-md-6">
                    <a
                      href="#"
                      className="nav-link text-white"
                      aria-current="page"
                    >
                      Beranda
                    </a>
                    <a href="#" className="nav-link text-white">
                      Buku Teks Kurikulum Merdeka
                    </a>
                    <a href="#" className="nav-link text-white">
                      Buku Teks K-13
                    </a>
                    <a href="#" className="nav-link text-white">
                      Buku Nonteks
                    </a>
                    <a href="#" className="nav-link text-white">
                      Penilaian
                    </a>
                  </section>
                  <section className="col-md-6">
                    <a
                      href="#"
                      className="nav-link text-white"
                      rel="noreferrer"
                    >
                      Kebijakan
                    </a>
                    <a
                      href="#"
                      className="nav-link text-white"
                      rel="noreferrer"
                    >
                      Pembinaan
                    </a>
                    <a
                      href="#"
                      className="nav-link text-white"
                      rel="noreferrer"
                    >
                      Profil
                    </a>
                  </section>
                </section>
              </ul>
            </section>
            <section className="col-md-3 mt-4 mt-md-0">
              <h5 className="footer-title">Kontak Kami</h5>
              <p className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                Jalan RS. Fatmawati Gd D Komplek Kemendikbudristek Cipete,
                Jakarta 12410
              </p>
              <a href="" className="text-white text-decoration-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                  />
                </svg>
                021-3804248
              </a>
              <br />
              <a href="" className="text-white text-decoration-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
                buku@kemdikbud.go.id
              </a>
            </section>
          </section>
          <section className="row">
            <section className="col-11">
              <p className="text-white">
                © Copyrights 2022 Sistem Informasi Perbukuan Indonesia. All
                rights reserved.
              </p>
            </section>
            <section className="col text-end">
              <a href="#" className="btn btn-warning rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-arrow-up-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                </svg>
              </a>
            </section>
          </section>
        </section>
      </footer>
    </>
  );
};

export default Footer;
