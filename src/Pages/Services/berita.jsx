import Header from "../template/header";
import Footer from "../template/footer";

import { Link } from "react-router-dom";

const Berita = () => {
  // Berita
  const berita = [
    {
      gambar: "",
      judul: "Judul 1",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam necessitatibus quia voluptatibus rerum iusto eius enim expedita, est aspernatur atque, harum amet pariatur fuga a! Cum dolore aliquid molestiae aut.",
    },
    {
      gambar: "",
      judul: "Judul 1",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam necessitatibus quia voluptatibus rerum iusto eius enim expedita, est aspernatur atque, harum amet pariatur fuga a! Cum dolore aliquid molestiae aut.",
    },
    {
      gambar: "",
      judul: "Judul 1",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam necessitatibus quia voluptatibus rerum iusto eius enim expedita, est aspernatur atque, harum amet pariatur fuga a! Cum dolore aliquid molestiae aut.",
    },
  ];

  return (
    <>
      <Header />
      <div className="container">
        <div>{/* <h1>Berita Terkini Anjay</h1> */}</div>
        <section className="py-2 position-relative w">
          <section className="container p-3">
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

            <section className="row">
              {berita.map((item, index) => (
                <section className="col-lg-4" key={index}>
                  <section className="card mb-3 shadow">
                    <div>
                      <img
                        src={item.gambar || "https://placehold.co/100"}
                        className="card-img-top img-fluid"
                        alt={item.judul}
                      />
                      <div className="card-body">
                        <h1 className="text-center">{item.judul}</h1>
                        <p className="card-text text-truncate">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Berita;
