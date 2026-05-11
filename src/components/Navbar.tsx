'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Search, User, Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { useStore } from '@/lib/store';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop', children: [
    { label: 'Wall Art', href: '/shop?category=wall-art' },
    { label: 'Personalized', href: '/shop?category=personalized' },
    { label: 'Religious Art', href: '/shop?category=religious' },
    { label: 'Photo Frames', href: '/shop?category=photo-frames' },
    { label: 'Home Decor', href: '/shop?category=home-decor' },
  ]},
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount, wishlist, user, setCartOpen } = useStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (pathname?.startsWith('/admin')) return null;
  return (
    <>
      {/* Main Navbar Wrapper */}
      <div className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-4 pt-4 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
        <nav className={`container max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-white/80 backdrop-blur-md py-4 border border-white/50'}`}>
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center text-white font-black text-sm">M13</div>
              <span className="gradient-text hidden sm:block">M13 Design Studio</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-[#5A6472] hover:text-[#0A66FF] hover:bg-[#EEF4FF] transition-all"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#E5EBF4] py-2 z-50 animate-fade-in">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#5A6472] hover:text-[#0A66FF] hover:bg-[#EEF4FF] transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5A6472] hover:text-[#0A66FF] hover:bg-[#EEF4FF] transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/wishlist"
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#5A6472] hover:text-[#0A66FF] hover:bg-[#EEF4FF] transition-all"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {mounted && wishlist.length > 0 && (
                  <span className="notification-dot">{wishlist.length}</span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#5A6472] hover:text-[#0A66FF] hover:bg-[#EEF4FF] transition-all"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {mounted && cartCount() > 0 && (
                  <span className="notification-dot">{cartCount()}</span>
                )}
              </button>

              <Link
                href={mounted && user ? '/account' : '/login'}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#0A66FF] transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <User size={15} />
                <span>{mounted && user ? user.name.split(' ')[0] : 'Sign In'}</span>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#5A6472] hover:bg-[#EEF4FF] transition-all"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div className="h-24 md:h-32" /> {/* Spacer */}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <span className="font-bold text-xl gradient-text">M13 Design Studio</span>
          <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-lg bg-[#F8FAFD] flex items-center justify-center">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl font-medium text-[#0D1117] hover:bg-[#EEF4FF] hover:text-[#0A66FF] transition-all">
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 mb-2">
                  {link.children.map((child) => (
                    <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-[#5A6472] hover:text-[#0A66FF] rounded-lg hover:bg-[#EEF4FF] transition-all">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-[#E5EBF4]">
            <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
              <User size={15} /> Login / Signup
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#5A6472]">
            <a href="tel:+919876543210" className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</a>
            <a href="mailto:hello@m13designstudio.com" className="flex items-center gap-2"><Mail size={14} /> hello@m13designstudio.com</a>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[998]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
