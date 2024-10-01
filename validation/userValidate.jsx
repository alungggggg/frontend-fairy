import * as yup from "yup";
import fairyApi from "../src/lib/axios/index.js";

export const defaultSchema = yup.object().shape({
  nama: yup.string().required().min(4),
  username: yup
    .string()
    .required()
    .min(4)
    .test("Unique", "Username sudah terdaftar", async (value) => {
      const nunique = await fairyApi.get(
        `auth/alreadyexist/username?search=${value}`
      );
      // console.log(nunique);
      return nunique.data.isAvailable;
    }),
  email: yup
    .string()
    .email("Email tidak valid")
    .required("Email wajib diisi")
    .test("Unique", "Email sudah terdaftar", async (value) => {
      const nunique = await fairyApi.get(
        `/auth/alreadyexist/email?search=${value}`
      );
      console.log(nunique);
      return nunique.data.isAvailable;
    }),
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
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password dan Konfirmasi Password harus sama"
    )
    .required("Konfirmasi Password wajib diisi"),
});

export const updateSchema = () =>
  yup.object().shape({
    nama: yup
      .string()
      .required("Nama wajib diisi")
      .min(4, "Nama minimal 4 karakter"),
    email: yup
      .string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
  });

export const updateSchemaWithPassword = () =>
  yup.object().shape({
    nama: yup.string().required().min(4),
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
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password dan Konfirmasi Password harus sama"
      )
      .required("Konfirmasi Password wajib diisi"),
  });

export default defaultSchema;
