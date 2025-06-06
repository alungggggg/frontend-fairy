import { useEffect, useState } from "react";
import AdminLayout from "../../../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../../soal";
import { PlusIcon } from "../../../forumQuiz";
import Pagination from "../../../../../Component/pagination";
import { getRekapNilaiByIdArtikel } from "../../../../../lib/redux/api/rekapNilaiArtikelSlice";

const DetailRekapNilai = () => {
  const { data: artikelNilaiData, isLoading } = useSelector(
    (state) => state.nilaiArtikel
  );
  const dispatch = useDispatch();
  const { id_artikel } = useParams();

  useEffect(() => {
    async function handleGetRekapNilai() {
      const res = await dispatch(getRekapNilaiByIdArtikel(id_artikel));
    }

    handleGetRekapNilai();
  }, [id_artikel]);

  //   // pagination and search state
  const [searchParam, setSearchParam] = useState("");
  const searchData = artikelNilaiData[0]?.nilai?.filter((item) =>
    item.user.nama.toLowerCase().includes(searchParam.toLowerCase())
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData?.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className="col d-flex justify-content-end gap-2">
            <button className="btn btn-primary" disabled={isLoading}>
              <PlusIcon size={32} />
              Export
            </button>
          </div>
        </div>
      </section>
      <section>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th>Nama Peserta</th>
              <th>Kelas</th>
              <th>Sekolah</th>
              <th>Nilai</th>
              <th style={{ width: "100px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.user?.nama || "undefined"}</td>
                <td>{item?.user?.kelas || "undefined"}</td>
                <td>{item?.user?.sekolah || "undefined"}</td>
                <td>{item?.nilai}</td>
                <td className="d-flex gap-1" style={{ width: "100px" }}>
                  <button className="btn btn-danger">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={searchData?.length}
          paginate={paginate}
          className={"mt-3"}
        />
      </section>
    </AdminLayout>
  );
};

export default DetailRekapNilai;
