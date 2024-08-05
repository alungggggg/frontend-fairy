import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import ItemListDongeng from "./Component/itemListDongeng";
import Pagination from "../../Component/pagination";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const getDongeng = async () => {
  const result = await axios.get("http://localhost:5000/api/dongeng");
  return result.data
};

const dongeng = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDongeng().then((item) => setItems(item))
  }, []);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Header></Header>
      <section className="container mt-4 mb-4">
        <section className="card">
          <section className="card-header">
            <h3 className="card-title">Dongeng</h3>
          </section>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table m-0">
                <thead>
                  <tr className="">
                    <th>Title</th>
                    <th>Cover</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <ItemListDongeng items={currentItems} getDongeng={getDongeng} />
                </tbody>
              </table>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
                paginate={paginate}
              />
            </section>
          </section>
        </section>
      </section>

      <Footer></Footer>
    </>
  );
};

export default dongeng;
