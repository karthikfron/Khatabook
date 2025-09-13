import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Header() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="bg-teal-600 dark:bg-teal-800 text-white px-6 py-2 flex items-center justify-between shadow-sm transition-colors">
      <div className="flex items-center space-x-2">
        <ReceiptLongIcon className="text-white" fontSize="medium" />
        <span className="text-xl font-bold tracking-tight">KhataMate</span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDark(!dark)}
          className="
            flex items-center justify-center
            h-8 w-8
            rounded-full
            bg-slate-300 hover:bg-slate-400 dark:bg-orange-400 hover:dark:bg-orange-300
            transition-colors
          "
          aria-label="Toggle theme"
        >
          {dark ? (
            <LightModeIcon className="text-white" fontSize="small" />
          ) : (
            <DarkModeIcon className="text-white" fontSize="small" />
          )}
        </button>

        <div className="hidden md:inline-flex">
          <AccountCircleIcon
            fontSize="large"
            className="text-white dark:text-gray-200 cursor-pointer hover:text-teal-100 dark:hover:text-gray-100 transition-colors"
          />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center h-8 w-9 rounded-lg bg-red-400 hover:bg-red-500 transition-colors md:hidden"
          aria-label="Logout"
        >
          <ExitToAppIcon className="text-white" fontSize="small" />
        </button>
      </div>
    </header>
  );
}
