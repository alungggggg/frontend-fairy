import Header from "../template/header";
import Footer from "../template/footer";
import Template from "../template/template";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      const result = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Template content={(<section className="row justify-content-center pt-2 pt-md-5 p-3 p-md-0 login">
      <section className="col-lg-5">
        <h2 className="text-blue mt-4 mt-md-0">Masuk</h2>
        {message}
        <section className="card mt-2 shadow">
          <section className="card-body p-4">
            <form action="">
              <section className="form-group">
                <label className="form-label fw-bold">ALAMAT EMAIL</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Masukan alamat email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </section>
              <section className="form-group my-4">
                <section>
                  <label className="form-label fw-bold float-start">
                    KATA SANDI
                  </label>
                  <label className="form-label float-end">
                    <a href="#" className="text-blue text-decoration-none">
                      LUPA KATA SANDI?
                    </a>
                  </label>
                </section>
                <section className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Masukan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </section>
              </section>
              <section className="form-group d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-orange py-2 text-white"
                  onClick={submit}
                >
                  Masuk
                </button>
              </section>
              <section className="form-group text-center mt-4">
                <section className="my-2">Atau</section>
                <p className="mb-0">
                  Belum punya akun?
                  <a href="#" className="text-decoration-none text-blue">
                    Daftar disini
                  </a>
                </p>
                <p className="mb-0">
                  Lupa kata sandi?
                  <a href="#" className="text-decoration-none text-blue">
                    Klik disini
                  </a>
                </p>
              </section>
            </form>
          </section>
        </section>
      </section>
    </section>)}></Template>
  );
};

export default login;
