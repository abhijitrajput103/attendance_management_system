import { Menu, Search, Bell } from "lucide-react";

const Navbar = ({ user, toggleSidebar }) => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between relative z-10">
      {/* Hamburger (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="p-2 mr-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Role-Specific Dashboard Title */}
      <div className="text-lg md:text-xl font-bold text-blue-600 hidden sm:block">
        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        {user && user.name && (
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                if (window.innerWidth < 640) toggleSidebar();
              }}
              className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold cursor-pointer"
            >
              {user.name[0].toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-sm">
              <span className="font-semibold">Name: {user.name}</span>
              <span className="text-gray-500">Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
