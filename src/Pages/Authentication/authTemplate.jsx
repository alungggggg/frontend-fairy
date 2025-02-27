import { Navigate } from "react-router-dom";
import Footer from "../template/footer";
import Header from "../template/header";
import { getCookie } from "cookies-next";

const AuthTemplate = ({ children }) => {
  const refresh_token = getCookie("accessToken");
  const users_id = getCookie("userID");
  if (refresh_token && users_id) return <Navigate to="/" />;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AuthTemplate;
