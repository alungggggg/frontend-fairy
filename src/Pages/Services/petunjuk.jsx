import Header from "../template/header";
import Footer from "../template/footer";
import { Link } from "react-router-dom";
import CountUp from "./Component/countUp";
import { useEffect, useState } from "react";
import fairyApi from "../../lib/axios";

const countBook = async () => {
  const { data } = await fairyApi.get("/count/dongeng");
  return data.row;
};

const countView = async () => {
  const { data } = await fairyApi.get("/count/view");
  return data.views;
};

const getVisitor = async () => {
  const { data } = await fairyApi.get("/visited/get");
  return data.visited;
};

const Petunjuk = () => {
  const [countDongeng, setCountDongeng] = useState(0);
  const [countViews, setCountViews] = useState(0);
  const [visited, setVisited] = useState(0);

  useEffect(() => {
    const set = async () => {
      setCountDongeng(await countBook());
      setCountViews(await countView());
      setVisited(await getVisitor());
    };
    set();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="bg-hero position-relative hero-petunjuk">
          <section className="container p-3 pb-0">
            <section className="row">
              <section className="col-lg-6 order-last order-md-first my-5 my-md-auto">
                {/* <p class="lead fw-bold"> */}
                <section className="d-inline-flex flex-column">
                  <span className="fw-bold">DONGENG UNTUK SISWA</span>
                  <span className="mtmin d-none d-md-block">
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/line-title.png"
                      alt=""
                    />
                  </span>
                </section>
                {/* </p> */}
                <section className="row">
                  <section className="col-10">
                    <section className="text-hero-h1 fw-bold text-blue">
                      Belajar jadi lebih mudah
                    </section>
                  </section>
                </section>
                <p className="lead mt-2 mt-lg-2x">Temukan dongeng di sini</p>
              </section>
              <section className="col-lg-6 position-relative">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/guide/untuk%20siswa.png"
                  className="w-100 d-block d-lg-none position-relative"
                  style={{ zIndex: 1, right: "-5%" }}
                  alt=""
                />
              </section>
            </section>
          </section>
          <img
            src="https://buku.kemdikbud.go.id/assets/image/guide/untuk%20siswa.png"
            className="d-none w-50 d-lg-block position-absolute"
            style={{ zIndex: 1, left: "50%", bottom: "0%" }}
            alt=""
          />
        </section>
        <section className="py-5 bg-white">
          <section className="container-fluid p-5">
            <section className="row align-items-center">
              <section className="col-lg-6 text-center mb-4">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/guide/student/aset%20panduan%20siswa%20poin%201.png"
                  style={{ width: "60%" }}
                  alt=""
                />
              </section>
              <section className="col-lg-6 ps-lg-5">
                <h1 className="text-blue mb-3 fw-bold">
                  Akses gratis Dongeng
                  <br />
                  pelajaran resmi
                </h1>
                <p>
                  Dapatkan akses Dongeng untuk bahan belajar di sekolah dan di
                  rumah langsung dari Panji Kediri
                </p>
              </section>
            </section>
            <section className="row align-items-center mt-5">
              <section className="col-lg-6 ps-lg-5 order-last order-md-first mt-4 mt-md-0">
                <h1 className="text-blue mb-3 fw-bold">
                  Keuntungan jika
                  <br />
                  daftar akun
                </h1>
                <p>
                  Dengan mendaftar dan login di laman Panji Kediri, adik-adik
                  dapat turut serta belajar hal-hal yang terkait dengan dongeng
                  seperti keunggulan atau kelemahan dongeng yang adik-adik baca.
                </p>
                <p>
                  Dengan login pada platform laman Panji Kediri, adik-adik dapat
                  juga mengikuti quiz
                </p>
              </section>
              <section className="col-lg-6 text-center">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/guide/student/aset%20panduan%20siswa%20poin%202.png"
                  className="w-75"
                  alt=""
                />
              </section>
            </section>
            {/* <section className="row align-items-center mt-5">
              <section className="col-lg-6 text-center mb-4">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/guide/student/aset%20panduan%20siswa%20poin%203.png"
                  className="w-100"
                  alt=""
                />
              </section>
              <section className="col-lg-6 ps-lg-5">
                <h1 className="text-blue mb-3 fw-bold">
                  Beragam Dongeng
                  <br />
                  untuk dicoba
                </h1>
                <p>
                  Di laman Panji Kediri ini, tersedia buku-buku dari kurikulum 2013
                  (K-13), Kurikulum Merdeka, serta buku umum sebagai referensi
                  adik-adik belajar.
                </p>
                <p>
                  Belajar pun jadi lebih semangat dengan video animasi,
                  games/permainan, dan simulasi pada buku elektronik interaktif.
                </p>
                <p>
                  Rasakan asiknya belajar melalui buku audio, belajar dengan
                  santai di rumah maupun di perjalanan.
                </p>
              </section>
            </section> */}
          </section>
        </section>
        <section
          className="bg-pink"
          style={{
            padding: "60px 0px",
            backgroundImage:
              "url(https://buku.kemdikbud.go.id/assets/image/guide/Background.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        >
          <section className="container p-3 text-center">
            <h1 className="text-blue fw-bold mb-3">
              Jelajahi dongeng sekarang
            </h1>
            <Link to={"/katalog"} className="btn btn-orange text-white">
              Buka katalog dongeng
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </Link>
          </section>
        </section>
        <section
          style={{
            backgroundImage:
              "url(https://buku.kemdikbud.go.id/assets/image/background/bg-2-stats.png)",
            backgroundPosition: "center center",
          }}
        >
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
      </main>
      <Footer />
    </>
  );
};

export default Petunjuk;
