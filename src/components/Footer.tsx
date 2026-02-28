import { Settings } from "../types";
import { Gauge } from "lucide-react";

export default function Footer({ settings }: { settings: Settings | null }) {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto object-contain flex-shrink-0" referrerPolicy="no-referrer" />
              ) : (
                <div className="p-1.5 bg-blue-600 rounded-md text-white flex-shrink-0" style={{ backgroundColor: settings?.primaryColor || '#2563eb' }}>
                  <Gauge size={20} />
                </div>
              )}
              <h3 className="text-white text-lg font-bold">{settings?.siteName || "Industrial Pro"}</h3>
            </div>
            <p className="text-sm">{settings?.seoDescription || "Expert calibration, testing, repair, and sales of industrial instruments."}</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Email: {settings?.contactEmail || "admin@example.com"}</p>
            <p className="text-sm">Phone: {settings?.contactPhone || "+1 234 567 8900"}</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" className="px-3 py-2 bg-slate-800 rounded-md text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors" style={{ backgroundColor: settings?.primaryColor || '#2563eb' }}>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} {settings?.siteName || "Industrial Pro"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
