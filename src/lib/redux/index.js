import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/auth";
import pilganSlice from "./api/soalPilgan";
import uraianSingkatSlice from "./api/soalUraianSingkat";
import soalUraianPanjang from "./api/soalUraianPanjang";
import forumQuizSlice from "./api/forumQuiz";
import dongengSlice from "./api/dongeng";
import rekapNilaiSlice from "./api/rekapNilai";
import usersSlice from "./api/users";
import userAdminSlice from "./api/userAdmin";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    soalPilihanGanda: pilganSlice,
    soalUraianSingkat: uraianSingkatSlice,
    soalUraianPanjang: soalUraianPanjang,
    forumQuiz: forumQuizSlice,
    dongeng: dongengSlice,
    rekapNilai: rekapNilaiSlice,
    user: usersSlice,
    usersAdmin: userAdminSlice,
  },
});
