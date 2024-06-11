import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignUpPage";

export default function App() {
  return (
    <div className="flex max-w-6xl mx-auto ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
