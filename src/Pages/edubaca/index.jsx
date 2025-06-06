import Footer from "../template/footer";
import Header from "../template/header";
import ActionList from "./components/actionList";
import BannerEdubaca from "./components/banner";
import EduBacaLayout from "./components/eduBacaLayout";

const EduBaca = () => {
  return (
    <EduBacaLayout>
      <section
        className="bg-success bg-opacity-25"
        style={{ minHeight: "calc(100vh)" }}
      >
        <div className="container">
          <BannerEdubaca />
        </div>
      </section>
      <div className="bg-white my-5">
        <div className="container">
          <div className="position-relative">
            <h1 className="fs-3 fw-semibold mb-4">Ayo Pilih Jalanmu!</h1>
            <span
              className="mtmin  position-absolute"
              style={{ bottom: "-10px", left: "80px" }}
            >
              <img
                src="https://buku.kemdikbud.go.id/assets/image/home/line-populer.png"
                alt="Line title"
              />
            </span>
          </div>
          <ActionList />
        </div>
      </div>
    </EduBacaLayout>
  );
};

export default EduBaca;
