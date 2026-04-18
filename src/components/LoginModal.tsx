"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Fingerprint, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md pointer-events-auto"
            >
              <div className="relative glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={20} />
                </button>

                {/* Top Glowing Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-porter-blue to-neon-blue" />

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-bold text-white tracking-wide mb-2">
                      Access Portal
                    </h2>
                    <p className="text-sm text-gray-400">
                      Verify identity to continue
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-white/5 rounded-lg p-1 mb-6 border border-white/5">
                    <button
                      onClick={() => setMethod("phone")}
                      className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm rounded-md transition-all ${
                        method === "phone"
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <Phone size={14} /> OTP
                    </button>
                    <button
                      onClick={() => setMethod("email")}
                      className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm rounded-md transition-all ${
                        method === "email"
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <Mail size={14} /> Email
                    </button>
                  </div>

                  {/* Input Field */}
                  <div className="relative mb-6 group">
                    <input
                      type={method === "phone" ? "tel" : "email"}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={method === "phone" ? "Enter Mobile Number" : "Enter Email Address"}
                      className="w-full bg-deep-space/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                    />
                    <div className="absolute inset-0 rounded-lg border border-neon-blue opacity-0 group-focus-within:opacity-100 group-focus-within:border-glow transition-opacity pointer-events-none" />
                  </div>

                  {/* Submit Button */}
                  <button className="w-full relative group overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-porter-blue to-neon-blue opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white font-medium">
                      <span>Send Authentication Code</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Biometric Scan */}
                  <button className="mt-6 w-full flex flex-col items-center justify-center gap-3 py-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <Fingerprint size={32} className="text-gray-400 group-hover:text-neon-blue transition-colors z-10" />
                      <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      Scan Biometrics
                    </span>
                  </button>

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
