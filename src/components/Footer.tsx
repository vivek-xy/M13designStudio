'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const SocialIcons = {
  Instagram: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

const FOOTER_LINKS = {
  Shop: [
    { label: 'Wall Art', href: '/shop?category=wall-art' },
    { label: 'Personalized', href: '/shop?category=personalized' },
    { label: 'Religious Art', href: '/shop?category=religious' },
    { label: 'Photo Frames', href: '/shop?category=photo-frames' },
    { label: 'Home Decor', href: '/shop?category=home-decor' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Order', href: '/account/orders' },
    { label: 'Return Policy', href: '/returns' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const SOCIALS = [
  { icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
  { icon: SocialIcons.Facebook, href: '#', label: 'Facebook' },
  { icon: SocialIcons.Twitter, href: '#', label: 'Twitter' },
  { icon: SocialIcons.Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');

  if (pathname?.startsWith('/admin')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { toast.error('Enter a valid email'); return; }
    toast.success('🎉 Subscribed! Expect exclusive offers in your inbox.', {
      style: { borderRadius: '12px', background: '#0D1117', color: '#fff' },
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#0D1117] text-white mt-32">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#0A66FF] to-[#4D8FFF] py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">Get Exclusive Offers & Art Inspiration</h3>
              <p className="text-blue-100 text-lg">Join 50,000+ art lovers. No spam, just beauty.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="input-field flex-1 md:w-80 bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus:bg-white/20 py-3.5"
              />
              <button type="submit" className="px-6 py-3.5 bg-white text-[#0A66FF] font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] flex items-center justify-center font-black text-sm">M13</div>
              <span>M13 Design Studio</span>
            </Link>
            <p className="text-[#8B9BAD] text-sm leading-relaxed mb-6">
              Bringing handcrafted art and personalized masterpieces into your home. Every piece tells a story, every purchase supports an artist.
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#8B9BAD]">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-[#0A66FF]" /> +91 98765 43210
              </a>
              <a href="mailto:hello@m13designstudio.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} className="text-[#0A66FF]" /> hello@m13designstudio.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[#0A66FF]" /> Mumbai, Maharashtra, India
              </span>
            </div>
            <div className="flex gap-3 mt-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#8B9BAD] hover:bg-[#0A66FF] hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-sm mb-4">{section}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-[#8B9BAD] hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#5A6472]">
          <p>© {new Date().getFullYear()} M13 Design Studio. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart size={12} className="text-red-500 fill-red-500" /> in India</p>
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-8">
              <Image src="https://img.icons8.com/color/24/visa.png" alt="Visa" fill className="object-contain opacity-60" />
            </div>
            <div className="relative h-5 w-8">
              <Image src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" fill className="object-contain opacity-60" />
            </div>
            <div className="relative h-5 w-8">
              <Image src="https://img.icons8.com/color/24/upi-payment.png" alt="UPI" fill className="object-contain opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
