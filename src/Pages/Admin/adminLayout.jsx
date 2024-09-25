import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../template/header";
import Sidebar from "./Component/sidebar";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../lib/redux/api/users";
import { getNewAccessToken, signOut } from "../../lib/redux/api/auth";

const AdminLayout = ({ children }) => {
  const navList = [
    { name: "Dashboard", path: "/admin", icon: <HomeIcon size={24} /> },
    { name: "Users", path: "/admin/users", icon: <UsersIcon size={24} /> },
    { name: "Dongeng", path: "/admin/dongeng", icon: <BookIcon size={24} /> },
    {
      name: "Bank Soal",
      path: "/admin/bank-soal",
      icon: <BoxIcon size={24} />,
    },
    {
      name: "Forum Quiz",
      path: "/admin/forum-quiz",
      icon: <MortorboardIcon size={24} />,
    },
  ];

  const dispatch = useDispatch();

  async function handleLogout() {
    await dispatch(signOut());
  }

  const refresh_token = getCookie("refreshToken");
  const users_id = getCookie("userID");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    async function getDataUsers() {
      var res = await dispatch(getUserById(users_id));
      if (res.error) {
        if (res.error.message === "401") {
          console.log("get new access token");
          dispatch(getNewAccessToken());
          return getDataUsers();
        }
      }
      const { role } = res?.payload;
      if (role !== "admin" && role !== "guru") {
        return navigate("/");
      }
    }

    getDataUsers();
  }, []);

  if (!refresh_token || !users_id) return <Navigate to={"/login"} />;

  return (
    <div className="container-fluid bg-night">
      <div className="d-flex flex-column justify-content-between flex-md-row align-items-center text-light px-sm-2 px-0 py-4 bg-night gap-4">
        <Link
          to={"/"}
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
        </Link>
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle "
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://th.bing.com/th/id/OIP.oVIyTk_GGnAj3YzNXppdpQAAAA?w=189&h=189&c=7&r=0&o=5&pid=1.7"
              alt="hugenerd"
              width="50"
              height="50"
              className="rounded-circle"
            />
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow mt-3">
            <div>
              <p className="dropdown-item m-0 text-capitalize">
                {user?.role || "undefined"}
              </p>
              <hr className="my-2" />
            </div>
            <li>
              <a
                className="dropdown-item d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                Sign out
                <LogoutIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row flex-nowrap">
        <Sidebar navList={navList} />
        <div className="col p-3 bg-light">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

export const UsersIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-people"
    viewBox="0 0 16 16"
  >
    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
  </svg>
);
export const BookIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-book"
    viewBox="0 0 16 16"
  >
    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
  </svg>
);

export const BoxIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-box2"
    viewBox="0 0 16 16"
  >
    <path d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3zM7.5 1H3.75L1.5 4h6zm1 0v3h6l-2.25-3zM15 5H1v10h14z" />
  </svg>
);

export const MortorboardIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-mortarboard"
    viewBox="0 0 16 16"
  >
    <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
    <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
  </svg>
);

export const HomeIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-house"
    viewBox="0 0 16 16"
  >
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
  </svg>
);

export const LogoutIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    class="bi bi-box-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
    />
    <path
      fillRule="evenodd"
      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
    />
  </svg>
);
