'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings, Tag,
  FileText, Image, ChevronRight, Bell, Menu, LogOut
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Collections', icon: Tag },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/content', label: 'Content', icon: Image },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#F8FAFD]" />;

  return (
    <div className="min-h-screen bg-[#F8FAFD] flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside className={`admin-sidebar transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-[#0A66FF] flex items-center justify-center font-black text-xs">M13</div>
            <div>
              <p className="font-bold text-sm">M13 Design Studio</p>
              <p className="text-[10px] text-[#5A6472]">Admin Panel</p>
            </div>
          </Link>
        </div>

        <div className="px-3 mb-2">
          <p className="text-[10px] text-[#5A6472] uppercase tracking-widest px-3 mb-1">Main Menu</p>
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`admin-nav-item ${pathname === href ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}>
              <Icon size={16} /> {label}
              {pathname === href && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0A66FF]" />}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/" className="admin-nav-item text-red-400 hover:text-red-400 hover:bg-red-900/20">
            <LogOut size={16} /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[99] lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 bg-white border-b border-[#E5EBF4] z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg bg-[#F8FAFD] flex items-center justify-center">
              <Menu size={18} />
            </button>
            <div>
              <p className="font-bold text-[#0D1117] capitalize">
                {NAV.find(n => n.href === pathname)?.label || 'Dashboard'}
              </p>
              <nav className="breadcrumb text-xs">
                <Link href="/admin">Admin</Link>
                {pathname !== '/admin' && (
                  <><ChevronRight size={10} /><span className="capitalize">{pathname.split('/').pop()}</span></>
                )}
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-[#F8FAFD] flex items-center justify-center">
              <Bell size={16} />
              <span className="notification-dot text-[9px]">3</span>
            </button>
            <div className="flex items-center gap-2 bg-[#F8FAFD] rounded-xl px-3 py-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center text-white font-bold text-xs">A</div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Admin</p>
                <p className="text-[10px] text-[#8B9BAD]">admin@m13designstudio.com</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
