import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../../../lib/redux/api/auth";

const Sidebar = ({ navList = [] }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  var path = location.pathname;
  path = path.split("/")[2];

  function handleLogout() {
    dispatch(signOut());
  }

  const active = "bg-light rounded-start rounded-10 text-base";

  return (
    <div className="col-auto col-md-3 col-xl-2 ps-sm-2 px-0 bg-night">
      <div
        className="d-flex flex-column align-items-center align-items-sm-start text-white"
        style={{ minHeight: `calc(100vh - 98px)` }}
      >
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
          id="menu"
        >
          {navList.map((item, i) => (
            <li
              className={` nav-item w-100 p-2 ${
                item.path.split("/")[2] === path ? active : ""
              }`}
              key={i}
            >
              <Link
                to={item.path}
                className={`nav-link align-middle px-0 $ ${
                  path === item.path ? "bg-none" : ""
                }`}
              >
                <span
                  className={`ps-sm-2 w-full text-light fs-5 d-flex gap-2 align-items-center ${
                    item.path.split("/")[2] === path ? "text-black" : ""
                  }`}
                >
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;

export const NewsPaperIcon = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-newspaper"
      viewBox="0 0 16 16"
    >
      <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
      <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
    </svg>
  );
};
