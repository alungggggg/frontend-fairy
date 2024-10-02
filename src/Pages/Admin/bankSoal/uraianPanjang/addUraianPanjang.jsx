import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getAllDongeng } from "../../../../lib/redux/api/dongeng";
import {
  addSoalUraianPanjang,
  getSoalUraianPanjang,
} from "../../../../lib/redux/api/soalUraianPanjang";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";
import Swal from "sweetalert2";

const uraianSingkatPanjang = Yup.object().shape({
  // soal: Yup.string().required("Soal is required"),
  idDongeng: Yup.string().required("Dongeng is required"),
  jawaban: Yup.string(),
});
const AddSoalUraianPanjang = () => {
  const dispatch = useDispatch();
  const { dongeng } = useSelector((state) => state.dongeng) || [];
  const { soalUraianPanjang , isLoading } = useSelector((state) => state.soalUraianPanjang);

  async function handleAddSoalUraianPanjang(value) {
    const selectedDongeng = dongeng.find(
      (d) => d.id === parseInt(value.idDongeng)
    );

    var isSoalAlreadyCreated = soalUraianPanjang.find(
      (soal) => soal.idDongeng === parseInt(value.idDongeng)
    );

    if (isSoalAlreadyCreated) {
      document.getElementById("showModalUraianPanjang").click();
      Swal.fire({
        title: "Failed",
        text: "Quiz telah ada !!",
        icon: "error",
      });
      return null;
    }

    var value = {
      soal: `Tulis kembali dongeng ${selectedDongeng.title} dengan bahasamu sendiri !!`,
      idDongeng: value.idDongeng,
      jawaban: value.jawaban,
    };

    var res = await dispatch(addSoalUraianPanjang(value));
    if (!res.payload) {
      console.log("getting new access token");
      await dispatch(getNewAccessToken());
      return handleAddSoalUraianPanjang(value);
    }
    Swal.fire({
      title: "Created!",
      text: "Quiz berhasil dibuat !!",
      icon: "success",
    });
    document.getElementById("showModalUraianPanjang").click();
    await dispatch(getSoalUraianPanjang());
  }

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Menambahkan Soal Uraian Panjang
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
            validationSchema={uraianSingkatPanjang}
            onSubmit={(values) => {
              handleAddSoalUraianPanjang(values);
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="row">
                <div className="col">
                  {/* <div className="mb-3">
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
                      // disabled
                      value={soal}
                    />
                    {errors.soal && touched.soal ? (
                      <div className="text-danger ">{errors.soal}</div>
                    ) : null}
                  </div> */}

                  <div className="mb-3">
                    <label htmlFor="idDongeng" className="form-label">
                      Judul Dongeng
                    </label>
                    <Field as="select" name="idDongeng" className="form-select">
                      <option value="">Pilih Dongeng</option>
                      {dongeng
                        ? dongeng.map((dongeng) => (
                            <option key={dongeng.id} value={dongeng.id}>
                              {dongeng.title}
                            </option>
                          ))
                        : null}
                    </Field>
                    {errors.idDongeng && touched.idDongeng ? (
                      <div className="text-danger">{errors.idDongeng}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="jawaban" className="form-label">
                      Kata Kunci
                    </label>
                    <Field
                      as="textarea"
                      name="jawaban"
                      className="form-control"
                      id="jawaban"
                      placeholder='Masukan jawaban , contoh : "keterangan1,keterangan2,keterangan3,..."'
                      rows="4"
                    />
                    {errors.jawaban && touched.jawaban ? (
                      <div className="text-danger ">{errors.jawaban}</div>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  id="btnSubmitAddSoalUraianPanjang"
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
            disabled={isLoading}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              document.getElementById("btnSubmitAddSoalUraianPanjang").click();
            }}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSoalUraianPanjang;
