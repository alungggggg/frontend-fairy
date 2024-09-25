import { Link } from "react-router-dom";
import AdminLayout from "../adminLayout";

const BankSoal = () => {
  return (
    <AdminLayout>
      <section className="">
        <div className=" w-100 d-flex flex-wrap justify-content-between row-cols-2 fs-2 row-gap-4">
          <div className="card col" style={{ width: "49%" }}>
            <Link
              to={"./pilihan-ganda"}
              className="card-body text-decoration-none p-4"
            >
              Pilihan Ganda
            </Link>
          </div>
          <div className="card col" style={{ width: "49%" }}>
            <Link
              to={"./uraian-singkat"}
              className="card-body text-decoration-none p-4"
            >
              Uraian Singkat
            </Link>
          </div>
          <div className="card col" style={{ width: "49%" }}>
            <Link
              to={"./uraian-panjang"}
              className="card-body text-decoration-none p-4"
            >
              Menulis Dongeng
            </Link>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default BankSoal;
