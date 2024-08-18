import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import { deleteSoalUraianPanjang, getSoalUraianPanjang } from "../../../../lib/redux/api/soalUraianPanjang";
import Loading from "../../../../Component/loading";
import ModalUraianPanjang from "./modal";

const UraianPanjang = () => {
  const tableHead = ["No", "Soal", "Judul Dongeng", "Jawaban", ""];

  const { soalUraianPanjang, isLoading } = useSelector(
    (state) => state.soalUraianPanjang
  );

  const [action, setAction] = useState();
  const [idEdit, setIdEdit] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSoalUraianPanjang());
  }, []);

  function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSoalUraianPanjang(id));
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
                  document.getElementById("showModalUraianPanjang").click();
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
                  {soalUraianPanjang.map((item, i) => (
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
                            setAction("edit");
                            setIdEdit(item.id);
                            document
                              .getElementById("showModalUraianPanjang")
                              .click();
                          }}
                        >
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>
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
      <ModalUraianPanjang action={action} id={idEdit} />
    </AdminLayout>
  );
};

export default UraianPanjang;
