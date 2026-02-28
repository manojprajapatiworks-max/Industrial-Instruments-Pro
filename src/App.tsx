import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Settings } from "./types";

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        if (data.primaryColor) {
          document.documentElement.style.setProperty("--primary", data.primaryColor);
        }
        if (data.siteName) {
          document.title = data.siteName;
        }
        if (data.seoDescription) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.seoDescription);
        }
      });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar settings={settings} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home settings={settings} />} />
            <Route path="/login" element={<Login settings={settings} />} />
            <Route path="/admin/*" element={<Admin settings={settings} />} />
          </Routes>
        </main>
        <Footer settings={settings} />
      </div>
    </Router>
  );
}
