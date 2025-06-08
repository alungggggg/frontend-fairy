import { getCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNilaiByArtikelAndUsers } from "../../../../lib/redux/api/rekapNilaiArtikelSlice";

const QuizArtikelView = ({ artikelData }) => {
  const [showArtikel, setShowArtikel] = useState(false);
  const navigate = useNavigate();
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

  const location = useLocation();
  const { countdown: initialCountdown } = location.state || {};

  useEffect(() => {
    if (initialCountdown) {
      setShowArtikel(true);
      startCountdown(initialCountdown);
    } else {
      setCountdown(60 * 15); // Set default countdown to 15 minutes
      setShowArtikel(false);
    }
  }, [initialCountdown]);

  function handleMulaiQuiz() {
    localStorage.clear("quiz_progress");
    return navigate("quiz");
  }

  useEffect(() => {
    if (countdown <= 0) {
      handleMulaiQuiz();
    }
  }, [countdown]);
  //   Save quiz temp timer to localStorage
  useEffect(() => {
    if (!showArtikel || !artikelData?.id) return;

    // Simulasi penyimpanan (bisa diganti dengan API call)
    const saveQuizProgress = async () => {
      const data = {
        id_artikel: artikelData.id,
        sisa_waktu: countdown,
      };
      localStorage.setItem(`quiz_progress`, JSON.stringify(data));
    };

    saveQuizProgress();
  }, [countdown]);
  //   Save quiz temp timer to localStorage

  // check nilai
  const dispatch = useDispatch();
  const { id_artikel } = useParams();
  const { isLoading } = useSelector((state) => state.nilaiArtikel);
  const [isSubmited, setIsSubmitet] = useState(false);

  useEffect(() => {
    async function getNilaiArtikel() {
      const { userID } = await getCookies("userID");
      const response = await dispatch(
        getNilaiByArtikelAndUsers({
          id_user: userID,
          id_artikel: id_artikel,
        })
      );
      if (getNilaiByArtikelAndUsers.fulfilled.match(response)) {
        setIsSubmitet(true);
      } else {
        setIsSubmitet(false);
      }
    }

    getNilaiArtikel();
  }, [id_artikel]);
  // check nilai
  return (
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
          <p className={`text-center fs-6 ${showArtikel ? "d-none" : ""}`}>
            Silakan klik tombol "Tampilkan Artikel" untuk membaca artikel
          </p>
          <div className="fs-5 fw-bold text-center py-2 bg-white w-100 position-absolute top-0 d-lg-none">
            {countdown >= 3600 ? Math.floor(countdown / 3600) + "" : "00"}:
            {countdown >= 60 ? Math.floor(countdown / 60) + "" : "00"}:
            {countdown % 60 < 10 ? "0" + (countdown % 60) : countdown % 60}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card bg-white">
          <div className="card-body">
            <div className="fs-3 fw-bold text-center py-3 d-none d-lg-block">
              {countdown >= 3600 ? Math.floor(countdown / 3600) + "" : "00"}:
              {countdown >= 60 ? Math.floor(countdown / 60) + "" : "00"}:
              {countdown % 60 < 10 ? "0" + (countdown % 60) : countdown % 60}
            </div>
            {showArtikel ? (
              <button
                style={{ backgroundColor: "#A0C878" }}
                className="btn text-white fw-semibold w-100 py-3"
                onClick={() => handleMulaiQuiz() /* handleMulaiQuiz() */}
              >
                Mulai Quiz
              </button>
            ) : (
              <button
                style={{ backgroundColor: "#A0C878" }}
                className="btn text-white fw-semibold w-100 py-3"
                onClick={() => {
                  setShowArtikel(true);
                  startCountdown(60 * 15);
                }}
                disabled={isLoading || isSubmited}
              >
                Tampilkan Artikel
              </button>
            )}
            {isSubmited && !isLoading ? (
              <p className="text-danger text-center m-0 fs-6 mt-3">
                Sudah Mengerjakan !!
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizArtikelView;
