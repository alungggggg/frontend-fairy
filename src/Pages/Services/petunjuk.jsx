import Template from "../template/template";
const Petunjuk = () => {
  return (
    <>
      <Template content={(<main>
        <section className="bg-hero position-relative hero-petunjuk">
          <section className="container p-3 pb-0">
            <section className="row">
              <section className="col-lg-6 order-last order-md-first my-5 my-md-auto">
                {/* <p class="lead fw-bold"> */}
                <section className="d-inline-flex flex-column">
                  <span className="fw-bold">BUKU UNTUK SISWA</span>
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
                <p className="lead mt-2 mt-lg-2x">
                  Temukan buku pelajaran resmi kemendikbud di sini
                </p>
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
                  Akses gratis Buku
                  <br />
                  pelajaran resmi
                </h1>
                <p>
                  Dapatkan akses buku teks pelajaran dan buku referensi untuk
                  bahan belajar di sekolah dan di rumah langsung dari Pusat
                  Perbukuan, Kemdikbud.
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
                  Dengan mendaftar dan login di laman SIBI, adik-adik dapat
                  turut serta melaporkan hal-hal yang terkait dengan buku
                  seperti keunggulan atau kelemahan buku yang adik-adik baca.
                </p>
                <p>
                  Dengan login pada platform laman SIBI, adik-adik dapat juga
                  melihat riwayat baca dan unduhan buku.
                </p>
                <p>
                  Di laman SIBI ini, adik-adik dapat ikut serta mengulas dan
                  memberikan komentar pada buku, juga melihat ulasan dari
                  teman-teman yang lainnya.
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
            <section className="row align-items-center mt-5">
              <section className="col-lg-6 text-center mb-4">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/guide/student/aset%20panduan%20siswa%20poin%203.png"
                  className="w-100"
                  alt=""
                />
              </section>
              <section className="col-lg-6 ps-lg-5">
                <h1 className="text-blue mb-3 fw-bold">
                  Beragam Buku
                  <br />
                  untuk dicoba
                </h1>
                <p>
                  Di laman SIBI ini, tersedia buku-buku dari kurikulum 2013
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
            </section>
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
            <h1 className="text-blue fw-bold mb-3">Jelajahi buku sekarang</h1>
            <a href="/katalog" className="btn btn-orange text-white">
              Buka katalog buku
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
            </a>
          </section>
        </section>
        <section
          style={{
            backgroundImage:
              "url(https://buku.kemdikbud.go.id/assets/image/background/bg-2-stats.png)",
            backgroundPosition: "center center",
          }}
        >
          <section className="container p-4">
            <section className="row text-center justify-content-start justify-content-lg-center">
              <section className="col-6 col-lg-2">
                <section className="position-relative">
                  <section
                    className="position-relative"
                    style={{ zIndex: 100 }}
                  >
                    <span className="text-white fs-1 fw-bold">5.139.718</span>
                  </section>
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                    className="position-absolute mx-auto"
                    style={{
                      zIndex: 1,
                      bottom: "5%",
                      left: "16%",
                      width: "65%",
                    }}
                    alt=""
                  />
                </section>
                <p className="text-white">Kali buku dibaca</p>
              </section>
              <section className="col-6 col-lg-2">
                <section className="position-relative">
                  <section
                    className="position-relative"
                    style={{ zIndex: 100 }}
                  >
                    <span className="text-white fs-1 fw-bold">5.139.718</span>
                  </section>
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                    className="position-absolute mx-auto"
                    style={{
                      zIndex: 1,
                      bottom: "5%",
                      left: "16%",
                      width: "65%",
                    }}
                    alt=""
                  />
                </section>
                <p className="text-white">Kali buku diunduh</p>
              </section>
              <section className="col-6 col-lg-2">
                <section className="position-relative">
                  <section
                    className="position-relative"
                    style={{ zIndex: 100 }}
                  >
                    <span className="text-white fs-1 fw-bold">5.139.718</span>
                  </section>
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                    className="position-absolute mx-auto"
                    style={{
                      zIndex: 1,
                      bottom: "5%",
                      left: "16%",
                      width: "65%",
                    }}
                    alt=""
                  />
                </section>
                <p className="text-white">Buku tersedia</p>
              </section>
              <section className="col-6 col-lg-2">
                <section className="position-relative">
                  <section
                    className="position-relative"
                    style={{ zIndex: 100 }}
                  >
                    <span className="text-white fs-1 fw-bold">5.139.718</span>
                  </section>
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                    className="position-absolute mx-auto"
                    style={{
                      zIndex: 1,
                      bottom: "5%",
                      left: "16%",
                      width: "65%",
                    }}
                    alt=""
                  />
                </section>
                <p className="text-white">Buku lulus penilaian</p>
              </section>
              <section className="col-6 col-lg-2">
                <section className="position-relative">
                  <section
                    className="position-relative"
                    style={{ zIndex: 100 }}
                  >
                    <span className="text-white fs-1 fw-bold">5.139.718</span>
                  </section>
                  <img
                    src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                    className="position-absolute mx-auto"
                    style={{
                      zIndex: 1,
                      bottom: "5%",
                      left: "16%",
                      width: "65%",
                    }}
                    alt=""
                  />
                </section>
                <p className="text-white">Total kunjungan</p>
              </section>
            </section>
          </section>
        </section>
      </main>)}></Template>



    </>
  );
};

export default Petunjuk;
