import Header from "../template/header";
import CountUp from "./Component/countUp";
import Footer from "../template/footer";
import { getCookie, getCookies } from "cookies-next";
import fairyApi from "../../lib/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewAccessToken } from "../../lib/redux/api/auth";
import { getUserById } from "../../lib/redux/api/users";
import { Link } from "react-router-dom";
import modelAI from "../../lib/AI";

const PopularBook = async () => {
  const { data } = await fairyApi.get("/popular");
  return data;
};

const countBook = async () => {
  const { data } = await fairyApi.get("/count/dongeng");
  return data.row;
};

const countView = async () => {
  const { data } = await fairyApi.get("/count/view");
  return data.views;
};

const newVisitor = async () => {
  await fairyApi.get("/visited");
};

const getVisitor = async () => {
  const { data } = await fairyApi.get("/visited/get");
  return data.visited;
};

const Home = () => {
  // console.log()
  const [populer, setPopuler] = useState([]);
  const [countDongeng, setCountDongeng] = useState(0);
  const [countViews, setCountViews] = useState(0);
  const [visited, setVisited] = useState(0);

  useEffect(() => {
    const set = async () => {
      setPopuler(await PopularBook());
      setCountDongeng(await countBook());
      setCountViews(await countView());
      setVisited(await getVisitor());
      await newVisitor();
    };
    set();
  }, []);

  const [quotes, setQuotes] = useState("");

  async function generateAI() {
    const promp = "buat satu kalimat motivasi pendek dengan tema dongeng";
    const result = await modelAI.generateContent(promp);
    const speech = new SpeechSynthesisUtterance(result.response.text());
    speech.lang = "ID";
    window.speechSynthesis.speak(speech);
    setQuotes(result.response.text());
  }

  return (
    <>
      <Header />
      <main className="bg-secondary-light">
        <section className="bg-secondary-light position-relative py-5 mb-5">
          <section className="container">
            <section className="row">
              <section className="col-lg-6 order-last order-lg-first my-lg-auto">
                <h1
                  className="jumbo-title text-white fw-bold text-center text-lg-start pt-3 pt-lg-0"
                  style={{ fontSize: "44px" }}
                >
                  Cerita Panji Kediri
                </h1>
                {/* <p class="lead text-white">  */}
                <section className="d-flex flex-column position-relative">
                  <p className="text-white text-center text-lg-start w-100">
                    Akses di manapun, kapanpun, Baca dongeng yuk!
                  </p>
                  <span
                    className="mtmin d-none d-lg-block position-absolute"
                    style={{ bottom: "5px", left: "0%" }}
                  >
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/line-title.png"
                      alt="line-title"
                    />
                  </span>
                </section>
                {/* </p> */}
                <section className="input-group shadow mt-5">
                  {/* <span className="input-group-text bg-white border-0">
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
                  </span> */}
                  <input
                    type="text"
                    className="form-control p-3 border-0 fw-light text-gray"
                    placeholder="Klik untuk mendapat quote...."
                    aria-label="Cari buku disini"
                    value={quotes}
                  />
                  <section
                    className="bg-white my-auto"
                    style={{ padding: 9 }}
                    onClick={generateAI}
                  >
                    <button className="btn btn-orange text-white" type="button">
                      Quotes
                    </button>
                  </section>
                </section>
                <section className="position-relative bg-danger" />
              </section>
              <section className="col-lg-6">
                <img
                  src="COVER_CERITA_PANJI_POPULER-1-removebg-preview.png"
                  className="w-100"
                  alt=""
                />
              </section>
            </section>
          </section>
          {/* <img
            src="https://buku.kemdikbud.go.id/assets/image/home/aset%20home%20night.png"
            className="d-none d-lg-block position-absolute "
            style={{ zIndex: 1, left: "45%", bottom: "3%" }}
            alt="jumbotron"
          /> */}
        </section>
        <section className="p-4 container-fluid bg-primary">
          <section className="row text-center justify-content-start justify-content-lg-center">
            <section className="col-6 col-lg-2">
              <section className="position-relative">
                <section className="position-relative" style={{ zIndex: 100 }}>
                  <span className="text-white fs-1 fw-bold">
                    <CountUp start={0} end={countViews} duration={2000} />
                  </span>
                </section>
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                  className="position-absolute mx-auto"
                  style={{ zIndex: 1, bottom: "5%", left: "16%", width: "65%" }}
                  alt=""
                />
              </section>
              <p className="text-white">Kali buku dibaca</p>
            </section>
            <section className="col-6 col-lg-2">
              <section className="position-relative">
                <section className="position-relative" style={{ zIndex: 100 }}>
                  <span className="text-white fs-1 fw-bold">
                    <CountUp start={0} end={countDongeng} duration={2000} />
                  </span>
                </section>
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                  className="position-absolute mx-auto"
                  style={{ zIndex: 1, bottom: "5%", left: "16%", width: "65%" }}
                  alt=""
                />
              </section>
              <p className="text-white">Buku tersedia</p>
            </section>
            <section className="col-6 col-lg-2">
              <section className="position-relative">
                <section className="position-relative" style={{ zIndex: 100 }}>
                  <span className="text-white fs-1 fw-bold">
                    <CountUp start={0} end={visited} duration={2000} />
                  </span>
                </section>
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                  className="position-absolute mx-auto"
                  style={{ zIndex: 1, bottom: "5%", left: "16%", width: "65%" }}
                  alt=""
                />
              </section>
              <p className="text-white">Total kunjungan</p>
            </section>
          </section>
        </section>
        <section
          className="py-5"
          style={{
            background: "linear-gradient(0deg ,#EEDF7A -30%, #FFFFFF 70%)",
          }}
        >
          <section className="container-lg p-3">
            <section className="row align-items-center">
              <section className="col-lg-6">
                <h3 className="fw-bold">
                  Dongeng&nbsp;
                  <section className="d-inline-flex flex-column">
                    <span>terpopuler</span>
                    <span className="mtmin">
                      <img
                        src="https://buku.kemdikbud.go.id/assets/image/home/line-populer.png"
                        alt="Line title"
                      />
                    </span>
                  </section>
                </h3>
                <p className="">
                  Jelajahi dongeng populer dari pusat perbukuan resmi
                </p>
              </section>
              <section className="col-lg-6 text-end">
                <Link
                  to={"/katalog"}
                  className="btn btn-lg bg-secondary text-white"
                >
                  Lihat semua buku
                </Link>
              </section>
            </section>
            <section className="row mt-4">
              {populer.map((book) => (
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
                        SMP/MTS
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
        {getCookies("accessToken") && (
          <section className="py-5 bg-white d-none">
            <section className="container-lg p-3">
              <section className="row align-items-center">
                <section className="col-lg-6">
                  <h3 className="fw-bold">
                    Buku&nbsp;
                    <section className="d-inline-flex flex-column">
                      <span>Audio</span>
                      <span className="mtmin">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/line-populer.png"
                          alt="Line title"
                        />
                      </span>
                    </section>
                  </h3>
                  <p className="">
                    Belajar lebih interaktif dan mudah dengan buku audio
                  </p>
                </section>
                <section className="col-lg-6 text-end">
                  <Link to={"#"} className="btn btn-sm btn-outline-primary">
                    Lihat semua buku audio
                  </Link>
                </section>
              </section>
              <section className="row mt-4">
                <section className="col-lg-3 my-2">
                  <Link to={"#"} className="text-decoration-none text-dark">
                    <section className="card border-0 mt-3 CardBook_card">
                      <section
                        className="card-header text-center text-lg-start bg-white p-0 border-0"
                        style={{
                          backgroundImage:
                            'url("https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                        }}
                      >
                        <img
                          src="https://static.buku.kemdikbud.go.id/content/thumbnail/Cover_Kelas_XI_B_Indonesia_BS.png"
                          alt="Bahasa Indonesia Kelas XI"
                          className="CardBook_img-size"
                        />
                      </section>
                      <section className="card-body px-5 px-lg-0 py-2">
                        <span className="badge rounded-pill bg-success mt-2">
                          Audio
                        </span>
                        <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                          SMA/MA/SMK/MAK
                        </span>
                        <section className="my-2">
                          Bahasa Indonesia Kelas XI
                        </section>
                      </section>
                    </section>
                  </Link>
                </section>
                <section className="col-lg-3 my-2">
                  <Link to={"#"} className="text-decoration-none text-dark">
                    <section className="card border-0 mt-3 CardBook_card">
                      <section
                        className="card-header text-center text-lg-start bg-white p-0 border-0"
                        style={{
                          backgroundImage:
                            'url("https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                        }}
                      >
                        <img
                          src="https://static.buku.kemdikbud.go.id/content/thumbnail/Cover_Kelas_XI_B_Indonesia_BS.png"
                          alt="Bahasa Indonesia Kelas XI"
                          className="CardBook_img-size"
                        />
                      </section>
                      <section className="card-body px-5 px-lg-0 py-2">
                        <span className="badge rounded-pill bg-success mt-2">
                          Audio
                        </span>
                        <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                          SMA/MA/SMK/MAK
                        </span>
                        <section className="my-2">
                          Bahasa Indonesia Kelas XI
                        </section>
                      </section>
                    </section>
                  </Link>
                </section>
                <section className="col-lg-3 my-2">
                  <Link to={"#"} className="text-decoration-none text-dark">
                    <section className="card border-0 mt-3 CardBook_card">
                      <section
                        className="card-header text-center text-lg-start bg-white p-0 border-0"
                        style={{
                          backgroundImage:
                            'url("https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                        }}
                      >
                        <img
                          src="https://static.buku.kemdikbud.go.id/content/thumbnail/Cover_Kelas_XI_B_Indonesia_BS.png"
                          alt="Bahasa Indonesia Kelas XI"
                          className="CardBook_img-size"
                        />
                      </section>
                      <section className="card-body px-5 px-lg-0 py-2">
                        <span className="badge rounded-pill bg-success mt-2">
                          Audio
                        </span>
                        <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                          SMA/MA/SMK/MAK
                        </span>
                        <section className="my-2">
                          Bahasa Indonesia Kelas XI
                        </section>
                      </section>
                    </section>
                  </Link>
                </section>
                <section className="col-lg-3 my-2">
                  <Link to={"#"} className="text-decoration-none text-dark">
                    <section className="card border-0 mt-3 CardBook_card">
                      <section
                        className="card-header text-center text-lg-start bg-white p-0 border-0"
                        style={{
                          backgroundImage:
                            'url("https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                        }}
                      >
                        <img
                          src="https://static.buku.kemdikbud.go.id/content/thumbnail/Cover_Kelas_XI_B_Indonesia_BS.png"
                          alt="Bahasa Indonesia Kelas XI"
                          className="CardBook_img-size"
                        />
                      </section>
                      <section className="card-body px-5 px-lg-0 py-2">
                        <span className="badge rounded-pill bg-success mt-2">
                          Audio
                        </span>
                        <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                          SMA/MA/SMK/MAK
                        </span>
                        <section className="my-2">
                          Bahasa Indonesia Kelas XI
                        </section>
                      </section>
                    </section>
                  </Link>
                </section>
              </section>
            </section>
          </section>
        )}

        <section
          className="py-2 position-relative"
          // style={{
          //   backgroundColor: "#e9f7fe",
          //   backgroundImage:
          //     "url(https://buku.kemdikbud.go.id/assets/image/home/bg-book-for-all.png)",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "100%",
          //   // backgroundBlendMode: "lighten",
          // }}
        >
          <img
            src="https://buku.kemdikbud.go.id/assets/image/home/bg-book-for-all.png"
            className="w-100 position-absolute top-0 d-none d-lg-block"
            style={{ height: "100%" }}
          />
          <section className="container p-3">
            <h3 className="fw-bold">
              Cerita&nbsp;
              <section className="d-inline-flex flex-column">
                <span>untuk semua</span>
                <span className="mtmin">
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-access-book.png"
                    className="line-access w-100"
                    alt="Line title"
                  />
                </span>
              </section>
            </h3>
            <p className="mtmin text-acces">
              Temukan cerita sesuai kebutuhanmu
            </p>
            <section className="row">
              <section className="col-lg-4">
                <section
                  className="card mb-3 p-2 shadow"
                  style={{ height: "90%" }}
                >
                  <section className="row g-0">
                    <section className="col-md-3 text-center ps-lg-2">
                      <img
                        src="https://buku.kemdikbud.go.id/assets/image/home/Group%2020.png"
                        className="img-fluid rounded-start mt-3"
                        alt="..."
                      />
                    </section>
                    <section className="col-md-9">
                      <section className="card-body px-3">
                        <section
                          className="fw-bold mb-1"
                          style={{ fontSize: "1.1rem" }}
                        >
                          Siswa
                        </section>
                        <p className="card-text text-muted">
                          Belajar lebih asik dengan cerita panji kediri
                        </p>
                        <Link to={"/katalog"}>
                          <small className="text-primary fw-bold">
                            Lihat selengkapnya →
                          </small>
                        </Link>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
              <section className="col-lg-4">
                <section
                  className="card mb-3 p-2 shadow"
                  style={{ height: "90%" }}
                >
                  <section className="row g-0">
                    <section className="col-md-3 text-center ps-lg-2">
                      <img
                        src="https://buku.kemdikbud.go.id/assets/image/home/Group%2021.png"
                        className="img-fluid rounded-start mt-3"
                        alt="..."
                      />
                    </section>
                    <section className="col-md-9">
                      <section className="card-body px-3">
                        <section
                          className="fw-bold mb-1"
                          style={{ fontSize: "1.1rem" }}
                        >
                          Guru
                        </section>
                        <p className="card-text text-muted">
                          Dapatkan akses cerita untuk bahan ajar di kelas
                        </p>
                        <Link to={"/katalog"}>
                          <small className="text-primary fw-bold">
                            Lihat selengkapnya →
                          </small>
                        </Link>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
              <section className="col-lg-4">
                <section
                  className="card mb-3 p-2 shadow"
                  style={{ height: "90%" }}
                >
                  <section className="row g-0">
                    <section className="col-md-3 text-center ps-lg-2">
                      <img
                        src="https://buku.kemdikbud.go.id/assets/image/home/Group%2022.png"
                        className="img-fluid rounded-start mt-3"
                        alt="..."
                      />
                    </section>
                    <section className="col-md-9">
                      <section className="card-body px-3">
                        <section
                          className="fw-bold mb-1"
                          style={{ fontSize: "1.1rem" }}
                        >
                          Umum
                        </section>
                        <p className="card-text text-muted">
                          Bantu tingkatkan belajar anak
                        </p>
                        <Link to={"/katalog"} className="">
                          <small className="text-primary fw-bold">
                            Lihat selengkapnya →
                          </small>
                        </Link>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className="bg-primary">
          <section className="container">
            <section className="row">
              <section className="col-lg-7 py-5">
                <section className="">
                  <h4 className="fw-bold text-white">
                    Pertanyaan yang sering ditanyakan
                  </h4>
                  <section
                    className="accordion accordion-flush my-4"
                    id="accordion-flushex"
                  >
                    <section className="accordion-item mb-2 border-0 bg-primary text-white">
                      <h2 className="accordion-header" id="flushHd1">
                        <button
                          className="accordion-button collapsed ps-1 bg-primary text-white"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapse1"
                          aria-expanded="false"
                          aria-controls="flush-collapse1"
                        >
                          Apa itu buku Cerita Panji Kediri
                        </button>
                      </h2>
                      <section
                        id="flush-collapse1"
                        className="accordion-collapse collapse"
                        aria-labelledby="flushHd1"
                        data-bs-parent="accordion-flushex"
                      >
                        <section className="accordion-body">
                          Dongeng yang dikembangkan dan diterbitkan oleh tim
                          peneliti Universitas Nusantara PGRI Kediri yang di
                          danai oleh DRTPM.
                        </section>
                      </section>
                    </section>
                    <section
                      className="accordion-item mb-2 border-0 bg-primary text-white"
                      style={{ backgroundColor: "#6686b7" }}
                    >
                      <h2 className="accordion-header" id="flushHd2">
                        <button
                          className="accordion-button collapsed ps-1 bg-primary text-white"
                          style={{ backgroundColor: "#6686b7" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapse2"
                          aria-expanded="false"
                          aria-controls="flush-collapse2"
                        >
                          Bagaimana cara mendaftar di Panji Kediri?
                        </button>
                      </h2>
                      <section
                        id="flush-collapse2"
                        className="accordion-collapse collapse"
                        aria-labelledby="flushHd2"
                        data-bs-parent="accordion-flushex"
                      >
                        <section className="accordion-body">
                          Silahkan klik Masuk di bagian pojok kanan atas, lalu
                          isi formulir dengan lengkap menggunakan data
                          sebenarnya. Lalu klik tombol Daftar di bagian bawah.
                          Proses pendaftaran selesai.
                        </section>
                      </section>
                    </section>

                    <section
                      className="accordion-item mb-2 border-0 bg-primary text-white"
                      style={{ backgroundColor: "#6686b7" }}
                    >
                      <h2 className="accordion-header" id="flushHd4">
                        <button
                          className="accordion-button collapsed ps-1 bg-primary text-white"
                          style={{ backgroundColor: "#6686b7" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapse4"
                          aria-expanded="false"
                          aria-controls="flush-collapse4"
                        >
                          Mengapa saya tidak menerima email konfirmasi setelah
                          mendaftar?
                        </button>
                      </h2>
                      <section
                        id="flush-collapse4"
                        className="accordion-collapse collapse"
                        aria-labelledby="flushHd4"
                        data-bs-parent="accordion-flushex"
                      >
                        <section className="accordion-body">
                          Panduan Panji Kediri Sering Ditanyakan Karena mungkin
                          email kamu tidak aktif, salah memasukan email ketika
                          mendaftar, atau mungkin masuk ke folder promosi atau
                          spam di email kamu.
                        </section>
                      </section>
                    </section>
                    <section
                      className="accordion-item mb-2 border-0 bg-primary text-white"
                      style={{ backgroundColor: "#6686b7" }}
                    >
                      <h2 className="accordion-header" id="flushHd5">
                        <button
                          className="accordion-button collapsed ps-1 bg-primary text-white"
                          style={{ backgroundColor: "#6686b7" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapse5"
                          aria-expanded="false"
                          aria-controls="flush-collapse5"
                        >
                          Apakah saya boleh mencetak buku yang ada di Panji
                          Kediri?
                        </button>
                      </h2>
                      <section
                        id="flush-collapse5"
                        className="accordion-collapse collapse"
                        aria-labelledby="flushHd5"
                        data-bs-parent="accordion-flushex"
                      >
                        <section className="accordion-body">
                          Buku yang diunggah di Panji Kediri merupakan buku yang
                          diterbitkan oleh Universitas Nusantara PGRI Kediri,
                          sehingga masyarakat Indonesia diizinkan memanfaatkan
                          buku ini.
                        </section>
                      </section>
                    </section>
                    {/* <Link to={"#"} className="btn my-5 btn-outline-light">
                      Lihat semua pertanyaan
                    </Link> */}
                  </section>
                </section>
              </section>
              <section className="col-lg-5 position-relative d-none d-lg-block">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/faq-night.png"
                  // src="/COVER-DEPAN-NEW.jpg"
                  // src="/COVER_CERITA_PANJI_POPULER-1-removebg-preview.png"
                  className="w-100 m-faq"
                  alt=""
                  style={{ zIndex: 0 }}
                />
              </section>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
