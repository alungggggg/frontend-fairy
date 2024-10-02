import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useEffect, useRef, useState } from "react";
import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Component/loading";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

const dongeng = () => {
  // const book = useRef();
  const { id } = useParams();
  const [file, setFile] = useState("");

  // console.log(file);

  useEffect(() => {
    const getFile = async () => {
      try {
        const Response = await axios.get(
          `https://test-backend-pink.vercel.app/api/dongeng/${id}`
        );
        setFile(Response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFile();
  }, []);

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // axios.get("");

  // function pagesList() {
  //   var pages = [];
  //   for (var i = 1; i <= numPages; i++) {
  //     pages.push(
  //       <div key={i}>
  //         <Page
  //           width={500}
  //           pageNumber={i}
  //           renderAnnotationLayer={false}
  //           renderTextLayer={false}
  //         />
  //       </div>
  //     );
  //   }
  //   return pages;
  // }

  return (
    <>
      <Header />
      <main>
        <section className="container mt-3 mb-3" id="container">
          <section className="card">
            <section className="card-title border-bottom z-1">
              <h1 className="fw-bold fs-5 p-2 m-0 float-left m-2">
                {file.title}
              </h1>
            </section>
            <section
              className="card-body d-flex justify-content-center align-items-center"
              style={{ minHeight: "500px" }}
            >
              {file ? (
                // <iframe
                //   src={file}
                //   width="100%"
                //   height="100%"
                //   style={{ border: "none" }}
                // ></iframe>
                // <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                //   <HTMLFlipBook
                //     ref={book}
                //     showCover={true}
                //     width={500}
                //     height={500}
                //     usePortrait={false}
                //   >
                //     {pagesList()}
                //   </HTMLFlipBook>
                // </Document>
                // <iframe
                //   src={file}
                //   type="application/pdf"
                //   frameBorder="0"
                //   scrolling="auto"
                //   height="500px"
                //   width="100%"
                // ></iframe>
                // <div
                //   style={{
                //     position: "relative",
                //     paddingTop: "max(60%,324px)",
                //     width: "100%",
                //     height: 0,
                //   }}
                // >
                //   <iframe
                //     style={{
                //       position: "absolute",
                //       border: "none",
                //       width: "100%",
                //       height: "500px",
                //       left: 0,
                //       top: 0,
                //     }}
                //     src="https://online.fliphtml5.com/uhhhs/xfai/"
                //     seamless="seamless"
                //     scrolling="no"
                //     frameBorder={0}
                //     allowTransparency="true"
                //     allowFullScreen="true"
                //   />
                // </div>
                <iframe
                  src={file.pdfURL}
                  width="900"
                  height="637"
                  frameBorder="0"
                  webkitAllowFullScreen
                  mozallowfullscreen
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="d-flex justify-content-center align-items-center ">
                  <Loading />
                </div>
              )}
              {/* <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
                onClick={() => book?.current?.pageFlip()?.flipPrev() || ""}
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
                onClick={() => book?.current?.pageFlip()?.flipNext() || ""}
              >
                <span
                  className="carousel-control-next-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button> */}
              {/* <section className="ms-5"></section> */}
            </section>
            {/* <section className="card-footer text-center p-3">
              <p className="">
                Ayo mulai menulis ulang cerita di atas dengan cara Anda sendiri!
              </p>
              <Link to={"/dongeng/write"} className="btn btn-orange text-white">
                Mulai Menulis
              </Link>
            </section> */}
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
