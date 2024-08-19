import * as Yup from "yup";
import AddForumQuiz from "./addForumQuiz";

export const forumQuizSchema = Yup.object().shape({
  judul: Yup.string().required("Judul is required"),
  idDongeng: Yup.string().required("Dongeng is required"),
  sekolah: Yup.string().required("Sekolah is required"),
  expired_date: Yup.date().required("Expired date is required"),
  access_date: Yup.date().required("Access date is required"),
});

function ModalLayout({ children }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="showModalForumQuiz"
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
        {children}
      </div>
    </div>
  );
}

const ModalForumQuiz = () => {
  return (
    <ModalLayout>
      <AddForumQuiz />
    </ModalLayout>
  );
};

export default ModalForumQuiz;
