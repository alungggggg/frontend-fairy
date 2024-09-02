import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addDongeng } from "../../../lib/redux/api/dongeng";
import AdminLayout from "../adminLayout";
import { Link } from "react-router-dom";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import Swal from "sweetalert2";

const schema = Yup.object({
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

const AddDongeng = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.dongeng);

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

    if (!res.payload) {
      console.log("getting new access token");
      await dispatch(getNewAccessToken());
      return post(value);
    }

    Swal.fire({
      title: "Berhasil Meneambahkan dongeng",
    });
  }
  return (
    <AdminLayout>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
        <div>
          <Link to={"../"}>Back</Link>
        </div>
        {isLoading ? <div>Loading....</div> : ""}
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Dongeng</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik
                initialValues={{ pdf: null }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                  post(values);
                }}
              >
                {({ setFieldValue, errors, touched, isSubmitting }) => (
                  <Form>
                    <section className="form-group">
                      <label className="form-label fw-bold me-2">Title :</label>
                      <input
                        type="text"
                        name="title"
                        onChange={(event) => {
                          setFieldValue("title", event.target.value);
                        }}
                      />
                      {errors.title ? <div>{errors.title}</div> : null}
                    </section>
                    <section className="form-group my-4">
                      <input
                        type="file"
                        name="pdf"
                        className=""
                        onChange={(event) => {
                          setFieldValue("pdf", event.target.files[0]);
                          console.log(event.target.files[0]);
                        }}
                      />
                      {errors.pdf && touched.pdf ? (
                        <div>{errors.pdf}</div>
                      ) : null}
                    </section>
                    <section className="form-group d-grid gap-2 mt-3">
                      <button
                        type="submit"
                        className="btn btn-orange py-2 text-white"
                      >
                        Submit
                      </button>
                    </section>
                  </Form>
                )}
              </Formik>
            </section>
          </section>
        </section>
      </section>
    </AdminLayout>
  );
};

export default AddDongeng;
