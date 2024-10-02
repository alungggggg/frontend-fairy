// import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addDongeng, getAllDongeng } from "../../../lib/redux/api/dongeng";
// import AdminLayout from "../adminLayout";
// import { Link } from "react-router-dom";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import Swal from "sweetalert2";
import { dongengSchema } from "./modalDongeng";

const AddDongeng = () => {
  const dispatch = useDispatch();

  async function post(value) {
    console.log("tets");
    var file = value.pdf;
    var title = value.title;

    const res = await dispatch(
      addDongeng({
        title,
        file,
      })
    );

    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return post(value);
      }
    }
    document.getElementById("showModalDongeng").click();
    await dispatch(getAllDongeng());
    Swal.fire({
      title: "Berhasil Meneambahkan dongeng",
    });
  }
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Menambahkan Dongeng
          </h5>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{ pdf: null }}
            validationSchema={dongengSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              post(values);
            }}
          >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
              <Form>
                <section className="form-group">
                  <label className="form-label fw-bold me-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue("title", event.target.value);
                    }}
                  />
                  {errors.title && touched.title ? (
                    <div className="text-danger">{errors.title}</div>
                  ) : null}
                </section>
                <section className="form-group my-4">
                  <input
                    type="file"
                    name="pdf"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue("pdf", event.target.files[0]);
                      console.log(event.target.files[0]);
                    }}
                  />
                  {errors.pdf && touched.pdf ? (
                    <div className="text-danger">{errors.pdf}</div>
                  ) : null}
                </section>
                <section className="form-group my-4">
                  <label className="form-label fw-bold me-2">
                    Flipbook Url
                  </label>
                  <input
                    type="text"
                    name="pdfURL"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue("pdfURL", event.target.value);
                    }}
                  />
                  {errors.pdfURL && touched.pdfURL ? (
                    <div className="text-danger">{errors.pdfURL}</div>
                  ) : null}
                </section>
                <section className="form-group d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    id="submitAddDongeng"
                    className="d-none"
                  >
                    Submit
                  </button>
                </section>
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
              document.getElementById("submitAddDongeng").click();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDongeng;
