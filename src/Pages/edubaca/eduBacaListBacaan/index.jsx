import { useDispatch, useSelector } from "react-redux";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtikelData } from "../../../lib/redux/api/artikelSlice";

const EduBacaListBacaan = () => {
  const { isLoading, data: artikelData } = useSelector(
    (state) => state.artikel
  );
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState("");

  const filteredArtikelData = artikelData?.filter((item) =>
    item.judul.toLowerCase().includes(searchParams.toLowerCase())
  );

  useEffect(() => {
    async function handleGetArtikelData() {
      await dispatch(getArtikelData());
    }

    handleGetArtikelData();
  }, []);
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
                onChange={(e) => setSearchParams(e.target.value)}
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
            {isLoading ? (
              <div>Loading..</div>
            ) : (
              <section className="row row-cols-1 gy-3 gx-3 py-4">
                {filteredArtikelData?.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card">
                      <div className="card-body row">
                        <div className="col-2">
                          <img
                            src={"https://placehold.co/600x400"}
                            alt={item.judul || "Thumbnail Tidak Ditemukan"}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="col align-self-center">
                          <h5>{item.judul || "Judul Tidak Ditemukan"}</h5>
                          <p>
                            {item?.deskripsi || "Deskripsi Tidak Ditemukan"}
                          </p>
                          <div>
                            <Link to={`${item.id}`} className="btn btn-primary">
                              Baca Selengkapnya
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}
            {/* list artikel */}
          </section>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default EduBacaListBacaan;
