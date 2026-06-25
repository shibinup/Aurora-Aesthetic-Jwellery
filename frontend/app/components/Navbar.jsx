"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  X,
  Home,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/account" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <header className="w-full bg-[#f8f5ef] border-b border-gray-200 sticky top-0 z-50">

      {/* Top Logo Section */}
      <div className="relative flex items-center justify-center py-5 px-4">

        {/* Mobile Menu Button */}
        <button
          className="absolute left-4 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide">
            AURORA AESTHETIC
          </h1>
          <p className="text-[10px] md:text-xs tracking-[4px] uppercase">
            Jewellery
          </p>
        </div>

        {/* Icons */}
        <div className="absolute right-4 flex items-center gap-4 top-15">
          <Home size={20} className="cursor-pointer"/>
          <Search size={20} className="cursor-pointer" />
          <User size={20} className="cursor-pointer" />

          <div className="relative cursor-pointer">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center gap-8 py-3 text-sm border-t border-gray-200">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="hover:text-yellow-700 transition"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-[#f8f5ef]">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.name}
                  href={link.path}
                  className="flex items-center gap-2 text-sm hover:text-yellow-700"
                >
                  {Icon && <Icon size={18} />}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}