import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";

export default function Footer() {
  const cities = ["Delhi NCR", "Hyderabad", "Bangalore", "Mumbai", "Vadodara", "Chandigarh", "Jaipur", "Chennai", "Kolkata", "Indore", "Ahmedabad", "Surat", "Nagpur", "Lucknow", "Pune", "Coimbatore", "Kochi", "Ludhiana", "Nashik", "Kanpur", "Visakhapatnam", "Trivandrum"];

  const socialIcons = [
    { name: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { name: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
    { name: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", extra: "M6.5 6.5h.01M2 12c0-5 2-7 10-7s10 2 10 7-2 7-10 7-10-2-10-7z" },
    { name: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" },
    { name: "Youtube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z", extra: "M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" }
  ];

  return (
    <footer className="bg-[#121217] text-white pt-24 pb-12 w-full relative overflow-hidden z-0">
      
      {/* Massive Watermark */}
      <img 
        src="/logo.svg" 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[120%] opacity-5 mix-blend-screen pointer-events-none grayscale" 
      />

      <div className="max-w-[90rem] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Top Section: The Hook */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
            Move it<br />
            <span className="text-[#0445DA] flex items-center gap-4">with Porter. <ArrowRight size={48} className="hidden md:block opacity-50" /></span>
          </h2>

          <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors cursor-pointer w-full md:w-auto">
            <div className="bg-white p-2.5 rounded-2xl shrink-0">
              <QrCode size={40} className="text-[#0a0a0c]" />
            </div>
            <div>
              <p className="font-semibold text-white/90 text-sm tracking-wide">Scan to download app</p>
              <p className="text-[#0445DA] text-xs font-bold uppercase tracking-widest mt-1">Get the link</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Grid & Follow */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20 border-t border-white/10 pt-20">
          
          <div className="w-full lg:w-1/4">
            <img src="/logo.svg" alt="Porter Logo" className="h-7 mb-10 brightness-0 invert" />
            <div className="mb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-5">Follow us on</h4>
              <div className="flex items-center gap-3">
                {socialIcons.map((icon, i) => (
                  <a key={i} href="#" aria-label={icon.name} className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#0445DA] hover:text-white hover:border-[#0445DA] transition-all duration-300 hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[16px] h-[16px]">
                      <path d={icon.path} />
                      {icon.extra && <path d={icon.extra} />}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog"]
              },
              {
                title: "Quick Links",
                links: ["API Integration", "Packers & Movers", "Two Wheelers", "Trucks", "Porter Enterprise"]
              },
              {
                title: "Support",
                links: ["Contact Us", "Privacy Policy", "Terms of Service", "Terms of Service - API", "Insurance FAQs", "Zero Tolerance Policy"]
              },
              {
                title: "Countries",
                links: ["United Arab Emirates", "Turkey"]
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-[11px] font-bold uppercase text-zinc-500 mb-6 tracking-widest">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <Link href="#" className="text-[13px] font-medium text-gray-400 hover:text-white transition-all duration-300 block hover:translate-x-1">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Domestic Cities Grid (Pill UI) */}
        <div className="mb-20">
          <h4 className="text-[11px] font-bold text-zinc-500 mb-6 uppercase tracking-widest">Domestic Cities</h4>
          <div className="flex flex-wrap gap-3">
            {cities.map((city, idx) => (
              <div key={idx} className="rounded-full border border-gray-800/80 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-700 backdrop-blur-sm px-4 py-1.5 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer w-max">
                {city}
              </div>
            ))}
          </div>
        </div>

        {/* Frosted Bottom Bar */}
        <div className="backdrop-blur-xl border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative">
          {/* Subtle top glow to separate the bottom bar purely aesthetically */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div>
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Registered Office</h4>
            <p className="text-[10px] text-zinc-400 max-w-2xl leading-relaxed">
              <strong className="text-zinc-300 font-semibold mr-2">CIN: U74999MH2014PTC306120</strong>
              <br className="md:hidden" />
              <span className="opacity-80">No. A-501, 5th Floor, Universal Business Park, Chandivali Farm Road, Andheri (E), Mumbai, Maharashtra - 400072</span>
            </p>
          </div>
          <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest shrink-0">
            © 2026 SmartShift Logistics Pvt Ltd.
          </div>
        </div>

      </div>
    </footer>
  );
}
