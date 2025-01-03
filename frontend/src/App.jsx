import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProfilePage from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import Error from "./pages/Error/Error";
import { useUserStore } from "./Store/useUserStore";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Navbar from "./pages/Home/components/Navbar";
import Footer from "./pages/Home/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { getProfile, isLoading } = useUserStore();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated, getProfile]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-16 text-zinc-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar hidden={window.location.pathname === "/login" || window.location.pathname === "/signup"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/profile" replace />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/profile" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/update-profile"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
        {/* <Footer /> */}
        <ToastContainer />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;

