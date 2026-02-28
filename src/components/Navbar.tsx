import { Link } from "react-router-dom";
import { Settings } from "../types";
import { Wrench, Menu, X } from "lucide-react";
import React, { useState } from "react";

export default function Navbar({ settings }: { settings: Settings | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1 min-w-0 mr-4">
            <Link to="/" className="flex items-center gap-2 min-w-0">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto object-contain flex-shrink-0" referrerPolicy="no-referrer" />
              ) : (
                <div className="p-2 bg-blue-600 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: settings?.primaryColor || '#2563eb' }}>
                  <Wrench size={24} />
                </div>
              )}
              <span className="font-bold text-lg sm:text-xl text-slate-900 truncate">
                {settings?.siteName || "Industrial Pro"}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <a href="#services" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="#products" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            <Link to="/login" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium border border-blue-600 hover:bg-blue-50 transition-colors" style={{ borderColor: settings?.primaryColor || '#2563eb', color: settings?.primaryColor || '#2563eb' }}>Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden flex-shrink-0">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-2 pt-2 pb-3 space-y-1 shadow-lg absolute w-full">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Home</Link>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Services</a>
          <a href="#products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Products</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Contact</a>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50" style={{ color: settings?.primaryColor }}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
