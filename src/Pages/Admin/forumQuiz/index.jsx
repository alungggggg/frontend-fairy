import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../adminLayout";
import { useEffect } from "react";
import { getForumQuiz } from "../../../lib/redux/api/forumQuiz";

const ForumQuiz = () => {
  const tableHead = [
    "No",
    "Judul",
    "Topik",
    "Sekolah",
    "Access Date",
    "Expired Date",
    "Token",
  ];
  const dispatch = useDispatch()

  const { forumQuiz } = useSelector((state) => state.forumQuiz);

  useEffect(()=>{
    dispatch(getForumQuiz())
  },[])
  console.log(forumQuiz);
  return (
    <AdminLayout>
      <div className="">
        <div className="row mb-3">
          <div className="input-group col">
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="button-addon2"
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
            <button type="button" className="btn btn-secondary">
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
                {
                  forumQuiz.map((item, i) => (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{item.judul}</td>
                      <td>{item.dongeng.title}</td>
                      <td>{item.sekolah}</td>
                      <td>{item.access_date}</td>
                      <td>{item.expired_date}</td>
                      <td>{item.token}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
};

export default ForumQuiz;
