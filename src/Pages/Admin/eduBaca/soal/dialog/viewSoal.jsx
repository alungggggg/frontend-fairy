const ViewSoalArtikel = ({ selectedData, onClose = () => {} }) => {
  return (
    <section>
      <div className="modal-body">
        <p className="fs-5">{selectedData?.soal || "undefined"}</p>
        <div className="row row-cols-2">
          <p>A. {selectedData?.opsi_a || "undefined"}</p>
          <p>B. {selectedData?.opsi_b || "undefined"}</p>
          <p>C. {selectedData?.opsi_c || "undefined"}</p>
          <p>D. {selectedData?.opsi_d || "undefined"}</p>
          <p>E. {selectedData?.opsi_e || "undefined"}</p>
        </div>
        <p>Jawaban : {selectedData?.jawaban || "undefined"}</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Kembali
        </button>
      </div>
    </section>
  );
};

export default ViewSoalArtikel;
