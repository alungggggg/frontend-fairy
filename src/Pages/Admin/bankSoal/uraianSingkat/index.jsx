import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import {
  deleteSoalUraianSingkat,
  getSoalUraianSingkat,
} from "../../../../lib/redux/api/soalUraianSingkat";
import Loading from "../../../../Component/loading";
import ModalUraianSingkat from "./modal";

const UraianSingkat = () => {
  const tableHead = ["No", "Soal", "Judul Dongeng", "Jawaban", ""];
  const [action, setAction] = useState();
  const [idEdit, setIdEdit] = useState();

  const { soalUraianSingkat, isLoading } = useSelector(
    (state) => state.soalUraianSingkat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSoalUraianSingkat());
  }, []);

  function handleDeleteSoalUraianSingkat(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSoalUraianSingkat(id));
    }
  }

  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <div className="">
          <div className="row mb-3">
            <div className="input-group col">
              <input
                type="text"
                className="form-control"
                placeholder="Search...."
                aria-label="Search"
                aria-describedby="button-addon2"
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
                className="btn btn-secondary"
                onClick={() => {
                  setAction("add");
                  document.getElementById("showModalUraianSingkat").click();
                }}
              >
                Add
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
                  {soalUraianSingkat.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.soal}</td>
                      <td>{item.dongeng.title || ""}</td>
                      <td>{item.jawaban}</td>
                      <td className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setIdEdit(item.id);
                            setAction("edit");
                            document
                              .getElementById("showModalUraianSingkat")
                              .click();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteSoalUraianSingkat(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </div>
      )}
      <ModalUraianSingkat action={action} id={idEdit} />
    </AdminLayout>
  );
};

export default UraianSingkat;
