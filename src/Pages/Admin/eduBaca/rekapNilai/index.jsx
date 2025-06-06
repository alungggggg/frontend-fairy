import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../adminLayout";
import { ArrowLeftIcon } from "../soal";
import { PlusIcon } from "../../forumQuiz";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRekapNilaiArtikel } from "../../../../lib/redux/api/rekapNilaiArtikelSlice";
import Pagination from "../../../../Component/pagination";

const RekapNilaiArtikel = () => {
  const { data: artikelNilaiData, isLoading } = useSelector(
    (state) => state.nilaiArtikel
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetNilai() {
      const res = await dispatch(getRekapNilaiArtikel());
    }

    handleGetNilai();
  }, []);

  // pagination and search state
  const [searchParam, setSearchParam] = useState("");
  const searchData = artikelNilaiData?.filter((item) =>
    item.judul.toLowerCase().includes(searchParam.toLowerCase())
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination and search state

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
        </div>
        <section>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Judul Artikel</th>
                <th>Jumlah Peserta</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item?.judul || "undefined"}</td>
                  <td>{item?.nilai?.length}</td>
                  <td className="d-flex gap-1" style={{ width: "100px" }}>
                    <Link className="btn btn-success" to={`${item.id}`}>
                      Detail
                    </Link>
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
      </section>
    </AdminLayout>
  );
};

export default RekapNilaiArtikel;
