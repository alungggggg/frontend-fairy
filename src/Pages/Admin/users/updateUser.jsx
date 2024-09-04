import { useNavigate, useParams } from "react-router-dom";
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

const SiswaForm = () => (
  <>
    <label htmlFor="kelas">kelas</label>
    <Field type="text" name="kelas" />
    <ErrorMessage name="kelas" render={errorMessage} />

    <label htmlFor="sekolah">sekolah</label>
    <Field type="text" name="sekolah" />
    <ErrorMessage name="sekolah" render={errorMessage} />
  </>
);

const GuruForm = () => (
  <>
    <label htmlFor="sekolah">sekolah</label>
    <Field type="text" name="sekolah" />
    <ErrorMessage name="sekolah" render={errorMessage} />
  </>
);

const IsChangePass = () => (
  <>
    <Field name="password" type="password" placeholder="Password" />
    <ErrorMessage name="password" render={errorMessage} />
    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
    />
    <ErrorMessage name="confirmPassword" render={errorMessage} />
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
      {({ values, setFieldValue }) => (
        <Form>
          <label htmlFor="nama">Nama</label>
          <Field type="text" name="nama" />
          <ErrorMessage name="nama" render={errorMessage} />

          <label htmlFor="username">username</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" render={errorMessage} />

          <label htmlFor="email">Email</label>
          <Field type="email" name="email" disabled />
          <ErrorMessage name="email" render={errorMessage} />

          <label htmlFor="role">role</label>
          <Field
            as="select"
            name="role"
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

          {isSiswa && <SiswaForm />}
          {isGuru && <GuruForm />}

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

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateUser;
