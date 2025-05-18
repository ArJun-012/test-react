import { ShoppingCart, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-32 py-4 bg-white/30 backdrop-blur-md shadow-sm fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer"  onClick={() => (window.location.href = "/")}>
        <img src="/src/assets/Curevo-logo.png" alt="Curevo logo" className="h-10 w-auto"/>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-blue-500" onClick={() => (window.location.href = "/store")}>Home</li>
        <li className="cursor-pointer hover:text-blue-500" onClick={() => (window.location.href = "/product")}>Shop</li>
        <li className="cursor-pointer hover:text-blue-500" onClick={() => (window.location.href = "../Pages/ProductStore.jsx")}>About</li>
        <li className="relative group cursor-pointer">
          Pages
          <div className="absolute top-6 left-0 w-28 p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="cursor-pointer text-sm hover:text-blue-500">Page 1</p>
            <p className="cursor-pointer text-sm hover:text-blue-500">Page 2</p>
          </div>
        </li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-700" />
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-2 -right-2 text-white bg-blue-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </div>

        {/* Hamburger Menu */}
        <Menu
          className="w-6 h-6 text-gray-700 cursor-pointer md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-gradient-to-b from-[#fffffc] to-[#fcffef] shadow-md md:hidden rounded-b-3xl py-8 px-6">
          <ul className="flex flex-col items-start gap-4 p-4 text-gray-700 font-medium">
            <li className="text-blue-800 cursor-pointer" onClick={() => (window.location.href = "/")}>Home</li>
            <li className="cursor-pointer hover:text-blue-800" onClick={() => (window.location.href = "/product")}>Shop</li>
            <li className="cursor-pointer" onClick={() => (window.location.href = "/about")}>About</li>
            <li>
              <details className="w-full">
                <summary className="cursor-pointer">Pages</summary>
                <div className="pl-4 pt-4 flex flex-col gap-1 text-sm">
                  <p className="cursor-pointer hover:text-blue-800 mb-2 ">Page 1</p>
                  <p className="cursor-pointer hover:text-blue-800 mb-2">Page 2</p>
                </div>
              </details>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
