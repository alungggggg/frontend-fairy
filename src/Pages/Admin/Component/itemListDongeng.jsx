import { useNavigate } from "react-router-dom";
import swal, { confirmSwal } from "../../../Component/alert";

const itemListDongeng = ({ items }) => {
    const navigate = useNavigate()

    const deleteDongeng = async (id) => {

        confirmSwal("Peringatan", "Anda yakin ingin menghapus Dongeng ini?").then(async (result) => {
            if (result.isConfirmed) {
                const result = await axios.delete(
                    `http://localhost:5000/api/dongeng/${id}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
                getDongeng()
                swal("Dongeng Berhasil di hapus", "success");
            }
        })
    };

    const updateDongeng = async (key) => {
        navigate(`/dongeng/update/${key}`);
    };

    return (
        <>
            {
                items.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td><img src={item.cover} alt="" /></td>
                        <td>
                            {/* () => deleteUser(user.id) */}
                            <button onClick={() => deleteDongeng(item.id)}>
                                Delete
                            </button>
                            |
                            <button onClick={() => updateDongeng(item.id)}>
                                Update
                            </button>
                            |<button>Preview</button>|
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default itemListDongeng