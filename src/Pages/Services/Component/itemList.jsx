import { Link } from "react-router-dom";

const itemList = ({ items }) => {
  if (items.length == 0) {
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
              {/* <h1 className="fw-bold fs-1"> Book Not Found</h1> */}
              <p className="lead text-muted mb-5">
                Sepertinya buku yang kamu cari tidak ditemukan.
              </p>
            </section>
          </section>
        </section>
      </>
    );
  }
  return (
    <>
      {items.map((item) => (
        <section className="col-lg-3 col-6 my-2" key={item.id}>
        <Link
          to={"/dongeng/detail/" + item.id}
          className="text-decoration-none text-dark position-relative"
        >
          <section className="card border-1 mt-3 CardBook_card rounded shadow" style={{minHeight: "200px"}}>
            <section className="card-header text-center text-lg-start bg-white p-0 border-0">
              <img
                src={item.cover}
                alt={item.title}
                className="img-fluid rounded-0"
              />
            </section>
          </section>
          <section className="position-absolute d-flex flex-column gap-2" style={{top: "30px", left: "-2px"}}>
            <span className="badge rounded bg-danger" style={{width:"50px"}}>
              PDF
            </span>
            <span className="badge rounded bg-secondary">
              SMA/MA/SMK/MAK
            </span>
          </section>
          <section
            className="w-100 text-center px-5 px-lg-0 position-absolute bottom-0"
            style={{ backgroundColor: "rgba(216, 162, 94, 0.7)" }}
          >
            <section className="fs-6 my-1 text-white">
              {item.title}
            </section>
          </section>
        </Link>
      </section>
      ))}
    </>
  );
};
// (
//     { dongeng.map(item) => (

//     )

// )

export default itemList;
