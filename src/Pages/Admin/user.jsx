import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import swal, { confirmSwal } from "../../Component/alert";
import Pagination from "../../Component/pagination";
import ItemListUser from "./Component/itemListUser";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";




const User = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUser = async () => {
    const result = await axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setItems(result.data);

  };

  useEffect(() => {
    getUser()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter items berdasarkan pencarian
  const filteredItems = items.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  const location = useLocation();

  const { message, status } = location.state || {};



  useEffect(() => {
    if (message) {
      swal(message, status);
    }
    getUser();
  }, []);

  const addUser = () => {
    navigate(`/users/add`);
  };

  return (
    <>
      <Header></Header>
      <section className="container mt-4 mb-4">
        <section className="card">
          <section className="card-header">
            <h3 className="card-title">Admin</h3>
            <input type="text" onChange={handleSearch} />
            <button className="btn btn-primary" onClick={handleSearch}>cari</button>
          </section>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table m-0">
                <thead>
                  <tr className="">
                    <th>Nama</th>
                    <th>Email</th>
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
      </section >
      <Footer></Footer>
    </>
  );
};

export default User;
