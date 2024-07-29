import Header from "../template/header";
import Footer from "../template/footer";
import * as Yup from "yup"
import swal from "../../Component/alert"
import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const isEmailUnique = async (email) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/email?search=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error checking email uniqueness', error);
    return false;
  }
};

const schema = Yup.object({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required')
    .test('checkUniqueEmail', 'The Email Address could not be found.', async (value) => {
      if (!value) return true;
      const isUnique = await isEmailUnique(value);
      return isUnique.checkEmailExists;
    }),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, 'Password must contain at least one special character')
});

const AuthError = () => (<p className="text-danger">email or password is incorrect. Please try again</p>)

const login = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [error, setError] = useState("")
  const { message, status } = location.state || {};

  useEffect(() => {
    if (message) {
      swal(message, status);
    }
  }, []);

  const submit = async ({ email, password }) => {
    try {
      const result = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (err) {
      setError("Email atau Kata Sandi salah!")
    }
  };

  return (
    <>
      <Header />
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Masuk</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              {(error != "") ? <AuthError /> : ""}
              <Formik initialValues={{ email: '', password: '' }}
                validationSchema={schema} validateOnChange={false} validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                  submit(values)
                  setSubmitting(false);
                }}>
                <Form>
                  <section className="form-group">
                    <label className="form-label fw-bold">ALAMAT EMAIL</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Masukan alamat email"
                    />

                  </section>
                  <section className="form-group my-4">
                    <section>
                      <label className="form-label fw-bold float-start">
                        KATA SANDI
                      </label>
                      <label className="form-label float-end">
                        <a href="#" className="text-blue text-decoration-none">
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
                      <a href="#" className="text-decoration-none text-blue">
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
      <Footer />
    </>
  );
};

export default login;
