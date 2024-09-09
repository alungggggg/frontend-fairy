import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  updateSchema,
  updateSchemaWithPassword,
} from "../../../../validation/userValidate";

import errorMessage from "../../../Component/errorMessage";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById, updateUser } from "../../../lib/redux/api/userAdmin";
import { getNewAccessToken } from "../../../lib/redux/api/auth";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";

const SiswaForm = () => (
  <>
    <section className="form-group my-4">
      <label className="form-label fw-bold" htmlFor="kelas">
        KELAS
      </label>
      <section className="input-group">
        <Field
          name="kelas"
          type="text"
          className="form-control"
          placeholder="Masukan Kelas"
        />
      </section>
      <ErrorMessage name="kelas" render={errorMessage} />
    </section>

    <section className="form-group my-4">
      <label className="form-label fw-bold" htmlFor="sekolah">
        SEKOLAH
      </label>
      <section className="input-group">
        <Field
          name="sekolah"
          type="text"
          className="form-control"
          placeholder="Masukan Sekolah"
        />
      </section>
      <ErrorMessage name="sekolah" render={errorMessage} />
    </section>
  </>
);

const GuruForm = () => (
  <>
    <section className="form-group my-4">
      <label className="form-label fw-bold" htmlFor="sekolah">
        SEKOLAH
      </label>
      <section className="input-group">
        <Field
          name="sekolah"
          type="text"
          className="form-control"
          placeholder="Masukan Sekolah"
        />
      </section>
      <ErrorMessage name="sekolah" render={errorMessage} />
    </section>
  </>
);

const IsChangePass = () => (
  <>
    <section className="form-group my-4">
      <label className="form-label fw-bold">PASSWORD</label>
      <section className="input-group">
        <Field
          name="password"
          type="password"
          className="form-control"
          placeholder="Masukan Kata Sandi"
        />
      </section>
      <ErrorMessage name="password" render={errorMessage} />
    </section>
    <section className="form-group my-4">
      <label className="form-label fw-bold">KELAS</label>
      <section className="input-group">
        <Field
          name="confirmPassword"
          type="password"
          className="form-control"
          placeholder="Masukan Ulang Kata Sandi"
        />
      </section>
      <ErrorMessage name="confirmPassword" render={errorMessage} />
    </section>
  </>
);

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.usersAdmin.users[0]);
  const [isChangePass, setIsChangePass] = useState(false);
  const [validationSchema, setValidationSchema] = useState(updateSchema);

  const [isSiswa, setIsSiswa] = useState(false);
  const [isGuru, setIsGuru] = useState(false);

  const dispatch = useDispatch();

  const submit = async (values) => {
    async function updateUsers() {
      const res = await dispatch(updateUser(values));
      if (res.error) {
        if (res.error.message === "401") {
          console.log("getting new access token");
          await dispatch(getNewAccessToken());
          return updateUsers();
        }
      }
    }

    updateUsers();
    navigate("/admin/users");
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await dispatch(getUsersById(id));
      if (res.error) {
        if (res.error.message === "401") {
          console.log("getting new access token");
          await dispatch(getNewAccessToken());
          return getUser();
        }
      }
    };

    getUser();
  }, [id]);

  useEffect(() => {
    // Update schema validation when checkbox changes
    if (isChangePass) {
      setValidationSchema(updateSchemaWithPassword);
    } else {
      setValidationSchema(updateSchema);
    }
  }, [isChangePass]);

  useEffect(() => {
    if (user) {
      if (user.role === "SISWA") {
        setIsSiswa(true);
        setIsGuru(false);
      } else if (user.role === "GURU") {
        setIsGuru(true);
        setIsSiswa(false);
      } else {
        setIsGuru(false);
        setIsSiswa(false);
      }
    }
  }, [user]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <section>
        <div className="d-flex justify-content-between align-items-center p-0">
          <Link
            to={"/admin/users"}
            className={
              "d-flex align-items-center  gap-2 text-decoration-none fs-5 text-black "
            }
          >
            <ArrowLeft size={24} /> Back To Users
          </Link>
        </div>
        <div className="container">
          <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0">
            <section className="col-lg-5">
              <h2 className="text-blue mt-4 mt-md-0">Update</h2>
              <section className="card mt-2 shadow">
                <section className="card-body p-4">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      id: user.id,
                      nama: user.nama,
                      email: user.email,
                      username: user.username || "",
                      kelas: user.kelas || "",
                      sekolah: user.sekolah || "",
                      role: user.role,
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, { setSubmitting }) => {
                      submit(values, id, navigate);
                      // submit(values)
                      setSubmitting(false);
                    }}
                  >
                    <Form>
                      <section className="form-group">
                        <label className="form-label fw-bold">NAMA</label>
                        <Field
                          type="text"
                          name="nama"
                          className="form-control"
                          placeholder="Masukan Nama"
                        />
                        <ErrorMessage name="nama" render={errorMessage} />
                      </section>
                      <section className="form-group my-4">
                        <label className="form-label fw-bold">USERNAME</label>
                        <section className="input-group">
                          <Field
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="Masukan Username"
                          />
                        </section>
                        <ErrorMessage name="username" render={errorMessage} />
                      </section>
                      <section className="form-group my-4">
                        <label className="form-label fw-bold">EMAIL</label>
                        <section className="input-group">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Masukan Email"
                          />
                        </section>
                        <ErrorMessage name="email" render={errorMessage} />
                      </section>
                      <section className="form-group my-4">
                        <label className="form-label fw-bold">ROLE</label>

                        <Field
                          as="select"
                          name="role"
                          className="form-select"
                          onChange={(e) => {
                            setFieldValue("role", e.target.value);
                            if (e.target.value === "SISWA") {
                              setIsSiswa(true);
                              setIsGuru(false);
                            } else if (e.target.value === "GURU") {
                              setIsGuru(true);
                              setIsSiswa(false);
                            } else {
                              setIsGuru(false);
                              setIsSiswa(false);
                            }
                          }}
                        >
                          <option value="SISWA">SISWA</option>
                          <option value="GURU">GURU</option>
                          <option value="UMUM">UMUM</option>
                        </Field>
                        <ErrorMessage name="role" render={errorMessage} />
                      </section>
                      {isSiswa && <SiswaForm />}
                      {isGuru && <GuruForm />}

                      <label className="form-label fw-bold me-2">
                        GANTI KATA SANDI
                      </label>
                      <input
                        type="checkbox"
                        onChange={() => {
                          setIsChangePass(!isChangePass);
                          if (!isChangePass) {
                            setFieldValue("password", "");
                            setFieldValue("confirmPassword", "");
                          } else {
                            setFieldValue("password", undefined);
                            setFieldValue("confirmPassword", undefined);
                          }
                        }}
                        checked={isChangePass}
                      />

                      {isChangePass && <IsChangePass />}

                      <section className="form-group d-grid gap-2 mt-3">
                        <button
                          type="submit"
                          className="btn btn-orange py-2 text-white"
                        >
                          Update
                        </button>
                      </section>
                    </Form>
                  </Formik>
                </section>
              </section>
            </section>
          </section>
          {/*  */}
        </div>
      </section>
    </AdminLayout>
  );
};

export default UpdateUser;
