import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDongeng } from "../../../../lib/redux/api/dongeng";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  editSoalPilgan,
  getSoalPilgan,
} from "../../../../lib/redux/api/soalPilgan";

const editSoalPilganSchema = Yup.object().shape({
  soal: Yup.string().required("Soal is required"),
  idDongeng: Yup.string().required("Dongeng is required"),
  opsi_1: Yup.string().required("Opsi 1 is required"),
  opsi_2: Yup.string().required("Opsi 2 is required"),
  opsi_3: Yup.string().required("Opsi 3 is required"),
  opsi_4: Yup.string().required("Opsi 4 is required"),
  jawaban: Yup.string().required("Jawaban is required"),
});

const EditSoalPilgan = ({ id }) => {
  const dispatch = useDispatch();
  const { dongeng } = useSelector((state) => state.dongeng);
  const { soalPilgan } = useSelector((state) => state.soalPilihanGanda);

  const [soal, setSoal] = useState({});

  useEffect(() => {
    setSoal(soalPilgan.find((item) => item.id === id));
  }, [id]);

  useEffect(() => {
    dispatch(getAllDongeng());
  }, []);

  async function handleEditSoalPilgan(value) {
    document.getElementById("showModalAddSoalPilgan").click();
    await dispatch(editSoalPilgan(value));
    await dispatch(getSoalPilgan());
  }
  return (
    <div className="modal-dialog h-100 d-flex align-items-center my-0">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Mengedit Soal Pilihan Ganda
          </h5>
        </div>
        <div className="modal-body">
          <Formik
            enableReinitialize
            initialValues={{
              id: soal.id || "",
              soal: soal.soal || "",
              idDongeng: soal.idDongeng || "",
              opsi_1: soal.opsi_1 || "",
              opsi_2: soal.opsi_2 || "",
              opsi_3: soal.opsi_3 || "",
              opsi_4: soal.opsi_4 || "",
              jawaban: soal.jawaban || "",
            }}
            validationSchema={editSoalPilganSchema}
            onSubmit={(values) => {
              handleEditSoalPilgan(values);
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="soal" className="form-label">
                    Soal
                  </label>
                  <Field
                    type="text"
                    name="soal"
                    className="form-control"
                    id="soal"
                    placeholder="Masukan soal"
                  />
                  {errors.soal && touched.soal ? (
                    <div className="text-danger">{errors.soal}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="idDongeng" className="form-label">
                    Judul Dongeng
                  </label>
                  <Field as="select" name="idDongeng" className="form-select">
                    <option value="">Pilih Dongeng</option>
                    {dongeng.map((dongeng) => (
                      <option key={dongeng.id} value={dongeng.id}>
                        {dongeng.title}
                      </option>
                    ))}
                  </Field>
                  {errors.idDongeng && touched.idDongeng ? (
                    <div className="text-danger">{errors.idDongeng}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="opsi1" className="form-label">
                    Opsi 1
                  </label>
                  <Field
                    type="text"
                    name="opsi_1"
                    className="form-control"
                    id="opsi1"
                    placeholder="Masukan opsi 1"
                  />
                  {errors.opsi_1 && touched.opsi_1 ? (
                    <div className="text-danger">{errors.opsi_1}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="opsi2" className="form-label">
                    Opsi 2
                  </label>
                  <Field
                    type="text"
                    name="opsi_2"
                    className="form-control"
                    id="opsi2"
                    placeholder="Masukan opsi 2"
                  />
                  {errors.opsi_2 && touched.opsi_2 ? (
                    <div className="text-danger">{errors.opsi_2}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="opsi3" className="form-label">
                    Opsi 3
                  </label>
                  <Field
                    type="text"
                    name="opsi_3"
                    className="form-control"
                    id="opsi3"
                    placeholder="Masukan opsi 3"
                  />
                  {errors.opsi_3 && touched.opsi_3 ? (
                    <div className="text-danger">{errors.opsi_3}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="opsi4" className="form-label">
                    Opsi 4
                  </label>
                  <Field
                    type="text"
                    name="opsi_4"
                    className="form-control"
                    id="opsi4"
                    placeholder="Masukan opsi 4"
                  />
                  {errors.opsi_4 && touched.opsi_4 ? (
                    <div className="text-danger">{errors.opsi_4}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="jawaban" className="form-label">
                    Jawaban
                  </label>
                  <Field as="select" name="jawaban" className="form-select">
                    <option value="">Pilih Opsi Jawaban</option>
                    {values.opsi_1 ? (
                      <option value={values.opsi_1}>{values.opsi_1}</option>
                    ) : (
                      ""
                    )}
                    {values.opsi_2 ? (
                      <option value={values.opsi_2}>{values.opsi_2}</option>
                    ) : (
                      ""
                    )}
                    {values.opsi_3 ? (
                      <option value={values.opsi_3}>{values.opsi_3}</option>
                    ) : (
                      ""
                    )}
                    {values.opsi_4 ? (
                      <option value={values.opsi_4}>{values.opsi_4}</option>
                    ) : (
                      ""
                    )}
                  </Field>
                  {errors.jawaban && touched.jawaban ? (
                    <div className="text-danger">{errors.jawaban}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  id="btnSubmitEditSoalPilgan"
                  className="d-none"
                ></button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              document.getElementById("btnSubmitEditSoalPilgan").click();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSoalPilgan;
