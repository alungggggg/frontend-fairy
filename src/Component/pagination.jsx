import { Link } from "react-router-dom";

const Pagination = ({ itemsPerPage, totalItems, paginate , className }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={`pagination ${className}`}>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <Link onClick={() => paginate(number)} to={"#"} className="page-link">
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
