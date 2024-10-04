import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import {
  getForumQuizByUserId,
  joinForumQuiz,
} from "../../../../lib/redux/api/rekapNilai";
import { useState } from "react";
import { getNewAccessToken } from "../../../../lib/redux/api/auth";
import Swal from "sweetalert2";

const ModalJoinQuiz = () => {
  const dispatch = useDispatch();
  const userID = getCookie("userID");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState();

  async function handleJoinForum() {
    const payload = {
      id_user: userID,
      token,
    };

    setIsLoading(true);
    const res = await dispatch(joinForumQuiz(payload));
    if (res.error) {
      if (res.error.message === "unauthorized") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return handleJoinForum();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Join Forum",
      });
    }
    setIsLoading(false);
    document.getElementById("showModalJoinQuiz").click();
    await dispatch(getForumQuizByUserId(userID));
  }
  return (
    <section>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="showModalJoinQuiz"
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Join Quiz
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Input Your Token"
                onChange={(e) => setToken(e.target.value)}
                onBlur={(e) => {
                  e.target.value = "";
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={isLoading}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleJoinForum}
                disabled={!token || isLoading}
              >
                Join Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalJoinQuiz;
