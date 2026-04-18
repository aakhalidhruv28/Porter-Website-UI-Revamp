"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence, useSpring, useInView, useMotionValue, useTransform } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Box,
  Truck,
  Sparkles,
  Package,
  Route,
  Navigation
} from "lucide-react";

// --- Framer Motion Configurations ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const faqs = [
  { question: "What is Porter App?", answer: "Porter is a leading tech-enabled logistics company offering a variety of intra-city and inter-city delivery services." },
  { question: "How do I use Porter App?", answer: "Simply download the app, enter your pickup and drop locations, choose your vehicle, and get a real-time estimate." },
  { question: "What are the charges for goods transportation?", answer: "Charges are dynamically calculated based on distance, time, and vehicle type starting at very nominal rates." },
  { question: "Does Porter provide Packers and Movers?", answer: "Yes, we offer comprehensive Packers and Movers services for seamless home shifting." },
  { question: "How does an API integration solve business problems?", answer: "It automates dispatching, eliminates manual data entry, and provides real-time visibility for enterprise scale." },
];

function Counter({ to, prefix = "", suffix = "" }: { to: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { damping: 50, stiffness: 100, mass: 1 });

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toString() + suffix;
      }
    });
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// 3D Magnetic Card Wrapper
const MagneticCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [activeServiceTab, setActiveServiceTab] = useState("Truck");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#FDFDFE] selection:bg-[#0445DA]/20 selection:text-[#0445DA]">
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="home-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-[#FDFDFE] flex flex-col items-center justify-center pointer-events-none"
          >
            <style>{`
              .truck-loader-ui {
                width: fit-content;
                height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .truckWrapper {
                width: 200px;
                height: 100px;
                display: flex;
                flex-direction: column;
                position: relative;
                align-items: center;
                justify-content: flex-end;
                overflow-x: hidden;
              }
              .truckBody {
                width: 130px;
                height: fit-content;
                margin-bottom: 6px;
                animation: motion 1s linear infinite;
              }
              @keyframes motion {
                0% { transform: translateY(0px); }
                50% { transform: translateY(3px); }
                100% { transform: translateY(0px); }
              }
              .truckTires {
                width: 130px;
                height: fit-content;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0px 10px 0px 15px;
                position: absolute;
                bottom: 0;
              }
              .truckTires svg {
                width: 24px;
              }
              .road {
                width: 100%;
                height: 1.5px;
                background-color: #282828;
                position: relative;
                bottom: 0;
                align-self: flex-end;
                border-radius: 3px;
              }
              .road::before {
                content: "";
                position: absolute;
                width: 20px;
                height: 100%;
                background-color: #282828;
                right: -50%;
                border-radius: 3px;
                animation: roadAnimation 1.4s linear infinite;
                border-left: 10px solid white;
              }
              .road::after {
                content: "";
                position: absolute;
                width: 10px;
                height: 100%;
                background-color: #282828;
                right: -65%;
                border-radius: 3px;
                animation: roadAnimation 1.4s linear infinite;
                border-left: 4px solid white;
              }
              .lampPost {
                position: absolute;
                bottom: 0;
                right: -90%;
                height: 90px;
                animation: roadAnimation 1.4s linear infinite;
              }
              @keyframes roadAnimation {
                0% { transform: translateX(0px); }
                100% { transform: translateX(-350px); }
              }
            `}</style>

            <div className="truck-loader-ui">
              <div className="truckWrapper">
                <div className="truckBody">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
                    {/* Changed #F83D3D straight to #0445DA (Porter brand blue) */}
                    <path strokeWidth="3" stroke="#282828" fill="#0445DA" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z" />
                    <path strokeWidth="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z" />
                    <path strokeWidth="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z" />
                    <rect strokeWidth="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187" />
                    <rect strokeWidth="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193" />
                    <rect strokeWidth="3" stroke="#282828" fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5" />
                    <rect strokeWidth="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1" />
                  </svg>
                </div>
                <div className="truckTires">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                    <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15" />
                    <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                    <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15" />
                    <circle fill="#DFDFDF" r="7" cy="15" cx="15" />
                  </svg>
                </div>
                <div className="road" />

                <svg viewBox="0 0 453.459 453.459" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="lampPost">
                  <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993 c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514 c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16 c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914 h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75 v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795 V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017 h78.747C231.693,100.736,232.77,106.162,232.77,111.694z" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Immersive Glassmorphic Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 flex items-center w-full min-h-[95vh] overflow-hidden">
        
        {/* Soft UI Background Abstracts */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-[#0445DA]/10 to-[#0445DA]/0 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        {/* Structural Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: "linear-gradient(rgba(4,69,218,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(4,69,218,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="max-w-[90rem] mx-auto px-6 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Cinematic Typography Left */}
            <motion.div 
              className="w-full lg:col-span-7 pr-0 lg:pr-12"
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariant} className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-2 shadow-sm text-[#0445DA] text-xs font-semibold tracking-wide">
                  <Sparkles size={14} className="text-[#0445DA]" /> Next-Gen Logistics
                </div>
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-slate-900 tracking-[-0.04em] leading-[0.9] mb-4">
                Delivery <span className="text-gray-400 font-light italic">Aapki,</span>
              </motion.h1>
              <motion.h1 
                variants={fadeUpVariant}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-slate-950 leading-[0.9] mb-10"
              >
                Transport Hamara.
              </motion.h1>

              <motion.div variants={fadeUpVariant} className="flex gap-4 items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm overflow-hidden z-[3] relative" style={{ zIndex: 4 - i }}>
                      <img src={`https://i.pravatar.cc/100?img=${i + 60}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0445DA] shadow-sm flex items-center justify-center text-white text-[10px] font-bold z-0">
                    1Cr+
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-500 max-w-[200px] leading-snug">
                  Trusted by businesses across India
                </div>
              </motion.div>
            </motion.div>

            {/* 3D Glass Interactive Widget Right */}
            <motion.div 
              className="lg:col-span-5 w-full relative"
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0445DA]/20 to-transparent rounded-[2.5rem] blur-2xl transform translate-y-8 scale-95 opacity-60" />
              
              <MagneticCard className="bg-white/60 backdrop-blur-3xl border border-white/80 p-8 shadow-[0_40px_80px_-20px_rgba(4,69,218,0.15)] rounded-[2.5rem] relative z-10">
                <div className="absolute top-6 right-6 bg-green-50 text-green-700 text-[10px] font-bold uppercase py-1.5 px-3 tracking-widest rounded-full shadow-sm border border-green-100/50">
                  Instant Estimate
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Plan your transport</h3>
                  
                  {/* Pickup location */}
                  <div className="bg-white/80 border border-slate-100 p-4 rounded-2xl mb-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-text group">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin size={18} className="text-[#0445DA]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400 mb-0.5">Pickup City</div>
                      <div className="font-semibold text-slate-800 text-base">Ahmedabad</div>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="text-[11px] font-semibold text-slate-400 mb-4 px-2">Select Vehicle Category</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "Truck", label: "Trucks", icon: Truck },
                      { id: "Two Wheeler", label: "Two Wheeler", icon: Truck },  // Placeholder
                      { id: "Packers & Movers", label: "Movers", icon: Box }
                    ].map((service) => {
                      const Icon = service.icon;
                      const isActive = activeServiceTab === service.id;
                      return (
                        <button
                          key={service.id}
                          onClick={() => setActiveServiceTab(service.id)}
                          className={`py-4 px-2 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                            isActive 
                              ? "border-[#0445DA] bg-[#0445DA] text-white shadow-lg shadow-[#0445DA]/30" 
                              : "border-white bg-white/50 text-slate-600 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          <Icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                          <span className="font-semibold text-[10px] tracking-wide text-center leading-tight">
                            {service.label.replace(" ", "\n")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Aesthetic CTA Button */}
                <button className="w-full bg-slate-950 hover:bg-[#0445DA] text-white py-4 rounded-2xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-slate-900/20 group">
                  Calculate Fare <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Asymmetrical Glassmorphic Bento Grid */}
      <section className="pt-12 pb-32 bg-[#F8FAFC] z-10 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0445DA]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="mb-12 flex items-center gap-4"
          >
            <div className="w-10 h-1 bg-[#0445DA] rounded-full" />
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              Our services
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 md:grid-rows-2 gap-6 h-auto md:h-[600px]"
          >
            {/* Bento Card 1: Large Span - Enterprise */}
            <motion.div variants={fadeUpVariant} className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 p-10 cursor-pointer flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0445DA]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Delivery Element: Logistics Network Map */}
              <div className="absolute top-8 right-8 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <div className="relative w-48 h-48">
                  <div className="absolute top-4 left-4 w-4 h-4 bg-[#0445DA] rounded-full shadow-[0_0_15px_#0445DA]" />
                  <div className="absolute bottom-10 right-4 w-4 h-4 bg-[#0445DA] rounded-full shadow-[0_0_15px_#0445DA]" />
                  <div className="absolute top-24 right-20 w-3 h-3 bg-slate-400 rounded-full" />
                  <svg className="absolute inset-0 w-full h-full" overflow="visible">
                    <path d="M 24 24 Q 80 40 100 100 T 180 144" fill="none" stroke="#0445DA" strokeWidth="2.5" strokeDasharray="6 6" className="animate-[dash_3s_linear_infinite]" />
                  </svg>
                  <MapPin size={32} className="absolute bottom-6 right-2 text-[#0445DA] drop-shadow-md" />
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-[11px] font-bold text-[#0445DA] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Route size={16} /> Porter Enterprise
                </h4>
                <h3 className="text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight max-w-sm drop-shadow-sm">Streamlining operations to drive business growth</h3>
              </div>

              <div className="relative z-10 w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#0445DA] group-hover:text-white transition-all duration-300 group-hover:scale-110 self-end mt-12 md:mt-0 shadow-sm">
                <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-9 5 18 3-12 4 8h2"/></svg>
              </div>
            </motion.div>

            {/* Bento Card 2: Wide - API Integration */}
            <motion.div variants={fadeUpVariant} className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 shadow-lg shadow-slate-200/40 p-8 cursor-pointer flex items-center">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Delivery Element: Code & Transit */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-10 group-hover:opacity-20 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none">
                <div className="flex flex-col gap-2">
                  <div className="h-2 w-32 bg-slate-400 rounded-full" />
                  <div className="h-2 w-16 bg-[#0445DA] rounded-full" />
                  <div className="h-2 w-24 bg-slate-400 rounded-full" />
                </div>
              </div>

              <div className="relative z-10 w-full flex items-center justify-between gap-6">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" /> API Integration
                  </h4>
                  <h3 className="text-xl font-semibold text-slate-900 max-w-sm leading-snug">Automate the transportation of your goods by integrating our APIs</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-950 group-hover:text-white transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>

            {/* Bento Card 3: Standard - Two Wheelers */}
            <motion.div variants={fadeUpVariant} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 cursor-pointer shadow-2xl shadow-slate-900/30">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0445DA]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Delivery Element: Fast Transit Pattern */}
              <div className="absolute top-4 right-4 text-white/5 pointer-events-none group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-12 transition-transform duration-700">
                <Navigation size={120} strokeWidth={1} />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                     Two-Wheelers
                  </h4>
                  <h3 className="text-xl font-semibold text-white leading-tight drop-shadow-md">Reliable goods transportation services for up to 20 kg</h3>
                </div>
                <div className="flex justify-end mt-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-[#0445DA] transition-all">
                    <ArrowRight size={18} className="text-white group-hover:text-[#0445DA] transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 4: Standard - Trucks */}
            <motion.div variants={fadeUpVariant} className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 p-8 cursor-pointer shadow-lg shadow-slate-200/40">
               {/* Delivery Element: Giant Truck Offset */}
               <div className="absolute -bottom-6 -right-6 text-slate-100 pointer-events-none group-hover:text-blue-50 transition-colors duration-500 group-hover:-translate-x-2 transition-transform">
                 <Truck size={150} strokeWidth={1.5} />
               </div>

               <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Trucks</h4>
                  <h3 className="text-xl font-semibold text-slate-900 leading-tight">Hassle-free goods transportation up to 2500 kg</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#0445DA] group-hover:text-white transition-all self-end mt-6">
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>

          </motion.div>
          
          {/* Bento Card 5: Packers & Movers (Full Wide Banner) */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mt-6 w-full relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border border-blue-100 p-8 md:p-12 cursor-pointer hover:shadow-2xl hover:shadow-blue-900/10 transition-shadow">
            {/* Delivery Element: Scattered Boxes Pattern */}
            <div className="absolute right-[20%] top-1/2 -translate-y-1/2 text-blue-100 group-hover:text-blue-200 rotate-12 transition-colors duration-500 scale-[2] pointer-events-none">
              <Package size={80} strokeWidth={1} />
            </div>
            <div className="absolute right-[5%] top-1/4 text-blue-100/50 -rotate-12 transition-colors duration-500 scale-150 pointer-events-none">
              <Box size={40} strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-[11px] font-bold text-[#0445DA] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Package size={16} /> Packers & Movers
                </h4>
                <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 drop-shadow-sm">House shifting hai? Ho Jayega</h3>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 group-hover:bg-[#0445DA] group-hover:text-white group-hover:border-[#0445DA] transition-all shadow-md">
                <ArrowRight size={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Immersive Parallax Trust Section */}
      <section className="py-40 bg-[#0a0a0c] z-10 relative overflow-hidden rounded-t-[3rem] mt-[-2rem] border-t border-zinc-900">
        {/* Soft immersive dark background pattern & orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#0445DA] rounded-full blur-[250px] opacity-[0.25] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-xs tracking-widest uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Metrics
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-medium text-white text-center mb-32 max-w-4xl mx-auto leading-tight tracking-tight drop-shadow-2xl">
              Powering the logistics of millions, <span className="text-zinc-500 block mt-2">growing every single day.</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 text-center mb-32">
              <div className="group cursor-default relative">
                <p className="text-6xl md:text-[5rem] text-white mb-6 font-semibold tracking-tighter group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(4,69,218,0.4)]"><Counter to={3} /></p>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">Countries</p>
              </div>
              <div className="group cursor-default relative">
                <p className="text-6xl md:text-[5rem] text-white mb-6 font-semibold tracking-tighter group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(4,69,218,0.4)]"><Counter to={15} suffix="L+" /></p>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">Driver Partners</p>
              </div>
              <div className="group cursor-default relative">
                <p className="text-6xl md:text-[5rem] text-white mb-6 font-semibold tracking-tighter group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(4,69,218,0.4)]"><Counter to={1} suffix="Cr+" /></p>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">Customers</p>
              </div>
              <div className="group cursor-default relative">
                <p className="text-6xl md:text-[5rem] text-white mb-6 font-semibold tracking-tighter group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(4,69,218,0.4)]"><Counter to={10} suffix="Cr+" /></p>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">Trips</p>
              </div>
            </div>

            {/* Press block */}
            <div className="max-w-4xl mx-auto text-center bg-white/5 border border-white/10 p-12 md:p-16 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0445DA]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#0445DA]/40 transition-colors duration-1000" />
              <p className="text-2xl md:text-4xl text-zinc-200 font-medium leading-relaxed mb-12 tracking-tight drop-shadow-md">
                “On-demand intra-city logistics provider Porter has raised ₹750 crore... The latest funding round valued the startup at ₹3,750 crore.”
              </p>
              <button className="px-8 py-3.5 rounded-full bg-white text-black font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto shadow-lg shadow-white/10">
                Read Article <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Elegant FAQ Accordion */}
      <section className="py-32 bg-white z-10 relative">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="mb-16 text-center"
          >
             <h2 className="text-sm font-semibold text-[#0445DA] tracking-widest uppercase mb-4">
              Knowledge Base
            </h2>
            <h3 className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`border rounded-2xl transition-all duration-300 ${openFaqIndex === idx ? 'border-[#0445DA]/20 bg-blue-50/30 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-6 px-6 flex items-center justify-between focus:outline-none"
                >
                  <h3 className={`text-[15px] font-medium tracking-wide transition-colors ${openFaqIndex === idx ? 'text-[#0445DA]' : 'text-slate-700'}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 transition-transform duration-300 w-8 h-8 rounded-full flex items-center justify-center ${openFaqIndex === idx ? 'bg-[#0445DA] text-white rotate-45' : 'bg-slate-50 text-slate-400'}`}>
                    <Plus size={16} strokeWidth={2.5} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-500 font-normal text-sm leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
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
