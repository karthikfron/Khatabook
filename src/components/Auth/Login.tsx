import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/login.png";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: form.username,
        password: form.password,
      });

      const { accessToken } = response.data;
      localStorage.setItem("authToken", accessToken);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string): void => {
    void navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transform: "scale(0.92)",
        transformOrigin: "center center",
        borderRadius: "10px",
      }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-teal-300 px-4"
    >
      <div className="w-full max-w-sm p-8 bg-white/70 backdrop-blur-md rounded-xl shadow-2xl border border-teal-300">
        <h2 className="mt-6 text-center text-2xl font-bold text-teal-700">
          KhataMate
        </h2>
        <p className="mt-1 text-center text-sm text-teal-600">
          Secure login to your account
        </p>

        <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 space-y-2">
          <h3 className="font-bold">Demo Credentials</h3>
          <div className="flex items-center">
            <div>
              <span className="font-thin">Username:</span>{" "}
              <span className="font-mono">emilys</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard("emilys", "Username")}
              aria-label="Copy username"
            >
              <ContentCopyIcon
                fontSize="small"
                className="cursor-pointer hover:text-teal-800 ml-2"
              />
            </button>
          </div>
          <div className="flex items-center">
            <div>
              <span className="font-thin">Password:</span>{" "}
              <span className="font-mono">emilyspass</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard("emilyspass", "Password")}
              aria-label="Copy password"
            >
              <ContentCopyIcon
                fontSize="small"
                className="cursor-pointer hover:text-teal-800 ml-2"
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label className="pointer-events-none absolute left-4 top-2 text-xs text-teal-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:outline-none placeholder-transparent"
            />
            <label className="pointer-events-none absolute left-4 top-2 text-xs text-teal-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <HashLoader color="#ffffff" size={20} />
                <span className="ml-2">Please Wait</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
