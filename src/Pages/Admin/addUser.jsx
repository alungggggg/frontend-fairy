import Header from "../template/header";
import Footer from "../template/footer";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import schema from "../../../validation/userValidate";
import errorMessage from "../../Component/errorMessage";
import { useNavigate, useLocation } from "react-router-dom";

const post = async ({ nama, email, password }) => {
  // const navigate = useNavigate();

  try {
    const result = await axios.post(
      "http://localhost:5000/api/users",
      { nama, email, password },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

  } catch (error) {
    console.log(error.message);
  }
}

const addUser = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Users</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik initialValues={{ nama: "", email: '', password: '', confirmPassword: '', }}
                validationSchema={schema} validateOnChange={false} validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                  post(values)
                  navigate("/users", {
                    state: { message: "User Berhasil di buat!", status: "success" },
                  });
                  setSubmitting(false);
                }}>
                <Form>
                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      NAMA LENGKAP
                    </label>
                    <Field
                      type="text"
                      name="nama"
                      className="form-control"
                      placeholder="Masukan nama lengkap"
                    />

                    <ErrorMessage
                      name="nama"
                      render={errorMessage}
                    />
                  </section>
                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      ALAMAT EMAIL
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Masukan alamat email"
                    />

                    <ErrorMessage
                      name="email"
                      render={errorMessage}
                    />
                  </section>
                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      KATA SANDI
                    </label>
                    <Field
                      type="text"
                      name="password"
                      className="form-control"
                      placeholder="Masukan kata sandi"
                    />

                    <ErrorMessage
                      name="password"
                      render={errorMessage}
                    />
                  </section>
                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      ULANGI KATA SANDI
                    </label>
                    <Field
                      type="text"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Masukan ulang kata sandi"
                    />

                    <ErrorMessage
                      name="confirmPassword"
                      render={errorMessage}
                    />
                  </section>
                  <section className="form-group ">
                    <button
                      type="submit"
                      className="btn btn-orange py-2 text-white float-left"
                    >
                      Submit
                    </button>
                    <a
                      href="/users"
                      className="btn btn-secondary py-2 text-white float-right"
                    >
                      Back
                    </a>
                  </section>
                </Form>
              </Formik>
            </section>
          </section>
        </section>
      </section>
      <Footer></Footer>
    </>
  );
};

export default addUser;
