'use client';
import { useState } from 'react';
import { Settings, Shield, Bell, Globe, Save, CreditCard, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-sm text-[#5A6472]">Configure your store preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary gap-2"><Save size={16} /> Save Changes</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1 bg-white rounded-2xl border border-[#E5EBF4] p-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? 'bg-[#0A66FF] text-white' : 'text-[#5A6472] hover:bg-[#EEF4FF] hover:text-[#0A66FF]'}`}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
            <h3 className="font-bold mb-5 flex items-center gap-2 capitalize">
              {tabs.find(t => t.id === activeTab)?.label} Settings
            </h3>

            {activeTab === 'general' && (
              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1.5">Store Name</label><input className="input-field" defaultValue="M13 Design Studio" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Store Email</label><input className="input-field" defaultValue="hello@m13designstudio.com" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1.5">Store Description</label><textarea className="input-field" rows={3} defaultValue="Premium handcrafted wall art and personalized decor from Indian artists." /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1.5">Currency</label>
                    <select className="input-field"><option>INR (₹)</option><option>USD ($)</option></select>
                  </div>
                  <div><label className="block text-sm font-medium mb-1.5">Language</label>
                    <select className="input-field"><option>English</option><option>Hindi</option></select>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' && (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F8FAFD] flex items-center justify-center mx-auto mb-4">
                  <Settings size={24} className="text-[#8B9BAD]" />
                </div>
                <p className="text-[#5A6472]">This section is coming soon.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
            <h3 className="font-bold mb-4 text-red-500">Danger Zone</h3>
            <p className="text-sm text-[#5A6472] mb-4">Once you delete your store, there is no going back. Please be certain.</p>
            <button className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all">Delete Store</button>
          </div>
        </main>
      </div>
    </div>
  );
}
