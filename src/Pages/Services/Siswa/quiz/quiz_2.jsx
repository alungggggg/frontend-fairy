import { Link, Navigate, useParams } from "react-router-dom";
import UserLayout from "../../Component/userLayout";
import { useDispatch, useSelector } from "react-redux";
import { getForumQuizById } from "../../../../lib/redux/api/forumQuiz";
import { useEffect, useState } from "react";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";
import Swal from "sweetalert2";
import {
  getRekapById,
  updateNilaiForum,
} from "../../../../lib/redux/api/rekapNilai";
import { getCookie } from "cookies-next";
import Loading from "../../../../Component/loading";

const QuizSoal = ({
  soal,
  setIndexSoalDisplayed,
  displayedSoal,
  setSoal,
  handleSubmitQuiz,
  timer,
}) => {
  function handleInputQuiz(e) {
    setSoal((prevSoal) =>
      prevSoal.map((soal) =>
        soal.index === displayedSoal[0]?.index
          ? { ...soal, jawaban_user: e.target.value }
          : soal
      )
    );
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 0 ? 0 : String(hours).padStart(2, "0")}:${
      minutes < 0 ? 0 : String(minutes).padStart(2, "0")
    }:${seconds < 0 ? 0 : String(seconds).padStart(2, "0")}`;
  };
  return (
    <section className="container mt-5 mb-5">
      <section className="row">
        <section className="col-xl-9">
          <section className="card p-4" style={{ minHeight: "70vh" }}>
            <section className="card-body p-0 position-relative">
              <div className="">
                <div className="d-flex justify-content-between align-items-center py-2">
                  <p className="m-0">
                    {displayedSoal[0]?.index}/{soal.length}
                  </p>
                  <p className="m-0">{formatTime(timer)}</p>
                </div>
                <hr className="m-0" />
              </div>
              {displayedSoal[0]?.jenis === "pilgan" && (
                <QuizQisplayPilgan
                  displayedSoal={displayedSoal}
                  soal={soal}
                  setSoal={setSoal}
                />
              )}
              {displayedSoal[0]?.jenis === "uraianSingkat" && (
                <div className="my-3">
                  <p className="fs-4">{displayedSoal[0]?.soal}</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Jawaban Anda"
                    onChange={handleInputQuiz}
                    value={displayedSoal[0]?.jawaban_user}
                  />
                </div>
              )}
              {displayedSoal[0]?.jenis === "uraianPanjang" && (
                <div className="my-3">
                  <p className="fs-4">{displayedSoal[0]?.soal}</p>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Jawaban Anda"
                    rows={18}
                    onChange={handleInputQuiz}
                    value={displayedSoal[0]?.jawaban_user}
                  />
                </div>
              )}
              <div className="w-100 d-flex justify-content-between mt-4 position-absolute bottom-0">
                <button
                  className={`btn bg-secondary-light text-white ${
                    displayedSoal[0]?.index === 1 ? "disabled" : ""
                  }`}
                  onClick={() => setIndexSoalDisplayed((prev) => prev - 1)}
                >
                  Kembali
                </button>
                <button
                  className={`btn bg-primary text-white ${
                    displayedSoal[0]?.index === soal.length
                      ? "disabled d-none"
                      : ""
                  }`}
                  onClick={() => setIndexSoalDisplayed((prev) => prev + 1)}
                >
                  Lanjut
                </button>
                {displayedSoal[0]?.index === soal.length ? (
                  <button
                    className="btn btn-success bg-night text-white"
                    onClick={handleSubmitQuiz}
                  >
                    Submit
                  </button>
                ) : (
                  ""
                )}
              </div>
            </section>
          </section>
        </section>
        <section className="col-xl-3">
          <section className="card p-4 mt-3 mt-xl-0">
            <section className="card-header fw-medium bg-secondary-light text-white">
              Navigasi Soal
            </section>
            <section className="card-body pt-2 pb-0 border position-relative mt-4">
              <p className="mb-0 position-absolute" style={{ top: "-13px" }}>
                Soal Pilihan Ganda
              </p>
              <section className="card-body row-soal px-0">
                {soal
                  .filter((soal) => soal.jenis === "pilgan")
                  .map((soal, index) => (
                    <section
                      className={`card d-flex align-items-center justify-content-center border-2 ${
                        soal.index === displayedSoal[0]?.index
                          ? "bg-primary text-white"
                          : soal.jawaban_user
                          ? "bg-secondary text-white"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => setIndexSoalDisplayed(soal.index)}
                    >
                      <p className="my-auto p-2 fw-semibold">{soal.index}</p>
                    </section>
                  ))}
              </section>
            </section>
            <section className="card-body pt-2 pb-0 border position-relative mt-4">
              <p className="mb-0 position-absolute" style={{ top: "-13px" }}>
                Soal Uraian Singkat
              </p>
              <section className="card-body row-soal px-0">
                {soal
                  .filter((soal) => soal.jenis === "uraianSingkat")
                  .map((soal, index) => (
                    <section
                      className={`card d-flex align-items-center justify-content-center border-2 ${
                        soal.index === displayedSoal[0]?.index
                          ? "bg-primary text-white"
                          : soal.jawaban_user
                          ? "bg-secondary text-white"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => setIndexSoalDisplayed(soal.index)}
                    >
                      <p className="my-auto p-2 fw-semibold">{soal.index}</p>
                    </section>
                  ))}
              </section>
            </section>
            <section className="card-body pt-2 pb-0 border position-relative mt-4">
              <p className="mb-0 position-absolute" style={{ top: "-13px" }}>
                Soal Pilihan Ganda
              </p>
              <section className="card-body row-soal px-0">
                {soal
                  .filter((soal) => soal.jenis === "uraianPanjang")
                  .map((soal, index) => (
                    <section
                      className={`card d-flex align-items-center justify-content-center border-2 ${
                        soal.index === displayedSoal[0]?.index
                          ? "bg-primary text-white"
                          : soal.jawaban_user
                          ? "bg-secondary text-white"
                          : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => setIndexSoalDisplayed(soal.index)}
                    >
                      <p className="my-auto p-2 fw-semibold">{soal.index}</p>
                    </section>
                  ))}
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

const QuizPreparation = ({ soal, setIndexSoalDisplayed, setTimer }) => {
  return (
    <main className="container my-lg-5 my-2 bg-white rounded-0 rounded-md-2 shadow mx-1 mx-md-auto">
      <section className="p-4">
        <h1 className="text-dark">Aturan</h1>
        <p className="text-dark mt-4 mb-4">
          Kuis Sub-modul Pengenalan Dongeng berfungsi untuk menguji pengetahuan
          Anda tentang materi yang telah dipelajari di sub-modul ini.
        </p>
        <p className="text-dark">
          Terdapat {soal.length} pertanyaan yang harus dikerjakan dalam ujian
          ini. Beberapa ketentuan dari ujian ini adalah:
        </p>
        <ul className="mt-4 mb-4">
          <li className="">
            <p className="text-dark">- Syarat nilai kelulusan 80</p>
          </li>
          <li className="">
            <p className="text-dark">- Durasi quiz: 60 menit</p>
          </li>
        </ul>
        <p className="text-dark">
          Apabila tidak memenuhi syarat kelulusan, Manfaatkan waktu tunggu
          tersebut untuk mempelajari kembali materi sebelumnya, ya.
        </p>
        <p className="text-dark">Selamat Mengerjakan!</p>
        <section className="d-flex justify-content-start ">
          <button
            className="btn btn-lg btn-primary mt-4"
            onClick={() => {
              setTimer(60 * 60);
              setIndexSoalDisplayed(1);
            }}
          >
            Mulai Quiz
          </button>
        </section>
      </section>
    </main>
  );
};

const QuizResult = ({ nilai }) => {
  return (
    <main className="container my-lg-5 my-2 bg-white rounded-0 rounded-md-2 shadow mx-1 mx-lg-0">
      <section className="p-4 d-flex flex-column align-items-center justify-content-center gap-4">
        <h1 className="text-dark">Hasil Quiz</h1>
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center ${
            nilai >= 80 ? "bg-success text-white" : "bg-danger text-white"
          }`}
          style={{ height: "100px", width: "100px" }}
        >
          {nilai}
        </div>
        <Link to={"/quiz"} className="btn btn-primary">
          Kembali ke Quiz
        </Link>
      </section>
    </main>
  );
};

const Quiz_2 = () => {
  const { id } = useParams();
  //   console.log(id_forum);
  const dispatch = useDispatch();
  const { forumQuiz, isLoading } = useSelector((state) => state.forumQuiz);
  const rekapNilai = useSelector((state) => state.rekapNilai.rekapNilai[0]);

  const soalPilgan = forumQuiz[0]?.dongeng?.soalPilgans;
  const soalUraianSingkat = forumQuiz[0]?.dongeng?.soalUraianSingkats;
  const soalUraianPanjang = forumQuiz[0]?.dongeng?.soalUraianPanjangs;

  const [soal, setSoal] = useState([]);
  const [nilai, setNilai] = useState(0);

  useEffect(() => {
    setNilai(rekapNilai?.nilai || 0);
  }, [rekapNilai]);

  useEffect(() => {
    setSoal([
      ...(soalPilgan || []).map((soal, index) => ({
        ...soal,
        index: index + 1,
        jenis: "pilgan",
        jawaban_user: "",
      })),
      ...(soalUraianSingkat || []).map((soal, index) => ({
        ...soal,
        index: soalPilgan.length + index + 1,
        jenis: "uraianSingkat",
        jawaban_user: "",
      })),
      ...(soalUraianPanjang || []).map((soal, index) => ({
        ...soal,
        index: soalPilgan.length + soalUraianSingkat.length + index + 1, // Adjust index
        jenis: "uraianPanjang",
        jawaban_user: "",
      })),
    ]);
  }, [soalPilgan, soalUraianSingkat, soalUraianPanjang]);

  // console.log(soal);

  async function getQuizData(id_forum) {
    const res = await dispatch(getForumQuizById(id_forum));

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getQuizData();
      }
    }
  }

  useEffect(() => {
    if (rekapNilai?.id_Forum) {
      getQuizData(rekapNilai.id_Forum);
    }
  }, [rekapNilai]);

  async function getRekapNilai() {
    const res = await dispatch(getRekapById(id));

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getRekapNilai();
      }
    }
  }

  useEffect(() => {
    getRekapNilai();
  }, []);

  const [indexSoalDisplayed, setIndexSoalDisplayed] = useState(0);

  const disPlayedSoal = soal.filter(
    (soal) => soal.index === indexSoalDisplayed
  );

  function getNilaiPilgan(soal) {
    let nilai = 0;
    soal.map((soal) => {
      if (soal.jawaban_user === soal.jawaban) {
        nilai = nilai + 1;
      }
    });

    return (nilai / soal.length) * 100;
  }

  function getNilaiUraianSingkat(soal) {
    let nilai = 0;
    soal.map((soal) => {
      if (soal.jawaban_user.toLowerCase() === soal.jawaban.toLowerCase()) {
        nilai = nilai + 1;
      }
    });

    return (nilai / soal.length) * 100;
  }

  //penilaian menulis ulang dongeng
  function getNilaiUraianPanjang(soal) {
    let nilai = 0;
    let spreadedAnswer = [];
    soal.map((soal) => {
      spreadedAnswer.push({
        jawaban_user: soal.jawaban_user,
        jawaban: soal.jawaban.split(","),
      });
    });

    spreadedAnswer.forEach((hasil) => {
      let nilai_perNomor = 0;

      hasil.jawaban.forEach((jawaban) => {
        if (hasil.jawaban_user.toLowerCase().includes(jawaban.toLowerCase())) {
          nilai_perNomor += 1;
        }
      });

      let score = (nilai_perNomor / hasil.jawaban.length) * 100;
      nilai = nilai + score;
    });

    return nilai / spreadedAnswer.length;
  }
  //penilaian menulis ulang dongeng - end

  async function uploadNilai() {
    let nilaiPilgan = getNilaiPilgan(
      soal.filter((soal) => soal.jenis === "pilgan")
    );
    let nilaiUrianSingkat = getNilaiUraianSingkat(
      soal.filter((soal) => soal.jenis === "uraianSingkat")
    );
    // let nilaiUraianPanjang = getNilaiUraianPanjang(
    //   soal.filter((soal) => soal.jenis === "uraianPanjang")
    // );

    var nilai = (nilaiPilgan + nilaiUrianSingkat) / 2;

    const res = await dispatch(
      updateNilaiForum({
        id,
        nilai,
      })
    );

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return uploadNilai();
      }
    }

    setNilai(nilai);
    Swal.fire({
      title: "Submitted!",
      text: "Your quiz has been submitted.",
      icon: "success",
    });
  }

  function handleSubmitQuiz() {
    Swal.fire({
      title: "Are you sure?",
      text: "Pastikan semua soal terisi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        uploadNilai();
      }
    });
  }

  const [timer, setTimer] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (timer === 0) {
      Swal.fire({
        title: "Times Out?",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Oke",
      }).then((result) => {
        if (result.isConfirmed) {
          uploadNilai();
        }
      });
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <UserLayout>
      <div
        style={{ minHeight: "calc(100vh - 76px)" }}
        className="d-flex align-items-center justify-content-center bg-secondary-light"
      >
        {isLoading ? (
          <Loading />
        ) : nilai > 0 ? (
          <QuizResult nilai={nilai} />
        ) : indexSoalDisplayed === 0 ? (
          <QuizPreparation
            soal={soal}
            setIndexSoalDisplayed={setIndexSoalDisplayed}
            setTimer={setTimer}
          />
        ) : (
          <QuizSoal
            soal={soal}
            setSoal={setSoal}
            setIndexSoalDisplayed={setIndexSoalDisplayed}
            displayedSoal={disPlayedSoal}
            handleSubmitQuiz={handleSubmitQuiz}
            timer={timer}
          />
        )}
      </div>
    </UserLayout>
  );
};

export default Quiz_2;

const QuizQisplayPilgan = ({ displayedSoal, soal, setSoal }) => {
  function handleChangeOpsi(e) {
    setSoal((prevSoal) =>
      prevSoal.map((soal) =>
        soal.index === displayedSoal[0]?.index
          ? { ...soal, jawaban_user: e.target.value }
          : soal
      )
    );
  }

  return (
    <div className="my-4">
      <p className="fs-4">{displayedSoal[0]?.soal}</p>
      <div className="mt-3 fs-5 d-flex flex-column gap-2">
        <label className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="jawaban_user"
            value={displayedSoal[0]?.opsi_1}
            onChange={handleChangeOpsi}
            checked={
              soal[displayedSoal[0]?.index - 1]?.jawaban_user ===
              displayedSoal[0]?.opsi_1
            }
          />
          <span className="form-check-label">{displayedSoal[0]?.opsi_1}</span>
        </label>
        <label className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="jawaban_user"
            value={displayedSoal[0]?.opsi_2}
            onChange={handleChangeOpsi}
            checked={
              soal[displayedSoal[0]?.index - 1]?.jawaban_user ===
              displayedSoal[0]?.opsi_2
            }
          />
          <span className="form-check-label">{displayedSoal[0]?.opsi_2}</span>
        </label>
        <label className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="jawaban_user"
            value={displayedSoal[0]?.opsi_3}
            onChange={handleChangeOpsi}
            checked={
              soal[displayedSoal[0]?.index - 1]?.jawaban_user ===
              displayedSoal[0]?.opsi_3
            }
          />
          <span className="form-check-label">{displayedSoal[0]?.opsi_3}</span>
        </label>
        <label className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="jawaban_user"
            value={displayedSoal[0]?.opsi_4}
            onChange={handleChangeOpsi}
            checked={
              soal[displayedSoal[0]?.index - 1]?.jawaban_user ===
              displayedSoal[0]?.opsi_4
            }
          />
          <span className="form-check-label">{displayedSoal[0]?.opsi_4}</span>
        </label>
      </div>
    </div>
  );
};
