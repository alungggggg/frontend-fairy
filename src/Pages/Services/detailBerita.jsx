import Header from "../template/header";
import Footer from "../template/footer";

const DetailBerita = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="row my-5">
          <div className="col-lg-8">
            <div>
              <img
                src="https://placehold.co/400"
                className="img-fluid w-100 rounded"
                style={{ maxHeight: "500px", objectFit: "cover" }}
                alt=""
              />
              <h1 className="text-center">Judul Berita</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus, aliquid cumque cum perferendis voluptas officia
                minima. Ipsum delectus corrupti dolore nemo, ut officia cumque,
                pariatur officiis odio quo laboriosam praesentium? Excepturi, ab
                sit distinctio eaque nam, sint provident eos, eius dolore illo a
                cumque? Officiis praesentium reprehenderit voluptatibus beatae
                dolorum ullam, nesciunt aliquid asperiores consequuntur quam ab
                quidem veritatis aspernatur? Consequatur facilis totam et
                praesentium corporis laboriosam aliquid alias accusamus
                necessitatibus dicta. Ea quisquam, aliquam sunt necessitatibus
                rerum ducimus aperiam quidem architecto, id aliquid, odit nisi
                soluta quibusdam quos officia. Iusto, atque nemo. Vero pariatur
                eos quod iste praesentium nesciunt, excepturi voluptas,
                architecto doloribus dolore enim ex qui et recusandae magni
                assumenda illo. Libero, pariatur? Voluptas nemo nam aspernatur
                accusantium.
              </p>
            </div>
          </div>
          <div className="col-lg-4 card shadow">
            <div className="d-flex my-3">
              <img src="https://placehold.co/400" className="w-25" alt="" />
              <div>
                <h3 className="ms-2 items-center">
                  Dani Ardiansyach sangat sangat ganteng
                </h3>
              </div>
            </div>
            <div className="d-flex my-3">
              <img src="https://placehold.co/400" className="w-25" alt="" />
              <div>
                <h3 className="ms-2 items-center">
                  Dani Ardiansyach sangat sangat ganteng
                </h3>
              </div>
            </div>
            <div className="d-flex my-3">
              <img src="https://placehold.co/400" className="w-25" alt="" />
              <div>
                <h3 className="ms-2 items-center">
                  Dani Ardiansyach sangat sangat ganteng
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DetailBerita;
