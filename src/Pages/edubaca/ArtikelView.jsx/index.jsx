import { useParams } from "react-router-dom";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { useState } from "react";

const ArtikelView = () => {
  const [showArtikel, setShowArtikel] = useState(false);
  return (
    <section>
      <Header />
      <section
        className="bg-white bg-opacity-25"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <div className="container py-4">
          <div className="row gy-3 gx-3">
            <div className="col-lg-9">
              <div
                className="d-flex flex-column align-items-center justify-content-center rounded shadow shadow-sm position-relative"
                style={{ minHeight: "calc(85vh)", backgroundColor: "#F8F9FA" }}
              >
                <iframe
                  src={
                    showArtikel
                      ? "https://news.detik.com/berita/d-7936890/kapolri-pastikan-tindak-tegas-premanisme-masyarakat-harus-aman-siang-malam"
                      : ""
                  }
                  width="100%"
                  style={{ minHeight: "calc(85vh)" }}
                  frameborder="0"
                  className={`roumded shadow shadow-sm ${showArtikel ? "" : "d-none"}`}
                ></iframe>
                <p
                  className={`text-center fs-6 ${showArtikel ? "d-none" : ""}`}
                >
                  Silakan klik tombol "Tampilkan Artikel" untuk membaca artikel
                </p>
                 <div className="fs-5 fw-bold text-center py-2 bg-white w-100 position-absolute top-0 shadow shadow-sm d-lg-none">00:00:00</div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow shadow-sm bg-white">
                <div className="card-body">
                  <div className="fs-3 fw-bold text-center py-3 d-none d-lg-block">00:00:00</div>
                  {showArtikel ? (
                    <button
                      style={{ backgroundColor: "#A0C878" }}
                      className="btn text-white fw-semibold w-100 py-3"
                      onClick={() => setShowArtikel(false)}
                    >
                      Mulai Quiz
                    </button>
                  ) : (
                    <button
                      style={{ backgroundColor: "#A0C878" }}
                      className="btn text-white fw-semibold w-100 py-3"
                      onClick={() => setShowArtikel(true)}
                    >
                      Tampilkan Artikel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default ArtikelView;
