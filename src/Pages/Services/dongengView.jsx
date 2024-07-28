import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page } from 'react-pdf';
import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const dongeng = () => {
    const { id } = useParams()
    const [file, setFile] = useState("")



    useEffect(() => {
        const getFile = async () => {
            try {
                const Response = await axios.get(`http://localhost:5000/api/dongeng/${id}`)
                setFile(Response.data.PdfPath)
            } catch (error) {
                console.log(error.message)
            }
        }
        getFile()
        console.log(file)
    }, [])
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

    return (
        <>
            <Header />
            <div>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    <HTMLFlipBook width={500} height={707}>
                        {pagesList()}
                    </HTMLFlipBook>
                </Document>
            </div>
            <Footer />
        </>


    );
}
export default dongeng;