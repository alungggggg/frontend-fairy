import { useEffect, useState } from "react";
import AddSoalPilgan from "./addSoalPilgan";
import EditSoalPilgan from "./editSoalPilgan";

function ModalLayout({childern}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="showModalAddSoalPilgan"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
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
const ModalPilihanGanda = ({ action , id }) => {
  const [actionModal, setActionModal] = useState();

  useEffect(() => {
    setActionModal(action);
  }, [action]);

  switch (actionModal) {
    case "add":
      return <ModalLayout childern={<AddSoalPilgan />} />;
    case "edit":
      return <ModalLayout childern={<EditSoalPilgan id={id}/>} />;
    default:
      return <ModalLayout childern={<AddSoalPilgan />} />;
  }
};

export default ModalPilihanGanda;
