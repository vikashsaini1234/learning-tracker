import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const isActive = (p) => pathname === p || pathname.startsWith(p + "/");

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">LT</div>
          <div className="text-lg font-bold text-gray-900">Learning Tracker</div>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/') ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'}`}>
            Home
          </Link>
          <Link to="/category"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/category') ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'}`}>
            Categories
          </Link>
          <Link to="/topics"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/topics') ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'}`}>
            Topics
          </Link>
        </div>
      </div>
    </nav>
  );
}
