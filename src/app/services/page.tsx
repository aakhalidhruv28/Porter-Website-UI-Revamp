"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Truck, Bike, Package, CheckCircle2 } from "lucide-react";

// Placeholder 3D Models
function VehicleModel({ type }: { type: string }) {
  return (
    <mesh rotation={[0.4, 0.5, 0]}>
      {type === "bike" ? (
        <cylinderGeometry args={[1, 1, 2.5, 32]} />
      ) : (
        <boxGeometry args={[3, 2, 1.5]} />
      )}
      <meshPhysicalMaterial 
        color={type === "bike" ? "#00FF66" : "#0057FF"} 
        emissive={type === "bike" ? "#00FF66" : "#0057FF"}
        emissiveIntensity={0.4}
        wireframe={true}
      />
    </mesh>
  );
}

const vehicles = [
  { id: 1, name: "EV Bike", category: "two-wheeler", capacity: "20 kg", size: "40x40x40 cm", fare: "₹40", type: "bike" },
  { id: 2, name: "3-Wheeler", category: "truck", capacity: "500 kg", size: "5.5x4.5x4.5 ft", fare: "₹250", type: "truck" },
  { id: 3, name: "Tata Ace", category: "truck", capacity: "750 kg", size: "7x4.5x5.5 ft", fare: "₹350", type: "truck" },
  { id: 4, name: "8ft Pickup", category: "truck", capacity: "1200 kg", size: "8x4.5x5.5 ft", fare: "₹450", type: "truck" },
];

const packersSteps = [
  { title: "Pack", description: "Secure, multi-layer bubble wrapping." },
  { title: "Load", description: "Careful loading by trained professionals." },
  { title: "Transit", description: "GPS-monitored safe transit." },
  { title: "Unpack", description: "Unpacking and placing at the destination." },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"trucks" | "bikes" | "packers">("trucks");

  const filteredVehicles = vehicles.filter((v) => 
    activeTab === "trucks" ? v.category === "truck" : v.category === "two-wheeler"
  );

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold uppercase text-white mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-emerald">Fleet & Services</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
          From micro-deliveries to enterprise relocations, we have the specialized hardware for the job.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-16">
        <div className="glass p-2 rounded-2xl flex gap-2">
          <button 
            onClick={() => setActiveTab("trucks")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "trucks" ? "bg-white/10 text-neon-blue shadow-[0_0_15px_rgba(0,229,255,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Truck size={18} /> Trucks & Tempos
          </button>
          <button 
            onClick={() => setActiveTab("bikes")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "bikes" ? "bg-white/10 text-emerald shadow-[0_0_15px_rgba(0,255,102,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Bike size={18} /> Two-Wheelers
          </button>
          <button 
            onClick={() => setActiveTab("packers")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "packers" ? "bg-white/10 text-cyber-pink shadow-[0_0_15px_rgba(255,0,255,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package size={18} /> Packers & Movers
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab !== "packers" ? (
            <motion.div
              key={`fleet-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredVehicles.map((vehicle) => (
                <motion.div 
                  key={vehicle.id}
                  whileHover="hover"
                  className="relative glass rounded-3xl overflow-hidden border border-white/5 group h-96 flex flex-col cursor-pointer"
                >
                  {/* Holographic scanning line */}
                  <motion.div 
                    className="absolute inset-0 z-20 pointer-events-none hidden group-hover:block"
                    initial={{ top: "-10%" }}
                    variants={{
                      hover: { top: ["-10%", "110%"] }
                    }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  >
                    <div className="h-1 w-full bg-neon-blue shadow-[0_0_20px_#00E5FF] opacity-50" />
                  </motion.div>

                  <div className="h-1/2 w-full bg-deep-space relative flex items-center justify-center p-4">
                    <Canvas camera={{ position: [0, 0, 5] }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      <VehicleModel type={vehicle.type} />
                    </Canvas>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col bg-charcoal">
                    <h3 className="text-2xl font-display font-medium text-white mb-1 group-hover:text-neon-blue transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Base Fare: <span className="text-emerald font-bold">{vehicle.fare}</span></p>
                    
                    {/* Exapnds on hover */}
                    <motion.div 
                      className="mt-auto space-y-2 overflow-hidden"
                      variants={{
                        hover: { height: "auto", opacity: 1 },
                      }}
                      initial={{ height: 0, opacity: 0 }}
                    >
                      <div className="flex justify-between border-t border-white/10 pt-2 pb-1 text-sm">
                        <span className="text-gray-400">Capacity</span>
                        <span className="text-white font-medium">{vehicle.capacity}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2 text-sm">
                        <span className="text-gray-400">Box Size</span>
                        <span className="text-white font-medium">{vehicle.size}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="packers"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 glass rounded-3xl p-8 lg:p-12 border border-cyber-pink/20"
            >
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-pink/10 border border-cyber-pink/20 text-cyber-pink text-sm font-semibold tracking-wider uppercase mb-6 w-fit">
                  <Package size={16} /> Relocation Services
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase">
                  100% Damage-Free, <br />
                  <span className="text-cyber-pink">Expert Handling.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  We treat your assets like they are our own. From high-value electronics to fragile furniture, our specialized relocation units ensure zero-defect shifting.
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-cyber-pink hover:bg-cyber-pink/80 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                    Get Shifting Estimate
                  </button>
                </div>
              </div>

              <div className="relative border border-white/10 rounded-2xl p-8 bg-charcoal flex flex-col justify-center overflow-hidden">
                {/* Visual Tracker */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/5 mx-8 z-0 rounded-full" />
                
                <div className="relative z-10 space-y-12">
                  {packersSteps.map((step, idx) => (
                    <motion.div 
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 + 0.3 }}
                      className="flex items-center gap-6"
                    >
                      <div className="relative shrink-0 w-12 h-12 rounded-full glass border border-cyber-pink bg-deep-space flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                        <CheckCircle2 size={20} className="text-cyber-pink" />
                        {/* Connecting line */}
                        {idx !== packersSteps.length - 1 && (
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-cyber-pink/50 to-transparent" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-display text-xl uppercase tracking-wide mb-1">{step.title}</h4>
                        <p className="text-gray-500 text-sm">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
