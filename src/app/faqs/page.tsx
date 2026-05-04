'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days across India. For custom/personalized orders, please add 3–5 additional days for creation. Expedited shipping is available at checkout.' },
  { q: 'Are the artworks handmade or printed?', a: 'We offer both! Our canvas prints use premium archival-quality inks. Personalized portraits and custom pieces are hand-painted by our artist partners. Each listing clearly mentions the medium.' },
  { q: 'Can I customize any product?', a: 'Products marked with the "CUSTOM" badge accept personalization. You can add names, dates, photos, and special messages. For complex customizations, please contact us via WhatsApp.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day return policy for standard products in original, undamaged condition. Custom/personalized orders are non-refundable unless there is a quality defect. Contact us within 48 hours of delivery for issues.' },
  { q: 'Is my payment secure?', a: 'Absolutely! We use 256-bit SSL encryption for all transactions. We accept credit/debit cards, UPI, net banking, and cash on delivery. We never store your card details.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within India only. International shipping is coming soon! Sign up for our newsletter to be notified when we launch global shipping.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive an email and SMS with a tracking number. You can also track your order in the "My Account > Orders" section.' },
  { q: 'Can I get a bulk/wholesale discount?', a: 'Yes! We offer special pricing for bulk orders (10+ pieces) and corporate gifting. Please contact us at wholesale@m13designstudio.com for a custom quote.' },
];

export default function FAQsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <div className="bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFD] py-16 text-center">
        <span className="badge badge-blue mb-3">Help Center</span>
        <h1 className="text-4xl font-black text-[#0D1117] mb-3">Frequently Asked Questions</h1>
        <p className="text-[#5A6472]">Everything you need to know. Can't find an answer? <a href="/contact" className="text-[#0A66FF] hover:underline">Contact us</a></p>
      </div>
      <div className="container py-16 max-w-3xl">
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E5EBF4] overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                <span className="font-semibold text-[#0D1117]">{faq.q}</span>
                {open === i ? <ChevronUp size={18} className="text-[#0A66FF] shrink-0" /> : <ChevronDown size={18} className="text-[#8B9BAD] shrink-0" />}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#5A6472] leading-relaxed border-t border-[#E5EBF4] pt-4 animate-fade-in">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-br from-[#0A66FF] to-[#4D8FFF] rounded-3xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-blue-100 mb-4">Our support team is available 6 days a week</p>
          <a href="/contact" className="btn-secondary bg-white text-[#0A66FF] border-white inline-flex">Contact Support</a>
        </div>
      </div>
    </div>
  );
}
