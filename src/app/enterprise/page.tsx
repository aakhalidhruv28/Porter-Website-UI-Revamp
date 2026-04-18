"use client";

import {
  motion, AnimatePresence, useMotionValue, useMotionTemplate,
  useInView, animate, useScroll, useTransform,
} from "framer-motion";
import {
  Building2, Users, ShieldCheck, ChevronRight, TrendingUp,
  CheckCircle2, Activity, ArrowRight, Plus, Truck, FlaskConical,
  Sofa, ShoppingCart, PackageCheck, MessageCircle, X, PhoneCall,
  MapPin, Mail, User, ArrowUpRight, Zap, Globe, Lock, Laptop, Apple,
  HardHat,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ComposableMap, Geographies, Geography, Marker,
} from "react-simple-maps";
import unifiedTripDetailsImg from "./unified-trip-details.png";
import paymentThroughWalletImg from "./payment-through-valid-wallet.png";
import completeClarityImg from "./complete-clarity.png";
import multiUserAccessImg from "./multiple-user-access.png";

// ─── Constants ────────────────────────────────────────────────
const GEO_URL = "/india-states.json";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const faqs = [
  { q: "What is Porter for Enterprise?", a: "Porter for Enterprise is a dedicated B2B logistics solution that integrates directly with your operations via API, offering a centralized dashboard and dedicated support." },
  { q: "How does the prepaid wallet work?", a: "The prepaid wallet allows you to load funds and automate payments for all your trips, eliminating the need for manual reconciliation and petty cash tracking." },
  { q: "Can I track multiple shipments at once?", a: "Yes, our centralized dashboard allows tracking hundreds of active shipments simultaneously with live ETA and status updates." },
  { q: "Is API integration difficult?", a: "No, we provide comprehensive documentation, SDKs, and a dedicated integration engineer to get your systems communicating with Porter within days." },
];

const clients = ["ITC", "•", "Delhivery", "•", "Amazon", "•", "Flipkart", "•", "Reliance", "•"];

