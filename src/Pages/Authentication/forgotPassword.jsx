import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthTemplate from "./authTemplate";
import * as yup from "yup";
import fairyApi from "../../lib/axios";
import errorMessage from "../../Component/errorMessage";
import Swal from "sweetalert2";

const getCodeSchema = yup.object({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
});

const ForgotPassword = () => {
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
                initialValues={{ email: "" }}
                validationSchema={getCodeSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await fairyApi.post("/forgot-password", {
                      email: values.email,
                    });
                    Swal.fire({
                      title: "Cek Email !!",
                      icon: "success",
                      text: "Link ganti password telah di kirim ke Email anda !",
                    });
                  } catch (error) {
                    console.error("Error submitting form:", error);
                    alert("Terjadi kesalahan. Silakan coba lagi.");
                  } finally {
                    setSubmitting(false); // Pastikan form tidak tetap dalam state submitting
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <section className="form-group">
                      <label className="form-label fw-bold">ALAMAT EMAIL</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Masukkan alamat email"
                      />
                      <ErrorMessage name="email" render={errorMessage} />
                      <section className="d-flex justify-content-end">
                        <button
                          className="btn btn-sm btn-orange py-2 mt-2 text-white"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Mengirim..." : "Send Reset Code"}
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

export default ForgotPassword;
