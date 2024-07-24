import { Route, Routes } from "react-router-dom";
import kernel from "./Pages/kernel";

const Routers = () => {

    return (
        <Routes>
            <Route path="/" element={<kernel.home />} />
            <Route path="/katalog" element={<kernel.katalog />} />
            <Route path="/Petunjuk" element={<kernel.petunjuk />} />
            <Route path="/dongeng/detail/:id" element={<kernel.detail />} />
            <Route path="/dongeng/read" element={<kernel.dongengView />} />

            <Route path="/login" element={<kernel.login />} />
            <Route path="/register" element={<kernel.register />} />
            <Route path="/logout" element={<kernel.logout />} />

            <Route path="/users" element={<kernel.user />} />
            <Route path="/users/add" element={<kernel.addUser />} />
            <Route path="/users/update/:id" element={<kernel.updateUser />} />

            <Route path="/dongeng" element={<kernel.dongeng />} />
            <Route path="/dongeng/update/:id" element={<kernel.updateDongeng />} />
        </Routes>
    )
}

export default Routers