"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { name: "For Enterprise", href: "/enterprise" },
  { name: "Driver Partner", href: "/driver-partner" },
  { name: "Support", href: "/support" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="fixed top-8 inset-x-0 mx-auto w-max max-w-6xl z-50 pointer-events-none mix-blend-normal">
      <nav className="pointer-events-auto bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_20px_40px_-20px_rgba(4,69,218,0.15)] rounded-full px-4 py-2.5 flex items-center lg:gap-8 transition-all duration-500 hover:bg-white/80">
        
        {/* Logo block */}
        <div className="flex-shrink-0 flex items-center pl-4 pr-6 shrink-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-6 after:w-[1px] after:bg-gray-200">
          <Link href="/" className="active:scale-95 transition-transform duration-300 block hover:opacity-80">
            <img src=".//logo.svg" alt="Porter Logo" className="h-[18px] w-auto object-contain" />
          </Link>
        </div>
        
        {/* Dynamic Island Links */}
        <div className="hidden md:flex items-center relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <div 
                key={link.name}
                className="relative px-5 py-2.5 cursor-pointer"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="soft-nav-hover"
                    className="absolute inset-0 bg-[#0445DA]/[0.06] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href={link.href}
                  className={`relative z-10 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-[#0445DA]" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Removed Action Button Segment */}
        
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden ml-8 mr-2">
          <button className="text-black bg-white/50 w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors shadow-sm border border-gray-100">
            <span className="w-4 h-[1.5px] bg-black"></span>
            <span className="w-4 h-[1.5px] bg-black translate-x-1"></span>
          </button>
        </div>

      </nav>
    </div>
  );
}
