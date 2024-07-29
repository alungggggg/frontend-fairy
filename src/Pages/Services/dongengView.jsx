import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const dongeng = () => {
  const { id } = useParams();
  const [file, setFile] = useState("");

  useEffect(() => {
    const getFile = async () => {
      try {
        const Response = await axios.get(
          `http://localhost:5000/api/dongeng/${id}`
        );
        setFile(Response.data.PdfPath);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFile();
    console.log(file);
  }, []);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function pagesList() {
    var pages = [];
    for (var i = 1; i <= numPages; i++) {
      pages.push(
        <div key={i}>
          <Page
            width={500}
            pageNumber={i}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </div>
      );
    }
    return pages;
  }

  return (
    <>
      <Header />
      <button
        onClick={() => {
          let container = document.getElementById("container");
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if (container.mozRequestFullScreen) {
            // Firefox
            container.mozRequestFullScreen();
          } else if (container.webkitRequestFullscreen) {
            // Chrome, Safari and Opera
            container.webkitRequestFullscreen();
          } else if (container.msRequestFullscreen) {
            // IE/Edge
            container.msRequestFullscreen();
          }
        }}
      >
        Fullscreen
      </button>
      <section className="container" id="container">
        <Document
          file={file}
          // file="http://localhost:5000/pdf/IMG-20240722-WA0008 (1).pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <HTMLFlipBook
            showCover={true}
            width={500}
            height={500}
            usePortrait={false}
          >
            {pagesList()}
          </HTMLFlipBook>
        </Document>
        {/* <section className="ms-5"></section> */}
      </section>
      <Footer />
    </>
  );
};
export default dongeng;
