import Header from "../../template/header";
import Footer from "../../template/footer";
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios";
import schema from "../../../../validation/userValidate";
import errorMessage from "../../../Component/errorMessage";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


const SiswaForm = () => (
  <>
    <div className="form-group mb-3">
      <label htmlFor="" className="form-label fw-bold">
        SEKOLAH
      </label>
      <Field
        type="text"
        name="sekolah"
        className="form-control"
        placeholder="Masukan nama lengkap"
      />
      <ErrorMessage
        name="sekolah"
        render={errorMessage}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="" className="form-label fw-bold">
        KELAS
      </label>
      <Field
        type="text"
        name="kelas"
        className="form-control"
        placeholder="Masukan nama lengkap"
      />
      <ErrorMessage
        name="kelas"
        render={errorMessage}
      />
    </div>
  </>
)

const GuruForm = () => (
  <>
    <div className="form-group mb-3">
      <label htmlFor="" className="form-label fw-bold">
        SEKOLAH
      </label>
      <Field
        type="text"
        name="sekolah"
        className="form-control"
        placeholder="Masukan nama lengkap"
      />
      <ErrorMessage
        name="sekolah"
        render={errorMessage}
      />
    </div>
  </>
)

const post = async (values) => {
  // const navigate = useNavigate();
  console.log("oke")
  try {
    const result = await axios.post(
      "http://localhost:5000/api/users",
      values,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(result)
    // navigate()

  } catch (error) {
    console.log(error.message);
  }
}

const addUser = () => {
  const [isSiswa, setIsSiswa] = useState(false)
  const [isGuru, setIsGuru] = useState(false)


  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Users</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik initialValues={{
                nama: "",
                username: '',
                email: '',
                role: '',
                kelas: '',
                sekolah: '',
                password: '',
                confirmPassword: '',
              }}
                validationSchema={schema} validateOnChange={false} validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                  post(values)
                  console.log(values)
                  // navigate("/users", {
                  //   state: { message: "User Berhasil di buat!", status: "success" },
                  // });
                  setSubmitting(false);
                }}>

                {({ setFieldValue, values }) => (
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
                      <label htmlFor="" className="form-label fw-bold">
                        USERNAME
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Masukan username"
                      />

                      <ErrorMessage
                        name="username"
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

                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label fw-bold">
                        ROLE
                      </label>

                      <Field as="select" name="role"
                        onChange={e => {
                          setFieldValue('role', e.target.value);
                          // if (e.target.value === "SISWA") {
                          //   setIsSiswa(true)
                          // }
                          if (e.target.value == "SISWA") {
                            setIsSiswa(true)
                            setIsGuru(false)
                            console.log(e.target.value)
                          } else if (e.target.value == "GURU") {
                            setIsGuru(true)
                            setIsSiswa(false)
                          }
                          else {
                            setIsGuru(false)
                            setIsSiswa(false)
                          }
                          console.log(isSiswa)
                        }}
                      >
                        <option value="" key={"null"}>Select Role</option>
                        <option value="SISWA" key={"SISWA"}>SISWA</option>
                        <option value="GURU" key={"GURU"}>GURU</option>
                        <option value="UMUM" key={"UMUM"}>UMUM</option>
                      </Field>

                      <ErrorMessage name="role"
                        render={errorMessage} />
                    </div>

                    {isSiswa && <SiswaForm />}
                    {isGuru && <GuruForm />}

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
                )}

              </Formik>
            </section>
          </section>
        </section>
      </section >
      <Footer></Footer>
    </>
  );
};

export default addUser;
