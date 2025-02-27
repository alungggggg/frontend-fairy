import Header from "../template/header";
import Footer from "../template/footer";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewsData } from "../../lib/redux/api/news";
import { useEffect } from "react";
import Loading from "../../Component/loading";

const Berita = () => {
  // Berita
  const { data: berita, isLoading } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  async function getBerita() {
    const res = await dispatch(getNewsData());
  }

  useEffect(() => {
    getBerita();
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        {isLoading ? (
          <section
            className="d-flex align-items-center justify-content-center w-full"
            style={{ height: "80vh" }}
          >
            <Loading />
          </section>
        ) : (
          <>
            <div>{/* <h1>Berita Terkini Anjay</h1> */}</div>
            <section className="py-2 position-relative w">
              <section className="">
                <section className="row align-items-center">
                  <section className="col-lg-6">
                    <h3 className="fw-bold">
                      Berita&nbsp;
                      <section className="d-inline-flex flex-column">
                        <span>untuk semua</span>
                        <span className="mtmin">
                          <img
                            src="https://buku.kemdikbud.go.id/assets/image/home/line-populer.png"
                            alt="Line title"
                          />
                        </span>
                      </section>
                    </h3>
                    <p className="">Temukan berita sesuai kebutuhanmu</p>
                  </section>
                  <section className="col-lg-6 text-end"></section>
                </section>

                <section className="row gy-4">
                  {berita.map((item, index) => (
                    <Link className="col-lg-4 d-flex" key={index} to={"./"+item.id}>
                      <section className="card shadow d-flex flex-column h-100 w-100">
                        <img
                          src={import.meta.env.VITE_IMG_URL+"/"+item.gambar}
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "contain",
                          }}
                          alt={item.judul}
                        />
                        <div className="card-body d-flex flex-column flex-grow-1">
                          <h3 className="text-center text-decoration-none">{item.judul}</h3>
                          <p className="card-text text-truncate flex-grow-1 text-decoration-none">
                            {item?.description || ""}
                          </p>
                        </div>
                      </section>
                    </Link>
                  ))}
                </section>
              </section>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Berita;
