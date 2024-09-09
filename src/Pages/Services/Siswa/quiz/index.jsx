import { useDispatch, useSelector } from "react-redux";
import UserLayout from "../../Component/userLayout";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { getForumQuizByUserId } from "../../../../lib/redux/api/rekapNilai";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";
import { ArrowLeft } from "../../../Admin/forumQuiz/forumDetail";
import { Link, Navigate } from "react-router-dom";
import { PlusIcon } from "../../../Admin/forumQuiz";
import ModalJoinQuiz from "./joinQuiz";
import Loading from "../../../../Component/loading";

const QuizList = () => {
  const dispatch = useDispatch();
  var date = new Date();
  const userID = getCookie("userID");
  const { rekapNilai: quizList, isLoading } = useSelector(
    (state) => state.rekapNilai
  );

  async function getQuizListData() {
    const res = await dispatch(getForumQuizByUserId(userID));

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getQuizListData();
      }
    }
  }

  useEffect(() => {
    if (userID) {
      getQuizListData();
    }
  }, []);

  return (
    <UserLayout>
      <div style={{ minHeight: "100vh" }}>
        <section className="container h-100 my-5 bg-white rounded-2 py-3">
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Link
                  className="d-flex align-items-center gap-3 text-decoration-none text-dark fs-5"
                  to={"/"}
                >
                  <ArrowLeft size={24} />
                  Beranda
                </Link>
              </div>
              <div>
                <button
                  className="d-flex align-items-center gap-2 btn btn-outline-dark"
                  onClick={() =>
                    document.getElementById("showModalJoinQuiz").click()
                  }
                >
                  <PlusIcon size={24} />
                  Join Quiz
                </button>
              </div>
            </div>
            <hr />
          </div>
          {isLoading ? (
            <section
              className="text-center d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <Loading />
            </section>
          ) : (
            <>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul Quiz</th>
                    <th scope="col">Topik Quiz</th>
                    <th scope="col">Nilai</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quizList?.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.forumQuiz?.judul || "undefined"}</td>
                      <td>{item?.forumQuiz?.dongeng?.title || "undefined"}</td>
                      <td>{item.nilai || 0}</td>
                      <td>
                        {item.nilai
                          ? "Selesai"
                          : new Date(item?.forumQuiz?.access_date) > date
                          ? "Belum Dibuka"
                          : new Date(item?.forumQuiz?.expired_date) < date
                          ? "Telah Expired"
                          : "Belum Selesai"}
                      </td>
                      <td>
                        <Link to={`/quiz/${item?.id}`}>
                          Kerjakan
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {quizList?.length === 0 && (
                <div
                  className="d-flex align-items-center justify-content-center text-center fs-3"
                  style={{ height: "300px" }}
                >
                  Belum Bergabung Dalam Quiz
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <ModalJoinQuiz />
    </UserLayout>
  );
};

export default QuizList;
