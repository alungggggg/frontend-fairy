import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";
import { useDispatch, useSelector } from "react-redux";
import { addNewsData } from "../../../lib/redux/api/news";
import Loading from "../../../Component/loading";
import Swal from "sweetalert2";

export const beritaSchema = Yup.object().shape({
  judul: Yup.string().required("Judul wajib diisi"),
  gambar: Yup.mixed()
    .required("Gambar wajib diupload")
    .test("fileFormat", "Format gambar harus JPG, PNG, atau WebP", (file) => {
      if (!file) return false; // Jika file tidak ada, return false
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }),
  deskripsi: Yup.string().required("Deskripsi wajib diisi"),
});

const AddBerita = () => {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.news);
  const navigate = useNavigate();

  async function addDataBerita(data) {
    const res = await dispatch(addNewsData(data));
    if(!res.error){
      Swal.fire({
        title: "Add Success",
        icon: "success",
      });
    }else{
      Swal.fire({
        title: "Delete Failed",
        icon: "error",
      });
    }
    navigate("/admin/berita")
  }
  return (
    <AdminLayout>
      <Link
        to={"../"}
        className="d-flex align-items-center gap-2 text-dark text-decoration-none"
      >
        <ArrowLeft />
        <p className="mb-0">Tambah Berita</p>
      </Link>
      <hr />
      <Formik
        enableReinitialize
        initialValues={{
          judul: "",
          gambar: null,
          deskripsi: "",
        }}
        validationSchema={beritaSchema}
        onSubmit={(values) => {
          addDataBerita(values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="row">
            <div className="col">
              {/* Input Judul */}
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

              {/* Input Gambar */}
              <div className="mb-3">
                <label htmlFor="gambar" className="form-label">
                  Gambar
                </label>
                <input
                  type="file"
                  name="gambar"
                  className="form-control"
                  id="gambar"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("gambar", file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                {errors.gambar && touched.gambar && (
                  <div className="text-danger">{errors.gambar}</div>
                )}
              </div>

              {/* Preview Gambar */}
              {preview && (
                <div className="mb-3">
                  <p>Preview Gambar:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-thumbnail"
                    width="200"
                  />
                </div>
              )}

              {/* Input Deskripsi */}
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

              {/* Tombol Submit */}
              <button type="submit" className={`btn btn-primary mt-4 ${isLoading ? "btn-disabled" : ""}`} disabled={isLoading}>
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AdminLayout>
  );
};

export default AddBerita;
