import { useNavigate, NavLink } from "react-router-dom";
import { Home, ClipboardList, Users, BookOpen, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-white shadow p-4 flex flex-col h-full">
      {/* Logo */}
      <div className="text-xl font-bold text-indigo-500 mb-4">School</div>

      {/* Main Section */}
      <h3 className="text-sm font-semibold mb-2">MAIN</h3>
      <ul className="space-y-2">
        {user?.role !== "student" && (
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                }`
              }
            >
              <Home className="mr-2 w-4 h-4" />
              Dashboard
            </NavLink>
          </li>
        )}

        {/* Role: Teacher */}
        {user?.role === "teacher" && (
          <li>
            <NavLink
              to="/mark-attendance"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                }`
              }
            >
              <ClipboardList className="mr-2 w-4 h-4" />
              Mark Attendance
            </NavLink>
          </li>
        )}

        {/* Role: Student */}
        {user?.role === "student" && (
          <ul>
            <li>
              <NavLink
                to="/studentsdashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                  }`
                }
              >
                <Home className="mr-2 w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/attendance-report"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                  }`
                }
              >
                <ClipboardList className="mr-2 w-4 h-4" />
                My Attendance
              </NavLink>
            </li>
          </ul>
        )}
      </ul>

      {/* Administration Section: Only for Admin */}
      {user?.role === "admin" && (
        <>
          <h3 className="text-sm font-semibold mt-2 mb-2">ADMINISTRATION</h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/user-management"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                  }`
                }
              >
                <Users className="mr-2 w-4 h-4" />
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded ${isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                  }`
                }
              >
                <BookOpen className="mr-2 w-4 h-4" />
                Class Management
              </NavLink>
            </li>
            <li>
            </li>
          </ul>
        </>
      )}


      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 rounded hover:bg-gray-200 w-full"
        >
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
