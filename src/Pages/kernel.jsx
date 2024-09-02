import dongeng from "./Admin/dongeng/dongeng";
import addDongeng from "./Admin/dongeng/addDongeng";
import updateDongeng from "./Admin/dongeng/updateDongeng";

import addUser from "./Admin/users/addUser";
import updateUser from "./Admin/users/updateUser";
import user from "./Admin/users/user";

import login from "./Authentication/login";
import logout from "./Authentication/logout";
import register from "./Authentication/register";
import forgotPassword from "./Authentication/forgotPassword";
import verify from "./Authentication/verify";

import detail from "./Services/detail";
import dongengView from "./Services/dongengView";
import home from "./Services/home";
import katalog from "./Services/katalog";
import petunjuk from "./Services/petunjuk";
import petunjukSiswa from "./Services/petunjukSiswa";
import petunjukGuru from "./Services/petunjukGuru";
import petunjukUmum from "./Services/petunjukUmum";
import profile from "./Services/profile";
import updateProfile from "./Services/updateProfile";
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
  profile,
  updateProfile,
  verify,
  petunjukSiswa,
  petunjukUmum,
  petunjukGuru,
};
