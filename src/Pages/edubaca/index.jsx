import Footer from "../template/footer";
import Header from "../template/header";
import ActionList from "./components/actionList";
import BannerEdubaca from "./components/banner";

const EduBaca = () => {
  return (
    <>
      <Header />
      <section className="container" style={{ minHeight: "calc(100vh - 76px)" }}>
        <BannerEdubaca/>
        <ActionList/>
      </section>
      <Footer />
    </>
  );
};

export default EduBaca;
