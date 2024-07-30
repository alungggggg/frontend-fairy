import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../template/header";
import Footer from "../template/footer";

const post = async ({ title, pdf }) => {
  try {
    const response = axios.post(
      "http://localhost:5000/api/dongeng",
      {
        title,
        file: pdf,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
  // console.log("p")
};
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

const addDongeng = () => {
  return (
    <>
      <Header></Header>
      {/* <Formik
        initialValues={{ pdf: null }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          post(values).then((response) => {
            console.log(response);
          });
        }}
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <input
                type="text"
                name="title"
                onChange={(event) => {
                  setFieldValue("title", event.target.value);
                }}
              />
              {errors.title ? <div>{errors.title}</div> : null}
            </div>

            <div>
              <input
                type="file"
                name="pdf"
                onChange={(event) => {
                  setFieldValue("pdf", event.target.files[0]);
                  console.log(event.target.files[0]);
                }}
              />
              {errors.pdf && touched.pdf ? <div>{errors.pdf}</div> : null}
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik> */}
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Dongeng</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik
                initialValues={{ pdf: null }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  post(values).then((response) => {
                    console.log(response);
                  });
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
      <Footer></Footer>
    </>
  );
};

export default addDongeng;
