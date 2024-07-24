import Template from "../template/template";
import { useState, useEffect } from "react";
import validator from 'validator';
import axios from "axios";

const register = () => {
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [namaMessage, setNamaMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')

    const submit = async () => {
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
            const result = await axios.post('http://localhost:5000/api/register',
                { nama, email, password, confirmPassword },
            )
            setEmailMessage(result.data.email.message)

        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Template content={(
            <>
                <label htmlFor="">{namaMessage}</label>
                <input type="text" value={nama} onChange={(e) => {
                    setNama(e.target.value)
                    setNamaMessage("")
                }} />

                <label htmlFor="">{emailMessage}</label>
                <input type="email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailMessage("")
                }} />

                <label htmlFor="">{passwordMessage}</label>
                <input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordMessage('')
                }} />

                <label htmlFor="">{confirmPasswordMessage}</label>
                <input type="password" value={confirmPassword} onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setConfirmPasswordMessage("")
                }} />
                <button type="submit" onClick={submit}>Daftar</button>
                <Footer></Footer>
            </>
        )}>
        </Template>
    )

}

export default register;