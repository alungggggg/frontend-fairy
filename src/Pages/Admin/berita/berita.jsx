import { useEffect, useState } from "react";
import Loading from "../../../Component/loading";
import Pagination from "../../../Component/pagination";
import AdminLayout from "../adminLayout";
import ItemListUser from "../Component/itemListUser";
import { PlusIcon } from "../forumQuiz";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsData, getNewsData } from "../../../lib/redux/api/news";

const tableHead = ["No", "judul", "Gambar", "tanggal Dibuat", ""];

const Berita = () => {
  const [searchParam, setSearchParam] = useState("");

  const { data: dataBerita, isLoading } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const searchData = dataBerita?.filter((item) =>
    item.judul.toLowerCase().includes(searchParam.toLowerCase())
  );

  const confirmSwal = (title, text) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });
  };

  async function deleteBerita(id) {
    confirmSwal("Peringatan", "Anda yakin ingin menghapus user ini?").then(
      async (result) => {
        if (result.isConfirmed) {
          async function handleDelete() {
            const res = await dispatch(deleteNewsData(id));
          }
          handleDelete();
        }
      }
    );
  }

  async function getBerita() {
    const res = await dispatch(getNewsData());
  }

  //pgination
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //pgination

  useEffect(() => {
    getBerita();
  }, []);
  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <section className="container mt-4 mb-4">
          <div className="row mb-3">
            <div className="input-group col">
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
              <Link
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                to={"./add"}
              >
                Add Berita
              </Link>
              <button
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                // onClick={converToPdf}
              >
                <PlusIcon size={24} />
                Export
              </button>
            </div>
          </div>
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
                          <div>
                            <img
                              src="https://placehold.co/600x400"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </td>
                        <td>{item.created_at.split(" ")[0]}</td>
                        <td style={{ width: "200px" }}>
                          <Link
                            className="btn btn-sm btn-primary border"
                            to={`./${item?.id || item?.judul}`}
                          >
                            Lihat
                          </Link>
                          <Link
                            className="btn btn-sm btn-success border"
                            to={`./update/${item?.id || item?.judul}`}
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-sm btn-danger border"
                            onClick={() => deleteBerita(item?.id)}
                          >
                            Hapus
                          </button>
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
        </section>
      )}
    </AdminLayout>
  );
};

export default Berita;
