import { Link } from "react-router-dom";
import { BoxArrowUpRight } from "../..";

const ShowArtikel = ({ onClose = () => {}, selectedData = {} }) => {
  return (
    <div>
      <div className="modal-body">
        <div>
          <div className="d-flex gap-2 align-items-center">
            <p className="m-0 fs-4">{selectedData?.judul}</p>
            <Link to={selectedData?.artikel_link} target="_blank" className="text-black">
              <BoxArrowUpRight size={24} />
            </Link>
          </div>
        </div>
        <p className="fs-6">{selectedData?.deskripsi}</p>
        <div className="text-capitalize">Tipe : {selectedData?.type}</div>
        <div className="text-capitalize">Jumlah soal : {selectedData?.soal?.length}</div>
      </div>
      <div className="modal-footer">
        <Link className="btn btn-success" to={`../soal?id_artikel=${selectedData?.id}`}>Lihat daftar soal</Link>
        <button className="btn btn-secondary" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ShowArtikel;
