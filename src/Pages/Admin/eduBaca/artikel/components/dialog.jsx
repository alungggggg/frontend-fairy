import AddArtikel from "./addArtikel";
import DeleteArtikel from "./deleteArtikel";
import EditArtikel from "./editArtikel";

const ArtikelDialogAdmin = ({
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {action == "add"
                ? "Tambah Artikel"
                : action == "delete"
                ? "Hapus Artikel"
                : action == "edit"
                ? "Edit Artikel"
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
            <AddArtikel onClose={onClose} />
          ) : action == "delete" ? (
            <DeleteArtikel onClose={onClose} selectedData={selectedData} />
          ) : action == "edit" ? (
            <EditArtikel onClose={onClose} selectedData={selectedData} />
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

export default ArtikelDialogAdmin;
