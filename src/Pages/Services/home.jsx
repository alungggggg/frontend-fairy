import Template from "../template/template"

const Home = () => {
  return (
    <>
      <Template content={(
        <>
          <main className="">
            <section className="bg-night position-relative jumbotron">
              <section className="container-xxl">
                <section className="row">
                  <section className="col-lg-6 order-last order-md-first my-5 my-md-auto">
                    <h1 className="jumbo-title text-white fw-bold">
                      Buku untuk semua
                    </h1>
                    {/* <p class="lead text-white">  */}
                    <section className="d-inline-flex flex-column">
                      <span className="text-white">
                        Akses di manapun, kapanpun, Baca buku yuk!
                      </span>
                      <span className="mtmin d-none d-md-block">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/line-title.png"
                          alt="line-title"
                        />
                      </span>
                    </section>
                    {/* </p> */}
                    <section className="input-group shadow mt-5">
                      <span className="input-group-text bg-white border-0">
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
                        className="form-control py-3 border-0 px-1"
                        placeholder="Cari buku disini"
                        aria-label="Cari buku disini"
                      />

                      <section className="bg-white my-auto" style={{ padding: 9 }}>
                        <button className="btn btn-orange text-white" type="button">
                          Cari
                        </button>
                      </section>
                    </section>
                    <section className="position-relative bg-danger" />
                  </section>
                  <section className="col-lg-6">
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/aset%20home%20night.png"
                      className="w-100 d-block d-lg-none"
                      alt=""
                    />
                  </section>
                </section>
              </section>
              <img
                src="https://buku.kemdikbud.go.id/assets/image/home/aset%20home%20night.png"
                className="d-none d-lg-block position-absolute"
                style={{ zIndex: 1, left: "45%", bottom: "3%" }}
                alt="jumbotron"
              />
            </section>
            <section
              className="p-4 mt-5 container-fluid"
              style={{
                backgroundImage:
                  'url("https://buku.kemdikbud.go.id/assets/image/background/bg-stats.png")',
                backgroundPosition: "center center",
              }}
            >
              <section className="row text-center justify-content-start justify-content-lg-center">
                <section className="col-6 col-lg-2">
                  <section className="position-relative">
                    <section className="position-relative" style={{ zIndex: 100 }}>
                      <span className="text-white fs-1 fw-bold">5.139.718</span>
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
                      <span className="text-white fs-1 fw-bold">5.139.718</span>
                    </section>
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                      className="position-absolute mx-auto"
                      style={{ zIndex: 1, bottom: "5%", left: "16%", width: "65%" }}
                      alt=""
                    />
                  </section>
                  <p className="text-white">Kali buku diunduh</p>
                </section>
                <section className="col-6 col-lg-2">
                  <section className="position-relative">
                    <section className="position-relative" style={{ zIndex: 100 }}>
                      <span className="text-white fs-1 fw-bold">5.139.718</span>
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
                      <span className="text-white fs-1 fw-bold">5.139.718</span>
                    </section>
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/line-stats.png"
                      className="position-absolute mx-auto"
                      style={{ zIndex: 1, bottom: "5%", left: "16%", width: "65%" }}
                      alt=""
                    />
                  </section>
                  <p className="text-white">Buku lulus penilaian</p>
                </section>
                <section className="col-6 col-lg-2">
                  <section className="position-relative">
                    <section className="position-relative" style={{ zIndex: 100 }}>
                      <span className="text-white fs-1 fw-bold">5.139.718</span>
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
            <section className="py-5 bg-white">
              <section className="container-lg p-3">
                <section className="row align-items-center">
                  <section className="col-lg-6">
                    <h3 className="fw-bold">
                      Buku
                      <section className="d-inline-flex flex-column">
                        <span>Terpopuler</span>
                        <span className="mtmin">
                          <img
                            src="https://buku.kemdikbud.go.id/assets/image/home/line-populer.png"
                            alt="Line title"
                          />
                        </span>
                      </section>
                    </h3>
                    <p className="">
                      Jelajahi buku populer dari pusat perbukuan resmi
                    </p>
                  </section>
                  <section className="col-lg-6 text-end">
                    <a href="/katalog" className="btn btn-sm btn-outline-primary">
                      Lihat semua buku
                    </a>
                  </section>
                </section>
                <section className="row mt-4">
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                          <span className="badge rounded-pill bg-danger mt-2">
                            PDF
                          </span>
                          <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                            SMA/MA/SMK/MAK
                          </span>
                          <section className="my-2">
                            Bahasa Indonesia Kelas XI
                          </section>
                        </section>
                      </section>
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                          <span className="badge rounded-pill bg-danger mt-2">
                            PDF
                          </span>
                          <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                            SMA/MA/SMK/MAK
                          </span>
                          <section className="my-2">
                            Bahasa Indonesia Kelas XI
                          </section>
                        </section>
                      </section>
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                          <span className="badge rounded-pill bg-danger mt-2">
                            PDF
                          </span>
                          <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                            SMA/MA/SMK/MAK
                          </span>
                          <section className="my-2">
                            Bahasa Indonesia Kelas XI
                          </section>
                        </section>
                      </section>
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                          <span className="badge rounded-pill bg-danger mt-2">
                            PDF
                          </span>
                          <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                            SMA/MA/SMK/MAK
                          </span>
                          <section className="my-2">
                            Bahasa Indonesia Kelas XI
                          </section>
                        </section>
                      </section>
                    </a>
                  </section>
                </section>
              </section>
            </section>
            <section
              className="py-2"
              style={{
                backgroundColor: "#fcf1e7",
                backgroundImage:
                  "url(https://buku.kemdikbud.go.id/assets/image/home/bg-access-book.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
            >
              <section className="container p-3">
                <h3 className="fw-bold">
                  Akses buku
                  <section className="d-inline-flex flex-column">
                    <span>Lebih Mudah</span>
                    <span className="mtmin">
                      <img
                        src="https://buku.kemdikbud.go.id/assets/image/home/line-access-book.png"
                        className="line-access w-100"
                        alt="Line title"
                      />
                    </span>
                  </section>
                </h3>
                <p className="mtmin text-acces">Temukan buku sesuai kebutuhanmu</p>
                <section className="row">
                  <section className="col-lg-4">
                    <section
                      className="card mb-3 p-2 shadow"
                      style={{ height: "90%" }}
                    >
                      <section className="row g-0">
                        <section className="col-md-3 text-center ps-lg-2">
                          <img
                            src="https://buku.kemdikbud.go.id/assets/image/home/Group%2079.png"
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
                              Buku Teks Kurikulum Merdeka
                            </section>
                            <p className="card-text text-muted">
                              Buku teks pelajaran terbitan tahun 2021
                            </p>
                            <a href="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
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
                            src="https://buku.kemdikbud.go.id/assets/image/home/Group%2076.png"
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
                              Buku Teks K-13
                            </section>
                            <p className="card-text text-muted">
                              Buku teks pelajaran terbitan tahun 2021
                            </p>
                            <a href="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
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
                            src="https://buku.kemdikbud.go.id/assets/image/home/Group%2080.png"
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
                              Buku Non Teks
                            </section>
                            <p className="card-text text-muted">
                              Buku umum sebagai pelengkap belajarmu
                            </p>
                            <a href="" className="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
                          </section>
                        </section>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className="py-5 bg-white">
              <section className="container-lg p-3">
                <section className="row align-items-center">
                  <section className="col-lg-6">
                    <h3 className="fw-bold">
                      Buku
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
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      Lihat semua buku audio
                    </a>
                  </section>
                </section>
                <section className="row mt-4">
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                    </a>
                  </section>
                  <section className="col-lg-3 my-2">
                    <a href="#" className="text-decoration-none text-dark">
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
                    </a>
                  </section>
                </section>
              </section>
            </section>
            <section
              className="py-2"
              style={{
                backgroundColor: "#e9f7fe",
                backgroundImage:
                  "url(https://buku.kemdikbud.go.id/assets/image/home/bg-book-for-all.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }}
            >
              <section className="container p-3">
                <h3 className="fw-bold">
                  Buku
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
                <p className="mtmin text-acces">Temukan buku sesuai kebutuhanmu</p>
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
                              Belajar lebih asik dengan buku kemendikbud
                            </p>
                            <a href="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
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
                              Dapatkan akses buku untuk bahan ajar di kelas
                            </p>
                            <a href="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
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
                              Orang tua
                            </section>
                            <p className="card-text text-muted">
                              Bantu tingkatkan belajar anak
                            </p>
                            <a href="" className="">
                              <small className="text-primary fw-bold">
                                Lihat selengkapnya →
                              </small>
                            </a>
                          </section>
                        </section>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className="bg-night">
              <section className="container-fluid">
                <section className="row align-items-end">
                  <section className="col-lg-7 p-3">
                    <section className="m-auto faq">
                      <h4 className="fw-bold text-white">
                        Pertanyaan yang sering ditanyakan
                      </h4>
                      <section
                        className="accordion accordion-flush my-4"
                        id="accordion-flushex"
                      >
                        <section
                          className="accordion-item mb-2 border-0 bg-night text-white"
                          style={{ backgroundColor: "#6686b7" }}
                        >
                          <h2 className="accordion-header" id="flushHd1">
                            <button
                              className="accordion-button collapsed ps-1 bg-night text-white"
                              style={{ backgroundColor: "#6686b7" }}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapse1"
                              aria-expanded="false"
                              aria-controls="flush-collapse1"
                            >
                              Apa itu buku kemendikbudristek?
                            </button>
                          </h2>
                          <section
                            id="flush-collapse1"
                            className="accordion-collapse collapse"
                            aria-labelledby="flushHd1"
                            data-bs-parent="accordion-flushex"
                          >
                            <section className="accordion-body">
                              Buku-buku yang dikembangkan dan diterbitkan oleh
                              unit-unit kerja di Kementerian Pendidikan, Kebudayaan,
                              Riset dan Teknologi untuk kebutuhan siswa, guru, atau
                              masyarakat Indonesia.
                            </section>
                          </section>
                        </section>
                        <section
                          className="accordion-item mb-2 border-0 bg-night text-white"
                          style={{ backgroundColor: "#6686b7" }}
                        >
                          <h2 className="accordion-header" id="flushHd2">
                            <button
                              className="accordion-button collapsed ps-1 bg-night text-white"
                              style={{ backgroundColor: "#6686b7" }}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapse2"
                              aria-expanded="false"
                              aria-controls="flush-collapse2"
                            >
                              Bagaimana cara mendaftar di SIBI?
                            </button>
                          </h2>
                          <section
                            id="flush-collapse2"
                            className="accordion-collapse collapse"
                            aria-labelledby="flushHd2"
                            data-bs-parent="accordion-flushex"
                          >
                            <section className="accordion-body">
                              Silahkan klik Daftar di bagian pojok kanan atas, lalu
                              isi formulir dengan lengkap menggunakan data
                              sebenarnya. Lalu klik tombol Daftar di bagian bawah.
                              Proses pendaftaran selesai.
                            </section>
                          </section>
                        </section>
                        <section
                          className="accordion-item mb-2 border-0 bg-night text-white"
                          style={{ backgroundColor: "#6686b7" }}
                        >
                          <h2 className="accordion-header" id="flushHd2">
                            <button
                              className="accordion-button collapsed ps-1 bg-night text-white"
                              style={{ backgroundColor: "#6686b7" }}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapse3"
                              aria-expanded="false"
                              aria-controls="flush-collapse3"
                            >
                              Siapakah pelaku perbukuan?
                            </button>
                          </h2>
                          <section
                            id="flush-collapse3"
                            className="accordion-collapse collapse"
                            aria-labelledby="flushHd3"
                            data-bs-parent="accordion-flushex"
                          >
                            <section className="accordion-body">
                              Pelaku perbukuan terdiri atas Penulis, Penerjemah,
                              Penyadur, Editor, Desainer, Ilustrator, Pencetak,
                              Pengembang Buku Elektronik, Penerbit, dan Toko Buku.
                            </section>
                          </section>
                        </section>
                        <section
                          className="accordion-item mb-2 border-0 bg-night text-white"
                          style={{ backgroundColor: "#6686b7" }}
                        >
                          <h2 className="accordion-header" id="flushHd4">
                            <button
                              className="accordion-button collapsed ps-1 bg-night text-white"
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
                              Panduan Sibi Sering Ditanyakan Karena mungkin email
                              kamu tidak aktif, salah memasukan email ketika
                              mendaftar, atau mungkin masuk ke folder promosi atau
                              spam di email kamu.
                            </section>
                          </section>
                        </section>
                        <section
                          className="accordion-item mb-2 border-0 bg-night text-white"
                          style={{ backgroundColor: "#6686b7" }}
                        >
                          <h2 className="accordion-header" id="flushHd5">
                            <button
                              className="accordion-button collapsed ps-1 bg-night text-white"
                              style={{ backgroundColor: "#6686b7" }}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapse5"
                              aria-expanded="false"
                              aria-controls="flush-collapse5"
                            >
                              Apakah saya boleh mencetak buku yang ada di SIBI?
                            </button>
                          </h2>
                          <section
                            id="flush-collapse5"
                            className="accordion-collapse collapse"
                            aria-labelledby="flushHd5"
                            data-bs-parent="accordion-flushex"
                          >
                            <section className="accordion-body">
                              Buku yang diunggah di SIBI merupakan buku yang
                              diterbitkan oleh Pemerintah Indonesia, sehingga
                              masyarakat Indonesia diizinkan memanfaatkan buku ini
                              termasuk mengunduh dan mencetaknya. Namun, jika akan
                              diperjual belikan, dilarang menjual lebih dari harga
                              eceran tertinggi (HET) yang tertera di sampul belakang
                              buku.
                            </section>
                          </section>
                        </section>
                        <a href="#" className="btn my-5 btn-outline-light">
                          Lihat semua pertanyaan
                        </a>
                      </section>
                    </section>
                  </section>
                  <section className="col-lg-5">
                    <img
                      src="https://buku.kemdikbud.go.id/assets/image/home/faq-night.png"
                      className="w-100 m-faq"
                      alt=""
                    />
                  </section>
                </section>
              </section>
            </section>
          </main>
        </>
      )}>

      </Template>

    </>
  );
};

export default Home;

