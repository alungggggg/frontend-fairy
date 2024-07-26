import { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";
import Template from "../template/template";
import Template from "../template/template";

const register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [namaMessage, setNamaMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const submit = async () => {
    if (!validator.isByteLength(nama, { min: 4 })) {
      setNamaMessage("Karakter Nama terlalu sedikit!");
    }

    if (!validator.isEmail(email)) {
      setEmailMessage("Email tidak valid!");
    }

    if (!validator.isByteLength(password, { min: 8 })) {
      setPasswordMessage("Minimal password harus berisi 8 karakter!");
    }

    if (password != confirmPassword) {
      setConfirmPasswordMessage("Password dan Confrim Password tidak sama!");
    }

    try {
      const result = await axios.post("http://localhost:5000/api/register", {
        nama,
        email,
        password,
        confirmPassword,
      });
      setEmailMessage(result.data.email.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Template content={<section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 register">
      <section className="col-lg-5">
        <h2 className="text-blue mt-4 mt-md-0">Registrasi</h2>
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
              <section className="form-group d-grid gap-2">
                <button
                  type="submit"
                  onClick={submit}
                  className="btn btn-orange py-2 text-white"
                >
                  Daftar
                </button>
              </section>
            </form>
            <section className="form-group text-center mt-4">
              <p>
                Sudah punya akun?
                <a href="/login" className="text-decoration-none text-blue">
                  Masuk disini
                </a>
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>}></Template>
    // <>

    //   <Header></Header>

    //   <Footer></Footer>
    // </>
  );
};

export default register;
