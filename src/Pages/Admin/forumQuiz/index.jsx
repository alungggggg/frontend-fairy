import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../adminLayout";
import { useEffect, useState } from "react";
import { getForumQuiz } from "../../../lib/redux/api/forumQuiz";
import ModalForumQuiz from "./modal";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Component/loading";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import { getAllDongeng } from "../../../lib/redux/api/dongeng";

const ForumQuiz = () => {
  const [search, setSearch] = useState();

  const tableHead = [
    "No",
    "Judul",
    "Topik",
    "Sekolah",
    "Access Date",
    "Expired Date",
    "Token",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { forumQuiz, isLoading, error } = useSelector((state) => state.forumQuiz);

  const dongeng_error = useSelector((state) => state.dongeng.error);

  async function reGetAction() {
    await dispatch(getNewAccessToken());
    await dispatch(getForumQuiz());
    await dispatch(getAllDongeng())
  }
  useEffect(() => {
    if (error === "401" || dongeng_error == "401") {
      reGetAction();
    }
  }, [error , dongeng_error]);

  let displayedForum = forumQuiz?.filter((forum) => {
    return search
      ? forum.judul.toLowerCase().includes(search.toLowerCase()) ||
          forum.dongeng.title.toLowerCase().includes(search.toLowerCase()) ||
          forum.sekolah.toLowerCase().includes(search.toLowerCase()) ||
          forum.token.toLowerCase().includes(search.toLowerCase())
      : forum;
  });

  useEffect(() => {
    dispatch(getForumQuiz());
  }, []);

  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <div className="">
          <div className="row mb-3">
            <div className="input-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Search...."
                aria-label="Search"
                aria-describedby="button-addon2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="Search"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                onClick={() => {
                  document.getElementById("showModalForumQuiz").click();
                }}
              >
                <PlusIcon size={24} />
                Add
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
                  {displayedForum?.map((item, i) => (
                    <tr
                      key={i}
                      onClick={() => navigate(`./${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{i + 1}</td>
                      <td>{item?.judul}</td>
                      <td>{item?.dongeng?.title || ``}</td>
                      <td>{item?.sekolah}</td>
                      <td>{item?.access_date}</td>
                      <td>{item?.expired_date}</td>
                      <td>{item?.token}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </div>
      )}
      <ModalForumQuiz />
    </AdminLayout>
  );
};

export default ForumQuiz;

export const PlusIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    </svg>
  );
};
