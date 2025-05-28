import Footer from "../../template/footer";
import Header from "../../template/header";
import { Link } from "react-router-dom";

const EduBacaListBacaan = () => {
  return (
    <section>
      <Header />
      <section
        className="bg-success bg-opacity-25"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <div className="container py-4">
          <section className="position-relative">
            <section className="input-group shadow-sm rounded-3">
              <span className="input-group-text bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input
                type="text"
                className="form-control py-3 border-start-0 border-end-0 px-2"
                placeholder="Cari Bacaan disini"
                aria-label="Cari Bacaan disini"
                // onChange={handleSearch}
              />
              <button
                className="btn btn-orange text-white"
                type="button"
                // onClick={handleSearch}
              >
                Cari
              </button>
            </section>

            {/* list artikel */}
            <section className="row row-cols-1 gy-3 gx-3 py-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Judul Bacaan {index + 1}</h5>
                      <p className="card-text">
                        Deskripsi singkat tentang bacaan ini. Bacaan ini sangat
                        menarik dan bermanfaat untuk meningkatkan kemampuan
                        membaca.
                      </p>
                      <Link to={`${9090909}`} className="btn btn-primary">
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            {/* list artikel */}
          </section>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default EduBacaListBacaan;
