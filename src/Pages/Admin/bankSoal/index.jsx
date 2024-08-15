import { Link } from "react-router-dom";
import AdminLayout from "../adminLayout";

const BankSoal = () => {
  return (
    <AdminLayout>
      <div className="row gap-3 px-3">
        <div className="card col-5">
          <Link to={"./pilihan-ganda"} className="card-body">
            Pilihan Ganda
          </Link>
        </div>
        <div className="card col-5">
          <Link to={"./uraian-singkat"} className="card-body">
            Uraian Singkat
          </Link>
        </div>
        <div className="card col-5">
          <Link to={"./uraian-panjang"} className="card-body">
            Uraian Panjang
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BankSoal;
