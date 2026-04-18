"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  MapPin,
  Truck,
  Bike,
  ShieldCheck,
  Banknote,
  Navigation,
  Clock,
  HeartPulse,
  Fuel,
  TrendingUp,
  User,
  Users,
  PhoneCall,
  ArrowRight,
  Plus,
  Play,
  Wallet,
  Star,
  Quote,
  Award,
  ChevronRight,
  Lock
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// --- Framer Motion Configurations ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Form Component ---
function DriverForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "MUMBAI", vehicle: "", source: "" });
  const [submitted, setSubmitted] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const FloatField = ({
    id, label, type = "text", icon: Icon
  }: { id: keyof typeof form; label: string; type?: string; icon?: any }) => {
    return (
      <motion.div variants={itemVariants} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#0445DA] transition-colors duration-300 z-10 pointer-events-none">
          {Icon && <Icon size={16} />}
        </div>
        <input
          type={type}
          id={id}
          required
          value={form[id]}
          onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
          placeholder=" "
          className="peer w-full bg-slate-50/50 border border-slate-200/80 rounded-[14px] pl-11 pr-4 pt-5 pb-1.5 text-slate-900 text-[13.5px] font-semibold outline-none focus:bg-white focus:border-[#0445DA]/50 focus:ring-4 focus:ring-[#0445DA]/10 transition-all shadow-sm placeholder-transparent hover:border-slate-300 h-[52px]"
        />
        <label
          htmlFor={id}
          className="absolute left-11 top-[16.5px] text-sm text-slate-500 transition-all duration-300 pointer-events-none z-10 peer-focus:top-[6px] peer-focus:text-[10px] peer-focus:text-[#0445DA] peer-focus:tracking-widest peer-focus:uppercase peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-[6px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#0445DA] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold"
        >
          {label}
        </label>
      </motion.div>
    );
  };

  const SelectField = ({
    id, label, options, icon: Icon
  }: { id: keyof typeof form; label: string; options: string[]; icon?: any }) => {
    return (
      <motion.div variants={itemVariants} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[#0445DA] peer-valid:text-[#0445DA] transition-colors duration-300 z-10 pointer-events-none">
          {Icon && <Icon size={16} />}
        </div>
        <select
          id={id}
          required
          value={form[id]}
          onChange={(e) => setForm((p) => ({ ...p, [id]: e.target.value }))}
          className="peer w-full bg-slate-50/50 border border-slate-200/80 rounded-[14px] pl-11 pr-10 pt-5 pb-1.5 text-slate-900 text-[13.5px] font-semibold outline-none focus:bg-white focus:border-[#0445DA]/50 focus:ring-4 focus:ring-[#0445DA]/10 transition-all shadow-sm appearance-none hover:border-slate-300 cursor-pointer h-[52px] text-transparent focus:text-slate-900 valid:text-slate-900"
        >
          <option value="" disabled hidden className="text-slate-500"></option>
          {options.map((o) => <option key={o} value={o} className="text-slate-900">{o}</option>)}
        </select>
        <label
          htmlFor={id}
          className="absolute left-11 top-[16.5px] text-sm text-slate-500 transition-all duration-300 pointer-events-none z-10 peer-focus:top-[6px] peer-focus:text-[10px] peer-focus:text-[#0445DA] peer-focus:tracking-widest peer-focus:uppercase peer-focus:font-bold peer-valid:top-[6px] peer-valid:text-[10px] peer-valid:text-[#0445DA] peer-valid:tracking-widest peer-valid:uppercase peer-valid:font-bold"
        >
          {label}
        </label>
        <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
      </motion.div>
    );
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] p-12 text-center shadow-[0_24px_80px_rgba(4,69,218,0.15)] flex flex-col items-center justify-center min-h-[400px]">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 15 }}
          className="w-16 h-16 bg-gradient-to-br from-[#0445DA] to-indigo-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0445DA]/30 z-10"
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight z-10 relative">Request Received</h3>
        <p className="text-slate-500 text-sm font-medium max-w-[240px] mx-auto leading-relaxed z-10 relative">Our partner onboarding team will contact you shortly.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto z-10 group/form">
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_24px_80px_-24px_rgba(4,69,218,0.15)] relative border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_100px_-24px_rgba(4,69,218,0.2)]">
        
        <div className="mb-7 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#0445DA] mb-3 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#0445DA]/5" />
            <Truck size={22} fill="currentColor" fillOpacity={0.1} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Attach Vehicle Now</h2>
          <p className="text-slate-500 text-xs mt-1.5 font-medium">Earn daily trips with regular incentives.</p>
        </div>

        <motion.form
          variants={formVariants} initial="hidden" animate="visible"
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="flex flex-col gap-4 relative z-10"
        >
          <FloatField id="name" label="Name" icon={User} />
          <FloatField id="phone" label="Mobile Number" type="tel" icon={PhoneCall} />
          <SelectField id="city" label="City" icon={MapPin} options={["MUMBAI", "DELHI", "BANGALORE", "HYDERABAD", "CHENNAI", "PUNE"]} />
          <SelectField id="vehicle" label="Vehicle" icon={Truck} options={["Tata Ace / Chota Hathi", "Pickup 8ft", "2 Wheeler", "3 Wheeler", "Canter"]} />
          <SelectField id="source" label="Source" icon={Building2} options={["Facebook", "Google", "Friend / Referral", "Advertisement"]} />

          <motion.button
            variants={itemVariants}
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-1 bg-gradient-to-r from-[#0445DA] to-blue-700 text-white font-bold py-3.5 rounded-[14px] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-[#0445DA]/20 hover:shadow-[#0445DA]/30 text-sm tracking-widest uppercase"
          >
            REGISTER
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

// --- Driver Page Content ---
export default function DriverPartnerPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">

      {/* 1. Light Theme Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 min-h-[90vh] flex items-center w-full overflow-hidden bg-[#F7F9FC] border-b border-slate-100">
        
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(4,69,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(4,69,218,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-[#0445DA]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[88rem] mx-auto px-6 md:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
             
             {/* Left Typography */}
             <div className="flex flex-col items-start text-left max-w-2xl relative z-20">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#0445DA] font-bold text-[10px] uppercase tracking-[0.2em] mb-8 shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-[#0445DA] animate-pulse" />
                   Partner Network
                 </div>
                 
                 <motion.h1 variants={fadeUpVariant} initial="hidden" animate="visible" className="text-5xl sm:text-[4.5rem] font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
                   Drive effectively. <br />
                   <span className="text-[#0445DA]">Earn daily.</span>
                 </motion.h1>

                 <p className="text-slate-500 text-lg mb-12 max-w-lg leading-relaxed font-medium">
                   Attach your vehicle with the largest logistics network. No haggling. Assured daily trips. Instant payouts.
                 </p>

                 {/* Trust Badges */}
                 <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <motion.div variants={fadeUpVariant} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:shadow-[0_12px_24px_rgba(4,69,218,0.05)] transition-shadow">
                       <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0 border border-green-100">
                          <Banknote size={24} strokeWidth={2} />
                       </div>
                       <div>
                         <h4 className="text-slate-900 font-bold text-[15px] mb-0.5">Assured Income</h4>
                         <p className="text-slate-500 text-xs font-semibold">Weekly incentives & surge</p>
                       </div>
                    </motion.div>
                    
                    <motion.div variants={fadeUpVariant} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:shadow-[0_12px_24px_rgba(4,69,218,0.05)] transition-shadow">
                       <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0445DA] shrink-0 border border-blue-100">
                          <CheckCircle2 size={24} strokeWidth={2} />
                       </div>
                       <div>
                         <h4 className="text-slate-900 font-bold text-[15px] mb-0.5">Instant Verification</h4>
                         <p className="text-slate-500 text-xs font-semibold">Start earning in 24 hours</p>
                       </div>
                    </motion.div>
                 </motion.div>
             </div>

             {/* Right Form */}
             <div className="relative w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
                <DriverForm />
             </div>

          </div>
        </div>
      </section>

      {/* 2. MAKING YOUR LIFE EASY */}
      <section className="py-24 bg-white relative z-10 border-b border-slate-100">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0445DA] tracking-[0.2em] uppercase mb-4">Driver Experience</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Making Your <span className="text-[#0445DA]">Life Easy</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Attach Any Vehicle", desc: "Attach any of your pickup, 2-wheeler, canter commercial vehicles. If you have a pickup or a commercial vehicle, you are good to go!" },
              { icon: Clock, title: "No More Waiting", desc: "No more waiting on the stand. Have a steady stream of trips with minimum assured income and added incentives, so that there is no waiting and idle time at the stand!" },
              { icon: Banknote, title: "Standard Rates", desc: "The rates and calculation methods are standardised and completely transparent. No more wasting time in fixing the rates for every trip." },
              { icon: Navigation, title: "Hassle Free Navigation", desc: "With our GPS-based navigation you can drive anywhere across your city without worrying about the directions. Get real-time navigation assistance on the go!" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-[#F8FAFC] border border-slate-200 rounded-[2rem] p-8 flex flex-col items-start hover:shadow-[0_24px_48px_-12px_rgba(4,69,218,0.15)] hover:border-[#0445DA]/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white text-[#0445DA] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 mb-6 group-hover:bg-[#0445DA] group-hover:border-[#0445DA] group-hover:text-white transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <feature.icon size={26} strokeWidth={1.5} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 mb-3 group-hover:text-[#0445DA] transition-colors">{feature.title}</h4>
                <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRANSFORMING LIVES */}
      <section className="py-28 bg-[#F8FAFC] relative z-10 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(4,69,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(4,69,218,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        
        <div className="max-w-[88rem] mx-auto px-6 md:px-10 relative z-10 text-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="relative h-[440px] w-full bg-white border border-slate-200 rounded-[2.5rem] p-8 overflow-hidden shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] bg-[#0445DA]/5 rounded-full animate-ping opacity-50" />
                <div className="absolute w-[240px] h-[240px] border border-slate-100 rounded-full animate-[spin_15s_linear_infinite] border-dashed" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center gap-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-white shadow-md flex items-center justify-center text-slate-400 -rotate-12"><User size={24} /></div>
                  <div className="w-20 h-20 rounded-full bg-[#0445DA] border-4 border-white shadow-[0_12px_24px_rgba(4,69,218,0.25)] flex items-center justify-center text-white z-10 scale-110"><Users size={32} /></div>
                  <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-white shadow-md flex items-center justify-center text-slate-400 rotate-12"><User size={24} /></div>
                </div>
                <div>
                  <h4 className="text-6xl font-black tracking-tighter text-slate-900">7.5L+</h4>
                  <p className="text-[#0445DA] text-sm font-bold tracking-[0.2em] uppercase mt-2">Active Partners</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-[#0445DA] font-bold text-[10px] uppercase tracking-widest mb-6 w-fit border border-blue-100">
                 <MapPin size={12} /> Expanding Impact
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
                Transforming Lives
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                A robust livelihood option for thousands of driver-partners globally. Become a part of a dignified workspace that assures timely payments and immense structural benefits.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-3xl font-black text-[#0445DA] mb-1">21+</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cities</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-3xl font-black text-[#0445DA] mb-1">10X</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Growth Rate</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ADDITIONAL BENEFITS GRID */}
      <section className="py-28 bg-white relative z-10">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Partner Perks</p>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Additional <span className="text-[#0445DA]">Benefits</span>
            </h3>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: HeartPulse, t: "Health Care", d: "Comprehensive healthcare and accidental insurance plans for active partners." },
              { i: ShieldCheck, t: "Vehicle Insurance", d: "Special discounts exclusively tailored for partner vehicle renewals." },
              { i: Fuel, t: "Fuel Discounts", d: "Partnership with active vendors to offer reduced fuel expenditure." },
              { i: Award, t: "Lifestyle Quality", d: "Guaranteed personal time bringing better standards of living to your family." }
            ].map((ben, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="bg-white hover:bg-slate-900 p-8 rounded-[2rem] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_48px_-12px_rgba(4,69,218,0.25)] border border-slate-200 hover:border-slate-800 transition-all duration-500 cursor-pointer group">
                <div className="w-14 h-14 bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#0445DA] group-hover:border-[#0445DA] group-hover:text-white transition-all duration-500">
                  <ben.i size={24} />
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 group-hover:text-white mb-3 transition-colors duration-500">{ben.t}</h4>
                <p className="text-slate-500 group-hover:text-slate-400 font-medium text-[13.5px] leading-relaxed transition-colors duration-500">{ben.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. WHAT OUR HEROES SAY */}
      <section className="py-28 bg-[#F8FAFC] relative z-10 border-y border-slate-100">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center mb-16">
            <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Testimonials</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">What Our Heroes Say</h3>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul T.", v: "Mini Truck", txt: "It shifted my life. I now own two vehicles and my earnings have more than doubled since I attached my truck here. On time tracking is incredible." },
              { name: "Amit K.", v: "Two Wheeler", txt: "Super flexible working structure. I take out my scooter after my day job and earn substantial extra income. Totally stress free ecosystem." },
              { name: "Suresh P.", v: "8ft Open", txt: "I've been driving for 10 years, and the payment structure here is unmatched. Zero manual negotiation with parties; pure systematic trips." }
            ].map((test, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden group hover:border-[#0445DA]/30 hover:shadow-[0_20px_40px_-15px_rgba(4,69,218,0.15)] transition-all duration-300">
                <Quote size={40} className="text-slate-100 absolute top-8 right-8 rotate-180 group-hover:text-[#0445DA]/10 transition-colors duration-300" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 bg-[#0445DA] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(4,69,218,0.3)]">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{test.name}</h4>
                    <span className="text-[10px] text-[#0445DA] uppercase tracking-widest font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md mt-1 inline-block ">{test.v}</span>
                  </div>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-8 relative z-10 text-[14.5px]">"{test.txt}"</p>

                <div className="flex gap-1 text-[#0445DA] relative z-10">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={15} fill="currentColor" />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. REFER & EARN Callout */}
      <section className="py-28 bg-white relative z-10">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <div className="bg-[#0445DA] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-[#0445DA]/30">
            {/* Internal glowing elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Refer Your Friends. <br />Earn Extra Bonuses.</h3>
                <p className="text-white/80 text-lg font-medium max-w-xl mb-10 leading-relaxed">
                  Bring your driver friends to the platform. For every successful onboarding, get up to <span className="bg-white/20 px-2 py-1 rounded-md text-white font-bold ml-1 border border-white/20">₹5,000</span> directly in your wallet.
                </p>
                <button className="bg-white text-[#0445DA] hover:bg-slate-50 font-bold py-4 px-8 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 block max-w-max">
                  Start Referring Now
                </button>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-[280px] h-[280px] bg-white/10 border border-white/20 rounded-full backdrop-blur-sm flex items-center justify-center relative">
                  <div className="w-[180px] h-[180px] bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                    <Users size={70} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-28 bg-[#F8FAFC] z-10 relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="mb-16 text-center">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h3>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "What all vehicles does Porter attach?", a: "We accept diverse vehicles including Two-Wheelers, Three-Wheelers (Ape, Champion), and 4-Wheelers like Tata Ace, Pickup 8ft, and small mini trucks." },
              { q: "What are the required documents?", a: "You need a valid Driving License, Aadhar Card, Vehicle RC, Insurance paper, and a neat photograph of your vehicle." },
              { q: "How long is the onboarding process?", a: "Verification typically completes within 48 hours, and you can start accepting trips on the platform immediately after." },
              { q: "Do I have a fixed schedule to stick to?", a: "No! The network allows entirely flexible scheduling. Work whenever you turn the app on; pause when you don't." },
            ].map((faq, idx) => (
              <motion.div
                key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className={`border rounded-[1.5rem] transition-all duration-300 ${openFaqIndex === idx ? 'border-[#0445DA]/30 bg-white shadow-[0_12px_24px_-12px_rgba(4,69,218,0.15)]' : 'border-slate-200/80 bg-slate-50/50 hover:border-slate-300 hover:bg-white hover:shadow-sm'}`}
              >
                <button onClick={() => toggleFaq(idx)} className="w-full text-left py-7 px-8 flex items-center justify-between focus:outline-none">
                  <h3 className={`text-[17px] font-bold tracking-tight transition-colors ${openFaqIndex === idx ? 'text-[#0445DA]' : 'text-slate-900'}`}>{faq.q}</h3>
                  <div className={`shrink-0 transition-transform duration-300 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${openFaqIndex === idx ? 'bg-[#0445DA] text-white rotate-45' : 'bg-white border border-slate-200 text-slate-500'}`}><Plus size={18} strokeWidth={2.5} /></div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-slate-500 font-medium text-[15px] leading-relaxed max-w-3xl">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