// Porter-active cities with [lng, lat] for react-simple-maps
const CITY_MARKERS = [
  { name: "Mumbai", coords: [72.8777, 19.076], partners: "18,200+", volume: "3.2L/mo", major: true, insight: "Primary western logistics hub handling exceptionally high port-to-city goods transfer." },
  { name: "Delhi", coords: [77.1025, 28.7041], partners: "22,400+", volume: "4.1L/mo", major: true, insight: "Our largest operational network managing massive B2B retail distribution daily." },
  { name: "Bangalore", coords: [77.5946, 12.9716], partners: "16,800+", volume: "2.9L/mo", major: true, insight: "Tech-driven central logistics powering rapid e-commerce & enterprise fulfillment." },
  { name: "Hyderabad", coords: [78.4867, 17.385], partners: "12,500+", volume: "2.1L/mo", major: true, insight: "Highly optimized routes serving thriving pharma and manufacturing sectors." },
  { name: "Chennai", coords: [80.2707, 13.0827], partners: "10,200+", volume: "1.8L/mo", major: true, insight: "Crucial automotive and industrial parts transport across the southern corridor." },
  { name: "Kolkata", coords: [88.3639, 22.5726], partners: "8,800+", volume: "1.4L/mo", major: true, insight: "Vital eastern gateway for FMCG and heavy construction logistics." },
  { name: "Pune", coords: [73.8553, 18.5204], partners: "9,400+", volume: "1.6L/mo", major: false, insight: "Rapidly expanding IT and auto manufacturing transport hub." },
  { name: "Ahmedabad", coords: [72.5714, 23.0225], partners: "7,600+", volume: "1.2L/mo", major: false, insight: "Textile and commercial trade backbone of Gujarat." },
  { name: "Chandigarh", coords: [76.7794, 30.7333], partners: "3,200+", volume: "0.5L/mo", major: false, insight: "Strategic northern transit point for consumer goods." },
  { name: "Coimbatore", coords: [76.9558, 11.0168], partners: "2,200+", volume: "0.3L/mo", major: false, insight: "Key industrial and textile logistics center in the south." },
  { name: "Indore", coords: [75.8577, 22.7196], partners: "3,500+", volume: "0.6L/mo", major: false, insight: "Central India’s fastest growing commercial transit node." },
  { name: "Kanpur", coords: [80.3319, 26.4499], partners: "4,100+", volume: "0.5L/mo", major: false, insight: "Major industrial corridor for leather and manufacturing goods." },
  { name: "Jaipur", coords: [75.7873, 26.9124], partners: "5,200+", volume: "0.9L/mo", major: false, insight: "Growing focal point for handicraft and wholesale retail export." },
  { name: "Kochi", coords: [76.2673, 9.9312], partners: "4,600+", volume: "0.7L/mo", major: false, insight: "Critical coastal port logistics supporting spice & seafood transit." },
  { name: "Lucknow", coords: [80.9462, 26.8467], partners: "4,800+", volume: "0.8L/mo", major: false, insight: "Key administrative and commercial transport network." },
  { name: "Ludhiana", coords: [75.8573, 30.9010], partners: "2,800+", volume: "0.4L/mo", major: false, insight: "Northern powerhouse for hosiery and cycle parts logistics." },
  { name: "Nagpur", coords: [79.0882, 21.1458], partners: "3,800+", volume: "0.6L/mo", major: false, insight: "Geographical center of India supporting major cross-country traffic." },
  { name: "Nashik", coords: [73.7898, 19.9975], partners: "2,400+", volume: "0.3L/mo", major: false, insight: "Emerging wine and agriculture cold-chain transportation hub." },
  { name: "Surat", coords: [72.8311, 21.1702], partners: "4,100+", volume: "0.7L/mo", major: false, insight: "Diamond and textile trading logistics powerhouse." },
  { name: "Trivandrum", coords: [76.9366, 8.5241], partners: "1,500+", volume: "0.2L/mo", major: false, insight: "Southernmost critical supply chain integration point." },
  { name: "Vadodara", coords: [73.1812, 22.3072], partners: "3,200+", volume: "0.4L/mo", major: false, insight: "Key junction for petrochemical and engineering cargo." },
  { name: "Visakhapatnam", coords: [83.2185, 17.6868], partners: "3,100+", volume: "0.5L/mo", major: false, insight: "Crucial eastern seaport handling vast industrial import transit." },
];

const industries = [
  { name: "Electronics & Appliances", icon: Laptop,       gradient: "from-violet-600 to-indigo-600", desc: "Specialized secure handling for fragile electronics, IT equipment, and white goods with real-time tracking.", sub: ["Consumer Electronics", "White Goods", "IT Equipment"] },
  { name: "F&Vs & Processed Foods",   icon: Apple,        gradient: "from-emerald-500 to-green-600", desc: "Temperature-monitored rapid transit for perishable items ensuring farm-to-store freshness.", sub: ["Fresh Produce", "Cold Chain", "HORECA"] },
  { name: "Construction Materials",   icon: HardHat,      gradient: "from-amber-500 to-orange-600",  desc: "Heavy-duty logistics for safe transport of raw materials, cement, steel, and fragile fixtures.", sub: ["Cement", "Steel", "Tiles & Fixtures"] },
  { name: "Efficient Logistics",      icon: Truck,        gradient: "from-blue-600 to-cyan-600",     desc: "Scalable B2B and 3PL fulfillment solutions optimized for last-mile delivery success.", sub: ["3PL", "Last-Mile", "B2B Fulfillment"] },
  { name: "Chemicals & Pharma",       icon: FlaskConical, gradient: "from-teal-600 to-cyan-700",     desc: "Compliant and safe routing for lab equipment, medical supplies, and bulk pharmaceutical goods.", sub: ["Bulk Chemicals", "Pharma", "Lab Equipment"] },
  { name: "Furniture",                icon: Sofa,         gradient: "from-rose-500 to-red-600",      desc: "Delicate and spacious vehicle routing for modular furniture and flat-pack home décor.", sub: ["Flat-Pack", "Modular", "Office Furniture"] },
  { name: "E-Commerce",               icon: ShoppingCart, gradient: "from-indigo-500 to-purple-600", desc: "Lightning-fast dispatch solutions for massive marketplace scale and seamless returns management.", sub: ["Marketplace", "D2C", "Returns Mgmt"] },
  { name: "FMCG",                     icon: PackageCheck, gradient: "from-orange-500 to-red-500",    desc: "High-frequency van sales and dynamic route optimization for fast-moving consumer goods.", sub: ["GT Distribution", "MT Distribution", "Van Sales"] },
];

