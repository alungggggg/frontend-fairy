import { getCookie } from "cookies-next";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { Navigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const userID = getCookie("userID");
  const refreshToken = getCookie("refreshToken");

  if (!userID || !refreshToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
