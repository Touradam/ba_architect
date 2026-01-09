"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "10+", label: "Academic Projects" },
    { number: "2026", label: "Seeking Summer Internship" },
    { number: "3+", label: "Design Software" },
  ];

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-baseline gap-6 mb-16">
            <span className="text-sm text-gray-500 font-light tracking-wider">01</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
              About
            </h2>
          </div>

          <div className="space-y-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl font-light"
            >
              I am a Masters in Architecture student with a strong passion for creating innovative,
              sustainable, and human-centered designs. Through my academic projects and coursework,
              I have developed advanced skills in conceptual design, technical drawing, and 3D modeling.
              I am eager to gain hands-on experience and contribute fresh perspectives to a dynamic
              architecture firm this summer.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <h3 className="font-serif text-5xl md:text-6xl font-medium mb-3">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-600 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

