'use client';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours. 🎉');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-16">
        <div className="container text-center">
          <span className="badge badge-blue mb-3">Get In Touch</span>
          <h1 className="text-4xl font-black text-[#0D1117] mb-3">Contact Us</h1>
          <p className="text-[#5A6472] max-w-xl mx-auto">Have a question or custom order? We'd love to hear from you. Our team responds within 24 hours.</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {[
              { icon: Phone, title: 'Call Us', info: '+91 98765 43210', sub: 'Mon–Sat, 10am–7pm', href: 'tel:+919876543210' },
              { icon: Mail, title: 'Email Us', info: 'hello@m13designstudio.com', sub: 'We reply within 24 hours', href: 'mailto:hello@m13designstudio.com' },
              { icon: MessageCircle, title: 'WhatsApp', info: '+91 98765 43210', sub: 'Quick support on WhatsApp', href: 'https://wa.me/919876543210' },
              { icon: MapPin, title: 'Visit Us', info: 'Mumbai, Maharashtra', sub: 'India 400001', href: '#' },
              { icon: Clock, title: 'Business Hours', info: 'Mon – Sat: 10am – 7pm', sub: 'Sun: Closed', href: '#' },
            ].map(({ icon: Icon, title, info, sub, href }) => (
              <a key={title} href={href} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#E5EBF4] hover:border-[#0A66FF] hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0 group-hover:bg-[#0A66FF] transition-all">
                  <Icon size={18} className="text-[#0A66FF] group-hover:text-white transition-all" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-[#0D1117] font-medium text-sm">{info}</p>
                  <p className="text-xs text-[#8B9BAD]">{sub}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5EBF4] p-8">
            <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium mb-1.5">Name *</label><input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
              <div><label className="block text-sm font-medium mb-1.5">Email *</label><input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1.5">Subject</label>
                <select className="input-field" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                  <option value="">Select a topic...</option>
                  <option>Order Inquiry</option><option>Custom Order</option><option>Return/Refund</option><option>Product Question</option><option>Wholesale</option>
                </select>
              </div>
              <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1.5">Message *</label><textarea className="input-field" rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required /></div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary gap-2"><Send size={16} /> Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
