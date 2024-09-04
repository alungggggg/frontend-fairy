import ItemListDongeng from "../Component/itemListDongeng";
import Pagination from "../../../Component/pagination";
import { useEffect, useState } from "react";
import AdminLayout from "../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteDongeng, getAllDongeng } from "../../../lib/redux/api/dongeng";
import Loading from "../../../Component/loading";
import { PlusIcon } from "../forumQuiz";
import { DeleteIcon, EditIcon } from "../bankSoal/pilihanGanda";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import { useNavigate } from "react-router-dom";
import ModalDongeng from "./modalDongeng";
import Swal from "sweetalert2";

const dongeng = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tableHead = ["No", "Cover", "Tittle", ""];

  const { dongeng, isLoading, error } = useSelector((state) => state.dongeng);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDongeng());
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await dispatch(getAllDongeng());
      // console.log(res.error.message);

      if (res.error) {
        if (res.error.message === "401") {
          console.log("getting new access token");
          await dispatch(getNewAccessToken());
          return getData();
        }
      }
    }
    getData();
  }, []);

  const filteredItems = dongeng.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleDeleteDongeng(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const handleDelete = async () => {
          var res = await dispatch(deleteDongeng(id));
          if (res.error) {
            if (res.error.message === "401") {
              console.log("getting new access token");
              await dispatch(getNewAccessToken());
              return handleDelete();
            }
          }
          dispatch(getAllDongeng());
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        };

        handleDelete();
      }
    });
  }

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
                  document.getElementById("showModalDongeng").click();
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
                      style={{ cursor: "pointer" }}
                    >
                      <td width={50}>{i + 1}</td>
                      <td width={125}>
                        <div>
                          <img src={item?.cover} className="w-75" />
                        </div>
                      </td>
                      <td>{item?.title || ``}</td>
                      <td className="text-center" style={{ maxWidth: "100px" }}>
                        <button type="button" className="btn btn-primary me-1">
                          <EditIcon size={18} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteDongeng(item.id)}
                        >
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
      <ModalDongeng />
    </AdminLayout>
  );
};

export default dongeng;
