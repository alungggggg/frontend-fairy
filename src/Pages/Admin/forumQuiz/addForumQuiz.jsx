import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDongeng } from "../../../lib/redux/api/dongeng";
import { forumQuizSchema } from "./modal";
import { addForumQuiz, getForumQuiz } from "../../../lib/redux/api/forumQuiz";
import Swal from "sweetalert2";

const AddForumQuiz = () => {
  const sekolah = ["Sekolah 1", "Sekolah 2", "Sekolah 3"];
  const dispatch = useDispatch();
  const { dongeng } = useSelector((state) => state.dongeng);
  useEffect(() => {
    dispatch(getAllDongeng());
  }, []);

  async function handleAddForumQuiz(values) {
    await dispatch(addForumQuiz(values));
    document.getElementById("showModalForumQuiz").click();
    Swal.fire("Success", "Forum Quiz has been added", "success");
    await dispatch(getForumQuiz());
  }
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Menambahkan Forum Quiz
          </h5>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              judul: "",
              idDongeng: "",
              sekolah: "",
              access_date: "",
              expired_date: "",
            }}
            validationSchema={forumQuizSchema}
            onSubmit={(values) => {
              handleAddForumQuiz(values);
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="judul" className="form-label">
                      Judul
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="judul"
                      name="judul"
                    />
                    {errors.judul && touched.judul ? (
                      <div className="text-danger">{errors.judul}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="idDongeng" className="form-label">
                      Topik
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="idDongeng"
                      name="idDongeng"
                    >
                      <option value="" disabled>
                        Pilih topik
                      </option>
                      {dongeng.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </Field>
                    {errors.idDongeng && touched.idDongeng ? (
                      <div className="text-danger">{errors.idDongeng}</div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="sekolah" className="form-label">
                      Sekolah
                    </label>
                    <Field
                      as="select"
                      className="form-select"
                      id="sekolah"
                      name="sekolah"
                    >
                      <option value="" disabled>
                        Pilih Sekolah
                      </option>
                      {sekolah.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                    {errors.sekolah && touched.sekolah ? (
                      <div className="text-danger">{errors.sekolah}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="access_date" className="form-label">
                      Access Date
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="access_date"
                      name="access_date"
                    />
                    {errors.access_date && touched.access_date ? (
                      <div className="text-danger">{errors.access_date}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expired_date" className="form-label">
                      Expired Date
                    </label>
                    <Field
                      type="date"
                      className="form-control"
                      id="expired_date"
                      name="expired_date"
                    />
                    {errors.expired_date && touched.expired_date ? (
                      <div className="text-danger">{errors.expired_date}</div>
                    ) : null}
                  </div>
                </div>
                <button
                  type="submit"
                  id="submitAddForumQuiz"
                  className="d-none"
                ></button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              document.getElementById("submitAddForumQuiz").click();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForumQuiz;
