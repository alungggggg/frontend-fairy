import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const post = async ({ title, pdf }) => {

    try {
        const response = axios.post("http://localhost:5000/api/dongeng", {
            title, file: pdf
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `multipart/form-data`,
            },
        })
        return response

    } catch (error) {
        console.log(error.message);
    }
    // console.log("p")
}
const schema = Yup.object({
    title: Yup
        .string()
        .required('Title is required')
        .min(1, 'Title must be at least 1 character')
        .max(100, 'Title must be at most 100 characters')
        .matches(/^[a-zA-Z0-9 ]*$/, 'Title must be alphanumeric'),
    pdf: Yup
        .mixed()
        .required('PDF file is required')
        .test('fileType', 'File must be a PDF', value => {
            return value && value.type === 'application/pdf';
        })
        .test('fileExtension', 'File must have a .pdf extension', value => {
            return value && value.name.toString().toLowerCase().endsWith('.pdf');
        })

});

const addDongeng = () => {

    return (
        <Formik
            initialValues={{ pdf: null }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                post(values).then((response) => { console.log(response); })

            }}
        >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
                <Form>
                    <div>
                        <input type="text" name="title" onChange={(event) => {
                            setFieldValue('title', event.target.value);
                        }} />
                        {errors.title ? (
                            <div>{errors.title}</div>
                        ) : null}
                    </div>

                    <div>
                        <input
                            type="file"
                            name="pdf"
                            onChange={(event) => {
                                setFieldValue('pdf', event.target.files[0]);
                                console.log(event.target.files[0]);

                            }}
                        />
                        {errors.pdf && touched.pdf ? (
                            <div>{errors.pdf}</div>
                        ) : null}
                    </div>


                    <button type="submit" >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default addDongeng;
