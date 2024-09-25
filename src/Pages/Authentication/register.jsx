import { Link, useNavigate } from "react-router-dom";
import schema from "../../../validation/userValidate";
import { Formik, Form, Field, ErrorMessage } from "formik";
import errorMessage from "../../Component/errorMessage";
import AuthTemplate from "./authTemplate";
import fairyApi from "../../lib/axios";
import { useState } from "react";

const register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const post = async ({ nama, username, email, password, confirmPassword }) => {
    setIsLoading(true);
    try {
      await fairyApi.post("/register", {
        nama,
        username,
        email,
        password,
        confirmPassword,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading....</p>;

  return (
    <AuthTemplate>
      <Formik
        initialValues={{
          nama: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          post(values);
          setSubmitting(false);
          navigate("/login", {
            state: { message: "Berhasil Register!", status: "success" },
          });
        }}
      >
        <section className="d-flex justify-content-center align-items-center register" style={{minHeight:"calc(100vh - 76px)"}}>
          <section className="login-item mx-1">
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
                      USERNAME
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Masukan Username"
                    />

                    <ErrorMessage
                      // displays the validation error message for the 'email' field
                      name="username"
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

                    <ErrorMessage name="email" render={errorMessage} />
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
                    <Link to={"/login"} className="text-decoration-none text-blue">
                      Masuk disini
                    </Link>
                  </p>
                </section>
              </section>
            </section>
          </section>
        </section>
      </Formik>
    </AuthTemplate>
  );
};

export default register;
