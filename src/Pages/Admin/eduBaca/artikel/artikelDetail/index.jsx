import { useParams } from "react-router-dom";
import AdminLayout from "../../../adminLayout";

const ArtikleDetailEduBacaAdmin = () => {
  const { id_artikel } = useParams();
  return (
    <AdminLayout>
      <h1>Artikel Detail Edu Baca Admin : {id_artikel}</h1>
      <p>Ini adalah halaman detail artikel untuk Edu Baca di admin.</p>
    </AdminLayout>
  );
};

export default ArtikleDetailEduBacaAdmin;
