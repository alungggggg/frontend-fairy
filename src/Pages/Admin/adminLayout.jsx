import { NavLink, useLocation } from "react-router-dom";
import Header from "../template/header";
import Sidebar from "./Component/sidebar";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const navList = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Dongeng", path: "/admin/dongeng" },
    { name: "Bank Soal", path: "/admin/bank-soal" },
    { name: "Forum Quiz", path: "/admin/forum-quiz" },
    { name: "Rekap Siswa", path: "" },
  ];
  const location = useLocation();

  let [displayNav, setDisplayNav] = useState("");

  useEffect(() => {
    navList.forEach((item) => {
      if (location.pathname === item.path) {
        setDisplayNav(item.name);
      }
    });
  },[location.pathname])

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column justify-content-between flex-md-row align-items-center text-light px-sm-2 px-0 py-4 bg-night gap-4">
        <NavLink
          href="/admin"
          className="navbar-brand d-flex align-items-center"
        >
          <div style={{ minWidth: "50px" }}>
            <img
              src="https://buku.kemdikbud.go.id/assets/image/logo-sibi.png"
              height={50}
              alt="Logo"
            />
          </div>
          <section className="navbar-dark" style={{ fontSize: "0.95rem" }}>
            <section>Sistem Informasi</section>
            <section className="fw-bold">Perbukuan Indonesia</section>
          </section>
        </NavLink>
        <h1 className="fs-2 m-0 fw-normal">{displayNav}</h1>
      </div>
      <div className="row flex-nowrap">
        <Sidebar navList={navList} />
        <div className="col py-3 px-0 bg-light">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
