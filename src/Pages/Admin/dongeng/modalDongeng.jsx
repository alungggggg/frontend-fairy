import * as Yup from "yup";
import AddDongeng from "./addDongeng";

export const dongengSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(100, "Title must be at most 100 characters")
    .matches(/^[a-zA-Z0-9 ]*$/, "Title must be alphanumeric"),
  cover: Yup.mixed()
    .required("Gambar diperlukan")
    .test(
      "fileSize",
      "Ukuran gambar harus kurang dari 2MB",
      (value) => !value || (value && value.size <= 2000000)
    )
    .test(
      "fileType",
      "Format gambar tidak valid. Format yang diterima: jpg, png, jpeg",
      (value) => {
        return (
          !value ||
          (value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
        );
      }
    ),
  pdfURL: Yup.string().required("URL diperlukan").url("Format URL tidak valid"),
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
