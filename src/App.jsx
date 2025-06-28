import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
import kernel from "./Pages/kernel";
import Test from "./Pages/test";
import ProfileTest from "./Pages/profile";
import BankSoal from "./Pages/Admin/bankSoal";
import Dashboard from "./Pages/Admin/dashboard";
import PilihanGanda from "./Pages/Admin/bankSoal/pilihanGanda";
import UraianSingkat from "./Pages/Admin/bankSoal/uraianSingkat";
import UraianPanjang from "./Pages/Admin/bankSoal/uraianPanjang";
import ForumQuiz from "./Pages/Admin/forumQuiz";
import ForumQuizDetail from "./Pages/Admin/forumQuiz/forumDetail";
import RekapNilai from "./Pages/Admin/forumQuiz/forum-quiz-rekap";
import ForumQuizSoal from "./Pages/Admin/forumQuiz/forum-quiz-soal";
import AddDongeng from "./Pages/Admin/dongeng/addDongeng";
import QuizList from "./Pages/Services/Siswa/quiz";
import Quiz_2 from "./Pages/Services/Siswa/quiz/quiz_2";

import Write from "./Pages/Services/Siswa/write";
import Berita from "./Pages/Admin/berita/berita";
import AddBerita from "./Pages/Admin/berita/addBerita";
import DetailBerita from "./Pages/Admin/berita/detailBerita";
import UpdateBerita from "./Pages/Admin/berita/updateBerita";
import ForgotPasswordVerify from "./Pages/Authentication/forgotPasswordVerify";
import EduBaca from "./Pages/edubaca";
import EduBacaListBacaan from "./Pages/edubaca/eduBacaListBacaan";
import ArtikelView from "./Pages/edubaca/ArtikelView.jsx";
import Dongeng from "./Pages/Services/dongengView.jsx";
import ArtikelEduBacaAdmin from "./Pages/Admin/eduBaca/artikel/index.jsx";
import ArtikleDetailEduBacaAdmin from "./Pages/Admin/eduBaca/artikel/artikelDetail/index.jsx";
import EduBacaAdmin from "./Pages/Admin/eduBaca/index.jsx";
import SoalArtikelAdmin from "./Pages/Admin/eduBaca/soal/index.jsx";
import RekapNilaiArtikel from "./Pages/Admin/eduBaca/rekapNilai/index.jsx";
import QuizArtikel from "./Pages/edubaca/quizArtikel.jsx/quizArtikel.jsx";
import DetailRekapNilai from "./Pages/Admin/eduBaca/rekapNilai/detailRekapNilai/index.jsx";
import ScrollToTop from "./Component/scrollToTop.jsx";
import KebijakanPrivasiPage from "./Pages/kebijakan-privasi/index.jsx";
import KebijakanPrivasiARPage from "./Pages/kebijakan-privasi/ar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<kernel.home />} />
          <Route path="/profile" element={<kernel.profile />} />
          <Route path="/profile/update" element={<kernel.updateProfile />} />
          <Route path="/katalog" element={<kernel.katalog />} />
          <Route path="/berita" element={<kernel.Berita />} />
          <Route path="/berita/:id" element={<kernel.DetailBerita />} />

          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
          <Route path="/kebijakan-privasi/ar" element={<KebijakanPrivasiARPage />} />

          <Route path="/Petunjuk" element={<kernel.petunjuk />} />
          <Route path="/Petunjuk/siswa" element={<kernel.petunjukSiswa />} />
          <Route path="/Petunjuk/guru" element={<kernel.petunjukUmum />} />
          <Route path="/Petunjuk/umum" element={<kernel.petunjukGuru />} />
          <Route path="/dongeng/detail/:id" element={<kernel.detail />} />
          <Route path="/dongeng/read/:id" element={<Dongeng />} />

          <Route path="/dongeng/write" element={<Write />} />

          <Route path="/login" element={<kernel.login />} />
          <Route path="/register" element={<kernel.register />} />
          <Route path="/logout" element={<kernel.logout />} />
          <Route path="/forgot-password" element={<kernel.forgotPassword />} />
          <Route
            path="/forgot-password/:token"
            element={<ForgotPasswordVerify />}
          />
          <Route path="/verify/:token" element={<kernel.verify />} />
          {/* <Route path="/forgot-password" element={<kernel.logout />} /> */}

          <Route path="/quiz">
            <Route index element={<QuizList />} />
            <Route path=":id" element={<Quiz_2 />} />
          </Route>

          <Route path="/test" element={<ProfileTest />} />

          <Route path="/admin">
            <Route index element={<Dashboard />} />

            <Route path="berita">
              <Route index element={<Berita />} />
              <Route path="add" element={<AddBerita />} />
              <Route path="update/:id" element={<UpdateBerita />} />
              <Route path=":id" element={<DetailBerita />} />
            </Route>

            <Route path="bank-soal">
              <Route index element={<BankSoal />} />
              <Route path="pilihan-ganda" element={<PilihanGanda />} />
              <Route path="uraian-singkat" element={<UraianSingkat />} />
              <Route path="uraian-panjang" element={<UraianPanjang />} />
            </Route>

            <Route path="dongeng">
              <Route index element={<kernel.dongeng />} />
              <Route path="update/:id" element={<kernel.updateDongeng />} />
            </Route>
            <Route path="users">
              <Route index element={<kernel.user />} />
              <Route path="add" element={<kernel.addUser />} />
              <Route path="update/:id" element={<kernel.updateUser />} />
            </Route>
            <Route path="forum-quiz">
              <Route index element={<ForumQuiz />} />
              <Route path=":id" element={<ForumQuizDetail />} />
              <Route path=":id/rekap" element={<RekapNilai />} />
              <Route path=":id/soal" element={<ForumQuizSoal />} />
            </Route>

            <Route path="edubaca">
              <Route index element={<EduBacaAdmin />} />
              <Route path="artikel">
                <Route index element={<ArtikelEduBacaAdmin />} />
                <Route
                  path=":id_artikel"
                  element={<ArtikleDetailEduBacaAdmin />}
                />
              </Route>
              <Route path="soal" element={<SoalArtikelAdmin />} />
              <Route path="rekap-nilai">
                <Route index element={<RekapNilaiArtikel />} />
                <Route path=":id_artikel" element={<DetailRekapNilai />} />
              </Route>
            </Route>
          </Route>

          <Route path="edubaca">
            <Route index element={<EduBaca />} />
            <Route path="bacaan" element={<EduBacaListBacaan />} />
            <Route path="bacaan/:id_artikel" element={<ArtikelView />} />
            <Route path="bacaan/:id_artikel/quiz" element={<QuizArtikel />} />
          </Route>

          <Route path="*" element={<kernel.err404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
