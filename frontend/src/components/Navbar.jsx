import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/A1.json";

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = (path) =>
    `font-medium transition duration-300 ${
      location.pathname === path
        ? "text-red-600"
        : "text-gray-600 hover:text-red-600"
    }`;

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo + Animation */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition">
            NearbyHero
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link to="/browse" className={linkStyle("/browse")}>
            Browse
          </Link>
          <Link to="/create" className={linkStyle("/create")}>
            Create
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium px-4 py-2 hover:text-red-600 transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-red-600 text-white px-5 py-2 rounded-lg
                           hover:bg-red-700 transition shadow-md"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium text-gray-800">
                Hello, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
