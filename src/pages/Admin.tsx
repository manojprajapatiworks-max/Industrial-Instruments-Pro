import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Settings as SettingsType } from "../types";
import { LayoutDashboard, Tags, Package, Inbox, Settings as SettingsIcon } from "lucide-react";
import Dashboard from "./admin/Dashboard";
import Categories from "./admin/Categories";
import Products from "./admin/Products";
import Requests from "./admin/Requests";
import SettingsPage from "./admin/Settings";

export default function Admin({ settings }: { settings: SettingsType | null }) {
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/categories", label: "Categories", icon: Tags },
    { path: "/admin/products", label: "Products & Services", icon: Package },
    { path: "/admin/requests", label: "Requests", icon: Inbox },
    { path: "/admin/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Admin Panel</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  style={isActive ? { backgroundColor: settings?.primaryColor ? `${settings.primaryColor}15` : undefined, color: settings?.primaryColor } : {}}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/settings" element={<SettingsPage settings={settings} />} />
        </Routes>
      </main>
    </div>
  );
}
