import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../lib/redux/api/users";
import { getCookie } from "cookies-next";
import { getNewAccessToken } from "../../lib/redux/api/auth";
import UserLayout from "./Component/userLayout";

const profile = () => {
  const dispatch = useDispatch();
  const userID = getCookie("userID");
  const { user: data } = useSelector((state) => state.user);

  // console.log(data);

  async function getProfileData() {
    const res = await dispatch(getUserById(userID));
    if (res.error) {
      if (res.error.message === "401") {
        console.log("getting new access token");
        await dispatch(getNewAccessToken());
        return getProfileData();
      }
    }
  }

  useEffect(() => {
    if (userID) {
      getProfileData();
    }
  }, []);

  return (
    <UserLayout>
      nama : {data.nama} <br />
      username : {data?.username} <br />
      email : {data?.email} <br />
      role : {data.role} <br />
      {data.role == "SISWA" ? (
        <>
          Kelas : {data?.kelas} <br />
          sekolah : {data?.sekolah} <br />
        </>
      ) : (
        ""
      )}
      <a href="/profile/update">update Profile</a>
    </UserLayout>
  );
};
export default profile;
