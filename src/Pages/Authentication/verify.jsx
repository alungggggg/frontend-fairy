import { useLocation, useNavigate, useParams } from "react-router-dom";
import fairyApi from "../../lib/axios";
import Swal from "sweetalert2";

const verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const verified = async (token) => {
    const res = await fairyApi.get(`/account/verify/${token}`);
    if (res.status == 200) {
      Swal.fire({
        title: "Verifikasi Berhasil",
        icon: "success",
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Verifikasi Gagal",
        icon: "error",
      });
    }
  };

  return (
    <section
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <p>Klik untuk mengverifikasi akun anda !</p>
        <button className="btn btn-primary" onClick={() => verified(token)}>
          Verify
        </button>
      </div>
    </section>
  );
};

export default verify;
