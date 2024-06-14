import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignUpPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/NotificationPage";

export default function App() {
  return (
    <div className="flex max-w-6xl mx-auto p-3">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
      <RightPanel />
    </div>
  );
}
