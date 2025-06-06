import { useParams } from "react-router-dom";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelDataById } from "../../../lib/redux/api/artikelSlice";
import QuizArtikelView from "./components/quizArtikelView";
import Loading from "../../../Component/loading";
import DebatViewArtikel from "./components/debatViewArtikel";
import EduBacaLayout from "../components/eduBacaLayout";

const ArtikelView = () => {
  const { id_artikel } = useParams();

  const { isLoading, data: artikelData } = useSelector(
    (state) => state.artikel
  );
  const dispatch = useDispatch();

  async function handleGetArtikelById() {
    await dispatch(getArtikelDataById(id_artikel));
  }

  useEffect(() => {
    handleGetArtikelById();
  }, [id_artikel]);

  return (
    <EduBacaLayout>
      <section
        className="bg-white bg-opacity-25"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <div className="container py-md-4 py-2 pb-3">
          {isLoading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "calc(100vh - 76px)" }}
            >
              <Loading />
            </div>
          ) : (
            <>
              {artikelData[0]?.type.toLowerCase() == "quiz" ? (
                <QuizArtikelView artikelData={artikelData[0]} />
              ) : (
                <DebatViewArtikel artikelData={artikelData[0]} />
              )}
            </>
          )}
        </div>
      </section>
    </EduBacaLayout>
  );
};

export default ArtikelView;
