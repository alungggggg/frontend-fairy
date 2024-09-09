import Header from "../../template/header";
import Footer from "../../template/footer";

const Write = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container mt-5 mb-5">
          <section className="card">
            <section className="card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-circle-fill text-danger"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-circle-fill text-warning"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-circle-fill text-success"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
            </section>
            <section className="card-body">
              <form>
                <textarea
                  required
                  cols={""}
                  rows={"15"}
                  className="form-control p-2"
                  placeholder="Tulis ceritanya disini."
                ></textarea>
              </form>
            </section>
            <section className="card-footer">
              <button className="btn btn-orange float-right text-white">
                Submit
              </button>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Write;
