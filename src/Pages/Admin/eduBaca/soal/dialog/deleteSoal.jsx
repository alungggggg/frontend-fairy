import { useDispatch, useSelector } from "react-redux";
import { deleteSoalArtikel } from "../../../../../lib/redux/api/soalArtikelSlice";
import Swal from "sweetalert2";

const DeleteSoalArtikel = ({ onClose = () => {}, selectedData = {} }) => {
  const { isLoading } = useSelector((state) => state.soalArtikel);
  const dispatch = useDispatch();

  async function handleDeleteSoal() {
    const res = await dispatch(deleteSoalArtikel(selectedData));
    if (deleteSoalArtikel.fulfilled.match(res)) {
      Swal.fire({
        title: "Berhasil",
        text: "Soal berhasil dihapus",
        icon: "success",
        confirmButtonText: "OK",
      });
      onClose();
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Gagal menghapus soal",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <section>
      <div className="modal-body">
        <h5 className="text-center">
          Apakah Anda yakin ingin menghapus soal ini?
        </h5>
        <p className="text-center">
          Data yang dihapus tidak dapat dikembalikan.
        </p>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSoal}
          disabled={isLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-secondary"
          disabled={isLoading}
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </section>
  );
};

export default DeleteSoalArtikel;
