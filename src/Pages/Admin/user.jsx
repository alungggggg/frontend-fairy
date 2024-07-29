import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import swal, { confirmSwal } from "../../Component/alert";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { message, status } = location.state || {};

  const [users, setUsers] = useState([]);
  const getUser = async () => {
    const result = await axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUsers(result.data);
  };

  useEffect(() => {
    if (message) {
      swal(message, status)
    }
    getUser();
  }, []);

  const deleteUser = async (key) => {
    confirmSwal("Peringatan", "Anda yakin ingin menghapus user ini?").then(async (result) => {
      if (result.isConfirmed) {
        const result = await axios.delete(
          `http://localhost:5000/api/users/${key}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        getUser();
        swal("User Berhasil di hapus", "success")
      }
    })

  };
  const updateUser = (key) => {
    navigate(`/users/update/${key}`);
  };

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
          </section>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table m-0">
                <thead>
                  <tr className="">
                    <th className="">No.</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.nama}</td>
                      <td>{user.email}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>
                      <td>
                        <button onClick={() => updateUser(user.id)}>
                          update
                        </button>
                        <button onClick={() => deleteUser(user.id)}>
                          hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
          <section className="card-footer">
            <button
              className="btn btn-sm btn-orange text-white float-left"
              onClick={addUser}
            >
              Add User
            </button>
          </section>
        </section>
      </section>
      <Footer></Footer>
    </>
  );
};

export default User;
