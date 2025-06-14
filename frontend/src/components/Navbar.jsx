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

      {/* Search Bar (can be hidden on mobile if needed) */}
      <div className="flex-grow flex justify-center sm:justify-start px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        {user && user.name && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              {user.name[0].toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col text-sm">
              <span className="font-semibold">Name: {user.name}</span>
              <span className="text-gray-500">Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </div>
          </div>
        )}
        <Bell className="w-5 h-5 text-gray-600 hidden sm:block" />
      </div>
    </nav>
  );
};

export default Navbar;
