import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const post = async ({ title, pdf }, id) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    if (pdf) {
      formData.append("file", pdf);
    }

    const response = await axios.patch(
      `http://localhost:5000/api/dongeng/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const schema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(100, "Title must be at most 100 characters")
    .matches(/^[a-zA-Z0-9 ]*$/, "Title must be alphanumeric"),
  pdf: Yup.mixed()
    .nullable() // Allow null values
    .test("fileType", "File must be a PDF", (value) => {
      if (!value) return true; // Allow no file
      return value.type === "application/pdf";
    })
    .test("fileExtension", "File must have a .pdf extension", (value) => {
      if (!value) return true; // Allow no file
      return value.name.toString().toLowerCase().endsWith(".pdf");
    }),
});

const UpdateDongeng = () => {
  const [dongeng, setDongeng] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDongeng = async () => {
      try {
        const raw = await axios.get(`http://localhost:5000/api/dongeng/${id}`);
        setDongeng(raw.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDongeng();
  }, [id]);

  if (!dongeng) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{ pdf: null, title: dongeng.title }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          const response = await post(values, id);
          console.log(response);
        } catch (error) {
          console.log("Failed to update dongeng:", error.message);
        }
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, errors, touched, isSubmitting }) => (
        <Form>
          <div>
            <Field type="text" name="title" />
            {errors.title && touched.title ? <div>{errors.title}</div> : null}
          </div>

          <div>
            <input
              type="file"
              name="pdf"
              onChange={(event) => {
                setFieldValue("pdf", event.target.files[0]);
              }}
            />
            {errors.pdf && touched.pdf ? <div>{errors.pdf}</div> : null}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateDongeng;
