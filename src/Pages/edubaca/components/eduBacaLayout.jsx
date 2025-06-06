import Footer from "../../template/footer";
import Header from "../../template/header";

const EduBacaLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default EduBacaLayout;
