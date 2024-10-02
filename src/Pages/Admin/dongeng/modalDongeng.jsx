import * as Yup from "yup";
import AddDongeng from "./addDongeng";

export const dongengSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(100, "Title must be at most 100 characters")
    .matches(/^[a-zA-Z0-9 ]*$/, "Title must be alphanumeric"),
  pdfURL: Yup.mixed()
    .mixed()
    .required("Gambar wajib diunggah")
    .test("fileSize", "Ukuran gambar terlalu besar", (value) => {
      return value && value.size <= 2 * 1024 * 1024; // Maksimal 2 MB
    })
    .test("fileType", "Format gambar tidak didukung", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

function ModalLayout({ children }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="showModalDongeng"
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

const ModalDongeng = () => {
  return (
    <ModalLayout>
      <AddDongeng />
    </ModalLayout>
  );
};

export default ModalDongeng;
