import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import {
  deleteSoalPilgan,
  getSoalPilgan,
} from "../../../../lib/redux/api/soalPilgan";
import Loading from "../../../../Component/loading";
import ModalPilihanGanda from "./modal";
import { ArrowLeft } from "../../forumQuiz/forumDetail";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../forumQuiz";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";

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
  const { soalPilgan, isLoading } = useSelector(
    (state) => state.soalPilihanGanda
  );

  const [action, setAction] = useState();
  const [idEdit, setIdEdit] = useState();

  const [search, setSearch] = useState("");

  const displayedSoal = soalPilgan.filter((soal) => {
    return search
      ? soal.soal.toLowerCase().includes(search.toLowerCase()) ||
          soal.dongeng.title.toLowerCase().includes(search.toLowerCase()) ||
          soal.opsi_1.toLowerCase().includes(search.toLowerCase()) ||
          soal.opsi_2.toLowerCase().includes(search.toLowerCase()) ||
          soal.opsi_3.toLowerCase().includes(search.toLowerCase()) ||
          soal.opsi_4.toLowerCase().includes(search.toLowerCase())
      : soal;
  });

  const dispatch = useDispatch();

  async function handleDeleteSoalPilgan(id) {
    if (window.confirm("Are you sure?")) {
      var res = await dispatch(deleteSoalPilgan(id));
      if (!res.payload) {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return handleDeleteSoalPilgan(id);
      }
    }
  }

  useEffect(() => {
    async function getDatas() {
      var res = await dispatch(getSoalPilgan());
      if (!res.payload) {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getDatas();
      }
    }

    getDatas();
  }, []);

  return (
    <AdminLayout>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center h-100">
          <Loading />
        </section>
      ) : (
        <div className="">
          <div className="d-flex justify-content-between align-items-center p-0">
            <Link
              to={"/admin/bank-soal"}
              className={
                "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black "
              }
            >
              <ArrowLeft size={24} /> Bank Soal List
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="Search"
                onClick={() => {
                  setSearch("");
                }}
              >
                Clear
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                onClick={() => {
                  document.getElementById("showModalAddSoalPilgan").click();
                  setAction("add");
                }}
              >
                <PlusIcon size={24} />
                Add
              </button>
            </div>
          </div>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table table-striped m-0 ">
                <thead>
                  <tr>
                    {tableHead.map((item, i) => {
                      if (i == tableHead.length - 1) {
                        return (
                          <th key={i} style={{ width: "120px" }}>
                            {item}
                          </th>
                        );
                      } else {
                        return <th key={i}>{item}</th>;
                      }
                    })}
                  </tr>
                </thead>
                <tbody>
                  {displayedSoal?.map((item, i) => (
                    <tr key={i} className="align-middle">
                      <td>{i + 1}</td>
                      <td>{item.soal || ""}</td>
                      <td>{item.dongeng.title || ""}</td>
                      <td>{item.opsi_1 || ""}</td>
                      <td>{item.opsi_2 || ""}</td>
                      <td>{item.opsi_3 || ""}</td>
                      <td>{item.opsi_4 || ""}</td>
                      <td>{item.jawaban || ""}</td>
                      <td
                        className="d-flex gap-2 justify-content-end"
                        style={{ maxWidth: "120px" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary "
                          onClick={() => {
                            document
                              .getElementById("showModalAddSoalPilgan")
                              .click();
                            setIdEdit(item.id);
                            setAction("edit");
                          }}
                        >
                          <EditIcon size={18} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger "
                          onClick={() => {
                            handleDeleteSoalPilgan(item.id);
                          }}
                        >
                          <DeleteIcon size={18} />
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
      <ModalPilihanGanda action={action} id={idEdit} />
    </AdminLayout>
  );
};

export default PilihanGanda;

export const DeleteIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-trash3"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
    </svg>
  );
};

export const EditIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      class="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path
        fill-rule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
      />
    </svg>
  );
};
