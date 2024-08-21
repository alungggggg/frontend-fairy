import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorMessage from "../../Component/errorMessage";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getValidationCode } from "../../lib/redux/api/auth";
import AuthTemplate from "./authTemplate";
import axios from "axios";

const isValidToken = async (token) => {
  return await axios.get(`http://localhost:5000/api/isvalidtoken/${token}`);
};

const getCodeSchema = Yup.object({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .test(
      "checkUniqueEmail",
      "The Email Address could not be found.",
      async (value) => {
        const checkEmail = await axios.get(
          `http://localhost:5000/api/auth/email?search=${value}`
        );
        // const isUnique = await isEmailUnique(value);
        return checkEmail.data.checkEmailExists;
      }
    ),
});
const validationCodeSchema = Yup.object({
  code: Yup.string().required("code required"),
});

const changePassSchema = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password dan Konfirmasi Password harus sama"
    )
    .required("Konfirmasi Password wajib diisi"),
});

const forgotPassword = () => {
  const [isVAlidation, setIsValidation] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [email, setEmail] = useState();
  const [form, setForm] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      isValidToken(token).then((res) => {
        setForm(res.data.status);
      });
    }
  }, []);

  const dispatch = useDispatch();
  const { validationToken, isLoading } = useSelector((state) => state.auth);

  const post = async ({ email }) => {
    dispatch(getValidationCode(email));
    setEmail(email);
    setIsValidation(true);
  };

  const checkValidationCode = async ({ code }) => {
    if (code === validationToken) {
      setIsChangingPass(true);
      setIsValidation(false);
    }
  };

  const navigate = useNavigate();
  const handleChangePass = async ({ newPassword }) => {
    alert(`Your new password : ${newPassword}`);
    navigate("/");
  };

  const FormFP = () => (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      validationSchema={changePassSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        if ((await isValidToken(token)).data.status === true) {
          console.log(
            await axios.post(
              `http://localhost:5000/api/forgot-password/${token}`,
              { newPassword: values.newPassword }
            )
          );
        }
      }}
    >
      {/* <Form>
        <Field type="password" name="newPassword" placeholder="New Password" />
        <ErrorMessage name="newPassword" render={errorMessage} />

        <Field
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <ErrorMessage name="confirmPassword" render={errorMessage} />

        <button type="submit">Change</button>
      </Form> */}

      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Ganti Kata Sandi</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Form>
                <section className="form-group mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    KATA SANDI
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Masukan kata Sandi Baru"
                  />
                </section>
                <ErrorMessage name="newPassword" render={errorMessage} />

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
                  <ErrorMessage name="confirmPassword" render={errorMessage} />
                </section>
                <section className="d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-orange py-2 mt-2 text-white"
                    type="submit"
                  >
                    Send Reset Code
                  </button>
                </section>
              </Form>
            </section>
          </section>
        </section>
      </section>
    </Formik>
  );

  const SendCode = () => {
    return (
      <AuthTemplate>
        <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
          <section className="col-lg-5">
            <h2 className="text-blue mt-4 mt-md-0">Reset Password</h2>
            <section className="card mt-2 shadow">
              <section className="card-body p-4">
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={getCodeSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={(values, { setSubmitting }) => {
                    post(values);
                    setSubmitting(false);
                  }}
                >
                  <Form>
                    {/* <Field type="email" name="email" />
                    <ErrorMessage name="email" render={errorMessage} />

                    <button type="submit">Send Reset Code</button> */}

                    <section className="form-group">
                      <label className="form-label fw-bold">ALAMAT EMAIL</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Masukan alamat email"
                      />
                      <ErrorMessage name="email" render={errorMessage} />
                      <section className="d-flex justify-content-end">
                        <button
                          className="btn btn-sm btn-orange py-2 mt-2 text-white"
                          type="submit"
                        >
                          Send Reset Code
                        </button>
                      </section>
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

  const ValidationCode = () => {
    return (
      <AuthTemplate>
        <p>Code Telah Dikirim Ke {email}</p>
        <Formik
          initialValues={{ code: "" }}
          validationSchema={validationCodeSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            checkValidationCode(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Field type="text" name="code" />
            <ErrorMessage name="code" render={errorMessage} />

            <button type="submit">Check Validation</button>
          </Form>
        </Formik>
      </AuthTemplate>
    );
  };

  // if (form === null) {

  // }
  if (form === null) return <SendCode />;
  if (form === true) return <FormFP />;
  if (!isVAlidation && !isChangingPass) return <SendCode />;
  if (isVAlidation && !isChangingPass) return <ValidationCode />;
  if (!isVAlidation && isChangingPass) return <ChangePassword />;
};

export default forgotPassword;
