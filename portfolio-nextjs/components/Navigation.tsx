"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md"
          : "bg-white/95 backdrop-blur-sm border-b"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="font-serif text-xl font-medium hover:opacity-70 transition-opacity"
          >
            Aminata Bah
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#about" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="#work" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

