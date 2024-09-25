import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import ItemList from "./Component/itemList";
import Pagination from "../../Component/pagination";
import axios from "axios";

const Katalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDongeng = async () => {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/dongeng");
      setItems(response.data);
      setIsLoading(false);
    };

    fetchDongeng();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter items berdasarkan pencarian
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <main style={{minHeight: "calc(100vh - 76px)"}} className="bg-secondary-light">
        {
          isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 76px)" }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
        <section className="" style={{ minHeight: "calc(100vh - 76px)" }}>
          <section className="container px-3 py-5">
            <section className="justify-content-center">
              <section className="text-muted text-end mb-3">
                <p className="fs-5 fst-italic">Cari dan Baca Dongeng yang Anda Sukai</p>
              </section>
              <section>
                <section className="position-relative">
                  <section className="input-group shadow-sm rounded-3">
                    <span className="input-group-text bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="form-control py-3 border-start-0 border-end-0 px-2"
                      placeholder="Cari buku disini"
                      aria-label="Cari buku disini"
                      onChange={handleSearch}
                    />
                    <button
                      className="btn btn-orange text-white"
                      type="button"
                      onClick={handleSearch}
                    >
                      Cari
                    </button>
                  </section>
                </section>
              </section>
              <div>
                <p className={`fs-5 fst-italic p-0 m-0 mt-3 ${searchTerm ? "d-block" : "d-none"}`}>Kata Kunci : {searchTerm}</p>
              </div>
              <section className="row">
                <ItemList items={currentItems} />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredItems.length}
                  paginate={paginate}
                  className={"mt-5"}
                />
              </section>
            </section>
          </section>
        </section>
          )
        }
      </main>
      <Footer />
    </>
  );
};

export default Katalog;
