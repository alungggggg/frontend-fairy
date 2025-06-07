import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addArtikelData } from "../../../../../lib/redux/api/artikelSlice";
import Swal from "sweetalert2";

export const artikelSchema = Yup.object().shape({
  artikel_link: Yup.string()
    .url("Link tidak valid")
    .required("Link wajib diisi"),
  judul: Yup.string().required("Judul wajib diisi"),
  type: Yup.string().required("Tipe artikel wajib diisi"),
  gambar: Yup.mixed()
    .required("Gambar wajib diupload")
    .test("fileFormat", "Format gambar harus JPG, PNG, atau WebP", (file) => {
      if (!file) return false; // Jika file tidak ada, return false
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }),
  deskripsi: Yup.string().required("Deskripsi wajib diisi"),
});

const AddArtikel = ({ onClose = () => {} }) => {
  const { isLoading } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        artikel_link: "",
        judul: "",
        type: "",
        gambar: null,
        deskripsi: "",
      }}
      validationSchema={artikelSchema}
      onSubmit={async (values) => {
        const res = await dispatch(addArtikelData(values));

        if (addArtikelData.fulfilled.match(res)) {
          Swal.fire({
            title: "Artikel Berhasil Ditambahkan",
            icon: "success",
          });
          onClose();
        } else {
          Swal.fire({
            title: "Artikel Gagal Ditambahkan",
            icon: "error",
          });
        }
      }}
    >
      {({ setFieldValue, errors, touched }) => (
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
                <option value="" selected>Pilih Type</option>
                <option value="quiz">Quiz</option>
                <option value="debat">Debat</option>
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

export default AddArtikel;
