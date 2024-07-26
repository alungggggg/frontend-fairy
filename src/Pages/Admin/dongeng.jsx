import Header from "../template/header";
import Footer from "../template/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const dongeng = () => {
  const navigate = useNavigate();
  const [dongengs, setDongeng] = useState([]);

  const getDongeng = async () => {
    const result = await axios.get("http://localhost:5000/api/dongeng");
    setDongeng(result.data);
  };

  const deleteDongeng = async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/dongeng/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(result);
  };

  const updateDongeng = async (key) => {
    navigate(`/dongeng/update/${key}`);
  };

  useEffect(() => {
    getDongeng();
  }, []);
  return (
    <>
      <Header></Header>
      <section className="container mt-4 mb-4">
        <section className="card">
          <section className="card-header">
            <h3 className="card-title">Dongeng</h3>
          </section>
          <section className="card-body p-0">
            <section className="table-responsive">
              <table className="table m-0">
                <thead>
                  <tr className="">
                    <th className="">No.</th>
                    <th>Title</th>
                    <th>Cover</th>
                    <th>Aksi</th>
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
                        <button onClick={() => deleteDongeng(dongeng.id)}>
                          Delete
                        </button>
                        |
                        <button onClick={() => updateDongeng(dongeng.id)}>
                          Update
                        </button>
                        |<button>Preview</button>|
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </section>

      <Footer></Footer>
    </>
  );
};

export default dongeng;
