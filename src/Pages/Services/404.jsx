import { useNavigate } from 'react-router-dom';

const err404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="container my-4 py-4">
        <section className="row">
          <section className="col text-center">
            <img
              className="img-fluid"
              src="https://buku.kemdikbud.go.id/assets/image/oops.png"
              alt="halaman tidak ditemukan"
            />
            <h1 className="fw-bold fs-1">404 - Page Not Found</h1>
            <p className="lead text-muted mb-5">
              Sepertinya halaman yang kamu cari tidak ditemukan.
            </p>
            <button className="btn btn-primary px-4 py-2" onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left me-2 pb-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Kembali
            </button>
          </section>
        </section>
      </section>
    </>
  );
};

export default err404;
