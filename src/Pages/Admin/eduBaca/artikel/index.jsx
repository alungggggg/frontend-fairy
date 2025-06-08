import { Link } from "react-router-dom";
import AdminLayout from "../../adminLayout";
import Pagination from "../../../../Component/pagination";
import { useEffect, useState } from "react";
import { PlusIcon } from "../../forumQuiz";
import { useDispatch, useSelector } from "react-redux";
import { getArtikelData } from "../../../../lib/redux/api/artikelSlice";
import Loading from "../../../../Component/loading";
import ArtikelDialogAdmin from "./components/dialog";
import { ArrowLeftIcon } from "../soal";

const tableHead = [
  "No",
  "Judul",
  "Gambar",
  "Jumlah Soal",
  "Total Score",
  "type",
  "Aksi",
];

const ArtikelEduBacaAdmin = () => {
  const { data: artikelData, isLoading } = useSelector(
    (state) => state.artikel
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchArtikel() {
      await dispatch(getArtikelData());
    }
    fetchArtikel();
  }, [dispatch]);

  // pagination and search state
  const [searchParam, setSearchParam] = useState("");
  const searchData = artikelData?.filter((item) =>
    item.judul.toLowerCase().includes(searchParam.toLowerCase())
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
              value={searchParam}
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
              disabled={isLoading}
            >
              <PlusIcon size={32} />
              Add Artikel
            </button>
          </div>
        </div>
      </section>
      {isLoading ? (
        <section
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Loading />
        </section>
      ) : currentItems.length <= 0 ? (
        <section className="bg-white border text-center p-5">
          <h4>Data artikel tidak ditemukan !</h4>
        </section>
      ) : (
        <>
          <section className="">
            <section className="p-0">
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
                    {currentItems.map((item, i) => (
                      <tr key={i} className="align-middle">
                        <td>{item.id}</td>
                        <td>{item.judul}</td>
                        <td>
                          <img
                            src={`${import.meta.env.VITE_IMG_URL_ARTIKEL}/${
                              item.image
                            }`}
                            alt={item.judul}
                            className="img-fluid"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </td>
                        <td className="text-capitalize">
                          {item?.soal?.length}
                        </td>
                        <td className="text-capitalize">
                          {item?.soal?.reduce(
                            (total, item) => total + item.score,
                            0
                          )}
                        </td>
                        <td className="text-capitalize">{item.type}</td>
                        <td style={{ width: "200px" }}>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                setShowDialog(true);
                                setAction("show");
                                setSelectedData(item);
                              }}
                            >
                              Lihat
                            </button>
                            <button
                              className="btn btn-secondary"
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </section>
            <section className="">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={searchData.length}
                paginate={paginate}
                className={"mt-3"}
              />
            </section>
          </section>
        </>
      )}
      <ArtikelDialogAdmin
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        selectedData={selectedData}
        action={action}
      />
    </AdminLayout>
  );
};

export default ArtikelEduBacaAdmin;