// ─── Counter ──────────────────────────────────────────────────
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent = (value % 1 !== 0 ? v.toFixed(1) : Math.floor(v)) + suffix;
      },
    });
    return ctrl.stop;
  }, [inView, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Floating Support Widget ──────────────────────────────────
function FloatingSupport() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[320px] bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(4,69,218,0.18)] border border-slate-100 overflow-hidden"
          >
            <div className="bg-[#0445DA] p-5 text-white relative">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm tracking-wide">Talk to Sales</h4>
                <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white bg-white/10 p-1 rounded-lg transition-colors">
                  <X size={14} />
                </button>
              </div>
              <div className="absolute -bottom-5 left-5 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white shadow text-[#0445DA]">
                <PhoneCall size={18} />
              </div>
            </div>
            <div className="p-5 pt-9">
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Reach us at <strong className="text-slate-800">9667309777</strong> to know how Porter Enterprise can transform your logistics operations.
              </p>
              <button className="w-full bg-slate-900 hover:bg-[#0445DA] text-white py-3 rounded-xl text-sm font-semibold transition-colors">
                Request Callback
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={`${open ? "bg-slate-800" : "bg-[#0445DA] ring-4 ring-[#0445DA]/20"} p-3.5 rounded-full text-white shadow-lg hover:scale-105 transition-all`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

// ─── Full Enterprise Contact Form ─────────────────────────────
function EnterpriseForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", bizType: "", volume: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Stagger variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
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
        <p className="text-slate-500 text-sm font-medium max-w-[240px] mx-auto leading-relaxed z-10 relative">Our enterprise integration team will contact you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_24px_80px_-24px_rgba(4,69,218,0.15)] relative border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_100px_-24px_rgba(4,69,218,0.2)]">
      
      <div className="mb-7 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#0445DA] mb-3 overflow-hidden relative">
          <div className="absolute inset-0 bg-[#0445DA]/5" />
          <Zap size={22} fill="currentColor" fillOpacity={0.1} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Request Enterprise Access</h2>
        <p className="text-slate-500 text-xs mt-1.5 font-medium">Get a custom logistics architecture mapped for your scale.</p>
      </div>

      <motion.form
        variants={formVariants} initial="hidden" animate="visible"
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="flex flex-col gap-4 relative z-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <FloatField id="name" label="Full Name" icon={User} />
          <FloatField id="company" label="Company" icon={Building2} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FloatField id="phone" label="Phone" type="tel" icon={PhoneCall} />
          <FloatField id="email" label="Work Email" type="email" icon={Mail} />
        </div>
        <SelectField id="bizType" label="Industry" icon={Globe} options={["E-Commerce", "FMCG", "Retail Chain", "Manufacturing", "Logistics 3PL", "Construction", "Other"]} />
        <SelectField id="volume" label="Monthly Volume" icon={PackageCheck} options={["< 500 trips", "500 – 2,000 trips", "2,000 – 10,000 trips", "10,000 – 50,000 trips", "50,000+ trips"]} />

        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-1 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-[#0445DA] hover:to-blue-600 text-white font-bold py-3.5 rounded-[14px] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-[#0445DA]/25 group text-sm"
        >
          Get Started
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
        </motion.button>

        <motion.p variants={itemVariants} className="text-center text-[9px] text-slate-400 mt-0.5 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
          <Lock size={10} /> Secure Encryption
        </motion.p>
      </motion.form>
    </div>
  );
}

