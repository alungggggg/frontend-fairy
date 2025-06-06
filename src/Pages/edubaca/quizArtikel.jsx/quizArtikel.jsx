import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const dummySoal = [
  {
    id: 1,
    text: "Apa yang dimaksud dengan membaca kritis?",
    options: [
      "Membaca dengan cepat",
      "Membaca tanpa memahami",
      "Menganalisis dan mengevaluasi informasi",
      "Membaca hanya untuk hiburan",
    ],
    correctAnswer: "Menganalisis dan mengevaluasi informasi",
  },
  {
    id: 2,
    text: "Mengapa penting untuk memahami konteks bacaan?",
    options: [
      "Agar bisa membaca lebih cepat",
      "Untuk memahami makna dan tujuan penulis",
      "Supaya bisa menghafal teks",
      "Tidak penting, yang penting membaca saja",
    ],
    correctAnswer: "Untuk memahami makna dan tujuan penulis",
  },
  {
    id: 3,
    text: "Apa yang harus dilakukan jika menemukan informasi yang tidak jelas?",
    options: [
      "Mengabaikannya",
      "Mencari sumber lain untuk verifikasi",
      "Membaca lebih cepat",
      "Tidak perlu melakukan apa-apa",
    ],
    correctAnswer: "Mencari sumber lain untuk verifikasi",
  },
  {
    id: 4,
    text: "Bagaimana cara meningkatkan kemampuan membaca kritis?",
    options: [
      "Membaca lebih banyak teks",
      "Hanya membaca buku fiksi",
      "Menghindari bacaan yang sulit",
      "Tidak perlu meningkatkan, sudah cukup",
    ],
    correctAnswer: "Membaca lebih banyak teks",
  },
];

const QuizArtikel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const currentQuestion = dummySoal[currentIndex];

  const currentAnswer = answers.find((a) => a.id_soal === currentQuestion.id);

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
    if (currentIndex < dummySoal.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = dummySoal.filter((question) => {
      const userAnswer = answers.find((a) => a.id_soal === question.id);
      return userAnswer?.jawaban === question.correctAnswer;
    }).length;

    const total = dummySoal.length;
    const resultScore = Math.round((correctCount / total) * 100);
    console.log({ correctCount, total, resultScore });

    Swal.fire({
      title: "Quiz Selesai !!",
      text: "Nilai sudah masuk kedalam rekap",
      icon: "success",
      allowOutsideClick: false,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/edubaca");
      }
    });
  };

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
            <h5 className="text-justify">{currentQuestion.text}</h5>
            <form className="mt-3">
              {currentQuestion.options.map((option, idx) => (
                <div className="form-check mb-2" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`answer-${currentQuestion.id}`}
                    id={`option-${idx}`}
                    value={option}
                    checked={currentAnswer?.jawaban === option}
                    onChange={() => handleAnswerChange(option)}
                  />
                  <label className="form-check-label" htmlFor={`option-${idx}`}>
                    {option}
                  </label>
                </div>
              ))}
            </form>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Prev
            </button>
            {currentIndex < dummySoal.length - 1 ? (
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
