import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect } from "react";
import {
  deleteSoalPilgan,
  getSoalPilgan,
} from "../../../../lib/redux/api/soalPilgan";
import Loading from "../../../../Component/loading";
import AddSoalPilgan from "./addSoalPilgan";
import { getAllDongeng } from "../../../../lib/redux/api/dongeng";

const PilihanGanda = () => {
  const tableHead = [
    "No",
    "Soal",
    "Judul Dongeng",
    "Opsi 1",
    "Opsi 2",
    "Opsi 3",
    "Opsi 4",
    "Jawaban",
    "",
  ];

  const dispatch = useDispatch();
  const { soalPilgan, isLoading } = useSelector(
    (state) => state.soalPilihanGanda
  );

  useEffect(() => {
    dispatch(getSoalPilgan());
  }, []);

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
                onClick={() =>
                  document.getElementById("showModalAddSoalPilgan").click()
                }
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
                  {soalPilgan.map((item, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{item.soal}</td>
                      <td>-</td>
                      <td>{item.opsi_1}</td>
                      <td>{item.opsi_2}</td>
                      <td>{item.opsi_3}</td>
                      <td>{item.opsi_4}</td>
                      <td>{item.jawaban}</td>
                      <td className="d-flex gap-2">
                        <button type="button" className="btn btn-secondary ">
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => dispatch(deleteSoalPilgan(item.id))}
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
      <AddSoalPilgan />
    </AdminLayout>
  );
};

export default PilihanGanda;
