import Header from "../template/header";
import Footer from "../template/footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewsDatabyId } from "../../lib/redux/api/news";
import { useEffect, useState } from "react";
import fairyApi from "../../lib/axios";
import Loading from "../../Component/loading";

const DetailBerita = () => {
  const { isLoading, data: dataBerita } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [rekomendasiBerita, setRekomendasiBerita] = useState();

  async function getRekomenBerita() {
    const res = await fairyApi.get("/news");
    setRekomendasiBerita(res.data);
  }

  useEffect(() => {
    getRekomenBerita();
  });

  useEffect(() => {
    async function handleGetDataBeritaById() {
      const res = await dispatch(getNewsDatabyId(id));
    }

    handleGetDataBeritaById();
  }, []);

  console.log(dataBerita);

  return (
    <>
      <Header></Header>
      <div className="container my-5">
        {isLoading ? (
          <section
            className="d-flex align-items-center justify-content-center w-full"
            style={{ height: "80vh" }}
          >
            <Loading />
          </section>
        ) : (
          <div className="row gy-5">
            <div className="col-lg-8">
              <div>
                <img
                  src={
                    import.meta.env.VITE_IMG_URL + "/" + dataBerita[0]?.gambar
                  }
                  className="img-fluid w-100 rounded"
                  style={{ height: "300px", objectFit: "contain" }}
                  alt=""
                />
                <h1 className="text-center">{dataBerita[0]?.judul}</h1>
                <p>{dataBerita[0]?.description}</p>
              </div>
            </div>
            <div className="col-lg-4 card shadow">
              {rekomendasiBerita?.map((item, i) => (
                <div className="d-flex my-3 align-items-center" key={i}>
                  <div
                    style={{
                      width: "80px", // Lebar tetap
                      height: "80px", // Tinggi tetap, memastikan rasio 1:1
                      flexShrink: 0, // Mencegah perubahan ukuran gambar saat responsif
                    }}
                  >
                    <img
                      src={import.meta.env.VITE_IMG_URL + "/" + item.gambar}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // Memastikan gambar terisi penuh tanpa distorsi
                        borderRadius: "8px", // Opsional, agar lebih estetik
                      }}
                      alt={item?.judul || ""}
                    />
                  </div>
                  <div className="ms-3">
                    <h4 className="m-0">{item?.judul || ""}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer></Footer>
    </>
  );
};

export default DetailBerita;
