import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "sonner";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.info("Logged out!");
    navigate("/login");
  };

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    { to: "/customers", label: "Customers", icon: PeopleIcon },
    { to: "/add-customer", label: "Add Customer", icon: AddCircleIcon },
  ];

  return (
    <aside className="flex flex-col w-full md:w-56 bg-teal-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors">
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-colors
                   ${
                     isActive
                       ? "bg-teal-200 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                       : "text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-white"
                   }`
                }
              >
                <Icon className="mr-3" fontSize="small" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-3/4 mx-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow p-3 space-y-2">
        <div className="flex items-center space-x-1">
          <InfoOutlinedIcon
            className="text-teal-600 dark:text-teal-400"
            fontSize="small"
          />
          <h4 className="text-left text-teal-700 dark:text-teal-300 font-medium text-sm">
            welcome user
          </h4>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-xs font-thin leading-snug">
          Your one-stop ledger for tracking credit sales and repayments.
        </p>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center px-3 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-400 hover:text-red-500 dark:hover:text-white transition-colors"
        >
          <LogoutIcon className="mr-2" fontSize="small" />
          Log out
        </button>
      </div>
    </aside>
  );
}
