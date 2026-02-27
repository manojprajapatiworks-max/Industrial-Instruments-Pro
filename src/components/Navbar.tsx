import { Link } from "react-router-dom";
import { Settings } from "../types";
import { Wrench } from "lucide-react";

export default function Navbar({ settings }: { settings: Settings | null }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white" style={{ backgroundColor: settings?.primaryColor || '#2563eb' }}>
                <Wrench size={24} />
              </div>
              <span className="font-bold text-xl text-slate-900">
                {settings?.siteName || "Industrial Pro"}
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <a href="#services" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="#products" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            <Link to="/admin" className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium border border-blue-600 hover:bg-blue-50 transition-colors" style={{ borderColor: settings?.primaryColor || '#2563eb', color: settings?.primaryColor || '#2563eb' }}>Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
