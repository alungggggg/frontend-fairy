import { Link } from "react-router-dom";
import AdminLayout from "../adminLayout";

const EduBacaAdmin = () => {
  return (
    <AdminLayout>
      <div className="row gy-4">
        <div className="col">
          <div className="card shadow-sm p-4 text-start">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0 ">Artikel</h1>
              <Link
                to={"artikel"}
                className="text-decoration-none text-dark"
              >
                <BoxArrowUpRight size={24} />
              </Link>
            </div>
            <p className="m-0 mt-2">
              Halaman ini digunakan untuk mengelola artikel pada Edu Baca.
            </p>
          </div>
        </div>
        <div className="col ">
          <div className="card shadow-sm p-4 text-start">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0 ">Soal</h1>
              <Link
                to={"soal"}
                className="text-decoration-none text-dark"
              >
                <BoxArrowUpRight size={24} />
              </Link>
            </div>
            <p className="m-0 mt-2">
              Halaman ini digunakan untuk mengelola soal pada Edu Baca.
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="card shadow-sm p-4 text-start">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0 ">Rekap Nilai Peserta</h1>
              <Link
                to={"rekap-nilai"}
                className="text-decoration-none text-dark"
              >
                <BoxArrowUpRight size={24} />
              </Link>
            </div>
            <p className="m-0 mt-2">
              Halaman ini digunakan untuk melihat rekap nilai peserta pada Edu Baca.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EduBacaAdmin;

export const BoxArrowUpRight = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-box-arrow-up-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
      />
      <path
        fill-rule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
      />
    </svg>
  );
};
