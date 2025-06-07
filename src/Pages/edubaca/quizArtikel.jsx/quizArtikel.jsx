import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getArtikelDataById } from "../../../lib/redux/api/artikelSlice";
import { addRekapNillai } from "../../../lib/redux/api/rekapNilaiArtikelSlice";
import { getCookies } from "cookies-next";

const QuizArtikel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { userID } = getCookies("userID");

  const { id_artikel } = useParams();
  const { data: artikelData, isLoading } = useSelector(
    (state) => state.artikel
  );
  const { isLoading: loadingSubmit } = useSelector(
    (state) => state.nilaiArtikel
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtikelDataById(id_artikel));
  }, [id_artikel]);

  const soalList = artikelData[0]?.soal || [];
  const currentQuestion = soalList[currentIndex];
  const currentAnswer = answers.find((a) => a?.id_soal === currentQuestion?.id);

  const handleAnswerChange = (selectedOption) => {
    const newAnswer = {
      id_soal: currentQuestion.id,
      jawaban: selectedOption,
    };

    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.id_soal !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    if (currentIndex < soalList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Optional: bisa tambahkan logic pengecekan benar/salah jika opsi benar tersedia di data
    const correctCount = soalList.reduce((total, question) => {
      const userAnswer = answers.find((a) => a.id_soal === question.id);
      if (userAnswer?.jawaban === question.jawaban) {
        return total + (question.score || 0); // Tambah skor jika jawaban benar
      }
      return total; // Tidak nambah kalau salah
    }, 0);

    
    const res = await dispatch(
      addRekapNillai({
        id_user: userID,
        id_artikel: id_artikel,
        nilai: correctCount,
      })
    );
    
    if (addRekapNillai.fulfilled.match(res)) {
      Swal.fire({
        title: "Quiz Selesai !!",
        text: "Jawaban Anda sudah direkam",
        icon: "success",
        allowOutsideClick: false,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/edubaca");
        }
      });
    } else {
      Swal.fire({
        title: "Gagal Submit !!",
        text: "Coba Ulangi Lagi",
        icon: "error",
      });
    }
  };

  const opsiList = [
    { key: "opsi_a", label: currentQuestion?.opsi_a },
    { key: "opsi_b", label: currentQuestion?.opsi_b },
    { key: "opsi_c", label: currentQuestion?.opsi_c },
    { key: "opsi_d", label: currentQuestion?.opsi_d },
    { key: "opsi_e", label: currentQuestion?.opsi_e },
  ];

  return (
    <div
      className="d-md-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="bg-success bg-opacity-25 w-100">
        <h5 className="m-0 p-4" style={{ backgroundColor: "gray" }}>
          Latihan Interaktif
        </h5>

        <div
          className="p-4 d-flex flex-column justify-content-between"
          style={{ height: "calc(100vh - 75px)" }}
        >
          <div>
            <h5 className="text-justify">{currentQuestion?.soal}</h5>
            <form className="mt-3">
              {opsiList.map(
                (opsi, index) =>
                  opsi.label && (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`answer-${currentQuestion?.id}`}
                        id={`opsi-${opsi.key}`}
                        value={opsi.label}
                        checked={currentAnswer?.jawaban === opsi.label}
                        onChange={() => handleAnswerChange(opsi.label)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`opsi-${opsi.key}`}
                      >
                        {opsi.label}
                      </label>
                    </div>
                  )
              )}
            </form>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0 || loadingSubmit}
            >
              Prev
            </button>
            {currentIndex < soalList.length - 1 ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSubmit}
                disabled={loadingSubmit}
              >
                Selesai
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizArtikel;
