import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        style={{ backgroundColor: "#343131" }}
        className="p-0"
      >
        <section className="container py-5">
          <section className="row justify-content-between">
            <section className="col-md-4 pe-md-5 d-flex flex-column gap-3">
              <img
                src="https://logobagus.com/wp-content/uploads/2024/01/logo_unp_kediri-768x769.png"
                width={60}
                alt=""
              />
              <p className="text-white m-0">
                <strong className="p-0">Panji Kediri</strong>
              </p>
              <p>
                <small className="text-white">
                  Direktotat Riset, Teknologi, dan Pengabdian Masyarakat
                </small>
              </p>
            </section>
            <section className="col-md-4 mt-4 mt-md-0">
              <h5 className="footer-title">Peta Situs</h5>
              <ul className="nav flex-column">
                <section className="row">
                  <section className="col-md-6">
                    <Link
                      to={"/"}
                      className="nav-link text-white px-0"
                      aria-current="page"
                    >
                      Beranda
                    </Link>
                    <Link to={"/katalog"} className="nav-link text-white px-0">
                      Daftar Dongeng
                    </Link>
                    <Link
                      to={"/petunjuk"}
                      className="nav-link text-white px-0"
                      rel="noreferrer"
                    >
                      Petunjuk
                    </Link>
                  </section>
                  {/* <section className="col-md-6">
                    <Link to={"/profile"} className="nav-link text-white">
                      Profile
                    </Link>
                  </section> */}
                </section>
              </ul>
            </section>
            <section className="col-md-4 mt-4 mt-md-0 d-flex flex-column gap-3">
              <h5 className="footer-title">Kontak Kami</h5>
              <p className="text-white d-flex gap-1 align-items-center m-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <p className="m-0" style={{minWidth: "210px"}}>
                  Jalan K. H. Achmad Dahlan 76 Mojoroto Kota Kediri
                </p>
              </p>
              <Link
                to={""}
                className="text-white text-decoration-none d-flex gap-1 align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="currentColor"
                  className="bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                  />
                </svg>
                <p className="m-0">0856-3402-402</p>
              </Link>
              <Link
                to={""}
                className="text-white text-decoration-none d-flex gap-1 align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
                <p className="m-0">encil@unpkediri.ac.id</p>
              </Link>
            </section>
          </section>
          <section className="d-flex justify-content-between align-items-center my-3">
            <section className="">
              <p className="text-white m-0">
                © Copyrights 2024 Universitas Nusantara PGRI Kediri. All rights
                reserved.
              </p>
            </section>
            <section className="">
              <Link to={"#"} className="btn btn-warning rounded">
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
              </Link>
            </section>
          </section>
        </section>
      </footer>
    </>
  );
};

export default Footer;
