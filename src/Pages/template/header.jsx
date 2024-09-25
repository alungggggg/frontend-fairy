import { getCookie } from "cookies-next";
import { LogoutIcon } from "../Admin/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../lib/redux/api/users";
import { getNewAccessToken, signOut } from "../../lib/redux/api/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const id = getCookie("userID");
  const dispatch = useDispatch();

  async function getDataUser() {
    const res = await dispatch(getUserById(id));
    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getDataUser();
      }
    }
  }
  async function handleLogout() {
    await dispatch(signOut());
  }

  useEffect(() => {
    if (id) {
      getDataUser();
    }
  }, []);
  const token = getCookie("refreshToken");
  const { user } = useSelector((state) => state.user);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(user?.role || "");
  }, [user]);

  return (
    <>
      <header className="sticky-top fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <section className="container">
            <Link to={"/"} className="navbar-brand d-flex align-items-center">
              <img
                src="https://logobagus.com/wp-content/uploads/2024/01/logo_unp_kediri-768x769.png"
                height={50}
                alt="Logo"
              />
              <section
                className="navbar-dark ms-2"
                style={{ fontSize: "0.95rem" }}
              >
                <section>Dongeng Nusantara</section>
                <section className="fw-bold">Panji Kediri</section>
              </section>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <section className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-1">
                  <Link to={"/"} className="nav-link fw-bold">
                    Beranda
                  </Link>
                </li>
                <li className="nav-item dropdown mx-1">
                  <Link to={"/katalog"} className="nav-link" role="button">
                    Daftar Dongeng
                  </Link>
                </li>
                <li className="nav-item dropdown mx-1">
                  <Link
                    to={"/petunjuk"}
                    className="nav-link dropdown-toggle dropdown-mobile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Petunjuk
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end px-2"
                    aria-labelledby="dropdownCatalogue"
                  >
                    <li>
                      <Link to={"/petunjuk"} className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2020.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Siswa</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2021.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Guru</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/petunjuk" className="dropdown-item p-2">
                        <img
                          src="https://buku.kemdikbud.go.id/assets/image/home/Group%2022.png"
                          width={30}
                          alt=""
                        />
                        <span className="ms-2 my-auto">untuk Orang Tua</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`nav-item dropdown mx-1 ${
                    token ? "" : "d-none"
                  } my-4 my-lg-0 `}
                >
                  <Link
                    to="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://th.bing.com/th/id/OIP.oVIyTk_GGnAj3YzNXppdpQAAAA?w=189&h=189&c=7&r=0&o=5&pid=1.7"
                      alt="hugenerd"
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end text-small shadow mt-3">
                    <div>
                      <p className="dropdown-item m-0 text-capitalize">
                        {role.toLocaleLowerCase() || "undefined"}
                      </p>
                      <hr className="my-2" />
                    </div>
                    {role.toLocaleLowerCase() === "siswa" ? (
                      <li>
                        <Link
                          to={"/profile"}
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          Profile
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    {role.toLowerCase() === "admin" ||
                    role.toLowerCase() === "guru" ? (
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                          to="/admin"
                        >
                          Databases
                        </Link>
                      </li>
                    ) : role.toLocaleLowerCase() === "siswa" ? (
                      <li>
                        <Link
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          style={{ cursor: "pointer" }}
                          to={"/quiz"}
                        >
                          Quiz
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <Link
                        className="dropdown-item d-flex justify-content-between align-items-center text-danger fw-semibold"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleLogout()}
                      >
                        Sign out
                        <LogoutIcon />
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul
                className={`nav-item navbar-nav mb-2 mb-lg-0 text-center text-xl-start ${
                  token ? "d-none" : ""
                }`}
              >
                <li className="nav-item ms-lg-3 ms-0 pt-lg-0 pt-4 text-start">
                  <Link
                    to={"/login"}
                    className="btn btn-sm btn-outline-light "
                  >
                    <div className="d-flex align-items-center gap-2">
                      Masuk <SignInIcon size={24} />
                    </div>
                  </Link>
                </li>
              </ul>
            </section>
          </section>
        </nav>
      </header>
    </>
  );
};

export default Header;

export const SignInIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-box-arrow-in-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
      />
      <path
        fill-rule="evenodd"
        d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
      />
    </svg>
  );
};
