import Header from "../../template/header";
import Footer from "../../template/footer";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { confirmSwal } from "../../../Component/alert";

const quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizIndex = queryParams.get("soal");

  if (quizIndex === null) {
    return (
      <>
        <Header />
        <section className="container mt-5 mb-5">
          <h1>Aturan</h1>
          <p>
            Kuis Sub-modul Pengenalan CSS berfungsi untuk menguji pengetahuan
            Anda tentang materi yang telah dipelajari di sub-modul ini.
          </p>
          <p>
            Terdapat 5 pertanyaan yang harus dikerjakan dalam ujian ini.
            Beberapa ketentuan dari ujian ini adalah:
          </p>
          <ul className="">
            <li className="">
              <p>Syarat nilai kelulusan 80%</p>
            </li>
            <li className="">
              <p>Durasi quiz: 20 menit</p>
            </li>
          </ul>
          <p>
            Apabila tidak memenuhi syarat kelulusan, maka Anda harus menunggu
            selama 1 menit untuk mengulang pengerjaan ujian kembali.
          </p>
          <p>Selamat Mengerjakan!</p>
        </section>
        <Footer />
      </>
    );
  }

  const [answer, setAnswer] = useState({});

  const pertanyaanPilihanGanda = [
    {
      id: "A1",
      soal: "Siapakah yang memimpin Kerajaan Jenggala?",
      pilihanGanda: [
        "Raja Jayengrana",
        "Raja Jayengnegara",
        "Airlangga",
        "Panji Asmarabangun",
      ],
      jawaban: "Raja Jayengnegara",
    },

    {
      id: "A2",
      soal: "Apa nama asli Kleting Kuning? ",
      pilihanGanda: [
        "Dewi Sekartaji",
        "Nyai Intan",
        "Kleting Abang",
        "Mbok Randa",
      ],
      jawaban: "Dewi Sekartaji",
    },

    {
      id: "A3",
      soal: "Berapa jumlah putri Nyai Intan?",
      pilihanGanda: ["2", "3", "4", "5"],
      jawaban: 3,
    },

    {
      id: "A4",
      soal: "Di mana Panji Asmarabangun menyamar sebagai Ande Ande Lumut?",
      pilihanGanda: [
        "Desa Dadapan",
        "Kerajaan Jenggala",
        "Kerajaan Kediri",
        "Desa Kahuripan",
      ],
      jawaban: "Desa Dadapan",
    },

    {
      id: "A5",
      soal: "Siapakah yang membantu Kleting Kuning menyeberangi sungai?",
      pilihanGanda: [
        "Burung Bangau",
        "Yuyu Kangkang",
        "Mbok Randa",
        "Panji Asmarabangun",
      ],
      jawaban: "Yuyu Kangkang",
    },
  ];

  const CountdownTimer = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Clear interval when component unmounts or time reaches 0
        return () => clearInterval(timer);
      }
    }, [timeLeft]);

    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    };

    return (
      <section>
        <section>{formatTime(timeLeft)}</section>
        {timeLeft === 0 && <h2>Time's up!</h2>}
      </section>
    );
  };

  useEffect(() => {
    // Load saved answers from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    setAnswer(savedAnswers);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedAnswer = {
      ...answer,
      [name]: value,
    };

    // Save the updated answers to localStorage as a JSON string
    localStorage.setItem("answers", JSON.stringify(updatedAnswer));
    setAnswer(updatedAnswer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let score = 0;
    let totalQuestions = pertanyaanPilihanGanda.length;

    pertanyaanPilihanGanda.forEach((question) => {
      if (answer[question.id] === question.jawaban) {
        score++;
      }
    });

    Swal.fire({
      title: "Berhasil Submit",
      text: `nilai kamu adalah ${(score / totalQuestions) * 100}`,
      icon: "success",
    });

    return {
      score,
      totalQuestions,
      percentage: (score / totalQuestions) * 100,
    };
  };

  return (
    <>
      <Header />

      <section className="container mt-5 mb-5">
        <section className="row">
          <section className="col-3">
            <section className="card">
              <section className="card-header fw-medium">No. Soal</section>
              <section className="card-body row-soal">
                {pertanyaanPilihanGanda.map((soal, index) => (
                  <section
                    className="card d-flex align-items-center justify-content-center border-2"
                    key={soal.id}
                    onClick={() => {
                      window.location.replace(`/quiz?soal=${index + 1}`);
                    }}
                  >
                    <p className="my-auto p-2 fw-semibold">{index + 1}</p>
                  </section>
                ))}
              </section>
            </section>
          </section>
          <section className="col-9">
            <section className="card">
              <section className="card-header fw-medium d-flex justify-content-between">
                {pertanyaanPilihanGanda[quizIndex - 1]?.soal}
                <section>
                  <CountdownTimer initialTime={7200} />
                </section>
              </section>
              <section className="card-body">
                {pertanyaanPilihanGanda[quizIndex - 1]?.pilihanGanda.map(
                  (pilihan, i) => (
                    <section className="form-check mb-3" key={i}>
                      <input
                        className="form-check-input p-2"
                        type="radio"
                        name={pertanyaanPilihanGanda[quizIndex - 1]?.id} // Use question ID as the name
                        id={`jawaban${i}`}
                        value={pilihan}
                        checked={
                          answer[pertanyaanPilihanGanda[quizIndex - 1]?.id] ===
                          pilihan
                        }
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor={`jawaban${i}`}
                      >
                        {pilihan}
                      </label>
                    </section>
                  )
                )}
                <section className="pt-3">
                  {quizIndex == pertanyaanPilihanGanda.length - 1 ? (
                    <button
                      className="float-right btn border-1 border-success-subtle bg-success-subtle"
                      onClick={() =>
                        confirmSwal(
                          "KONFIRMASI",
                          "Apakah kamu yakin untuk submit jawaban?"
                        )
                      }
                    >
                      Submit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className=" ms-1 mb-1 bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="float-right btn border-1 border-dark-subtle"
                      onClick={() => {
                        const next = parseInt(quizIndex) + 1;
                        window.location.replace(`/quiz?soal=${next}`);
                      }}
                    >
                      Selanjutnya
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right-short ms-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                        />
                      </svg>
                    </button>
                  )}

                  {quizIndex == 1 ? (
                    ""
                  ) : (
                    <button
                      className="float-left btn border-1 border-dark-subtle"
                      onClick={() => {
                        const prev = parseInt(quizIndex) - 1;
                        window.location.replace(`/quiz?soal=${prev}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-left-short me-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                        />
                      </svg>
                      Sebelumnya
                    </button>
                  )}
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>

      <Footer />
    </>
  );
};

export default quiz;
