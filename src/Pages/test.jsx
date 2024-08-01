import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


function PaginatedItems({ itemsPerPage, setIndexDongeng, dongengsLength }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(dongengsLength / itemsPerPage);

    useEffect(() => {
        setIndexDongeng({ start: itemOffset, end: endOffset })
    }, [itemOffset])
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dongengsLength
        setItemOffset(newOffset);
    };

    return (
        <>
            {/* <Items currentItems={currentItems} /> */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={9}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems