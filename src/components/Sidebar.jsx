import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Sun, Moon, Menu, X } from "lucide-react";
import { auth } from "../firebase";

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white p-4 transition-all ${collapsed ? "w-16" : "w-64"}`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 m-2 bg-gray-800 rounded hover:bg-gray-700 transition"
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      <div className={`${collapsed ? "hidden" : "block"} mt-4`}>
      <ul>
        <li>
          <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" className="block p-2 hover:bg-gray-700 rounded">
            Products
          </Link>
        </li>
        <li>
          <Link to="/customers" className="block p-2 hover:bg-gray-700 rounded">
            Customers
          </Link>
        </li>
        <li className="mt-6 flex items-center space-x-2">
          <button onClick={toggleDarkMode} className="p-2 rounded bg-gray-700">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 p-2 rounded hover:bg-red-700"
          >
            <LogOut size={20} className="inline-block mr-2" /> Sign Out
          </button>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default Sidebar;
