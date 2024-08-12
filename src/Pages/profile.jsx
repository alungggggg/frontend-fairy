import { useDispatch } from "react-redux";
import fairyApi from "../lib/axios";
import { getNewAccessToken } from "../lib/redux/api/auth";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";

const ProfileTest = () => {
  const dispatch = useDispatch();

  async function getData() {
    try {
      const response = await fairyApi.get("/test", {
        refreshToken: getCookie("refreshToken"),
      });
      console.log(response);
    } catch (error) {
      let res = dispatch(getNewAccessToken());
      if (res) {
        console.log("Get new token success");
        getData();
      }
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return <div>test</div>;
};

export default ProfileTest;
