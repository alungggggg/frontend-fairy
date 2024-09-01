import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteForumQuiz,
  getForumQuizById,
} from "../../../lib/redux/api/forumQuiz";
import { getRekapNilaiByIdForum } from "../../../lib/redux/api/rekapNilai";
import Loading from "../../../Component/loading";
import { DeleteIcon, EditIcon } from "../bankSoal/pilihanGanda";
import EditForum from "./editForum";
import Swal from "sweetalert2";
import { getNewAccessToken } from "../../../lib/redux/api/auth";

const ForumQuizDetail = () => {
  const { id } = useParams();
  const { forumQuiz, isLoading } = useSelector((state) => state.forumQuiz);
  const { rekapNilai } = useSelector((state) => state.rekapNilai);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  var soalPilgans = forumQuiz[0]?.dongeng?.soalPilgans || [];
  var soalUraianSingkats = forumQuiz[0]?.dongeng?.soalUraianSingkats || [];
  var soalUraianPanjangs = forumQuiz[0]?.dongeng?.soalUraianPanjangs || [];

  useEffect(() => {
    async function getDatas() {
      var res_forum = await dispatch(getForumQuizById(id));
      var res_rekap = await dispatch(getRekapNilaiByIdForum(id));

      if (res_forum.error || res_rekap.error) {
        if (
          res_forum.error.message === "401" ||
          res_rekap.error.message === "401"
        ) {
          console.log("getting new access token");
          dispatch(getNewAccessToken());
          return getDatas();
        }
      }
    }

    getDatas();
  }, []);

  async function handelDeleteQuiz() {
    if (window.confirm("Are you sure?")) {
      var res = await dispatch(deleteForumQuiz(id));
      console.log(res);
      if (res.error) {
        if (res.error.message === "401") {
          console.log("getting acces token");
          await dispatch(getNewAccessToken());
          return handelDeleteQuiz();
        }
      }
      Swal.fire("Success", "Forum Quiz has been deleted", "success");
      return navigate("/admin/forum-quiz");
    }
  }
  return (
    <AdminLayout>
      {isLoading ? (
        <section className="w-100 d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <div className="">
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={"/admin/forum-quiz"}
              className={
                "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black"
              }
            >
              <ArrowLeft size={24} /> Forum Quiz List
            </Link>
          </div>
          <hr />
          <div className="w-100 d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="m-0 fs-1 fw-normal">{forumQuiz[0]?.judul}</h1>
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="btn btn-primary d-flex gap-2 align-items-center"
                  onClick={() =>
                    document.getElementById("showModalEditForum").click()
                  }
                >
                  <EditIcon size={24} />
                  Edit
                </button>
                <button
                  className="btn btn-danger d-flex gap-2 align-items-center"
                  onClick={handelDeleteQuiz}
                >
                  <DeleteIcon size={24} />
                  Hapus
                </button>
              </div>
            </div>
            <div className="w-100 d-flex gap-2">
              <Link
                to={"./rekap"}
                className="card border p-3 w-50 text-decoration-none"
              >
                <h1>Daftar Peserta</h1>
                <div className="card border p-3 w-50 text-decoration-none">
                  <p className="m-0 fs-5 d-flex gap-1 align-items-center">
                    <PersonIcon size={24} />
                    {rekapNilai?.length || 0}
                  </p>
                </div>
              </Link>
              <Link
                to={"./soal"}
                className="card border p-3 w-50 text-decoration-none"
              >
                <h1>Daftar Soal</h1>
                <div className="card border p-3 w-50 text-decoration-none">
                  <p className="m-0 fs-5 d-flex gap-1 align-items-center">
                    <ListIcon size={24} />
                    {soalPilgans.length +
                      soalUraianSingkats.length +
                      soalUraianPanjangs.length}
                  </p>
                </div>
              </Link>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <p className="fs-3 rounded-2 border p-2 d-flex gap-1 align-items-center">
                <button
                  className="btn"
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "grey")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(forumQuiz[0]?.token);
                    Swal.fire("Success", "Token has been copied", "success");
                  }}
                >
                  <CopyIcon size={24} />
                </button>
                {forumQuiz[0]?.token}
              </p>
            </div>
          </div>
        </div>
      )}
      <EditForum />
    </AdminLayout>
  );
};

export default ForumQuizDetail;

export const ListIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-list-ol"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"
      />
      <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
    </svg>
  );
};

export const PersonIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-person"
      viewBox="0 0 16 16"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
    </svg>
  );
};

export const CheckRadioIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-ui-radios"
      viewBox="0 0 16 16"
    >
      <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM0 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0m7-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M3 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
    </svg>
  );
};

export const ArrowLeft = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
      />
    </svg>
  );
};

export const CopyIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-copy"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
      />
    </svg>
  );
};
