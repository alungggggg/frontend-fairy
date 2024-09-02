import { Field, Formik, Form } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getAllDongeng } from "../../../../lib/redux/api/dongeng";
import {
  addSoalUraianSingkat,
  getSoalUraianSingkat,
} from "../../../../lib/redux/api/soalUraianSingkat";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";

const uraianSingkatSchema = Yup.object().shape({
  soal: Yup.string().required("Soal is required"),
  idDongeng: Yup.string().required("Dongeng is required"),
  jawaban: Yup.string().required("Jawaban is required"),
});
const AddSoalUraianSingkat = () => {
  const dispatch = useDispatch();
  const { dongeng } = useSelector((state) => state.dongeng);

  async function handleAddSoalUraianSingkat(value) {
    var res = await dispatch(addSoalUraianSingkat(value));
    if (!res.payload) {
      console.log("getting new access token");
      await dispatch(getNewAccessToken());
      return handleAddSoalUraianSingkat(value);
    }
    document.getElementById("showModalUraianSingkat").click();
    await dispatch(getSoalUraianSingkat());
  }
  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Menambahkan Soal Uraian Singkat
          </h5>
        </div>
        <div className="modal-body" style={{ width: "800px" }}>
          <Formik
            enableReinitialize
            initialValues={{
              soal: "",
              idDongeng: "",
              jawaban: "",
            }}
            validationSchema={uraianSingkatSchema}
            onSubmit={(values) => {
              handleAddSoalUraianSingkat(values);
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="soal" className="form-label">
                      Soal
                    </label>
                    <Field
                      as="textarea"
                      name="soal"
                      className="form-control"
                      id="soal"
                      placeholder="Masukan soal"
                      rows="4"
                    />
                    {errors.soal && touched.soal ? (
                      <div className="text-danger ">{errors.soal}</div>
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
                    <label htmlFor="jawaban" className="form-label">
                      Jawaban
                    </label>
                    <Field
                      as="textarea"
                      name="jawaban"
                      className="form-control"
                      id="jawaban"
                      placeholder="Masukan jawaban"
                      rows="4"
                    />
                    {errors.jawaban && touched.jawaban ? (
                      <div className="text-danger ">{errors.jawaban}</div>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  id="btnSubmitAddSoalUraianSingkat"
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
              document.getElementById("btnSubmitAddSoalUraianSingkat").click();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSoalUraianSingkat;
