import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";
import { Field, Form, Formik } from "formik";
import { beritaSchema } from "./addBerita";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isLocale } from "validator";
import Loading from "../../../Component/loading";
import { getNewsDatabyId, updateNewsData } from "../../../lib/redux/api/news";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const updateBeritaSchema = Yup.object().shape({
  judul: Yup.string().required("Judul wajib diisi"),
  deskripsi: Yup.string().required("Deskripsi wajib diisi"),
});

const UpdateBerita = () => {
  const [preview, setPreview] = useState(null);
  const { isLoading, data: dataBerita } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const idBerita = pathSplit[pathSplit.length - 1];

  async function handleUpdateDataBerita(data) {
    const res = await dispatch(updateNewsData(data));
    if (!res.error) {
      Swal.fire({
        title: "Update Success",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Delete Failed",
        icon: "error",
      });
    }
    navigate("/admin/berita");
  }

  useEffect(() => {
    async function handleGetDataBeritaById() {
      const res = await dispatch(getNewsDatabyId(idBerita));
      if (res.payload) {
        setPreview(import.meta.env.VITE_IMG_URL + "/" + res.payload.gambar);
      }
    }

    handleGetDataBeritaById();
  }, []);
  return (
    <AdminLayout>
      {isLoading ? (
        <section
          className="d-flex w-full align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <Loading />
        </section>
      ) : (
        <>
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
              id: dataBerita[0]?.id,
              judul: dataBerita[0]?.judul,
              gambar: "",
              deskripsi: dataBerita[0]?.description,
            }}
            validationSchema={updateBeritaSchema}
            onSubmit={(values) => {
              console.log(values);
              handleUpdateDataBerita(values);
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
                  <button
                    type="submit"
                    className={`btn btn-primary mt-4 ${
                      isLoading ? "btn-disabled" : ""
                    }`}
                    disabled={isLoading}
                  >
                    submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </AdminLayout>
  );
};

export default UpdateBerita;
