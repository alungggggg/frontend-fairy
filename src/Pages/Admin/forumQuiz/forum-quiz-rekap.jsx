import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../adminLayout";
import { useEffect } from "react";
import { getRekapNilaiByIdForum } from "../../../lib/redux/api/rekapNilai";
import { Link, useParams } from "react-router-dom";
import { PlusIcon } from ".";
import jsPDF from "jspdf"; // Add this import
import { ArrowLeft } from "./forumDetail";
import { getNewAccessToken } from "../../../lib/redux/api/auth";

const RekapNilai = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rekapNilai } = useSelector((state) => state.rekapNilai);

  const tableHead = ["No", "Nama", "Asal Sekolah", "Nilai"];

  useEffect(() => {
    async function getRekap() {
      var res = dispatch(getRekapNilaiByIdForum(id));
      if (res.payload == "401") {
        await dispatch(getNewAccessToken());
        return getRekap();
      }
    }

    getRekap();
  }, [id]);

  function converToPdf() {
    console.log("p");
    // const doc = new jsPDF();

    // // Set initial Y position for content
    // let y = 10;

    // // Loop through the array and add content to the PDF
    // rekapNilai?.forEach((row) => {
    //   doc.text(row.join(", "), 10, y);
    //   y += 10; // Move Y position for next row
    // });

    // // Save the PDF
    // doc.save("array_data.pdf");
  }
  return (
    <AdminLayout>
      <div className="">
        <div className="d-flex justify-content-between align-items-center p-0">
          <Link
            to={`../${id}`}
            className={
              "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black "
            }
          >
            <ArrowLeft size={24} /> Forum Quiz
          </Link>
        </div>
        <hr className="my-3" />
        <div className="row mb-3">
          <div className="input-group col">
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="Search"
            >
              Search
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
              onClick={converToPdf} // Add onClick event
            >
              <PlusIcon size={24} />
              Export
            </button>
          </div>
        </div>
        <section className="card-body p-0">
          <section className="table-responsive">
            <table className="table table-striped m-0 ">
              <thead>
                <tr>
                  {tableHead.map((item, i) => (
                    <th key={i}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rekapNilai?.map((item, i) => (
                  <tr key={i} style={{ cursor: "pointer" }}>
                    <td>{i + 1}</td>
                    <td>{item?.user?.nama || "undefined"}</td>
                    <td>{item?.user?.sekolah || "undefined"}</td>
                    <td>{item?.nilai || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
};

export default RekapNilai;
