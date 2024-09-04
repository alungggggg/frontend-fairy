import Header from "../../template/header";
import Footer from "../../template/footer";
import axios from "axios";
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

const User = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <section className="container mt-4 mb-4">
          <section className="card">
            <section className="card-header">
              <section className=" input-group">
                <h3 className="card-title me-3">Admin</h3>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-sm btn-orange text-white"
                  onClick={handleSearch}
                >
                  cari
                </button>
              </section>
            </section>
            <section className="card-body p-0">
              <section className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr className="">
                      <th>Nama</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ItemListUser items={currentItems} getUser={getUser} />
                  </tbody>
                </table>
              </section>
            </section>
            <section className="card-footer">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
                paginate={paginate}
              />
              <button
                className="btn btn-sm btn-orange text-white float-left"
                onClick={addUser}
              >
                Add User
              </button>
            </section>
          </section>
        </section>
      )}
    </AdminLayout>
  );
};

export default User;
