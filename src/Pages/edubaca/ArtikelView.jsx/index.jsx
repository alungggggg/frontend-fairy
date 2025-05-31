import { useParams } from "react-router-dom";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelDataById } from "../../../lib/redux/api/artikelSlice";

const ArtikelView = () => {
  const { id_artikel } = useParams();
  const [showArtikel, setShowArtikel] = useState(false);

  const { isLoading, data } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();
  const artikelData = data[0];

  async function handleGetArtikelById() {
    await dispatch(getArtikelDataById(id_artikel));
  }

  // countdown timer
  const [countdown, setCountdown] = useState(60);
  const [timer, setTimer] = useState(null);
  const startCountdown = (duration) => {
    setCountdown(duration);
    if (timer) {
      clearInterval(timer);
    }
    const newTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(newTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };
  // countdown timer

  useEffect(() => {
    handleGetArtikelById();
  }, [id_artikel]);

  function handleMulaiQuiz() {
    console.log("Mulai Quiz");
    setCountdown(0); // Reset countdown
    // Implement logic to start the quiz
  }

  useEffect(() => {
    if (countdown <= 0) {
      handleMulaiQuiz();
    }
  }, [countdown]);

  useEffect(() => {
    setCountdown(60 * 15); // Set initial countdown to 15 minutes
  },[])

  return (
    <section>
      <Header />
      <section
        className="bg-white bg-opacity-25"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <div className="container py-4">
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="row gy-3 gx-3">
              <div className="col-lg-9">
                <div
                  className="d-flex flex-column align-items-center justify-content-center rounded shadow shadow-sm position-relative"
                  style={{
                    minHeight: "calc(85vh)",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  <iframe
                    src={showArtikel ? artikelData?.artikel_link : ""}
                    width="100%"
                    style={{ minHeight: "calc(85vh)" }}
                    frameborder="0"
                    className={`roumded shadow shadow-sm ${
                      showArtikel ? "" : "d-none"
                    }`}
                  ></iframe>
                  <p
                    className={`text-center fs-6 ${
                      showArtikel ? "d-none" : ""
                    }`}
                  >
                    Silakan klik tombol "Tampilkan Artikel" untuk membaca
                    artikel
                  </p>
                  <div className="fs-5 fw-bold text-center py-2 bg-white w-100 position-absolute top-0 shadow shadow-sm d-lg-none">
                    {countdown >= 360 ? countdown / 3600 + "" : "00"}:
                    {countdown >= 60 ? Math.floor(countdown / 60) + "" : "00"}:
                    {countdown % 60 < 10
                      ? "0" + (countdown % 60)
                      : countdown % 60}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow shadow-sm bg-white">
                  <div className="card-body">
                    <div className="fs-3 fw-bold text-center py-3 d-none d-lg-block">
                      {countdown >= 3600 ? Math.floor(countdown / 3600) + "" : "00"}:
                      {countdown >= 60 ? Math.floor(countdown / 60) + "" : "00"}
                      :
                      {countdown % 60 < 10
                        ? "0" + (countdown % 60)
                        : countdown % 60}
                    </div>
                    {showArtikel ? (
                      <button
                        style={{ backgroundColor: "#A0C878" }}
                        className="btn text-white fw-semibold w-100 py-3"
                        onClick={
                          () => handleMulaiQuiz() /* handleMulaiQuiz() */
                        }
                      >
                        Mulai Quiz
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "#A0C878" }}
                        className="btn text-white fw-semibold w-100 py-3"
                        onClick={() => {
                          setShowArtikel(true);
                          startCountdown(60*15);
                        }}
                      >
                        Tampilkan Artikel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default ArtikelView;
