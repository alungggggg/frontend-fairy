import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<kernel.home />} />
          <Route path="/profile" element={<kernel.profile />} />
          <Route path="/profile/update" element={<kernel.updateProfile />} />
          <Route path="/katalog" element={<kernel.katalog />} />
          <Route path="/Petunjuk" element={<kernel.petunjuk />} />
          <Route path="/Petunjuk/siswa" element={<kernel.petunjukSiswa />} />
          <Route path="/Petunjuk/guru" element={<kernel.petunjukUmum />} />
          <Route path="/Petunjuk/umum" element={<kernel.petunjukGuru />} />
          <Route path="/dongeng/detail/:id" element={<kernel.detail />} />
          <Route path="/dongeng/read/:id" element={<kernel.dongengView />} />

          <Route path="/login" element={<kernel.login />} />
          <Route path="/register" element={<kernel.register />} />
          <Route path="/logout" element={<kernel.logout />} />
          <Route path="/forgot-password" element={<kernel.forgotPassword />} />
          <Route path="/verify" element={<kernel.verify />} />
          {/* <Route path="/forgot-password" element={<kernel.logout />} /> */}

          <Route path="/users/add" element={<kernel.addUser />} />
          <Route path="/users/update/:id" element={<kernel.updateUser />} />
          <Route path="/quiz" element={<kernel.quiz />} />

          <Route path="/test" element={<ProfileTest />} />

          <Route path="/admin">
            <Route index element={<Dashboard />} />

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
            <Route path="users" element={<kernel.user />} />
            <Route path="forum-quiz">
              <Route index element={<ForumQuiz />} />
              <Route path=":id" element={<ForumQuizDetail />} />
              <Route path=":id/rekap" element={<RekapNilai />} />
              <Route path=":id/soal" element={<ForumQuizSoal />} />
            </Route>
          </Route>

          <Route path="*" element={<kernel.err404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
