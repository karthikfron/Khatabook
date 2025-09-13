import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/pages/Header";
import Sidebar from "./components/pages/SideBar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Dashboard from "./components/pages/Board";
import { Toaster } from "sonner";
import NotFound from "./components/pages/NotFound";

function SecureLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex md:w-50">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster richColors closeButton expand position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<SecureLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
