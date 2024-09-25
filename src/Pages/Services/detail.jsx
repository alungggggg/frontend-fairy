import Template from "../template/template";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const rekomendasiBuku = [
  {
    title: "Panduan Guru: Belajar dan Bermain Berbasis Buku",
    cover: "https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Belajar_dan_Bermain_Berbasis_Buku_BG_Paud_Cover.png",
  },
];

const getData = async (id) => {
  const response = await axios.get(`https://test-backend-pink.vercel.app/api/dongeng/${id}`);
  return response.data;
};

const sumview = async (id) => {
  try {
    const response = await axios.get(
      `https://test-backend-pink.vercel.app/api/dongengview/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getData(id).then((res) => setDetail(res));
    sumview(id).then((res) => {});
  }, []);
  return (
    <>
      <Template
        content={
          <main className="bg-secondary-light">
            <section className="pt-3 ">
              <section className="container p-3">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link
                        to={"/"}
                        className="text-decoration-none "
                        style={{ color: "#d8a25e" }}
                      >
                        Beranda
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link
                        to={"/katalog"}
                        className="text-decoration-none "
                        style={{ color: "#d8a25e" }}
                      >
                        Katalog
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link
                        to={"/"}
                        className="text-decoration-none "
                        style={{ color: "#d8a25e" }}
                      >
                        {detail.title}
                      </Link>
                    </li>
                  </ol>
                </nav>
              </section>
            </section>
            <section className="">
              <section className="container">
                <section
                  className="row p-5 rounded shadow"
                  style={{
                    backgroundImage:
                      "url(https://buku.kemdikbud.go.id/assets/image/catalog/Background.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "100%",
                    backgroundSize: "cover",
                    // borderRadius: "10px",
                    backgroundColor: "rgba(216, 162, 94 , 0.2)",
                  }}
                >
                  <section className="col-lg-3 text-center d-flex align-items-center justify-content-center position-relative">
                    <img
                      src={detail.cover}
                      className="hero-detail img-fluid"
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    ></img>
                    <button
                      className="btn btn-sm btn-danger position-absolute"
                      style={{ top: "10px", left: "10px" }}
                    >
                      Buku PDF
                    </button>
                  </section>
                  <section className="col-lg-9 pt-5 pt-md-0">
                    <h3 className="my-3">{detail.title}</h3>
                    <button
                      className="btn btn-sm btn-outline-primary py-2 mt-2"
                      onClick={() => navigate(`/dongeng/read/${id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-filetype-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                        />
                      </svg>
                      Baca Online
                    </button>
                    <section className="row align-items-center mb-3 mt-4">
                      <section className="col-6 col-lg-2">
                        <span>DETAIL DONGENG</span>
                      </section>
                      <section className="col-5 col-lg-10 p-0">
                        <hr />
                      </section>
                    </section>
                    <section className="row">
                      <section className="col-lg-2 mb-2 mb-md-0">
                        <section>Penerbit</section>
                        <small className="text-muted">-</small>
                      </section>
                      <section className="col-lg-2 mb-2 mb-md-0">
                        <section>Edisi</section>
                        <small className="text-muted">2024</small>
                      </section>
                      <section className="col-lg-3 mb-2 mb-md-0">
                        <section>Penulis</section>
                        <small className="text-muted">
                          Universias Nusantara PGRI Kediri
                        </small>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>

            <section className="py-5">
              <section className="container">
                <h4>Rekomendasi buku lainya</h4>
                <section className="row my-3">
                  {rekomendasiBuku.map((book) => (
                    <section className="col-lg-3 col-6 my-2" key={book.id}>
                      <Link
                        to={"dongeng/detail/" + book.id}
                        className="text-decoration-none text-dark position-relative"
                      >
                        <section
                          className="card border-1 mt-3 CardBook_card rounded shadow"
                          style={{ minHeight: "200px" }}
                        >
                          <section className="card-header text-center text-lg-start bg-white p-0 border-0">
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="img-fluid rounded-0"
                            />
                          </section>
                        </section>
                        <section
                          className="position-absolute d-flex flex-column gap-2"
                          style={{ top: "30px", left: "-2px" }}
                        >
                          <span
                            className="badge rounded bg-danger"
                            style={{ width: "50px" }}
                          >
                            PDF
                          </span>
                          <span className="badge rounded bg-secondary">
                            SMA/MA/SMK/MAK
                          </span>
                        </section>
                        <section
                          className="w-100 text-center px-5 px-lg-0 position-absolute bottom-0"
                          style={{ backgroundColor: "rgba(216, 162, 94, 0.7)" }}
                        >
                          <section className="fs-6 my-1 text-white">
                            {book.title}
                          </section>
                        </section>
                      </Link>
                    </section>
                  ))}
                </section>
              </section>
            </section>
          </main>
        }
      ></Template>
    </>
  );
};

export default Detail;
