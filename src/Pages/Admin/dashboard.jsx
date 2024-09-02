import { useEffect, useState } from "react";
import AdminLayout from "./adminLayout";
import fairyApi from "../../lib/axios";

const countBook = async () => {
  const { data } = await fairyApi.get("/count/dongeng")
  return data.row
}

const Dashboard = () => {
  const [jumlahPeserta, setJumlahPeserta] = useState(0);
  const [jumlahDongeng, setJumlahDongeng] = useState(0);
  const [jumlahSoal, setJumlahSoal] = useState(0);

  useEffect(() => {
    const set = async () => {
      setJumlahDongeng(await countBook())
    }
    set()
  })
  return (
    <AdminLayout>
      Dashboard

      <>jumlah peserta</>
      <>jumlah dongeng:{jumlahDongeng}</>
      <>jumlah soal</>
    </AdminLayout>);
};

export default Dashboard;
