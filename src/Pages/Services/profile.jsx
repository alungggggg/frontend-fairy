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
    <>
      <UserLayout>
        <section className="container mt-5 mb-5">
          <section className="row">
            <section className="col-4 bg-primary-subtle"></section>
            <section className="col-8 p-0 bg-white">
              <p className="text-center border-bottom border-secondary-subtle fw-bold p-2">
                Information
              </p>
              <section className="row text-center ">
                <section className="col-6 p-0">
                  <p className="fw-bold mb-0">Nama</p>
                  <p className="text-body-secondary">{data.nama}</p>
                </section>
                <section className="col-6">
                  <p className="fw-bold mb-0">Username</p>
                  <p className="text-body-secondary">{data?.username}</p>
                </section>
              </section>
              <section className="row text-center ">
                <section className="col-6">
                  <p className="fw-bold mb-0">Email</p>
                  <p className="text-body-secondary">{data?.email}</p>
                </section>
                <section className="col-6">
                  <p className="fw-bold mb-0">Role</p>
                  <p className="text-body-secondary">{data.role}</p>
                </section>
              </section>
              {data.role == "siswa" ? (
                <>
                  <section className="row text-center border-bottom border-secondary-subtle">
                    <section className="col-6">
                      <p className="fw-bold mb-0">Kelas</p>
                      <p className="text-body-secondary">{data?.kelas}</p>
                    </section>
                    <section className="col-6">
                      <p className="fw-bold mb-0">Sekolah</p>
                      <p className="text-body-secondary">{data.sekolah}</p>
                    </section>
                  </section>
                </>
              ) : (
                ""
              )}
              <section className="p-3">
                <a href="/profile/update" className="btn btn-orange text-white">
                  Update Profile
                </a>
              </section>
            </section>
          </section>
        </section>
      </UserLayout>
    </>
  );
};
export default profile;
