"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  Star, 
  Clock, 
  ShieldCheck, 
  Crosshair
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function DigitalClockCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="font-mono text-4xl font-bold tracking-widest text-[#00E5FF] text-glow flex items-center gap-2">
      <span>{minutes.toString().padStart(2, "0")}</span>
      <motion.span 
        animate={{ opacity: [1, 0, 1] }} 
        transition={{ repeat: Infinity, duration: 1 }}
      >:</motion.span>
      <span>{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
}

export default function TrackOrderPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [trackerActive, setTrackerActive] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Fallback/Mock Token for UI visualization. Replace in production.
    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";
    
    try {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-122.4194, 37.7749], // San Francisco default
        zoom: 13,
        pitch: 60, // 3D perspective
        bearing: -20,
      });

      mapInstance.on('load', () => {
        setMap(mapInstance);
        setTrackerActive(true);
      });
      return () => mapInstance.remove();
    } catch (error) {
      console.warn("Map setup failed via real token. Simulating map UI.");
      setTrackerActive(true);
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-deep-space">
      
      {/* Absolute Map Layer */}
      <div className="absolute inset-0 z-0">
        <div ref={mapContainer} className="w-full h-full bg-charcoal" />
        {/* Mock Glowing Route overlay using SVG if Mapbox fails or until real GeoJSON is implemented */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <motion.path 
            d="M 200 800 Q 400 600, 600 700 T 900 300" 
            fill="transparent" 
            stroke="#00E5FF" 
            strokeWidth="4" 
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          />
          {/* Radar Blip */}
          <motion.circle 
            cx="900" cy="300" r="10" fill="#00E5FF" filter="url(#glow)"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle 
            cx="900" cy="300" r="30" fill="transparent" stroke="#00E5FF" strokeWidth="2" filter="url(#glow)"
            animate={{ scale: [0, 3], opacity: [1, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Crosshair UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-20 text-neon-blue">
        <Crosshair size={800} strokeWidth={0.5} />
      </div>

      {/* Status Panel - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] p-4 md:p-8 pt-24 z-20 overflow-y-auto no-scrollbar pointer-events-none">
        <div className="pointer-events-auto h-full flex flex-col justify-center">
          
          <AnimatePresence>
            {trackerActive && (
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="glass border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl bg-charcoal/80"
              >
                
                {/* Status Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div>
                    <h2 className="text-white font-display font-bold text-2xl tracking-wide uppercase mb-1">
                      Tracking
                    </h2>
                    <p className="text-gray-400 text-sm font-mono">ID: PT-84X9-22LQ</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-xs font-semibold uppercase shadow-[0_0_10px_rgba(0,255,102,0.2)]">
                      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                      Arriving
                    </div>
                  </div>
                </div>

                {/* Digital Countdown */}
                <div className="mb-8 bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none" />
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 z-10 w-full text-center">Live ETA</span>
                  <DigitalClockCountdown />
                </div>

                {/* Driver Identity Card */}
                <div className="mb-8">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-4">Pilot Profile</span>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-porter-blue/30 transition-colors">
                    <div className="relative">
                      {/* Avatar Placeholder */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-charcoal to-deep-space border border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                        <span className="font-display font-bold text-2xl text-gray-500">RV</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-emerald text-black text-[10px] font-black px-1.5 rounded-sm flex items-center">
                        4.9 <Star size={8} className="fill-black ml-0.5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-display font-medium text-lg leading-none mb-1">Rajesh V.</h4>
                      <p className="text-gray-400 text-xs">Tata Ace • MH 12 PQ 2033</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-full bg-porter-blue hover:bg-neon-blue text-white flex items-center justify-center transition-colors shadow-lg">
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Route Summary */}
                <div className="mb-6 relative">
                  <div className="absolute left-3.5 top-5 bottom-5 w-[1px] bg-white/10" />
                  <div className="space-y-6">
                    <div className="flex gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-deep-space border border-white/20 flex items-center justify-center shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-medium uppercase">Origin</p>
                        <p className="text-white text-sm">TechPark, Andheri East</p>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-deep-space border border-neon-blue flex items-center justify-center shrink-0 z-10 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                        <Navigation size={12} className="text-neon-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="w-full h-12 bg-white/5 rounded-md border border-white/5 flex items-center px-4">
                          <span className="text-neon-blue font-mono text-xs animate-pulse">En-Route...</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-deep-space border border-cyber-pink flex items-center justify-center shrink-0 z-10">
                        <MapPin size={12} className="text-cyber-pink" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-medium uppercase">Destination</p>
                        <p className="text-white text-sm">Bandra West, Link Road</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center border-t border-white/5 pt-4">
                  <ShieldCheck size={14} className="text-emerald" />
                  Cargo is insured and GPS monitored.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
