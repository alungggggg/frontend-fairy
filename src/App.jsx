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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<kernel.home />} />
          <Route path="/profile" element={<kernel.profile />} />
          <Route path="/katalog" element={<kernel.katalog />} />
          <Route path="/Petunjuk" element={<kernel.petunjuk />} />
          <Route path="/dongeng/detail/:id" element={<kernel.detail />} />
          <Route path="/dongeng/read/:id" element={<kernel.dongengView />} />

          <Route path="/login" element={<kernel.login />} />
          <Route path="/register" element={<kernel.register />} />
          <Route path="/logout" element={<kernel.logout />} />
          <Route path="/forgot-password" element={<kernel.forgotPassword />} />
          {/* <Route path="/forgot-password" element={<kernel.logout />} /> */}

          <Route path="/users/add" element={<kernel.addUser />} />
          <Route path="/users/update/:id" element={<kernel.updateUser />} />
          <Route path="/quiz" element={<kernel.quiz />} />

          <Route path="/dongeng/add" element={<kernel.addDongeng />} />
          <Route
            path="/dongeng/update/:id"
            element={<kernel.updateDongeng />}
          />
          <Route path="/test" element={<ProfileTest />} />

          <Route path="/admin">
            <Route index element={<Dashboard />} />
            
            <Route path="bank-soal">
              <Route index element={<BankSoal />} />
              <Route path="pilihan-ganda" element={<PilihanGanda />} />
              <Route path="uraian-singkat" element={<UraianSingkat />} />
              <Route path="uraian-panjang" element={<UraianPanjang />} />
            </Route>

            <Route path="dongeng" element={<kernel.dongeng />} />
            <Route path="users" element={<kernel.user />} />
            <Route path="forum-quiz">
              <Route index element={<ForumQuiz />} />
              <Route path=":id" element={<ForumQuizDetail />} />
            </Route>
          </Route>

          <Route path="*" element={<kernel.err404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
