import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page } from 'react-pdf';
import Template from "../template/template";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const dongeng = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function pagesList() {
        var pages = [];
        for (var i = 1; i <= numPages; i++) {
            pages.push(<div key={i}><Page width={500} pageNumber={i} renderAnnotationLayer={false} renderTextLayer={false} /></div>);
        }
        return pages;
    }
    console.log(pagesList())

    return (
        <>
            <Template content={(<div>
                <Document file="http://localhost:5000/pdf/1.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <HTMLFlipBook width={500} height={707}>
                        {pagesList()}
                    </HTMLFlipBook>
                </Document>
            </div>)}>

            </Template>
        </>


    );
}
export default dongeng;