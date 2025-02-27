import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthTemplate from "./authTemplate";
import errorMessage from "../../Component/errorMessage";
import * as yup from "yup";
import Swal from "sweetalert2";
import fairyApi from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

const changePassSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

const ForgotPasswordVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <AuthTemplate>
      <section
        className="d-flex justify-content-center align-items-center login"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <section className="login-item mx-1">
          <h2 className="text-blue mt-4 mt-md-0">Reset Password</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik
                initialValues={{ password: "", confirm_password: "" }}
                validationSchema={changePassSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const res = await fairyApi.post(
                      `forgot-password/${token}`,
                      {
                        password: values.password,
                      }
                    );

                    Swal.fire({
                      title: "Berhasil!",
                      text: "Password berhasil direset.",
                      icon: "success",
                    });
                    navigate("/login");
                  } catch (error) {
                    Swal.fire({
                      title: "Error",
                      icon: "error",
                      text:
                        error.response?.data?.message || "Terjadi kesalahan.",
                    });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <section className="form-group">
                      <div>
                        <label className="form-label fw-bold">PASSWORD</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Masukkan password baru"
                        />
                        <ErrorMessage name="password" render={errorMessage} />
                      </div>
                      <div className="mt-3">
                        <label className="form-label fw-bold">
                          CONFIRM PASSWORD
                        </label>
                        <Field
                          type="password"
                          name="confirm_password"
                          className="form-control"
                          placeholder="Ulangi password"
                        />
                        <ErrorMessage
                          name="confirm_password"
                          render={errorMessage}
                        />
                      </div>
                      <section className="d-flex justify-content-end">
                        <button
                          className="btn btn-sm btn-orange py-2 mt-2 text-white"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Mengirim..." : "Reset Password"}
                        </button>
                      </section>
                    </section>
                  </Form>
                )}
              </Formik>
            </section>
          </section>
        </section>
      </section>
    </AuthTemplate>
  );
};

export default ForgotPasswordVerify;
