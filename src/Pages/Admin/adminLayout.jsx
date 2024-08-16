import { NavLink } from "react-router-dom";
import Header from "../template/header";
import Sidebar from "./Component/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="text-light px-sm-2 px-0 py-4 bg-night">
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
      </div>
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col py-3 bg-light">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
