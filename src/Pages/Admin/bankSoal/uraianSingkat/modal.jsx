import AddSoalUraianSingkat from "./addSoalUraianSingkat";
import EditSoalUraianSingkat from "./editUraianSingkat";

function ModalLayout({ childern }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop_2"
        id="showModalUraianSingkat"
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

const ModalUraianSingkat = ({ action, id }) => {
  switch (action) {
    case "add":
      return <ModalLayout childern={<AddSoalUraianSingkat />} />;
    default:
      return <ModalLayout childern={<EditSoalUraianSingkat id={id}/>} />;
  }
};

export default ModalUraianSingkat;
