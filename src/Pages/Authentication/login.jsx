import * as Yup from "yup";
import swal from "../../Component/alert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  credential: Yup.string().required("Field ini wajib diisi"),
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

  const submit = async ({ credential, password }) => {
    console.log(credential, password);
    try {
      dispatch(
        signIn({
          credential,
          password: password,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthTemplate>
      <section className="d-flex align-items-center justify-content-center login" style={{minHeight:"calc(100vh - 76px)"}}>
        <section className="login-item mx-1">
          {/* <h2 className="text-blue mt-md-0">Masuk</h2> */}
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
                initialValues={{ credential: "", password: "" }}
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
                    <label className="form-label fw-bold">EMAIL OR USERNAME</label>
                    <Field
                      type="text"
                      name="credential"
                      className="form-control"
                      placeholder="Masukan alamat email atau Username"
                    />
                    <ErrorMessage name="credential" render={errorMessage} />
                  </section>
                  <section className="form-group my-4">
                    <section>
                      <label className="form-label fw-bold float-start">
                        KATA SANDI
                      </label>
                      <label className="form-label float-end">
                        <Link
                          to={"/forgot-password"}
                          className="text-blue text-decoration-none"
                        >
                          LUPA KATA SANDI?
                        </Link>
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
                      <Link
                        to={"/register"}
                        className="text-decoration-none text-blue"
                      >
                        Daftar disini
                      </Link>
                    </p>
                    <p className="mb-0">
                      Lupa kata sandi?
                      <Link
                        to={"/forgot-password"}
                        className="text-decoration-none text-blue"
                      >
                        Klik disini
                      </Link>
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
