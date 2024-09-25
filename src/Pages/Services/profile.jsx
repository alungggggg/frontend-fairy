import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../lib/redux/api/users";
import { getCookie } from "cookies-next";
import { getNewAccessToken } from "../../lib/redux/api/auth";
import UserLayout from "./Component/userLayout";
import { Link } from "react-router-dom";

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

  const [role, setRole] = useState("")

  useEffect(() => {
    setRole(data?.role || "")
  }, [data])

  useEffect(() => {
    if (userID) {
      getProfileData();
    }
  }, []);

  return (
    <>
      <UserLayout>
        <section className="container mt-5 mb-5" style={{minHeight : "calc(100vh - 76px)"}}>
          <section className="row p-3">
            <section className="col-sm-12 col-md-4 bg-secondary-subtle d-flex justify-content-center align-items-center">
              <img
                src="https://th.bing.com/th/id/OIP.oVIyTk_GGnAj3YzNXppdpQAAAA?w=189&h=189&c=7&r=0&o=5&pid=1.7"
                alt=""
                className="rounded-circle p-md-0 p-3 "
              />
            </section>
            <section className=" col-sm-12 col-md-8 p-0 bg-white">
              <p className="text-center border-bottom border-secondary-subtle fw-bold p-2">
                Information
              </p>

              <section className="d-flex text-center ">
                <section className="w-50 p-0">
                  <p className=" fw-bold mb-0">Nama</p>
                  <p className="text-body-secondary">{data?.nama}</p>
                </section>
                <section className="w-50">
                  <p className="fw-bold mb-0">Username</p>
                  <p className="text-body-secondary">{data?.username}</p>
                </section>
              </section>
              <section className="d-flex text-center ">
                <section className="w-50">
                  <p className="fw-bold mb-0">Email</p>
                  <p className="text-body-secondary">{data?.email}</p>
                </section>
                <section className="w-50">
                  <p className="fw-bold mb-0">Role</p>
                  <p className="text-body-secondary text-capitalize">{role}</p>
                </section>
              </section>
              {role.toLowerCase() == "siswa" ? (
                <>
                  <section className="d-flex text-center border-bottom border-secondary-subtle">
                    <section className="w-50">
                      <p className="fw-bold mb-0">Kelas</p>
                      <p className="text-body-secondary">{data?.kelas}</p>
                    </section>
                    <section className="w-50">
                      <p className="fw-bold mb-0">Sekolah</p>
                      <p className="text-body-secondary">{data.sekolah}</p>
                    </section>
                  </section>
                </>
              ) : (
                ""
              )}

              <section className="p-3 d-flex justify-content-end">
                <Link to={"/profile/update"} className="btn btn-orange text-white">

                  Update Profile
                </Link>
              </section>
            </section>
          </section >
        </section >
      </UserLayout >
    </>
  );
};
export default profile;
