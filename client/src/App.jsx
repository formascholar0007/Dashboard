import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { setUser } from "./slices/authSlice.js";
import { toast } from "react-toastify";
import { get } from "./api/HandleApi.js";
import Projects from "./pages/Projects.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AuthWrapper />} />
        {/* admin routes */}
        <Route path="/admin/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

const AuthWrapper = () => {
  const [loading, setLoading] = useState(true);
  const isUser = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await get("success/login");
        dispatch(setUser(data.user));
        const hasWelcomed = localStorage.getItem("hasWelcomed");
        if (!hasWelcomed) {
          toast.success(`Welcome ${data.user.displayName}`);
          localStorage.setItem("hasWelcomed", "true");
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isUser) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [loading, isUser, navigate]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
        <div className="spinner border-t-4 border-b-4 border-gray-500 rounded-full h-12 w-12"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
