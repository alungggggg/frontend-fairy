import { Link, useLocation } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewsDatabyId } from "../../../lib/redux/api/news";
import Loading from "../../../Component/loading";

const DetailBerita = () => {
  const { isLoading, data: dataBerita } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const idBerita = pathSplit[pathSplit.length - 1];

  useEffect(() => {
    async function handleGetDataBeritaById() {
      const res = await dispatch(getNewsDatabyId(idBerita));
    }

    handleGetDataBeritaById();
  }, []);
  return (
    <AdminLayout>
      {isLoading ? (
        <section
          className="d-flex align-items-center justify-content-center w-full"
          style={{ height: "80vh" }}
        >
          <Loading />
        </section>
      ) : (
        <>
          <Link
            to={"../"}
            className="d-flex align-items-center gap-2 text-dark text-decoration-none"
          >
            <ArrowLeft />
            <p className="mb-0">Detail Berita</p>
          </Link>
          <hr />
          <div className="d-flex flex-column gap-3 justify-items-start">
            <img
              src={import.meta.env.VITE_IMG_URL + "/" + dataBerita[0]?.gambar}
              style={{ height: "300px", objectFit: "contain" }}
            />
            <h1>{dataBerita[0]?.judul}</h1>
            <p>{dataBerita[0]?.description}</p>
            <p>Publish Date : {dataBerita[0]?.created_at}</p>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default DetailBerita;
