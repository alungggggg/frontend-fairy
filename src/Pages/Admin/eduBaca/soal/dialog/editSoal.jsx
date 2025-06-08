import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { soalArtikelSchema } from "./addSoal";
import Swal from "sweetalert2";
import { editSoalArtikel, getSoalArtikel } from "../../../../../lib/redux/api/soalArtikelSlice";

const EditSoalArtikel = ({ onClose = () => {}, selectedData = {} }) => {
  const { isLoading } = useSelector((state) => state.soalArtikel);
  const { data: artikelData } = useSelector((state) => state.artikel);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        id: selectedData.id || "",
        soal: selectedData.soal || "",
        opsi_a: selectedData.opsi_a || "",
        opsi_b: selectedData.opsi_b || "",
        opsi_c: selectedData.opsi_c || "",
        opsi_d: selectedData.opsi_d || "",
        opsi_e: selectedData.opsi_e || "",
        jawaban: selectedData.jawaban || "",
        score: selectedData.score || "",
        id_artikel: selectedData.id_artikel || "",
      }}
      validationSchema={soalArtikelSchema}
      onSubmit={async (values) => {
        // Simulate an API call
        const res = await dispatch(editSoalArtikel(values));
        if (editSoalArtikel.fulfilled.match(res)) {
          Swal.fire({
            title: "Berhasil",
            text: "Soal artikel berhasil ditambahkan",
            icon: "success",
          });
          onClose();
          dispatch(getSoalArtikel())
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
                    <option
                      key={artikel.id}
                      value={artikel.id}
                      selected={artikel.id == values.id_artikel}
                    >
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

export default EditSoalArtikel;
