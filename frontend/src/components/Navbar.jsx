import { Menu, Search, Bell } from "lucide-react";

const Navbar = ({ user, toggleSidebar }) => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Hamburger toggle button */}
      <button
        onClick={toggleSidebar}
        className="p-2 mr-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Specify Dashboard */}
      <div className="text-xl font-bold text-blue-500 me-20"> {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center">
        <div className="relative w-100">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute right-4 top-2 text-gray-400" />
        </div>
      </div>


     {/* User Profile */}
      <div className="flex items-center space-x-4">
        {user && user.name && user.name.length > 0 && (
          <div className="flex items-center space-x-2 me-12">
            <div className="w-8 h-8 me-4 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              {user.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold">Name : {user.name}</p>
            </div>
            <div className="text-sm font font-semibold"> Role : {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
