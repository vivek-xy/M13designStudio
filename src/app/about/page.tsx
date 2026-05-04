import { Award, Users, Palette, Heart, Target, Globe } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Artworks Created', value: '500+' },
    { label: 'Artist Partners', value: '120+' },
    { label: 'Years of Excellence', value: '8+' },
  ];
  const values = [
    { icon: Palette, title: 'Handcrafted Quality', desc: 'Every artwork is carefully crafted by skilled Indian artists with meticulous attention to detail.' },
    { icon: Heart, title: 'Made with Love', desc: 'We pour passion into every personalized piece, making each creation a unique labor of love.' },
    { icon: Target, title: 'Customer First', desc: 'Your satisfaction is our priority. We ensure every experience exceeds expectations.' },
    { icon: Globe, title: 'Supporting Artists', desc: 'We partner with local artists across India, providing them a global platform to share their craft.' },
  ];

  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-20">
        <div className="container text-center max-w-3xl mx-auto">
          <span className="badge badge-blue mb-4">Our Story</span>
          <h1 className="text-5xl font-black text-[#0D1117] mb-5 leading-tight">Bringing Design to <span className="gradient-text">Life</span></h1>
          <p className="text-[#5A6472] text-lg leading-relaxed">Founded in 2016, M13 Design Studio was born from a love of art and a desire to make beautiful, handcrafted pieces accessible to everyone. We bridge the gap between talented artists and design-conscious homes.</p>
        </div>
      </div>

      <div className="container py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map(s => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-4xl font-black text-[#0A66FF] mb-1">{s.value}</p>
              <p className="text-[#5A6472] text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <span className="badge badge-blue mb-3">Our Mission</span>
            <h2 className="text-3xl font-bold mb-4">Design That Tells Your Story</h2>
            <p className="text-[#5A6472] leading-relaxed mb-4">At M13 Design Studio, we believe that art is not just decoration — it's an expression of who you are. Whether it's a custom portrait of your family, a devotional piece for your puja room, or a minimalist print for your workspace, we create art that resonates.</p>
            <p className="text-[#5A6472] leading-relaxed">We work with over 120 skilled artists — from traditional painters to contemporary digital designers — ensuring every style, every taste is represented in our collection.</p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <img src="https://picsum.photos/seed/about1/700/400" alt="Our workshop" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A66FF]/30 to-transparent" />
          </div>
        </div>

        {/* Values */}
        <div className="section-header">
          <h2>What We Stand For</h2>
          <div className="section-divider" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-white rounded-2xl border border-[#E5EBF4] p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-[#0A66FF]" />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-[#5A6472]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="section-header">
          <h2>Meet the Team</h2>
          <div className="section-divider" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Arjun Mehta', role: 'Founder & CEO', img: 'https://picsum.photos/seed/team1/200/200' },
            { name: 'Priya Nair', role: 'Head of Art Curation', img: 'https://picsum.photos/seed/team2/200/200' },
            { name: 'Ravi Sharma', role: 'Lead Artist Partner', img: 'https://picsum.photos/seed/team3/200/200' },
          ].map(m => (
            <div key={m.name} className="card-hover bg-white rounded-2xl border border-[#E5EBF4] p-6 text-center">
              <img src={m.img} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#EEF4FF]" />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-[#5A6472]">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
