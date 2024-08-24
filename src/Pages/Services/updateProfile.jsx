import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import errorMessage from "../../Component/errorMessage"
import fairyApi from "../../lib/axios"
import { getCookies } from "cookies-next"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const updateProfile = () => {
    const Navigate = useNavigate()
    const { token } = getCookies("token");
    const [data, setData] = useState([])

    useEffect(() => {
        if (!token) {
            Navigate("/");
        }
        const getProfile = async () => {
            const result = await fairyApi.get("/profile/" + token)
            setData(result.data)
        }
        getProfile()
    }, [])

    const schema = Yup.object().shape({
        nama: Yup
            .string()
            .required('Nama harus diisi')
            .min(3, 'Nama harus memiliki minimal 3 karakter')
            .max(50, 'Nama tidak boleh lebih dari 50 karakter'),
        email: Yup
            .string()
            .email('Email tidak valid')
            .required('Email harus diisi'),
        kelas: Yup
            .string()
            .required('Kelas harus diisi')
            .matches(/^\d+[A-Z]?$/, 'Kelas harus berupa angka, dan bisa diikuti oleh huruf besar (opsional)'),
        sekolah: Yup
            .string()
            .required('Sekolah harus diisi')
            .min(3, 'Nama sekolah harus memiliki minimal 3 karakter')
            .max(100, 'Nama sekolah tidak boleh lebih dari 100 karakter'),
    });


    return (
        <>

            <Formik
                enableReinitialize
                initialValues={{
                    nama: data.nama || "",
                    username: data.username || "",
                    email: data.email || "",
                    kelas: data.kelas || "",
                    sekolah: data.sekolah || "",
                }}
                validationSchema={schema} validateOnChange={false} validateOnBlur={false}
                onSubmit={(values, { setSubmitting, errors }) => {
                    console.log(values)

                }}>
                <Form>
                    <Field name="nama" type="text" placeholder="Name" />
                    <ErrorMessage name="nama" render={errorMessage} />

                    <Field name="username" type="text" placeholder="username" />
                    <ErrorMessage name="username" render={errorMessage} />

                    <Field name="email" type="text" placeholder="email" />
                    <ErrorMessage name="email" renders={errorMessage} />

                    <Field name="kelas" type="text" placeholder="kelas" />
                    <ErrorMessage name="kelas" render={errorMessage} />

                    <Field name="sekolah" type="text" placeholder="sekolah" />
                    <ErrorMessage name="sekolah" render={errorMessage} />
                    <button type="submit">submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default updateProfile