import { useDispatch } from "react-redux";
import { signOut } from "../../lib/redux/api/auth";
const Logout = async() => {
  const dispatch = useDispatch();
  dispatch(signOut());
};

export default Logout;
