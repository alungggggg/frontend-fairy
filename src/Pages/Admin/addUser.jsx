import Header from "../template/header";
import Footer from "../template/footer";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate, useLocation } from "react-router-dom";

const addUser = () => {
  const navigate = useNavigate();

  const [namaMessage, setNamaMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!validator.isByteLength(nama, { min: 4 })) {
      setNamaMessage(`Karakter Nama terlalu sedikit!`);
    }

    if (!validator.isEmail(email)) {
      setEmailMessage(`Email tidak valid!`);
    }

    if (!validator.isByteLength(password, { min: 8 })) {
      setPasswordMessage(`Minimal password harus berisi 8 karakter!`);
    }

    if (password != confirmPassword) {
      setConfirmPasswordMessage(`Password dan Confrim Password tidak sama!`);
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/users",
        { nama, email, password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/users", {
        state: { message: "User Berhasil di buat!", status: "success" },
      });
    } catch (error) {
      if (error.response.data.email) {
        setEmailMessage(error.response.data.email);
      }
    }
  };

  return (
    <>
      <Header></Header>
      <section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
        <section className="col-lg-5">
          <h2 className="text-blue mt-4 mt-md-0">Add Users</h2>
          <section className="card mt-2 shadow">
            <section className="card-body p-4">
              <form>
                <section className="form-group mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    {namaMessage}NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value);
                      setNamaMessage("");
                    }}
                    className="form-control"
                    placeholder="Masukan nama lengkap"
                  />
                </section>
                <section className="form-group mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    {emailMessage}ALAMAT EMAIL
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailMessage("");
                    }}
                    className="form-control"
                    placeholder="Masukan alamat email"
                  />
                </section>
                <section className="form-group mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    {passwordMessage}KATA SANDI
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordMessage("");
                    }}
                    className="form-control"
                    placeholder="Masukan kata sandi"
                  />
                </section>
                <section className="form-group mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    {confirmPasswordMessage}ULANGI KATA SANDI
                  </label>
                  <input
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordMessage("");
                    }}
                    className="form-control"
                    placeholder="Masukan ulang kata sandi"
                  />
                </section>
                <section className="form-group ">
                  <button
                    type="submit"
                    onClick={submit}
                    className="btn btn-orange py-2 text-white float-left"
                  >
                    Submit
                  </button>
                  <a
                    href="/users"
                    className="btn btn-secondary py-2 text-white float-right"
                  >
                    Back
                  </a>
                </section>
              </form>
            </section>
          </section>
        </section>
      </section>
      <Footer></Footer>
    </>
  );
};

export default addUser;
