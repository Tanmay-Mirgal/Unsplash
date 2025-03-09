import { useEffect, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "./Store/useUserStore";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Navbar from "./pages/Home/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const UpdateProfile = lazy(() => import("./pages/Profile/UpdateProfile"));
const Error = lazy(() => import("./pages/Error/Error"));

function App() {
  const { getProfile, isLoading } = useUserStore((state) => ({
    getProfile: state.getProfile,
    isLoading: state.isLoading,
  }));
  
  const token = localStorage.getItem("token"); // FIXED
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated]); // FIXED

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
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin size-16 text-zinc-600" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" replace />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/profile" replace />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} />
          <Route path="/update-profile" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <ToastContainer />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
