import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart } from "lucide-react"; // simple icons

export default function TopNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Favorites", path: "/favorites", icon: <Heart size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 text-white shadow-md z-50">
      <div className="flex items-center gap-6 pl-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
              location.pathname === item.path
                ? "text-yellow-300"
                : "text-white hover:text-yellow-200"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
