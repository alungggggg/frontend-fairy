import { useState, useEffect } from "react";
import Header from "./template/header";
import Footer from "./template/footer";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import Template from "./template/template";

const post = async () => {
    try {
        const result = await axios.post("http://localhost:5000/api/register", {
            nama,
            email,
            password,
            confirmPassword,
        });
        setEmailMessage(result.data.email.message);
    } catch (err) {
        console.log(err.message);
    }
}

const schema = yup.object().shape({
    nama: yup.string().required().min(4),
    email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: yup.string()
        .required('Password wajib diisi')
        .min(8, 'Password minimal 8 karakter')
        .matches(/[a-zA-Z]/, 'Password harus mengandung huruf'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password dan Konfirmasi Password harus sama')
        .required('Konfirmasi Password wajib diisi')
});

const errorMessage = (message) => (
    <p className="validation-error-message">{message}</p>
);

const register = () => {


    return (

        <Formik
            initialValues={{ nama: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >

            <Form>
                <label htmlFor="" className="form-label fw-bold">
                    NAMA LENGKAP
                </label>
                <Field
                    type="text"
                    name="nama"
                />

                <ErrorMessage
                    // displays the validation error message for the 'email' field
                    name="nama"
                    render={errorMessage}
                />
                <label htmlFor="" className="form-label fw-bold">
                    ALAMAT EMAIL
                </label>
                <Field
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Masukan alamat email"
                />

                <ErrorMessage name="email" render={errorMessage} />

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
                    // displays the validation error message for the 'email' field
                    name="password"
                    render={errorMessage}
                />

                <label htmlFor="" className="form-label fw-bold">
                    ULANGI KATA SANDI
                </label>
                <Field
                    type="text"
                    name="confirmPassword"
                />
                <ErrorMessage
                    // displays the validation error message for the 'email' field
                    name="confirmPassword"
                    render={errorMessage}
                />

                <button
                    type="submit"
                    className="btn btn-orange py-2 text-white"
                >
                    Daftar
                </button>


            </Form>
        </Formik>
    );
};

export default register;
