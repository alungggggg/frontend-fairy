import { useDispatch, useSelector } from "react-redux";
import { editArtikelData } from "../../../../../lib/redux/api/artikelSlice";
import { artikelSchema } from "./addArtikel";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

const EditArtikel = ({ onClose = () => {}, selectedData = {} }) => {
  const { isLoading } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        id: selectedData.id || "",
        artikel_link: selectedData.artikel_link || "",
        judul: selectedData.judul || "",
        type: selectedData.type || "quiz",
        gambar: null,
        deskripsi: selectedData.deskripsi || "",
      }}
      validationSchema={artikelSchema.omit("gambar")}
      onSubmit={async (values) => {
        const res = await dispatch(editArtikelData(values));

        if (editArtikelData.fulfilled.match(res)) {
          Swal.fire({
            title: "Artikel Berhasil Diedit",
            icon: "success",
          });
          onClose();
        } else {
          Swal.fire({
            title: "Artikel Gagal Diedit",
            icon: "error",
          });
        }
      }}
    >
      {({ setFieldValue, errors, touched, values }) => (
        <Form encType="multipart/form-data">
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Link Artikel</label>
              <Field
                name="artikel_link"
                type="text"
                className="form-control"
                required
              />
              {errors.artikel_link && touched.artikel_link && (
                <div className="text-danger">{errors.artikel_link}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Judul</label>
              <Field
                name="judul"
                type="text"
                className="form-control"
                required
              />
              {errors.judul && touched.judul && (
                <div className="text-danger">{errors.judul}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Gambar</label>
              <br />
              {selectedData?.image && !values.gambar ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL_ARTIKEL}/${selectedData.image}`}
                  alt={selectedData.image}
                  className="img-fluid mb-3"
                  style={{ width: "100px", height: "auto" }}
                />
              ) : (
                ""
              )}
              <input
                name="gambar"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("gambar", event.currentTarget.files[0]);
                }}
              />
              {errors.gambar && touched.gambar && (
                <div className="text-danger">{errors.gambar}</div>
              )}
            </div>

            {/* select  */}

            <div className="mb-3">
              <label className="form-label">Tipe Artikel</label>
              <Field name="type" as="select" className="form-select" required>
                <option value="quiz" selected={values.type == "quiz"}>
                  Quiz
                </option>
                <option value="debat" selected={values.type == "debat"}>
                  Debat
                </option>
              </Field>
              {errors.type && touched.type && (
                <div className="text-danger">{errors.type}</div>
              )}
            </div>
            {/* select  */}
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <Field
                name="deskripsi"
                as="textarea"
                className="form-control"
                required
              />
              {errors.deskripsi && touched.deskripsi && (
                <div className="text-danger">{errors.deskripsi}</div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              Simpan
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditArtikel;
