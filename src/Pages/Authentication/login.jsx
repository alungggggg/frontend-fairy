import * as Yup from "yup";
import swal from "../../Component/alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../lib/redux/api/auth";
import errorMessage from "../../Component/errorMessage";
import AuthTemplate from "./authTemplate";

// const isEmailUnique = async (email) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/auth/email?search=${email}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error checking email uniqueness", error);
//     return false;
//   }
// };

const schema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  // .test(
  //   "checkUniqueEmail",
  //   "The Email Address could not be found.",
  //   async (value) => {
  //     if (!value) return true;
  //     const isUnique = await isEmailUnique(value);
  //     return isUnique.checkEmailExists;
  //   }
  // ),
  password: Yup.string().required("Password is required"),
});

const AuthError = () => (
  <p className="text-danger">
    email or password is incorrect. Please try again
  </p>
);

const login = () => {
  const location = useLocation();
  const { message, status } = location.state || {};

  useEffect(() => {
    if (message) {
      swal(message, status);
    }
  }, []);

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const submit = async ({ email, password }) => {
    try {
      dispatch(
        signIn({
          email: email,
          password: password,
        })
      );
    } catch (err) {
      setError("Email atau Kata Sandi salah!");
    }
  };

  return (
    <AuthTemplate>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Masuk</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              {error ? (
                <center>
                  <AuthError />
                </center>
              ) : (
                ""
              )}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                  submit(values);
                  setSubmitting(false);
                }}
              >
                <Form>
                  <section className="form-group">
                    <label className="form-label fw-bold">Username or Password</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Masukan alamat email"
                    />
                    <ErrorMessage name="email" render={errorMessage} />
                  </section>
                  <section className="form-group my-4">
                    <section>
                      <label className="form-label fw-bold float-start">
                        KATA SANDI
                      </label>
                      <label className="form-label float-end">
                        <a
                          href="/forgot-password"
                          className="text-blue text-decoration-none"
                        >
                          LUPA KATA SANDI?
                        </a>
                      </label>
                    </section>
                    <section className="input-group">
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Masukan kata sandi"
                      />
                    </section>
                    <ErrorMessage name="password" render={errorMessage} />
                  </section>
                  <section className="form-group d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-orange py-2 text-white"
                    >
                      Masuk
                    </button>
                  </section>
                  <section className="form-group text-center mt-4">
                    <section className="my-2">Atau</section>
                    <p className="mb-0">
                      Belum punya akun?
                      <a
                        href="/register"
                        className="text-decoration-none text-blue"
                      >
                        Daftar disini
                      </a>
                    </p>
                    <p className="mb-0">
                      Lupa kata sandi?
                      <a
                        href="/forgot-password"
                        className="text-decoration-none text-blue"
                      >
                        Klik disini
                      </a>
                    </p>
                  </section>
                </Form>
              </Formik>
            </section>
          </section>
        </section>
      </section>
    </AuthTemplate>
  );
};

export default login;
