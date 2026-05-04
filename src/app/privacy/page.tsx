export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly (name, email, phone, address) when placing orders or creating an account. We also collect usage data, browser info, and cookies to improve your experience.' },
    { title: '2. How We Use Your Information', content: 'Your data is used to process orders, send order confirmations and shipping updates, provide customer support, improve our website, send promotional offers (with your consent), and prevent fraud.' },
    { title: '3. Data Sharing', content: 'We do not sell your personal data. We share data only with service providers (shipping partners, payment gateways) necessary for order fulfillment. All partners are bound by confidentiality agreements.' },
    { title: '4. Payment Security', content: 'All payments are processed through PCI-DSS compliant gateways. We never store your full card details. Transactions are encrypted with 256-bit SSL.' },
    { title: '5. Cookies', content: 'We use cookies for session management, analytics, and personalization. You can control cookie settings in your browser. Disabling cookies may affect site functionality.' },
    { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal data. Email us at privacy@m13designstudio.com to exercise these rights. We respond within 30 days.' },
    { title: '7. Data Retention', content: 'We retain your data as long as your account is active or as needed to provide services. You can request account deletion at any time.' },
    { title: '8. Contact Us', content: 'For privacy-related queries, contact: privacy@m13designstudio.com or write to M13 Design Studio Privacy Team, Mumbai, Maharashtra, India 400001.' },
  ];
  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-16 text-center">
        <h1 className="text-4xl font-black text-[#0D1117] mb-3">Privacy Policy</h1>
        <p className="text-[#5A6472]">Last updated: March 15, 2024</p>
      </div>
      <div className="container py-16 max-w-3xl">
        <div className="prose max-w-none space-y-8">
          {sections.map(s => (
            <div key={s.title} className="bg-white rounded-2xl border border-[#E5EBF4] p-6">
              <h2 className="font-bold text-lg text-[#0D1117] mb-3">{s.title}</h2>
              <p className="text-[#5A6472] leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
