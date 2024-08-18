import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const navList = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Dongeng", path: "/admin/dongeng" },
    { name: "Bank Soal", path: "/admin/bank-soal" },
    { name: "Forum Quiz", path: "/admin/forum-quiz" },
    { name: "Rekap Siswa", path: "" },
  ];
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-night">
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white"
        style={{ minHeight: `calc(100vh - 98px)` }}
      >
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          {navList.map((item, i) => (
            <li className="nav-item" key={i}>
              <Link
                to={item.path}
                className={`nav-link align-middle px-0 $ ${
                  path === item.path ? "bg-none" : ""
                }`}
              >
                <span className="ms-1 d-none d-sm-inline text-light fs-5">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