// ─── India Map (react-simple-maps) ───────────────────────────
function IndiaMap() {
  const [activeCity, setActiveCity] = useState<typeof CITY_MARKERS[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="relative w-full h-full min-h-[500px]" />;

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [82, 22], scale: 1050 }}
        width={500}
        height={560}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1E293B"
                stroke="#334155"
                strokeWidth={0.6}
                style={{
                  default: { outline: "none" },
                  hover:   { fill: "#1a3460", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Connection arcs — rendered as SVG paths between major cities */}
        {[
          [0, 2], [0, 1], [1, 6], [2, 4], [3, 4], [0, 5], [1, 7],
        ].map(([a, b], i) => {
          const ca = CITY_MARKERS[a].coords;
          const cb = CITY_MARKERS[b].coords;
          return (
            <line
              key={i}
              x1={ca[0]}  y1={ca[1]}
              x2={cb[0]} y2={cb[1]}
              stroke="#0445DA"
              strokeOpacity={0.18}
              strokeWidth={0.5}
              strokeDasharray="3 3"
            />
          );
        })}

        {CITY_MARKERS.map((city) => (
          <Marker
            key={city.name}
            coordinates={city.coords as [number, number]}
            onMouseEnter={() => setActiveCity(city)}
            onMouseLeave={() => setActiveCity(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Pulse ring */}
            {city.major && (
              <circle
                r={10}
                fill="#0445DA"
                fillOpacity={0.08}
                className="animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
            )}
            {/* Core dot */}
            <circle
              r={city.major ? 5 : 3.5}
              fill={city.major ? "#0445DA" : "#3B82F6"}
              fillOpacity={0.95}
              stroke="#fff"
              strokeWidth={city.major ? 1.5 : 1}
            />
            {/* Label for major cities */}
            {city.major && (
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontSize: 7.5, fontWeight: 700, fill: "#94A3B8", fontFamily: "system-ui" }}
              >
                {city.name}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>

      {/* City tooltip */}
      <AnimatePresence>
        {activeCity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl text-white rounded-[1.25rem] p-5 shadow-2xl pointer-events-none z-50 min-w-[260px] max-w-[280px] border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-[#3B82F6]" />
              <p className="font-bold text-lg">{activeCity.name}</p>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-4">{activeCity.insight}</p>
            <div className="flex justify-between border-t border-white/10 pt-3">
               <div>
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-0.5 font-semibold">Volume</p>
                  <p className="text-white text-[13px] font-bold">{activeCity.volume}</p>
               </div>
               <div className="text-right">
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-0.5 font-semibold">Partners</p>
                  <p className="text-white text-[13px] font-bold">{activeCity.partners}</p>
               </div>
            </div>
            {activeCity.major && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Industry Card ────────────────────────────────────────────
function IndustryCard({ ind, index }: { ind: typeof industries[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="relative overflow-hidden bg-white hover:bg-slate-900 rounded-[1.5rem] border border-slate-200 hover:border-slate-800 transition-all duration-500 group flex flex-col text-left shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(4,69,218,0.25)]"
    >
      <div className="p-8 flex-1 flex flex-col relative z-10 transition-colors duration-500">
        
        {/* Top Header */}
        <div className="flex justify-between items-start mb-8 border-b border-slate-100 group-hover:border-slate-800 pb-6 transition-colors duration-500">
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-800 flex items-center justify-center border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:bg-[#0445DA] group-hover:border-[#0445DA] group-hover:text-white transition-all duration-500 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             <ind.icon size={26} strokeWidth={1.5} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="text-[44px] font-black text-slate-100 group-hover:text-slate-800 leading-none tracking-tighter select-none font-sans transition-colors duration-500 translate-x-2 -translate-y-2">
             0{index + 1}
          </span>
        </div>
        
        {/* Title & Desc */}
        <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-white leading-tight mb-3 transition-colors duration-500">{ind.name}</h4>
        
        <p className="text-[13.5px] text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed mb-8 flex-1 transition-colors duration-500">{ind.desc}</p>
        
        {/* Tags */}
        <div className="flex flex-col gap-2 mt-auto">
          {ind.sub.map((s, i) => (
            <div key={i} className="flex items-center gap-2 group/tag">
               <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0445DA] transition-colors duration-500 group-hover/tag:translate-x-1" />
               <span className="text-[11px] text-slate-600 group-hover:text-slate-300 font-bold uppercase tracking-wider transition-colors duration-500">{s}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Graphic Interaction */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(4,69,218,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
    </motion.div>
  );
}

// ─── Features Bento Grid ──────────────────────────────────────
const featuresData = [
  { t: "Unified Trip Details",            d: "Check all your goods transportation trip information in the city.", img: unifiedTripDetailsImg },
  { t: "Payments through Prepaid Wallet", d: "No cash reimbursement hassles, as all trips are prepaid.",         img: paymentThroughWalletImg },
  { t: "Complete Clarity and Control",    d: "Monitor wallet usage with full visibility.",                       img: completeClarityImg },
  { t: "Multi-User Access",              d: "Add, remove, activate, or deactivate users to maintain unified logistics operations.", img: multiUserAccessImg },
];

function FeaturesBento() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Main Feature Preview — large left card */}
      <motion.div
        className="lg:col-span-7 relative bg-slate-950 rounded-2xl border border-slate-800/60 overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.35)] group"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Window bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800/60 bg-slate-900/60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="ml-3 text-slate-500 text-xs font-semibold tracking-wider uppercase">{featuresData[active].t}</div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0445DA]/10 via-transparent to-transparent pointer-events-none" />

        <div className="p-6 lg:p-10 relative z-10 min-h-[380px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Image
                src={featuresData[active].img}
                alt={featuresData[active].t}
                className="w-full h-auto object-contain drop-shadow-2xl rounded-xl ring-1 ring-white/10 max-h-[320px] object-top"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right column - stacked feature cards */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {featuresData.map((f, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`text-left rounded-2xl border transition-all duration-250 ${
              active === i
                ? "bg-white border-slate-200/80 shadow-[0_8px_32px_-8px_rgba(4,69,218,0.18)] p-5"
                : "bg-transparent border-transparent hover:bg-white/60 p-5"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Active indicator line */}
              <div className={`w-0.5 rounded-full self-stretch shrink-0 transition-colors duration-200 ${active === i ? "bg-[#0445DA]" : "bg-slate-200"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className={`text-base font-bold tracking-tight transition-colors ${active === i ? "text-[#0445DA]" : "text-slate-500"}`}>
                    {f.t}
                  </h3>
                </div>
                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-500 text-sm font-medium leading-relaxed overflow-hidden"
                    >
                      {f.d}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.button>
        ))}

        {/* Mobile image fallback */}
        <div className="lg:hidden mt-2 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-md p-4">
          <Image src={featuresData[active].img} alt={featuresData[active].t} className="w-full h-auto object-contain" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════
export default function EnterprisePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const subMouseX = useMotionValue(0);
  const subMouseY = useMotionValue(0);

  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);

  const handleSubMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    subMouseX.set(clientX - left);
    subMouseY.set(clientY - top);
  }, [subMouseX, subMouseY]);

  const handleHeroMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    bgMouseX.set(clientX - left);
    bgMouseY.set(clientY - top);
  }, [bgMouseX, bgMouseY]);

  const valueChips = [
    { label: "Hassle-Free API",     icon: Zap        },
    { label: "Centralized Control", icon: Globe      },
    { label: "Transparent Routes",  icon: ShieldCheck },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <FloatingSupport />

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24"
      >
        {/* ── Gradient Background Top to Bottom ── */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#DCEAFF] via-[#F0F5FF] to-white" />
          
          {/* Animated Interactive Background Spotlight */}
          <motion.div
            className="absolute inset-0 opacity-100 pointer-events-none"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  1000px circle at ${bgMouseX}px ${bgMouseY}px,
                  rgba(4, 69, 218, 0.05),
                  transparent 100%
                )
              `,
            }}
          />

          {/* Ambient orbs using radial-gradient to avoid blur clipping bugs */}
          <div className="absolute top-0 right-[10%] w-[800px] h-[800px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)" }} />
          <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(4,69,218,0.05) 0%, transparent 60%)" }} />
          
          {/* Fine architectural grid */}
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(4,69,218,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(4,69,218,0.1) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </motion.div>

        {/* Blur depth layer */}
        <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none z-[1]" />

        <div className="max-w-[88rem] mx-auto px-6 md:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Typography ── */}
            <motion.div style={{ opacity: heroOp }} className="flex flex-col items-start relative z-20">

              {/* Asymmetric badge */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible"
                className="mb-8 pl-1"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-[#0445DA]/10 backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0445DA] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0445DA]"></span>
                  </span>
                  <span className="text-xs font-bold text-[#0445DA] tracking-[0.15em] uppercase">
                    Porter Enterprise Logistics
                  </span>
                </div>
              </motion.div>

              {/* Headline — large, tight */}
              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible"
                className="font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6 relative z-10 pointer-events-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                Reliable scale,
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0445DA] via-blue-600 to-indigo-500">
                  controlled by you.
                </span>
              </motion.h1>

              {/* Subtitle — interactive cursor microinteraction */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible"
                onMouseMove={handleSubMouseMove}
                className="group relative text-[1.1rem] text-slate-600 font-medium max-w-[480px] leading-[1.8] mb-10 overflow-hidden rounded-2xl p-4 -ml-4"
              >
                {/* The spotlight hover layer */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        140px circle at ${subMouseX}px ${subMouseY}px,
                        rgba(4, 69, 218, 0.08),
                        transparent 80%
                      )
                    `,
                  }}
                />
                <p className="relative z-10 pointer-events-none m-0">
                  Automate your delivery network with real-time fleet tracking and
                  full operational transparency — all in one powerful platform.
                </p>
              </motion.div>

              {/* Value chips — horizontal staggered */}
              <motion.div
                variants={stagger} initial="hidden" animate="visible"
                className="flex flex-wrap gap-4 relative z-10"
              >
                {valueChips.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -3, scale: 1.05, transition: { duration: 0.15 } }}
                    className="flex items-center gap-3 px-5 py-3 bg-white/70 backdrop-blur-md border border-[#0445DA]/10 rounded-xl shadow-sm text-slate-700 font-semibold text-sm cursor-default hover:border-[#0445DA]/40 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <c.icon size={18} strokeWidth={2.5} className="text-[#0445DA]" />
                    {c.label}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Glassmorphic Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <EnterpriseForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRANSFORMING CITIES — india map
      ════════════════════════════════════════════ */}
      <section className="py-28 bg-[#04080F] relative overflow-hidden text-white border-y border-white/5">
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0445DA]/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[88rem] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-16 items-center">

            {/* Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase flex items-center gap-2 mb-4">
                <MapPin size={13} /> Expanding Network
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                We are transforming
                <br />
                <span className="text-[#3B82F6]">cities across India.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium max-w-lg">
                Present in 21+ cities with 7.5L+ driver-partners. Every node on this map is a live Porter logistics hub.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[{ v: 21, s: "+", l: "Cities" }, { v: 7.5, s: "L+", l: "Partners" }, { v: 10, s: "K+", l: "Clients" }].map((st, i) => (
                  <div key={i} className="border border-white/10 rounded-xl p-4 bg-white/3 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white"><Counter value={st.v} suffix={st.s} /></p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1 font-semibold">{st.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-[500px] lg:h-[560px]"
            >
              <IndiaMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CLIENTS MARQUEE
      ════════════════════════════════════════════ */}
      <section className="py-7 border-b border-slate-100 bg-white overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex whitespace-nowrap overflow-hidden opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale hover:grayscale-0">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
            className="flex items-center gap-16 text-2xl font-black uppercase tracking-[0.35em] text-slate-800"
          >
            {[...clients, ...clients, ...clients, ...clients].map((c, i) => <span key={i}>{c}</span>)}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          KEY FEATURES — Bento with Images
      ════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F7F9FC] relative">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mb-14 max-w-xl">
            <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Platform Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Key Features <span className="text-[#0445DA]">We Offer</span>
            </h2>
          </motion.div>

          <FeaturesBento />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INDUSTRIES WE SERVE
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F9FC] relative">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Coverage</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Industries We Serve</h2>
            <p className="text-slate-500 text-lg font-medium">Elevating logistics across high-demand sectors with specialized supply chain routing and custom-built fleet operations.</p>
          </motion.div>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industries.map((ind, i) => <IndustryCard key={i} index={i} ind={ind} />)}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PARTNER BENEFITS
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6 border-b border-slate-100 pb-10"
          >
            <div>
              <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Partner Benefits</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl leading-[1.1]">
                Agile delivery solutions for scaling enterprises.
              </h2>
            </div>
            <button className="px-7 py-3.5 rounded-full bg-slate-900 text-white font-semibold flex items-center gap-2.5 hover:bg-[#0445DA] transition-all duration-200 shadow-lg hover:shadow-[0_8px_24px_-4px_rgba(4,69,218,0.4)] hover:-translate-y-0.5 group shrink-0">
              Start Integrating <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { t: "Dynamic Scaling",       d: "Adapt to market demands instantly with on-demand access to our vast vehicle fleet without fixed costs.", i: Activity   },
              { t: "24/7 Dedicated Support",d: "A dedicated key account manager addressing your operational needs around the clock with priority response.", i: Users      },
              { t: "Expand Your Reach",     d: "Instantly unlock nationwide reach with our extensive footprint and deep intracity route expertise.",       i: TrendingUp },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.18 } }}
                className="bg-[#F8FAFC] border border-slate-200/60 p-8 rounded-2xl hover:shadow-[0_16px_40px_-12px_rgba(4,69,218,0.18)] hover:border-blue-200 transition-all duration-200 group cursor-pointer relative overflow-hidden"
                style={{ willChange: "transform" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-[#0445DA] group-hover:bg-[#0445DA] group-hover:text-white group-hover:scale-110 transition-all duration-250">
                  <c.i size={22} strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0445DA] transition-colors">{c.t}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F9FC] relative">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mb-14 text-center">
            <p className="text-[#0445DA] font-bold text-[11px] tracking-[0.2em] uppercase mb-3">Knowledge Base</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`border rounded-2xl transition-all duration-200 ${
                  openFaq === i
                    ? "border-blue-200/60 bg-white shadow-[0_8px_24px_-8px_rgba(4,69,218,0.1)]"
                    : "border-slate-200/80 bg-white/50 hover:bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <h3 className={`text-base font-semibold transition-colors ${openFaq === i ? "text-[#0445DA]" : "text-slate-800"}`}>{faq.q}</h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? "bg-[#0445DA] text-white rotate-45" : "bg-slate-100 border border-slate-200 text-slate-500"}`}>
                    <Plus size={15} strokeWidth={2.5} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</div>
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
