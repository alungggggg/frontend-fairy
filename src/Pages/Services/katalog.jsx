import Template from "../template/template";
import { useState, useEffect } from "react";
import axios from "axios";

const Katalog = () => {
  const [dongengs, setDongeng] = useState([]);

  useEffect(() => {
    const fetchDongeng = async () => {
      const response = await axios.get("http://localhost:5000/api/dongeng");
      setDongeng(response.data)
    }
    fetchDongeng()
  }, []);


  return (
    <>
      <Template content={(<main>
        <section className="bg-hero k-hero">
          <section className="container py-4">
            <section className="d-flex flex-column flex-lg-row">
              <button className="active-type card rounded p-3 border-0 shadow d-flex flex-row align-items-center me-4 my-1 my-lg-0">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/Group%2079.png"
                  width={40}
                  alt=""
                />
                <section className="ms-2">Teks Kurikulum Merdeka</section>
              </button>
              <button className="active-type card rounded p-3 border-0 shadow d-flex flex-row align-items-center me-4 my-1 my-lg-0">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/Group%2076.png"
                  width={40}
                  alt=""
                />
                <section className="ms-2">Teks K-13</section>
              </button>
              <button className="active-type card rounded p-3 border-0 shadow d-flex flex-row align-items-center me-4 my-1 my-lg-0">
                <img
                  src="https://buku.kemdikbud.go.id/assets/image/home/Group%2080.png"
                  width={40}
                  alt=""
                />
                <section className="ms-2">Nonteks</section>
              </button>
            </section>
          </section>
        </section>
        <section className="bg-white">
          <section className="container px-3 py-5">
            <section className="justify-content-center">
              <section className="text-muted text-end mb-3">
                Buku Teks Kurikulum Merdeka
              </section>
              <section>
                <section className="position-relative">
                  <section className="input-group shadow-sm">
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
                      className="form-control py-2 border-start-0 border-end-0 px-1"
                      placeholder="Cari buku disini"
                      aria-label="Cari buku disini"
                    />
                    <button className="btn btn-orange text-white" type="button">
                      Cari
                    </button>
                  </section>
                </section>
              </section>
              <section className="row">
                {dongengs.map((dongeng) => (
                  <section className="col-lg-4 my-2" key={dongeng.id}>
                    <a href="#" className="text-decoration-none text-dark">
                      <section className="card border-0 mt-3 CardBook_card">
                        <section
                          className="card-header text-center text-lg-start bg-white p-0 border-0"
                          style={{
                            backgroundImage:
                              "url(https://buku.kemdikbud.go.id/assets/image/home/ellipse-2.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center bottom",
                          }}
                        >
                          <img
                            src="https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Projek_Penguatan_Profil_Pelajar_Pancasila_BG_Paud_Cover.png"
                            className="CardBook_img"
                            alt=""
                          />
                        </section>
                        <section className="card-body px-5 px-lg-0 py-2">
                          <span className="badge rounded-pill bg-danger mt-2">
                            PDF
                          </span>
                          <span className="badge rounded-pill bg-secondary mt-2 ms-1">
                            PAUD
                          </span>
                          <section className="my-2">{dongeng.title}</section>
                        </section>
                      </section>
                    </a>
                  </section>
                ))}
              </section>
            </section>
          </section>
        </section>
      </main>)}>
      </Template>

    </>
  );
};

export default Katalog;
