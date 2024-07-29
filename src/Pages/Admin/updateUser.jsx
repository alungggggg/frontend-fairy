import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateSchema, updateSchemaWithPassword } from "../../../validation/userValidate";
import errorMessage from "../../Component/errorMessage";

const submit = async (values, id, navigate) => {
    try {
        const result = await axios.patch(
            `http://localhost:5000/api/users/${id}`,
            { nama: values.nama, email: values.email, password: values.password },
            { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
        );
        navigate('/users', { state: { message: 'User Berhasil di Ubah!', status: 'success' } });
    } catch (error) {
        console.error("Error updating user:", error.message);
    }
};

const IsChangePass = () => (
    <>
        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" render={errorMessage} />
        <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
        <ErrorMessage name="confirmPassword" render={errorMessage} />
    </>
);

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isChangePass, setIsChangePass] = useState(false);
    const [validationSchema, setValidationSchema] = useState(updateSchema);

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                setUser(result.data);
            } catch (error) {
                console.log(error.message);
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

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={{ nama: user.nama, email: user.email, password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
                submit(values, id, navigate);
                setSubmitting(false);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <label htmlFor="nama">Nama</label>
                    <Field type="text" name="nama" />
                    <ErrorMessage name="nama" render={errorMessage} />

                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" disabled />
                    <ErrorMessage name="email" render={errorMessage} />

                    <input
                        type="checkbox"
                        onChange={() => {
                            setIsChangePass(!isChangePass);
                            if (!isChangePass) {
                                setFieldValue('password', '');
                                setFieldValue('confirmPassword', '');
                            } else {
                                setFieldValue('password', undefined);
                                setFieldValue('confirmPassword', undefined);
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
