import { Link } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";
import { Field, Form, Formik } from "formik";
import { beritaSchema } from "./addBerita";

const UpdateBerita = () => {
  return (
    <AdminLayout>
      <Link
        to={"../"}
        className="d-flex align-items-center gap-2 text-dark text-decoration-none"
      >
        <ArrowLeft />
        <p className="mb-0">Update Berita</p>
      </Link>
      <hr />
      <Formik
        enableReinitialize
        initialValues={{
          judul: "",
          gambar: "",
          deskripsi: "",
          create_at: "",
        }}
        validationSchema={beritaSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="judul" className="form-label">
                  Judul Berita
                </label>
                <Field
                  type="text"
                  name="judul"
                  className="form-control"
                  id="judul"
                  placeholder="Masukan Judul"
                />
                {errors.judul && touched.judul && (
                  <div className="text-danger">{errors.judul}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="gambar" className="form-label">
                  Gambar
                </label>
                <Field
                  type="file"
                  name="gambar"
                  className="form-control"
                  id="gambar"
                />
                {errors.gambar && touched.gambar && (
                  <div className="text-danger">{errors.gambar}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="deskripsi" className="form-label">
                  Deskripsi
                </label>
                <Field
                  as="textarea"
                  name="deskripsi"
                  className="form-control"
                  id="deskripsi"
                  placeholder="Masukan deskripsi"
                  rows="4"
                />
                {errors.deskripsi && touched.deskripsi && (
                  <div className="text-danger">{errors.deskripsi}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="create_at" className="form-label">
                  Tanggal Publish
                </label>
                <Field
                  type="date"
                  name="create_at"
                  className="form-control"
                  id="create_at"
                />
                {errors.create_at && touched.create_at && (
                  <div className="text-danger">{errors.create_at}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  );
};

export default UpdateBerita;
