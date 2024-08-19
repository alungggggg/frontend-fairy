import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteForumQuiz,
  getForumQuizById,
} from "../../../lib/redux/api/forumQuiz";
import Loading from "../../../Component/loading";

const ForumQuizDetail = () => {
  const { id } = useParams();
  const { forumQuiz, isLoading } = useSelector((state) => state.forumQuiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getForumQuizById(id));
  }, []);

  async function handelDeleteQuiz() {
    if (window.confirm("Are you sure?")) {
      await dispatch(deleteForumQuiz(id));
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
        <div className="container">
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
                <button className="btn btn-secondary">Edit</button>
                <button
                  className="btn btn-secondary"
                  onClick={handelDeleteQuiz}
                >
                  Hapus
                </button>
              </div>
            </div>
            <div className="w-100 d-flex gap-2">
              <div className="card border p-3 w-50">
                <h1>Daftar Peserta</h1>
                <p className="d-flex align-items-center gap-1 fs-5">
                  <PersonIcon size={24} />
                  24
                </p>
              </div>
              <div className="card border p-3 w-50">
                <h1>Daftar Soal</h1>
                <div className="">
                  <p className="m-0 fs-5 d-flex gap-1 align-items-center">
                    <ListIcon size={24} />
                    {forumQuiz[0]?.dongeng.soalPilgans.length ||
                      0 + forumQuiz[0]?.dongeng.soalUraianPanjangs.length ||
                      0 + forumQuiz[0]?.dongeng.soalUraianSingkats.length ||
                      0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
      class="bi bi-person"
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
      class="bi bi-ui-radios"
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
