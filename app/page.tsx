"use client";

import { useState } from "react";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Steps } from "@/components/steps";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main
        className="flex-grow container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <motion.h1
            className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Online QR Generator
          </motion.h1>
          <Steps currentStep={currentStep} />
        </div>
        <QRCodeGenerator onStepChange={setCurrentStep} />
      </motion.main>
      <Footer />
    </div>
  );
}
