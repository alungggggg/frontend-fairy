import ItemListDongeng from "../Component/itemListDongeng";
import Pagination from "../../../Component/pagination";
import { useEffect, useState } from "react";
import AdminLayout from "../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllDongeng } from "../../../lib/redux/api/dongeng";
import Loading from "../../../Component/loading";
import { PlusIcon } from "../forumQuiz";
import { DeleteIcon, EditIcon } from "../bankSoal/pilihanGanda";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import { useNavigate } from "react-router-dom";

const dongeng = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  const tableHead = ["No", "Cover", "Tittle", ""];

  const { dongeng, isLoading, error } = useSelector((state) => state.dongeng);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllDongeng());
  }, []);

  async function reGetAction() {
    await dispatch(getNewAccessToken());
    await dispatch(getAllDongeng());
  }

  useEffect(() => {
    if (error === "401") {
      reGetAction();
    }
  }, [error]);

  const filteredItems = dongeng.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="Search"
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
                    {tableHead.map((item, i) => {
                      if (i == tableHead.length - 1) {
                        return (
                          <th key={i} style={{ width: "120px" }}>
                            {item}
                          </th>
                        );
                      } else {
                        return <th key={i}>{item}</th>;
                      }
                    })}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, i) => (
                    <tr
                    className="align-middle"
                      key={i}
                      onClick={() => navigate(`./update/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{i + 1}</td>
                      <td>{item?.cover}</td>
                      <td>{item?.title || ``}</td>
                      <td
                        className="d-flex gap-2 justify-content-end"
                        style={{ maxWidth: "120px" }}
                      >
                        <button type="button" className="btn btn-primary">
                          <EditIcon size={18} />
                        </button>
                        <button type="button" className="btn btn-danger">
                          <DeleteIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
                className={"mt-4"}
                paginate={paginate}
              />
            </section>
          </section>
        </div>
      )}
    </AdminLayout>
  );
};

export default dongeng;
