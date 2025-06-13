import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceReport from "./pages/AttendanceReport";
import Teachers from "./pages/Teachers";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import ClassManagement from "./pages/ClassManagement";
import UserManagement from "./pages/UserManagement";
import StudentDashboard from "./pages/StudentDashboard";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const authUser = useAuthStore((state) => state.authUser);
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          {authUser && <Sidebar user={authUser} />}

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navbar */}
            {authUser && <Navbar user={authUser} />}

            {/* Content */}
            <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100 p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      {authUser?.role === "student" ? <StudentDashboard /> : <Dashboard />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mark-attendance"
                  element={
                    <ProtectedRoute>
                      <MarkAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance-report"
                  element={
                    <ProtectedRoute>
                      <AttendanceReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/studentsdashboard"
                  element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teachers"
                  element={
                    <ProtectedRoute>
                      <Teachers />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/classes"
                  element={
                    <ProtectedRoute>
                      <ClassManagement />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/user-management"
                  element={
                    <ProtectedRoute>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
                <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
