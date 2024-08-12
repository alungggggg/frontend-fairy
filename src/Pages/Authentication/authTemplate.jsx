import { Navigate } from "react-router-dom";
import Footer from "../template/footer";
import Header from "../template/header";
import { useSelector } from "react-redux";

const AuthTemplate = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token) return <Navigate to="/" />;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AuthTemplate;
