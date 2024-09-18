import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import ItemList from "./Component/itemList";
import Pagination from "../../Component/pagination";
import axios from "axios";

const Katalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDongeng = async () => {
      const response = await axios.get("http://localhost:5000/api/dongeng");
      setItems(response.data);
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
      <main>
        <section className="bg-hero k-hero"></section>
        <section className="bg-white">
          <section className="container px-3 py-5">
            <section className="justify-content-center">
              <section className="text-muted text-end mb-3">
                <p>Cerita Panji Kediri</p>
              </section>
              <section>
                <section className="position-relative">
                  <section className="input-group shadow-sm">
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
                      className="form-control py-2 border-start-0 border-end-0 px-1"
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
              <section className="row">
                <ItemList items={currentItems} />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredItems.length}
                  paginate={paginate}
                />
              </section>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Katalog;
