"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  PhoneCall,
  MapPin,
  HelpCircle,
  Briefcase,
  Truck,
  Package,
  ChevronRight,
  ExternalLink,
  Search,
  MessageSquare,
  Ticket
} from "lucide-react";
import React from "react";

// --- Framer Motion Configurations ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function SupportPage() {
  const helpChannels = [
    {
      title: "CUSTOMER SUPPORT",
      icon: HelpCircle,
      desc: "Click here to read our FAQs. For support with your bookings and other queries, email us at help@theporter.in or call us on 022 4410 4410.",
      email: "help@theporter.in",
      phone: "022 4410 4410",
    },
    {
      title: "DRIVE WITH PORTER",
      icon: Truck,
      desc: "Are you a tempo truck owner? partner with us. Call 97144242323. Have a mini truck or bike? Earn money by fulfilling orders. Call 022 4410 4410.",
      phone: "97144242323",
      phoneAlt: "022 4410 4410",
      isDriver: true
    },
    {
      title: "PACKERS AND MOVERS",
      icon: Package,
      desc: "For queries and support regarding your house shifting booking, email us at packermover@theporter.in or call us on 022 4410 4444 or 022 6268 4444.",
      email: "packermover@theporter.in",
      phone: "022 4410 4444",
      phoneAlt: "022 6268 4444"
    },
    {
      title: "ENTERPRISE SERVICES",
      icon: Briefcase,
      desc: "If you are an enterprise and are looking for goods transportation services for your business, Click here or mail us at help@theporter.in",
      email: "help@theporter.in",
    }
  ];

  const headOffice = {
    city: "Bangalore",
    address: "Porter Head Office, BCM Prime 1st Cross, BDA Layout, Bannerghatta Main Rd, New Gurappana Palya, Tavarekere Extension, Bengaluru, Karnataka 560041"
  };

  const regionalOffices = [
    { city: "Mumbai", address: "SmartShift Logistics Solutions Pvt. Ltd., No. A - 501, A - 502, B - 504, B - 505 and B - 506, Universal Business Park, Chandivali Farm Road, Off. Saki Vihar Road, Andheri (East), Mumbai, Maharashtra - 400 072" },
    { city: "Delhi NCR", address: "3rd Floor, Plot No, sharma place, D-18, Block D, Noida Sector 3, Noida, Uttar Pradesh 201301" },
    { city: "Hyderabad", address: "Smartshift Logistics Solutions Pvt. Ltd, Darshak Chambers, Ground Floor & 1st Floor, No. 1-8-303/48/32/A, Situated near Patigadda, Rasoolpura, Secunderabad, Telangana - 500003" },
    { city: "Chennai", address: "Smartshift Logistics Solutions Pvt. Ltd (Porter), 672/476, 8th Floor, Temple Tower, Anna Salai, CIT Nagar East, Nandanam, Chennai, Tamil Nadu 600035" },
    { city: "Pune", address: "Office No 305 Elite Primo Building Dasara Chowk Balewadi Pune- 411045" },
    { city: "Ahmedabad", address: "304-306, Sachet - 4, Nr. Prernatirth Derasar, Satellite, Ahmedabad-380015" },
    { city: "Jaipur", address: "149, First Floor, Rathore Nagar, Amrapali Marg, Vaishali Nagar, Jaipur - 302021" },
    { city: "Kolkata", address: "Smartshift Logistics Solutions Pvt Ltd. Asyst Park, 6th Floor, Zone A, GN 37/1, Salt Lake City, Sector V, Kolkata 700091" },
    { city: "Surat", address: "1st Floor, Soham Square, Part - B, Opp. Metro Mall, Above Bank of Baroda, Hookumchand Nagar, Bamroli, Althan VIP Road, Surat, Gujarat - 395017" },
    { city: "Lucknow", address: "B-42, Vibhuti Khand,Adjacent to R.K.Timber Gomti Nagar, Lucknow, Uttar Pradesh-226010" },
    { city: "Coimbatore", address: "No.260, VV Complex , 1st Floor ,Avaram Palayam Road,New Siddhapudur, Coimbatore , Tamil Nadu 641044" },
    { city: "Indore", address: "Office no 105 , Saviri Empire , Om Gurudev Plaza Bhamori , Near new Duniya Office , Indore 452010" },
    { city: "Nagpur", address: "Office No.117 and Flat No.121, 1st Floor, Shree Ganesha Heights, Khamla Square, Ring Road, Nagpur, Maharashtra, 440025" },
    { city: "Chandigarh", address: "Plot no 434 Industrial Area Phase 9 Mohali-160062, Punjab" },
    { city: "Vadodara", address: "202- Pratham Complex, Sampat Rao Colony, Nr- Laxmi hall lane, R.C Dutt road, Alkapuri, Vadodara, Gujarat - 390007" },
    { city: "Ludhiana", address: "2nd Floor, Salh Complex, 925-A, Gill Road, Dasmesh Nagar, New Kartar Nagar, Ludhiana, Punjab - 141003" },
    { city: "Kochi", address: "Smartshift Logistics Solutions Pvt Ltd, Door No.43/1624, Chacko Chambers, Near Signal Jn, Civil Line Road, Palarivattom, Kochi-682025" },
    { city: "Nashik", address: "Smartshift Logistics Solutions Pvt Ltd, Rectangle1 building, 3rd Floor, near ITI bridge, Kamathwada, Nashik, Maharashtra 422007" },
    { city: "Kanpur", address: "1st Floor, 111/425, 80 Feet Rd, beside Bandhan Bank, Ashok Nagar, Harsh Nagar, Kanpur, Uttar Pradesh 208012" },
    { city: "Noida", address: "3rd Floor, Plot No, Sharma Place, D-18, Block D, Sector 3, Noida, Uttar Pradesh 201301" },
    { city: "Visakhapatnam", address: "The Cowork Spaces, C/o Sadguruji Chambers, Flat No 301,302&303, 3rd Floor, GVK PLAZA, Besides the Central Bank of India, Seethammapeta, Visakhapatnam, Andhra Pradesh - 530016" },
    { city: "Thiruvananthapuram", address: "Smartshift Logistics Solutions Pvt.Ltd Module 220, First Floor TC 98/3715-2, The Atomic Near Technopark Phase-1, Kazhakkuttom PO Thiruvananthapuram, Kerala, India-695 582" },
  ].sort((a, b) => a.city.localeCompare(b.city));

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Ultra-Premium Help Hero */}
      <section className="relative pt-40 pb-32 flex flex-col items-center w-full overflow-hidden text-center z-10 bg-white border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: "linear-gradient(#0445DA10 1px, transparent 1px), linear-gradient(90deg, #0445DA10 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute top-0 right-1/4 w-[1000px] h-[500px] bg-[#0445DA]/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-[70rem] mx-auto px-6 md:px-8 relative z-10 w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0445DA]/5 border border-[#0445DA]/10 text-[#0445DA] font-bold text-[10px] uppercase tracking-[0.25em] mb-6 shadow-sm backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-[#0445DA] animate-pulse" /> Support Operations
            </div>
            
            <motion.h1 variants={fadeUpVariant} initial="hidden" animate="visible" className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0445DA] to-indigo-600">help you?</span>
            </motion.h1>
            <p className="text-slate-500 font-medium text-lg md:text-xl mb-12 text-center max-w-2xl">
              From business integrations to delivery queries, our specialized teams are on standby to accelerate your logistics.
            </p>
            
            {/* Highly Interactive Search */}
            <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className="relative w-full max-w-3xl group mx-auto">
               <div className="absolute -inset-1 bg-gradient-to-r from-[#0445DA]/20 to-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
               <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-full h-[4.5rem] w-full px-6 focus-within:border-[#0445DA] focus-within:shadow-[0_0_0_4px_rgba(4,69,218,0.1)] transition-all overflow-hidden shadow-xl shadow-slate-200/50">
                  <Search className="text-slate-400 group-focus-within:text-[#0445DA] ml-2 mr-4 shrink-0 transition-colors" size={24} strokeWidth={2.5} />
                  <input 
                    type="text" 
                    placeholder="Search by tracking ID, keyword, or inquiry..." 
                    className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 text-[17px] font-semibold h-full w-full"
                  />
                  <button className="bg-slate-900 hover:bg-[#0445DA] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-colors shadow-sm ml-2">
                     Search
                  </button>
               </div>
            </motion.div>
        </div>
      </section>

      {/* 2. Direct Channels */}
      <section className="relative z-10 py-28 bg-[#F8FAFC]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-10">
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Direct Channels.</h2>
                <p className="text-slate-500 font-medium text-lg">Skip the queue and connect with the exact department.</p>
              </div>
           </motion.div>

           <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpChannels.map((channel, idx) => (
                 <motion.div key={idx} variants={fadeUpVariant} className="bg-white border text-left border-slate-200 rounded-[2rem] p-8 flex flex-col hover:shadow-2xl hover:shadow-[#0445DA]/10 hover:border-[#0445DA] transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#0445DA]/5 transition-colors" />
                    
                    <div className="w-16 h-16 rounded-[1.25rem] bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-md mb-8 group-hover:scale-110 group-hover:bg-[#0445DA] transition-all duration-500 relative z-10">
                       <channel.icon size={26} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-[#0445DA] transition-colors relative z-10 leading-tight">{channel.title}</h3>
                    <p className="text-slate-500 text-[14px] leading-relaxed mb-8 font-medium flex-grow relative z-10">
                       {channel.desc}
                    </p>
                    
                    <div className="flex flex-col gap-2 mt-auto relative z-10">
                        {channel.email && (
                          <a href={`mailto:${channel.email}`} className="w-full inline-flex items-center justify-between gap-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-900 hover:text-white px-5 py-3.5 rounded-xl transition-all shadow-sm tracking-widest uppercase">
                             <span className="flex items-center gap-2"><Mail size={16} /> Send Email</span>
                             <ChevronRight size={14} className="opacity-50" />
                          </a>
                        )}
                        {channel.phone && (
                          <a href={`tel:${channel.phone.replace(/\s+/g, '')}`} className="w-full inline-flex items-center justify-between gap-2 text-[14px] font-bold text-[#0445DA] bg-[#0445DA]/5 border border-[#0445DA]/10 hover:bg-[#0445DA] hover:text-white px-5 py-3.5 rounded-xl transition-all shadow-sm tracking-wide">
                             <span className="flex items-center gap-2"><PhoneCall size={16} /> {channel.phone}</span>
                             <ChevronRight size={14} className="opacity-50" />
                          </a>
                        )}
                        {channel.phoneAlt && (
                          <a href={`tel:${channel.phoneAlt.replace(/\s+/g, '')}`} className="w-full mt-1 inline-flex items-center justify-between gap-2 text-[14px] font-bold text-[#0445DA] bg-[#0445DA]/5 border border-[#0445DA]/10 hover:bg-[#0445DA] hover:text-white px-5 py-3.5 rounded-xl transition-all shadow-sm tracking-wide">
                             <span className="flex items-center gap-2"><PhoneCall size={16} /> {channel.phoneAlt}</span>
                             <ChevronRight size={14} className="opacity-50" />
                          </a>
                        )}
                    </div>
                 </motion.div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* 3. Global Nodes */}
      <section className="relative z-10 py-28 bg-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 md:px-10">
            
            {/* Global Command Center (Head Office) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="mb-32 relative">
               <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent -z-10 hidden lg:block" />
               <div className="text-center mb-10">
                  <span className="bg-slate-900 text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase inline-block mb-4 shadow-sm">Command Center</span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2">Headquarters.</h2>
               </div>
               
               <div className="max-w-4xl mx-auto bg-[#0445DA] rounded-[3rem] p-2 md:p-3 shadow-[0_30px_60px_-15px_rgba(4,69,218,0.3)] relative group">
                  <div className="bg-white rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[40px] border-[#0445DA]/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                     
                     <div className="w-32 h-32 shrink-0 bg-slate-50 border-2 border-slate-100 rounded-full flex items-center justify-center relative z-10">
                        <div className="absolute inset-0 border border-[#0445DA]/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                        <Building2 size={48} className="text-[#0445DA] group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     
                     <div className="relative z-10 text-center md:text-left flex-grow max-w-md">
                        <h4 className="text-3xl font-black tracking-tight text-slate-900 mb-4">{headOffice.city} <span className="text-[#0445DA]">HQ</span></h4>
                        <p className="text-slate-500 font-medium text-[15px] leading-relaxed mb-8">
                           {headOffice.address}
                        </p>
                        <a href="#" className="inline-flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-[#0445DA] px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-1">
                           Navigate to HQ <ExternalLink size={16} />
                        </a>
                     </div>
                  </div>
               </div>
            </motion.div>
            
            {/* Regional Offices Directory */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center mb-16">
               <h3 className="text-4xl font-black text-slate-900 tracking-tight flex flex-col items-center gap-4">
                  Regional Hubs.
                  <span className="w-12 h-1.5 bg-[#0445DA] rounded-full inline-block" />
               </h3>
               <p className="text-slate-500 font-medium mt-4">All Over India (20+)</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {regionalOffices.map((office, idx) => {
                  const initial = office.city.charAt(0).toUpperCase();
                  return (
                    <motion.div key={idx} variants={fadeUpVariant} className="flex flex-col bg-[#F8FAFC] border border-slate-200 p-8 rounded-[2rem] hover:bg-slate-900 hover:border-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-500 group relative overflow-hidden h-full">
                       {/* Background Alphabet Watermark */}
                       <div className="absolute -bottom-6 -right-2 text-[140px] font-black text-slate-100 group-hover:text-white/5 leading-none pointer-events-none select-none transition-colors duration-500 z-0">
                         {initial}
                       </div>
                       
                       <div className="relative z-10 flex flex-col h-full">
                         <div className="flex items-center gap-4 mb-5">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#0445DA] transition-colors border border-slate-100 shrink-0">
                               <MapPin size={18} className="text-[#0445DA] group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight">{office.city}</h4>
                         </div>
                         <p className="text-slate-500 text-[13.5px] leading-relaxed mb-8 flex-grow font-medium group-hover:text-slate-400 transition-colors">
                            {office.address}
                         </p>
                         <a href="#" className="inline-flex items-center justify-between w-full text-[11px] font-bold text-slate-500 border border-slate-200 bg-white group-hover:bg-transparent group-hover:border-slate-500 group-hover:text-white uppercase tracking-[0.15em] px-5 py-3.5 rounded-xl transition-all mt-auto shadow-sm group-hover:shadow-none">
                            <span>Get Route</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </a>
                       </div>
                    </motion.div>
                  )
               })}
            </motion.div>

        </div>
      </section>

    </main>
  );
}
