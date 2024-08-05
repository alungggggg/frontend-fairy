import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2"; // Pastikan Anda mengimpor swal dengan benar

const ItemListUser = ({ items, getUser }) => {
  const navigate = useNavigate();

  const confirmSwal = (title, text) => {
    return swal.fire({
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

  const deleteUser = async (key) => {
    confirmSwal("Peringatan", "Anda yakin ingin menghapus user ini?").then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5000/api/users/${key}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            getUser();
            swal.fire("Berhasil", "User berhasil dihapus", "success");
          } catch (error) {
            console.log(error.message);
            swal.fire("Error", "Gagal menghapus user", "error");
          }
        }
      }
    );
  };

  const updateUser = (key) => {
    navigate(`/users/update/${key}`);
  };

  if (items.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="text-center">
          <section className="container my-4 py-4">
            <section className="row">
              <section className="col text-center">
                <img
                  className="img-fluid w-50"
                  src="https://buku.kemdikbud.go.id/assets/image/oops.png"
                  alt="halaman tidak ditemukan"
                />
                {/* <h1 className="fw-bold fs-1">User Not Found</h1> */}
                <p className="lead text-muted mb-5">
                  Sepertinya user yang kamu cari tidak ditemukan.
                </p>
              </section>
            </section>
          </section>
        </td>
      </tr>
    );
  }

  return (
    <>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.nama}</td>
          <td>{item.email}</td>
          <td>{new Date(item.createdAt).toLocaleString()}</td>
          <td>{new Date(item.updatedAt).toLocaleString()}</td>
          <td>
            <button
              className="btn btn-sm btn-success border me-2"
              onClick={() => updateUser(item.id)}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-danger border"
              onClick={() => deleteUser(item.id)}
            >
              Hapus
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ItemListUser;
