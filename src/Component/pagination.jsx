import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, className }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [totalItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  return (
    <nav>
      <ul className={`pagination ${className}`}>
        {currentPage > 2 && (
          <>
            <li className="page-item">
              <Link
                className="page-link"
                onClick={() => {
                  setCurrentPage(1);
                  paginate(1);
                }}
              >
                first
              </Link>
            </li>
            <li className="page-item">
              <Link to={"#"} className="page-link">
                .....
              </Link>
            </li>
          </>
        )}
        {pageNumbers.map((number) => {
          if (number === currentPage) {
            return (
              <li key={number} className="page-item">
                <Link
                  onClick={() => {
                    setCurrentPage(number);
                    paginate(number);
                  }}
                  className="page-link bg-primary text-white"
                >
                  {number}
                </Link>
              </li>
            );
          } else if (number === currentPage - 1 || number === currentPage + 1) {
            return (
              <li key={number} className="page-item">
                <Link
                  onClick={() => {
                    setCurrentPage(number);
                    paginate(number);
                  }}
                  to={"#"}
                  className="page-link"
                >
                  {number}
                </Link>
              </li>
            );
          }
        })}
        {currentPage < pageNumbers.length - 1 && (
          <>
            <li className="page-item">
              <Link to={"#"} className="page-link">
                .....
              </Link>
            </li>
            <li className="page-item">
              <Link
                to={"#"}
                className="page-link"
                onClick={() => {
                  setCurrentPage(pageNumbers.length);
                  paginate(pageNumbers.length);
                }}
              >
                last
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
