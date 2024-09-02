import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { forumQuizSchema } from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { editForumQuiz } from "../../../lib/redux/api/forumQuiz";
import { useEffect } from "react";
import { getAllDongeng } from "../../../lib/redux/api/dongeng";
import Swal from "sweetalert2";
import { getNewAccessToken } from "../../../lib/redux/api/auth";

function ModalLayout({ childern }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="showModalEditForum"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {childern}
      </div>
    </div>
  );
}

const EditForum = () => {
  return <ModalLayout childern={<ModalEditBody />} />;
};

const ModalEditBody = () => {
  const { id } = useParams();
  const { dongeng } = useSelector((state) => state.dongeng);
  const { forumQuiz } = useSelector((state) => state.forumQuiz);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleEditQuiz(values) {
    var res = await dispatch(editForumQuiz(values));
    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return handleEditQuiz(values);
      }
    }

    document.getElementById("showModalEditForum").click();
    Swal.fire("Success", "Forum Quiz has been updated", "success");
    navigate("/admin/forum-quiz");
  }

  useEffect(() => {
    async function getDongengs() {
      const res = await dispatch(getAllDongeng());
      if (res.error) {
        if (res.error.message === "401") {
          console.log("getting new access token");
          await dispatch(getNewAccessToken());
          return getDongengs();
        }
      }
    }

    getDongengs();
  }, []);
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Edit Forum {id}
          </h5>
        </div>
        <div className="modal-body">
          <Formik
            enableReinitialize
            initialValues={{
              id: forumQuiz[0]?.id,
              judul: forumQuiz[0]?.judul || "",
              idDongeng: forumQuiz[0]?.idDongeng || "",
              sekolah: forumQuiz[0]?.sekolah || "",
              access_date: forumQuiz[0]?.access_date || "",
              expired_date: forumQuiz[0]?.expired_date || "",
            }}
            validationSchema={forumQuizSchema}
            onSubmit={(values) => {
              handleEditQuiz(values);
            }}
          >
            <Form>
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
                  {dongeng.map((dongeng) => (
                    <option key={dongeng._id} value={dongeng._id}>
                      {dongeng.title}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="mb-3">
                <label htmlFor="sekolah" className="form-label">
                  Sekolah
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="sekolah"
                  name="sekolah"
                />
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
              </div>

              <button type="submit" className="d-none" id="submitEditForum">
                Submit
              </button>
            </Form>
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
              document.getElementById("submitEditForum").click();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForum;
