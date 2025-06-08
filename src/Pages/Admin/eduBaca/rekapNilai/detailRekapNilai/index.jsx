import { useEffect, useState } from "react";
import AdminLayout from "../../../adminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../../soal";
import { PlusIcon } from "../../../forumQuiz";
import Pagination from "../../../../../Component/pagination";
import {
  deleteNilaiArtikel,
  getRekapNilaiByIdArtikel,
} from "../../../../../lib/redux/api/rekapNilaiArtikelSlice";
import Swal from "sweetalert2";
import Loading from "../../../../../Component/loading";
import jsPDF from "jspdf";

const DetailRekapNilai = () => {
  const { data: artikelNilaiData, isLoading } = useSelector(
    (state) => state.nilaiArtikel
  );
  const dispatch = useDispatch();
  const { id_artikel } = useParams();

  async function handleGetRekapNilai() {
    const res = await dispatch(getRekapNilaiByIdArtikel(id_artikel));
  }
  useEffect(() => {
    handleGetRekapNilai();
  }, [id_artikel]);

  //   // pagination and search state
  const [searchParam, setSearchParam] = useState("");
  const searchData = artikelNilaiData[0]?.nilai?.filter(
    (item) =>
      item.user.nama.toLowerCase().includes(searchParam.toLowerCase()) ||
      item.user.sekolah.toLowerCase().includes(searchParam.toLowerCase()) ||
      item?.nilai == searchParam
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // pagination and search state

  // hapus handler
  async function deleteNilai(data) {
    const result = await Swal.fire({
      title: "Hapus Nilai?",
      text: "Apakah kamu yakin ingin menghapus nilai ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      allowOutsideClick: false,
      showLoaderOnConfirm: true, // ✅ Menampilkan loader
      preConfirm: async () => {
        const res = await dispatch(deleteNilaiArtikel(data));
        if (deleteNilaiArtikel.fulfilled.match(res)) {
          return res;
        } else {
          throw new Error("Gagal menghapus nilai");
        }
      },
    })
      .then((result) => {
        handleGetRekapNilai();
        if (result.isConfirmed) {
          Swal.fire({
            title: "Berhasil Hapus Nilai",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal Hapus Nilai",
          text: error.message,
          icon: "error",
        });
      });
  }

  function convertToPdf() {
    const doc = new jsPDF();

    // Judul utama
    doc.setFontSize(16);
    doc.text("Daftar Nilai Membaca Intensif", 15, 15);

    // Judul artikel dengan font lebih kecil
    doc.setFontSize(10);
    const artikelJudul = artikelNilaiData?.[0]?.judul || "Tidak diketahui";
    doc.text(`Artikel: "${artikelJudul}"`, 15, 20);

    // Data tabel
    const tableHeaders = ["No", "Nama", "Sekolah", "Nilai"];
    const tableData =
      currentItems?.map((row, index) => [
        index + 1,
        row?.user?.nama || "Tidak diketahui",
        row?.user?.sekolah || "Tidak diketahui",
        row?.nilai || "0",
      ]) || [];

    // Tambahkan tabel
    doc.autoTable({
      startY: 25,
      head: [tableHeaders],
      body: tableData,
    });

    // Simpan file PDF
    const filename = `data_nilai_membaca_artikel_${
      searchParam?.toLowerCase() || "default"
    }.pdf`;
    doc.save(filename);
  }

  return (
    <AdminLayout>
      <section>
        <div className="row mb-3">
          <div className="input-group col">
            <Link
              to={"../"}
              className="btn shadow-none border d-flex justify-content-center align-items-center"
            >
              <ArrowLeftIcon />
            </Link>
            <input
              type="text"
              className="form-control"
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchParam}
              onChange={(e) => {
                setSearchParam(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="Search"
              onClick={() => {
                setSearchParam("");
                setCurrentPage(1);
              }}
            >
              Clear
            </button>
          </div>
          <div className="col d-flex justify-content-end gap-2">
            <button
              className="btn btn-primary"
              disabled={isLoading || currentItems?.length <= 0}
              onClick={convertToPdf}
            >
              <PlusIcon size={32} />
              Export
            </button>
          </div>
        </div>
      </section>
      {isLoading ? (
        <section
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Loading />
        </section>
      ) : currentItems?.length <= 0 ? (
        <section className="bg-white border text-center p-5">
          <h4>Belum ada peserta !</h4>
        </section>
      ) : (
        <section>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th>Nama Peserta</th>
                <th>Kelas</th>
                <th>Sekolah</th>
                <th>Nilai</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item?.user?.nama || "undefined"}</td>
                  <td>{item?.user?.kelas || "undefined"}</td>
                  <td>{item?.user?.sekolah || "undefined"}</td>
                  <td>{item?.nilai}</td>
                  <td className="d-flex gap-1" style={{ width: "100px" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteNilai(item)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={searchData?.length}
            paginate={paginate}
            className={"mt-3"}
          />
        </section>
      )}
    </AdminLayout>
  );
};

export default DetailRekapNilai;
