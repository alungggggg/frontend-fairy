import Header from "../template/header";
import Footer from "../template/footer";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate, useLocation } from "react-router-dom";

const addUser = () => {
    const navigate = useNavigate();

    const [namaMessage, setNamaMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')

    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        if (!validator.isByteLength(nama, { min: 4 })) {
            setNamaMessage(`Karakter Nama terlalu sedikit!`)
        }

        if (!validator.isEmail(email)) {
            setEmailMessage(`Email tidak valid!`)
        }

        if (!validator.isByteLength(password, { min: 8 })) {
            setPasswordMessage(`Minimal password harus berisi 8 karakter!`)
        }

        if (password != confirmPassword) {
            setConfirmPasswordMessage(`Password dan Confrim Password tidak sama!`)
        }

        try {
            const result = await axios.post("http://localhost:5000/api/users", { nama, email, password }, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            navigate('/users', { state: { message: 'User Berhasil di buat!', status: 'success' } });


        } catch (error) {
            if (error.response.data.email) {
                setEmailMessage(error.response.data.email)
            }
        }

    }

    return (
        <>
            <Header></Header>
            <form action="">
                <label htmlFor="">Nama</label>
                {namaMessage}
                <input type="text" value={nama} onChange={(e) => {
                    setNamaMessage("")
                    setNama(e.target.value)
                }} />

                <label htmlFor="">Email</label>
                {emailMessage}
                <input type="email" value={email} onChange={(e) => {
                    setEmailMessage("")
                    setEmail(e.target.value)
                }} />

                <label htmlFor="">Password</label>
                {passwordMessage}
                <input type="Password" value={password} onChange={(e) => {
                    setPasswordMessage('')
                    setPassword(e.target.value)
                }
                } />

                <label htmlFor="">Confirm Password</label>
                {confirmPasswordMessage}
                <input type="Password" value={confirmPassword} onChange={(e) => {
                    setConfirmPasswordMessage("")
                    setConfirmPassword(e.target.value)
                }} />

                <button type="submit" onClick={submit}>Submit</button>
            </form>
            <Footer></Footer>
        </>
    )
}

export default addUser;