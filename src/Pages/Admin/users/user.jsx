import swal, { confirmSwal } from "../../../Component/alert";
import Pagination from "../../../Component/pagination";
import ItemListUser from "../Component/itemListUser";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../lib/redux/api/userAdmin";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import Loading from "../../../Component/loading";
import { PlusIcon } from "../forumQuiz";
import jsPDF from "jspdf";
import CryptoJS from "crypto-js";

const User = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tableHead = [
    "Nama",
    "Username",
    "Sekolah",
    "Email",
    "Role",
    "Created At",
    "Updated At",
    "Aksi",
  ];

  const dispatch = useDispatch();
  var { users, isLoading } = useSelector((state) => state.usersAdmin);
  users = users.filter((user) => user.role !== "admin");

  const getUser = async () => {
    const res = await dispatch(getAllUsers());

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getUser();
      }
    }
    // const result = await axios.get("http://localhost:5000/api/users", {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // });
    // setItems(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter items berdasarkan pencarian
  const filteredItems = users.filter(
    (item) =>
      item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sekolah?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const location = useLocation();

  const { message, status } = location.state || {};

  useEffect(() => {
    if (message) {
      swal(message, status);
    }
    getUser();
  }, []);

  const addUser = () => {
    navigate(`./add`);
  };

  function converToPdf() {
    const doc = new jsPDF();
    const tableData = filteredItems.map((row, index) => [
      index + 1, // Assuming `row.no` should be a sequential number
      row?.nama || "undefined",
      row?.username || "undefined",
      row?.originalPass || "",
      row?.sekolah || "",
    ]);

    const tableHeaders = [
      "No",
      "Nama",
      "Username",
      "Password",
      "Nama Sekolahh",
    ];
    // p

    doc.text("Daftar Siswa", 15, 15);
    doc.autoTable({
      startY: 20,
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("array_data.pdf");
  }

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
                onChange={handleSearch}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="Search"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="col d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                onClick={addUser}
              >
                Add User
              </button>
              <button
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                onClick={converToPdf}
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
                    <ItemListUser items={currentItems} getUser={getUser} />
                  </tbody>
                </table>
              </section>
            </section>
            <section className="">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
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

export default User;
