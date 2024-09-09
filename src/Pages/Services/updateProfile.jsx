import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorMessage from "../../Component/errorMessage";
import axios from "axios";
import fairyApi from "../../lib/axios";
import { getCookies } from "cookies-next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewAccessToken } from "../../lib/redux/api/auth";
import { getUserById } from "../../lib/redux/api/users";
import UserLayout from "./Component/userLayout";

const schema = Yup.object().shape({
  nama: Yup.string()
    .required("Nama harus diisi")
    .min(3, "Nama harus memiliki minimal 3 karakter")
    .max(50, "Nama tidak boleh lebih dari 50 karakter"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  kelas: Yup.string().matches(
    /^\d+[A-Z]?$/,
    "Kelas harus berupa angka, dan bisa diikuti oleh huruf besar (opsional)"
  ),
  sekolah: Yup.string()
    .min(3, "Nama sekolah harus memiliki minimal 3 karakter")
    .max(100, "Nama sekolah tidak boleh lebih dari 100 karakter"),
});

// const result = await axios.post(
//     "http://localhost:5000/api/users",
//     { nama, email, password },
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }
//   );

const submit = async (values, token, Navigate) => {
  try {
    // api/profile/update
    const p = await axios.post(
      `http://localhost:5000/api/profile/update/${token}`,
      values
    );
    if (p.status == 200) {
      Navigate("/profile");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const updateProfile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = getCookies("userID");
  const { user: data } = useSelector((state) => state.user);

  useEffect(() => {
    const getProfile = async () => {
      const result = await dispatch(getUserById(userID));
      if (result.error) {
        if (result.error.message === "401") {
          console.log("get new access token");
          await dispatch(getNewAccessToken());
          return getProfile();
        }
      }
    };
    getProfile();
  }, []);

  return (
    <UserLayout>
      <Formik
        enableReinitialize
        initialValues={{
          nama: data.nama || "",
          username: data.username || "",
          email: data.email || "",
          kelas: data.kelas || "",
          sekolah: data.sekolah || "",
        }}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, errors }) => {
          submit(values, token, Navigate);
        }}
      >
        <Form>
          <Field name="nama" type="text" placeholder="Name" />
          <ErrorMessage name="nama" render={errorMessage} />

          <Field name="username" type="text" placeholder="username" />
          <ErrorMessage name="username" render={errorMessage} />

          <Field name="email" type="text" placeholder="email" />
          <ErrorMessage name="email" renders={errorMessage} />

          {data.role == "SISWA" ? (
            <>
              <Field name="kelas" type="text" placeholder="kelas" />
              <ErrorMessage name="kelas" render={errorMessage} />
              <Field name="sekolah" type="text" placeholder="sekolah" />
              <ErrorMessage name="sekolah" render={errorMessage} />
            </>
          ) : (
            ""
          )}

          <button type="submit">submit</button>
        </Form>
      </Formik>
    </UserLayout>
  );
};

export default updateProfile;
