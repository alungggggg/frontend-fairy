import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addSoalArtikel,
  getSoalArtikel,
} from "../../../../../lib/redux/api/soalArtikelSlice";
import Swal from "sweetalert2";

export const soalArtikelSchema = Yup.object().shape({
  soal: Yup.string().required("Soal wajib diisi"),
  opsi_a: Yup.string().required("Opsi A wajib diisi"),
  opsi_b: Yup.string().required("Opsi B wajib diisi"),
  opsi_c: Yup.string().required("Opsi C wajib diisi"),
  opsi_d: Yup.string().required("Opsi D wajib diisi"),
  opsi_e: Yup.string().required("Opsi E wajib diisi"),
  jawaban: Yup.string().required("Jawaban wajib diisi"),
  score: Yup.number()
    .required("Score wajib diisi")
    .min(0, "Score tidak boleh kurang dari 0")
    .max(100, "Score tidak boleh lebih dari 100"),
  id_artikel: Yup.string().required("ID Artikel wajib diisi"),
});

const AddSoalArtikel = ({ onClose = () => {} }) => {
  const { isLoading } = useSelector((state) => state.soalArtikel);
  const { data: artikelData } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        soal: "",
        opsi_a: "",
        opsi_b: "",
        opsi_c: "",
        opsi_d: "",
        opsi_e: "",
        jawaban: "",
        score: "",
      }}
      validationSchema={soalArtikelSchema}
      onSubmit={async (values) => {
        // Simulate an API call
        const res = await dispatch(addSoalArtikel(values));
        if (addSoalArtikel.fulfilled.match(res)) {
          Swal.fire({
            title: "Berhasil",
            text: "Soal artikel berhasil ditambahkan",
            icon: "success",
          });
          onClose();
          dispatch(getSoalArtikel());
        } else {
          Swal.fire({
            title: "Gagal",
            text: "Gagal menambahkan soal artikel",

            icon: "error",
          });
        }
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Soal</label>
              <Field
                type="text"
                as="textarea"
                rows="4"
                name="soal"
                className={`form-control ${
                  errors.soal && touched.soal ? "is-invalid" : ""
                }`}
                value={values.soal}
                onChange={handleChange}
              />
              {errors.soal && touched.soal && (
                <div className="invalid-feedback">{errors.soal}</div>
              )}
            </div>
            <div className="row row-cols-2">
              <div className="mb-3">
                <label className="form-label">Opsi A</label>
                <input
                  type="text"
                  name="opsi_a"
                  className={`form-control ${
                    errors.opsi_a && touched.opsi_a ? "is-invalid" : ""
                  }`}
                  value={values.opsi_a}
                  onChange={handleChange}
                />
                {errors.opsi_a && touched.opsi_a && (
                  <div className="invalid-feedback">{errors.opsi_a}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Opsi B</label>
                <input
                  type="text"
                  name="opsi_b"
                  className={`form-control ${
                    errors.opsi_b && touched.opsi_b ? "is-invalid" : ""
                  }`}
                  value={values.opsi_b}
                  onChange={handleChange}
                />
                {errors.opsi_b && touched.opsi_b && (
                  <div className="invalid-feedback">{errors.opsi_b}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Opsi C</label>
                <input
                  type="text"
                  name="opsi_c"
                  className={`form-control ${
                    errors.opsi_c && touched.opsi_c ? "is-invalid" : ""
                  }`}
                  value={values.opsi_c}
                  onChange={handleChange}
                />
                {errors.opsi_c && touched.opsi_c && (
                  <div className="invalid-feedback">{errors.opsi_c}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Opsi D</label>
                <input
                  type="text"
                  name="opsi_d"
                  className={`form-control ${
                    errors.opsi_d && touched.opsi_d ? "is-invalid" : ""
                  }`}
                  value={values.opsi_d}
                  onChange={handleChange}
                />
                {errors.opsi_d && touched.opsi_d && (
                  <div className="invalid-feedback">{errors.opsi_d}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Opsi E</label>
                <input
                  type="text"
                  name="opsi_e"
                  className={`form-control ${
                    errors.opsi_e && touched.opsi_e ? "is-invalid" : ""
                  }`}
                  value={values.opsi_e}
                  onChange={handleChange}
                />
                {errors.opsi_e && touched.opsi_e && (
                  <div className="invalid-feedback">{errors.opsi_e}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Jawaban</label>
                <select
                  name="jawaban"
                  className={`form-select ${
                    errors.jawaban && touched.jawaban ? "is-invalid" : ""
                  }`}
                  value={values.jawaban}
                  onChange={handleChange}
                >
                  <option value="">Pilih Jawaban</option>
                  {values.opsi_a && (
                    <option value={values.opsi_a}>{values.opsi_a}</option>
                  )}
                  {values.opsi_b && (
                    <option value={values.opsi_b}>{values.opsi_b}</option>
                  )}
                  {values.opsi_c && (
                    <option value={values.opsi_c}>{values.opsi_c}</option>
                  )}
                  {values.opsi_d && (
                    <option value={values.opsi_d}>{values.opsi_d}</option>
                  )}
                  {values.opsi_e && (
                    <option value={values.opsi_e}>{values.opsi_e}</option>
                  )}
                </select>
                {errors.jawaban && touched.jawaban && (
                  <div className="invalid-feedback">{errors.jawaban}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Artikel</label>
                <select
                  name="id_artikel"
                  className={`form-select ${
                    errors.id_artikel && touched.id_artikel ? "is-invalid" : ""
                  }`}
                  value={values.id_artikel}
                  onChange={handleChange}
                >
                  <option value="">Pilih Artikel</option>
                  {artikelData.map((artikel) => (
                    <option key={artikel.id} value={artikel.id}>
                      {artikel.judul}
                    </option>
                  ))}
                </select>
                {errors.id_artikel && touched.id_artikel && (
                  <div className="invalid-feedback">{errors.id_artikel}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Score</label>
                <input
                  type="number"
                  name="score"
                  className={`form-control ${
                    errors.score && touched.score ? "is-invalid" : ""
                  }`}
                  value={values.score}
                  onChange={handleChange}
                />
                {errors.score && touched.score && (
                  <div className="invalid-feedback">{errors.score}</div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSoalArtikel;
