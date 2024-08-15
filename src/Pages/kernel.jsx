import dongeng from "./Admin/dongeng";
import addDongeng from "./Admin/addDongeng";
import updateDongeng from "./Admin/updateDongeng";

import addUser from "./Admin/addUser";
import updateUser from "./Admin/updateUser";
import user from "./Admin/user";

import login from "./Authentication/login";
import logout from "./Authentication/logout";
import register from "./Authentication/register";
import forgotPassword from "./Authentication/forgotPassword";

import detail from "./Services/detail";
import dongengView from "./Services/dongengView";
import home from "./Services/home";
import katalog from "./Services/katalog";
import petunjuk from "./Services/petunjuk";
import profile from "./Services/profile";
import err404 from "./Services/404";

import quiz from "./Services/Siswa/quiz";
import { Profiler } from "react";

export default {
  addDongeng,
  addUser,
  dongeng,
  updateDongeng,
  updateUser,
  user,
  login,
  logout,
  register,
  detail,
  dongengView,
  home,
  katalog,
  petunjuk,
  err404,
  quiz,
  forgotPassword,
  profile
};
