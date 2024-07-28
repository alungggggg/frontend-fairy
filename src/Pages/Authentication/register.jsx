import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import Header from "../template/header";
import Footer from "../template/footer";

const post = async ({ nama, email, password, confirmPassword }) => {
  const navigate = useNavigate()
  try {
    const result = await axios.post("http://localhost:5000/api/register", {
      nama,
      email,
      password,
      confirmPassword,
    });
    navigate("/login", {
      state: { message: "Berhasil Register!", status: "success" },
    });
  } catch (err) {
    console.log(err.message);
  }
}

const schema = yup.object().shape({
  nama: yup.string().required().min(4),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi').test("Unique", "Email sudah terdaftar", async (value) => {
    const nunique = await axios.get(`http://localhost:5000/api/email?search=${value}`)
    console.log(nunique.data.isAvailable)
    return nunique.data.isAvailable
  }),
  password: yup.string()
    .required('Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .matches(/[a-zA-Z]/, 'Password harus mengandung huruf'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Password dan Konfirmasi Password harus sama')
    .required('Konfirmasi Password wajib diisi')
});

const errorMessage = (message) => (
  <p className="validation-error-message">{message}</p>
);

const register = () => {


  return (
    <>
      <Header />
      <Formik
        initialValues={{ nama: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={schema} validateOnChange={false} validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          // console.log("Hallo")
          post(values)
        }}
      >
        <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
          <section className="col-lg-5">
            <h2 className="text-blue mt-4 mt-md-0">Registrasi</h2>
            <section className="card mt-2 shadow">
              <section className="card-body p-4">
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
                      // displays the validation error message for the 'email' field
                      name="nama"
                      render={errorMessage}
                    />
                  </section>
                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      ALAMAT EMAIL
                    </label>
                    <Field
                      name="email"
                      type="text"
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
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Masukan kata sandi"
                    />
                  </section>
                  <ErrorMessage
                    // displays the validation error message for the 'email' field
                    name="password"
                    render={errorMessage}
                  />

                  <section className="form-group mb-3">
                    <label htmlFor="" className="form-label fw-bold">
                      ULANGI KATA SANDI
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Masukan ulang kata sandi"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      render={errorMessage}
                    />

                  </section>
                  <section className="form-group d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-orange py-2 text-white"
                    >
                      Daftar
                    </button>
                  </section>
                </Form>
                <section className="form-group text-center mt-4">
                  <p>
                    Sudah punya akun?
                    <a href="/login" className="text-decoration-none text-blue">
                      Masuk disini
                    </a>
                  </p>
                </section>
              </section>
            </section>
          </section>
        </section>
      </Formik>

      <Footer />
    </>
    // <>

    //   <Header></Header>

    //   <Footer></Footer>
    // </>
  );
};

export default register;
