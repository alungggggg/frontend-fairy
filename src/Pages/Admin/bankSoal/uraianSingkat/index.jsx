import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../adminLayout";
import { useEffect, useState } from "react";
import {
  deleteSoalUraianSingkat,
  getSoalUraianSingkat,
} from "../../../../lib/redux/api/soalUraianSingkat";
import Loading from "../../../../Component/loading";
import ModalUraianSingkat from "./modal";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../forumQuiz/forumDetail";
import { DeleteIcon, EditIcon } from "../pilihanGanda";
import { PlusIcon } from "../../forumQuiz";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";
import Swal from "sweetalert2";

const UraianSingkat = () => {
  const tableHead = ["No", "Soal", "Judul Dongeng", "Jawaban", ""];
  const [action, setAction] = useState();
  const [idEdit, setIdEdit] = useState();
  const [search, setSearch] = useState("");

  const { soalUraianSingkat, isLoading } = useSelector(
    (state) => state.soalUraianSingkat
  );
  const dispatch = useDispatch();

  const displayedSoal = soalUraianSingkat.filter((soal) => {
    return search
      ? soal.soal.toLowerCase().includes(search.toLowerCase()) ||
          soal.dongeng.title.toLowerCase().includes(search.toLowerCase()) ||
          soal.jawaban.toLowerCase().includes(search.toLowerCase())
      : soal;
  });

  useEffect(() => {
    async function getDatas() {
      var res = await dispatch(getSoalUraianSingkat());
      if (!res.payload) {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getDatas();
      }
    }

    getDatas();
  }, []);

  function handleDeleteSoalUraianSingkat(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const handleDelete = async () => {
          var res = await dispatch(deleteSoalUraianSingkat(id));
          if (!res.payload) {
            console.log("getting new access token");
            await dispatch(getNewAccessToken());
            return handleDelete();
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        };

        handleDelete()
      }
    });
  }

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
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary d-flex align-items-center gap-1 lh-sm bg-white text-black fs-5"
                onClick={() => {
                  setAction("add");
                  document.getElementById("showModalUraianSingkat").click();
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
                  {displayedSoal.map((item, i) => (
                    <tr key={i} className="align-middle">
                      <td>{i + 1}</td>
                      <td>{item.soal}</td>
                      <td>{item.dongeng.title || ""}</td>
                      <td>{item.jawaban}</td>
                      <td
                        className="d-flex gap-2 justify-content-end"
                        style={{ maxWidth: "120px" }}
                      >
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
                          <EditIcon size={18} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteSoalUraianSingkat(item.id)}
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
      <ModalUraianSingkat action={action} id={idEdit} />
    </AdminLayout>
  );
};

export default UraianSingkat;
