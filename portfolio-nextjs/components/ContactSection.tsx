"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-baseline gap-6 mb-16">
            <span className="text-sm text-gray-500 font-light tracking-wider">03</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
              Get In Touch
            </h2>
          </div>

          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 font-light"
            >
              I am actively seeking a summer 2026 internship opportunity where I can contribute
              my design skills, learn from experienced professionals, and grow as an emerging
              architect. I would love to connect with you to discuss how I can contribute to your team.
            </motion.p>

            <div className="space-y-6">
              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                href="mailto:aminatabah01012018@icloud.com"
                className="flex items-center gap-4 text-lg text-gray-800 hover:text-black transition-all group p-4 rounded-lg hover:bg-white"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-2 transition-transform">
                  aminatabah01012018@icloud.com
                </span>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                href="https://www.linkedin.com/in/aminata-bah-bb6398399/?trk=contact-info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-gray-800 hover:text-black transition-all group p-4 rounded-lg hover:bg-white"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-2 transition-transform">
                  LinkedIn Profile
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

