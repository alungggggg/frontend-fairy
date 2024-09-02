import * as Yup from "yup";
import AddDongeng from "./addDongeng";

export const dongengSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(100, "Title must be at most 100 characters")
    .matches(/^[a-zA-Z0-9 ]*$/, "Title must be alphanumeric"),
  pdf: Yup.mixed()
    .required("PDF file is required")
    .test("fileType", "File must be a PDF", (value) => {
      return value && value.type === "application/pdf";
    })
    .test("fileExtension", "File must have a .pdf extension", (value) => {
      return value && value.name.toString().toLowerCase().endsWith(".pdf");
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
      <AddDongeng/>
    </ModalLayout>
  );
};

export default ModalDongeng;
