import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import { getSoalArtikel } from "../../../../lib/redux/api/soalArtikelSlice";
import { PlusIcon } from "../../forumQuiz";
import { Link } from "react-router-dom";
import Pagination from "../../../../Component/pagination";
import SoalArtikelDialog from "./dialog";
import { getArtikelData } from "../../../../lib/redux/api/artikelSlice";

const SoalArtikelAdmin = () => {
  const { data: soalArtikelData, isLoading } = useSelector(
    (state) => state.soalArtikel
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleGetSoal() {
      await dispatch(getSoalArtikel());
      await dispatch(getArtikelData());
    }

    handleGetSoal();
  }, []);

  // pagination and search state
  const [searchParam, setSearchParam] = useState("");
  const searchData = soalArtikelData?.filter(
    (item) =>
      item.soal.toLowerCase().includes(searchParam.toLowerCase()) ||
      item.artikel.judul.toLowerCase().includes(searchParam.toLowerCase())
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination and search state

  // dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [action, setAction] = useState("");
  // dialog state
  return (
    <AdminLayout>
      <section>
        <div className="row mb-3">
          <div className="input-group col">
            <Link
              to={"../"}
              className="btn shadow-none border d-flex justify-content-center align-items-center"
            >
              <ArrowLeftIcon />
            </Link>
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => {
                setSearchParam(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="Search"
              onClick={() => {
                setSearchParam("");
                setCurrentPage(1);
              }}
            >
              Clear
            </button>
          </div>
          <div className="col d-flex justify-content-end gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowDialog(true);
                setAction("add");
              }}
            >
              <PlusIcon size={32} />
              Add Soal
            </button>
          </div>
        </div>
      </section>
      <section>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Soal</th>
              <th>Judul Artikel</th>
              <th>Jawaban</th>
              <th>Score</th>
              <th style={{ width: "220px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.soal}</td>
                <td>{item?.artikel?.judul || "undefined"}</td>
                <td>{item?.jawaban || "undefined"}</td>
                <td>{item?.score || "undefined"}</td>
                <td className="d-flex gap-1" style={{ width: "220px" }}>
                  <button
                    className="btn bg-secondary text-white"
                    onClick={() => {
                      setShowDialog(true);
                      setAction("view");
                      setSelectedData(item);
                    }}
                  >
                    Lihat
                  </button>
                  {/* Add action buttons here */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowDialog(true);
                      setAction("edit");
                      setSelectedData(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowDialog(true);
                      setAction("delete");
                      setSelectedData(item);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={searchData.length}
          paginate={paginate}
          className={"mt-3"}
        />
      </section>
      <SoalArtikelDialog
        action={action}
        selectedData={selectedData}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </AdminLayout>
  );
};

export default SoalArtikelAdmin;

export const ArrowLeftIcon = ({ size = 24, className = "" }) => {
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
