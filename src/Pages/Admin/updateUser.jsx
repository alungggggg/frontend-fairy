import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import validator from "validator"
import axios from "axios"

const updateUser = () => {

    useEffect(() => {
        getUser()
    }, [])

    const navigate = useNavigate()
    const { id } = useParams()

    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')

    const [msgNama, setMsgNama] = useState('')
    const [msgEmail, setMsgEmail] = useState('')

    const getUser = async () => {
        const result = await axios.get(`http://localhost:5000/api/users/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        setNama(result.data.nama)
        setEmail(result.data.email)
        console.log('p')
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!validator.isByteLength(nama, { min: 4 })) {
            setMsgNama(`Karakter Nama terlalu sedikit!`)
        }

        const result = await axios.patch(`http://localhost:5000/api/users/${id}`, { nama, email }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        navigate('/users', { state: { message: 'User Berhasil di Ubah!', status: 'success' } });
    }





    return (
        <>
            <form action="">
                <label htmlFor="">
                    nama
                </label>
                <input type="text" value={nama} onChange={(e) => {
                    setNama(e.target.value)
                    setMsgNama("")
                }} />

                <label htmlFor="">
                    email
                </label>
                <input type="email" value={email} disabled />
                <button type="submit" onClick={submit}>submit</button>
            </form>
        </>
    )
}

export default updateUser;