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
