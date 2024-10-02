import Header from "../../template/header";
import Footer from "../../template/footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import schema from "../../../../validation/userValidate";
import errorMessage from "../../../Component/errorMessage";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "../adminLayout";
import { useDispatch } from "react-redux";
import { addUsers } from "../../../lib/redux/api/userAdmin";
import Swal from "sweetalert2";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import { listSekolah } from "../../../lib/listSekolah";

const SiswaForm = () => (
  <>
    <div className="form-group mb-3">
      <label htmlFor="sekolah" className="form-label">
        SEKOLAH
      </label>
      <Field as="select" className="form-select" id="sekolah" name="sekolah">
        <option value="" disabled>
          Pilih Sekolah
        </option>
        {listSekolah.map((item, i) => (
          <option key={i} value={item.nama}>
            {item.nama}
          </option>
        ))}
      </Field>
      <ErrorMessage name="sekolah" render={errorMessage} />
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
      <ErrorMessage name="kelas" render={errorMessage} />
    </div>
  </>
);

const GuruForm = () => (
  <>
    <div className="form-group mb-3">
      <label htmlFor="sekolah" className="form-label">
        SEKOLAH
      </label>
      <Field as="select" className="form-select" id="sekolah" name="sekolah">
        <option value="" disabled>
          Pilih Sekolah
        </option>
        {listSekolah.map((item, i) => (
          <option key={i} value={item.nama}>
            {item.nama}
          </option>
        ))}
      </Field>
      <ErrorMessage name="sekolah" render={errorMessage} />
    </div>
  </>
);

const addUser = () => {
  const [isSiswa, setIsSiswa] = useState(false);
  const [isGuru, setIsGuru] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = async (values) => {
    // const navigate = useNavigate();
    const res = await dispatch(addUsers(values));
    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return post(values);
      }
    }

    if (!res.error) {
      Swal.fire({
        icon: "success",
        title: "User Berhasil di buat!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "User gagal di buat!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    navigate("../");
  };

  return (
    <AdminLayout>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Users</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <Formik
                initialValues={{
                  nama: "",
                  username: "",
                  email: "",
                  role: "",
                  kelas: "",
                  sekolah: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                  post(values);
                  console.log(values);
                  // navigate("/users", {
                  //   state: { message: "User Berhasil di buat!", status: "success" },
                  // });
                  setSubmitting(false);
                }}
              >
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

                      <ErrorMessage name="nama" render={errorMessage} />
                      <label htmlFor="" className="form-label fw-bold">
                        USERNAME
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Masukan username"
                      />

                      <ErrorMessage name="username" render={errorMessage} />
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

                      <ErrorMessage name="email" render={errorMessage} />
                    </section>

                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label fw-bold">
                        ROLE
                      </label>

                      <Field
                        as="select"
                        name="role"
                        className="form-select"
                        onChange={(e) => {
                          setFieldValue("role", e.target.value);
                          // if (e.target.value === "SISWA") {
                          //   setIsSiswa(true)
                          // }
                          if (e.target.value == "SISWA") {
                            setIsSiswa(true);
                            setIsGuru(false);
                            console.log(e.target.value);
                          } else if (e.target.value == "GURU") {
                            setIsGuru(true);
                            setIsSiswa(false);
                          } else {
                            setIsGuru(false);
                            setIsSiswa(false);
                          }
                          console.log(isSiswa);
                        }}
                      >
                        <option value="" key={"null"}>
                          Select Role
                        </option>
                        <option value="SISWA" key={"SISWA"}>
                          SISWA
                        </option>
                        <option value="GURU" key={"GURU"}>
                          GURU
                        </option>
                        <option value="UMUM" key={"UMUM"}>
                          UMUM
                        </option>
                      </Field>

                      <ErrorMessage name="role" render={errorMessage} />
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

                      <ErrorMessage name="password" render={errorMessage} />
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
                      <Link
                        to={"../"}
                        className="btn btn-secondary py-2 text-white float-right"
                      >
                        Back
                      </Link>
                    </section>
                  </Form>
                )}
              </Formik>
            </section>
          </section>
        </section>
      </section>
    </AdminLayout>
  );
};

export default addUser;
