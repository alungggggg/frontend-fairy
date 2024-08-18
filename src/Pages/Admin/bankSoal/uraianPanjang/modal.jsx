import AddSoalUraianPanjang from "./addUraianPanjang";
import EditSoalUraianPanjang from "./editUraianPanjang";

function ModalLayout({ childern }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop_2"
        id="showModalUraianPanjang"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop_2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {childern}
      </div>
    </div>
  );
}

const ModalUraianPanjang = ({ action, id }) => {
    switch (action) {
        case "add":
            return <ModalLayout childern={<AddSoalUraianPanjang />} />
        case "edit":
            return <ModalLayout childern={<EditSoalUraianPanjang id={id} />} />
    }
};

export default ModalUraianPanjang;
