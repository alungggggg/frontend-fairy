import { useDispatch, useSelector } from "react-redux";
import { deleteArtikelData } from "../../../../../lib/redux/api/artikelSlice";
import Swal from "sweetalert2";

const DeleteArtikel = ({ onClose = () => {}, selectedData = {} }) => {
  const { isLoading } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();

  async function handleDeleteArtikel() {
    const res = await dispatch(deleteArtikelData(selectedData));
    
    if (deleteArtikelData.fulfilled.match(res)) {
      Swal.fire({
        title: "Berhasil",
        text: "Artikel berhasil dihapus",
        icon: "success",
      });
      onClose();
    } else {
      Swal.fire({
        title: "Gagal",
        text: res.payload?.message || "Unknown error",
        icon: "error",
      });
      onClose();
    }
  }
  return (
    <div>
      <div className="modal-body">
        <h5 className="text-center">
          Apakah Anda yakin ingin menghapus artikel ini?
        </h5>
        <p className="text-center">Tindakan ini tidak dapat dibatalkan.</p>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-danger"
          onClick={handleDeleteArtikel}
          disabled={isLoading}
        >
          Hapus
        </button>
        <button
          className="btn btn-secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default DeleteArtikel;
