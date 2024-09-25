import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const dongeng = () => {
  const book = useRef();
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
      <main>
        <section className="container mt-3 mb-3" id="container">
          <section className="card">
            <section className="card-title border-bottom z-1">
              <h1 className="fw-bold fs-5 p-2 m-0 float-left m-2">Judul</h1>
              <button
                className="btn btn-succes border-black fw-bold float-right p-2 m-2"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-fullscreen me-1 mb-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
                </svg>
                Fullscreen
              </button>
            </section>
            <section className="card-body">
              <Document
                file={file}
                // file="https://srv1092-files.hstgr.io/be6ac0f5b5453591/files/public_html/1.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <HTMLFlipBook
                  ref={book}
                  showCover={true}
                  width={500}
                  height={500}
                  usePortrait={false}
                >
                  {pagesList()}
                </HTMLFlipBook>
              </Document>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
                // onClick={() => book.current.pageFlip().flipPrev()}
              >
                <span
                  className="carousel-control-prev-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
                // onClick={() => book.current.pageFlip().flipNext()}
              >
                <span
                  className="carousel-control-next-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
              {/* <section className="ms-5"></section> */}
            </section>
            <section className="card-footer text-center p-3">
              <p className="">
                Ayo mulai menulis ulang cerita di atas dengan cara Anda sendiri!
              </p>
              <Link to={"/dongeng/write"} className="btn btn-orange text-white">
                Mulai Menulis
              </Link>
            </section>
          </section>
          {/* <section className="card mt-5">
            <section className="card-title border-bottom z-1">
              <h1 className="fw-bold fs-5 p-2 m-0 float-left m-2">
                Menulis ulang cerita
              </h1>
            </section>
            <section className="card-body">test</section>
          </section> */}
        </section>
      </main>

      {/* <section className="container-content container-content-dialog">
        <section className="content-header">
          <h1>Title</h1>
        </section>
        <section className="content-panel">
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
        </section>
      </section> */}
      <Footer />
    </>
  );
};
export default dongeng;
