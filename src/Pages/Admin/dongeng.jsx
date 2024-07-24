import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const dongeng = () => {
    const navigate = useNavigate()
    const [dongengs, setDongeng] = useState([])

    const getDongeng = async () => {

        const result = await axios.get("http://localhost:5000/api/dongeng")
        setDongeng(result.data)
    }

    const deleteDongeng = async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/dongeng/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        console.log(result)

    }

    const updateDongeng = async (key) => {
        navigate(`/dongeng/update/${key}`)
    }

    useEffect(() => {
        getDongeng()
    }, [])
    return (
        <>
            <Header></Header>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Cover</th>
                        <th>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dongengs.map((dongeng, index) => (
                        <tr key={dongeng.id}>
                            <td>{index + 1}</td>
                            <td>{dongeng.title}</td>
                            <td>Cover</td>
                            <td>
                                {/* () => deleteUser(user.id) */}
                                <button onClick={() => deleteDongeng(dongeng.id)}>Delete</button>|
                                <button onClick={() => updateDongeng(dongeng.id)}>Update</button>|
                                <button>Preview</button>|
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <Footer></Footer>
        </>

    )
}

export default dongeng;