import React, { useEffect, useState } from "react";
import { Settings } from "../../types";

export default function SettingsPage({ settings: initialSettings }: { settings: Settings | null }) {
  const [settings, setSettings] = useState<Settings | null>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    // Refresh page to apply new settings globally
    window.location.reload();
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Site Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4 border-b pb-2">General Info</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
                <input type="text" name="siteName" defaultValue={settings.siteName} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
                <textarea name="seoDescription" defaultValue={settings.seoDescription} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4 border-b pb-2">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color (Hex)</label>
                <div className="flex gap-3 items-center">
                  <input type="color" name="primaryColor" defaultValue={settings.primaryColor} className="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                  <input type="text" defaultValue={settings.primaryColor} className="flex-1 px-3 py-2 border border-slate-300 rounded-md" readOnly />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4 border-b pb-2">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                <input type="email" name="contactEmail" defaultValue={settings.contactEmail} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                <input type="text" name="contactPhone" defaultValue={settings.contactPhone} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
