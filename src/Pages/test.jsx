import React, { useEffect, useState } from 'react';
import axios from "axios"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const ItemList = ({ items }) => {
    return (
        <ul>
            {items.map(item => (

                <div key={item.id}>
                    <img src={item.cover} alt="" />
                    <li >{item.title}</li>
                </div>
            ))}
        </ul>
    );
};

const getItem = async () => {
    const result = await axios.get("http://localhost:5000/api/dongeng")
    return result.data
}

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [items, setItems] = useState([]);

    // Contoh data
    // const items = Array.from({ length: 100 }, (_, i) => ({
    //     id: i + 1,
    //     title: `Item ${i + 1}`
    // }));


    useEffect(() => {
        getItem().then((res) => setItems(res))
    }, [])

    // Mendapatkan item untuk halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Fungsi untuk mengubah halaman
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Daftar Item dengan Pagination</h1>
            <ItemList items={currentItems} />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={items.length}
                paginate={paginate}
            />
        </div>
    );
};

export default App;