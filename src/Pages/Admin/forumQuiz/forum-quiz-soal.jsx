import { Link, useParams } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "./forumDetail";
import { PlusIcon } from ".";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ForumQuizSoal = () => {
  const { id } = useParams();
  const tableHead = ["No", "Soal", "jenis", "Topik", "Jawaban"];
  const { forumQuiz } = useSelector((state) => state.forumQuiz);

  const [soal, setSoal] = useState([]);

  useEffect(() => {
    setSoal([]);
    forumQuiz[0]?.dongeng.soalPilgans.map((item) => {
      setSoal((prev) => [
        ...prev,
        { ...item, type: "Pilihan Ganda", topik: forumQuiz[0]?.dongeng.title },
      ]);
    });

    forumQuiz[0]?.dongeng.soalUraianSingkats.map((item) => {
      setSoal((prev) => [
        ...prev,
        { ...item, type: "Uraian Singkat", topik: forumQuiz[0]?.dongeng.title },
      ]);
    });

    forumQuiz[0]?.dongeng.soalUraianPanjangs.map((item) => {
      setSoal((prev) => [
        ...prev,
        { ...item, type: "Uraian Panjang", topik: forumQuiz[0]?.dongeng.title },
      ]);
    });
  }, []);


  return (
    <AdminLayout>
      <div className="">
        <div className="d-flex justify-content-between align-items-center p-0">
          <Link
            to={`../${id}`}
            className={
              "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black "
            }
          >
            <ArrowLeft size={24} /> Forum Quiz
          </Link>
        </div>
        <hr className="my-3" />
        <div className="row mb-3">
          <div className="input-group col">
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="Search"
            >
              Search
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
            >
              <PlusIcon size={24} />
              Export
            </button>
          </div>
        </div>
        <section className="card-body p-0">
          <section className="table-responsive">
            <table className="table table-striped m-0 ">
              <thead>
                <tr>
                  {tableHead.map((item, i) => (
                    <th key={i}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {soal?.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.soal}</td>
                    <td>{item.type}</td>
                    <td>{item.topik}</td>
                    <td>{item.jawaban}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
};

export default ForumQuizSoal;
