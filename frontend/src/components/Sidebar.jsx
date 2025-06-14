import { useNavigate, NavLink } from "react-router-dom";
import { Home, ClipboardList, Users, BookOpen, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ user, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `flex items-center p-2 rounded ${
      isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
    }`;

  return (
    <aside
      className={`bg-white shadow p-4 flex flex-col h-full absolute md:static top-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 max-w-full md:w-64`}
      aria-label="Sidebar Navigation"
    >
      <div className="text-xl font-bold text-indigo-500 mb-4">School</div>

      <h3 className="text-sm font-semibold mb-2">MAIN</h3>
      <ul className="space-y-2">
        {user?.role !== "student" && (
          <li>
            <NavLink to="/" end className={navClass} onClick={toggleSidebar}>
              <Home className="mr-2 w-4 h-4" />
              Dashboard
            </NavLink>
          </li>
        )}

        {user?.role === "teacher" && (
          <li>
            <NavLink to="/mark-attendance" className={navClass} onClick={toggleSidebar}>
              <ClipboardList className="mr-2 w-4 h-4" />
              Mark Attendance
            </NavLink>
          </li>
        )}

        {user?.role === "student" && (
          <>
            <li>
              <NavLink to="/studentsdashboard" className={navClass} onClick={toggleSidebar}>
                <Home className="mr-2 w-4 h-4" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/attendance-report" className={navClass} onClick={toggleSidebar}>
                <ClipboardList className="mr-2 w-4 h-4" />
                My Attendance
              </NavLink>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <h3 className="text-sm font-semibold mt-6 mb-2">ADMINISTRATION</h3>
            <li>
              <NavLink to="/user-management" className={navClass} onClick={toggleSidebar}>
                <Users className="mr-2 w-4 h-4" />
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" className={navClass} onClick={toggleSidebar}>
                <BookOpen className="mr-2 w-4 h-4" />
                Class Management
              </NavLink>
            </li>
          </>
        )}
      </ul>

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
