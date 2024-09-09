import { getCookie } from "cookies-next";
import Footer from "../../template/footer";
import Header from "../../template/header";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = ({ children }) => {
  const userID = getCookie("userID");
  const refreshToken = getCookie("refreshToken");
  const { user } = useSelector((state) => state.user);

  if (!userID || !refreshToken) {
    return <Navigate to="/login" />;
  }

  // console.log(user);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
