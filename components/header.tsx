"use client";

import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

export function Header() {
  return (
    <motion.header
      className="gradient-bg text-black py-6 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          // whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <QrCode className="w-8 h-8" />
          <span className="text-2xl font-bold">QR Generator</span>
        </motion.div>
        {/* <nav>
          <ul className="flex space-x-4">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="/" className="hover:text-gray-200">
                Home
              </a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="/about" className="hover:text-gray-200">
                About
              </a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <a href="/contact" className="hover:text-gray-200">
                Contact
              </a>
            </motion.li>
          </ul>
        </nav> */}
      </div>
    </motion.header>
  );
}
