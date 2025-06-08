import { useNavigate } from "react-router-dom";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

const EduBacaLayout = ({ children }) => {
  const id = getCookie("userID");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return navigate("/");
    }
  }, [id]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default EduBacaLayout;
