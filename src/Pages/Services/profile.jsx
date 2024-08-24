import { getCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fairyApi from "../../lib/axios";
const profile = () => {
    const Navigate = useNavigate()
    const { token } = getCookies("token");
    const [data, setData] = useState([])

    useEffect(() => {
        if (!token) {
            Navigate("/");
        }
    }, [])
    useEffect(() => {
        const getProfile = async () => {
            const result = await fairyApi.get("/profile/" + token)
            setData(result.data)
        }
        getProfile()
    }, [])
    console.log(token)

    return (
        <>
            nama : {data.nama} <br />
            username : {data?.username} <br />
            email : {data?.email} <br />
            role : {data.role} <br />

            {(data.role == "SISWA") ? (
                <>
                    Kelas : {data?.kelas} <br />
                    sekolah : {data?.sekolah} <br />
                </>
            ) : ""}

            <a href="/profile/update">update Profile</a>
        </>
    )
}
export default profile