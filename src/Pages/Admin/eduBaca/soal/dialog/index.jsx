import AddSoalArtikel from "./addSoal";
import DeleteSoalArtikel from "./deleteSoal";
import EditSoalArtikel from "./editSoal";
import ViewSoalArtikel from "./viewSoal";

const SoalArtikelDialog = ({
  isOpen = false,
  onClose = () => {},
  action,
  selectedData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered "
        style={{ minWidth: "800px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {action == "add"
                ? "Tambah Soal Artikel"
                : action == "delete"
                ? "Hapus Soal Artikel"
                : action == "edit"
                ? "Edit Soal Artikel"
                : action == "view"
                ? "Lihat Soal Artikel"
                : "invalid action"}
            </h1>
            {/* <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button> */}
          </div>
          {action == "add" ? (
            <AddSoalArtikel onClose={onClose} />
          ) : action == "delete" ? (
            <DeleteSoalArtikel onClose={onClose} selectedData={selectedData} />
          ) : action == "edit" ? (
            <EditSoalArtikel onClose={onClose} selectedData={selectedData} />
          ) : action == "view" ? (
            <ViewSoalArtikel selectedData={selectedData} onClose={onClose} />
          ) : (
            <div className="modal-body">
              <p>Invalid action specified.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoalArtikelDialog;
