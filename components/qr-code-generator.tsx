'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { QRCodeType, qrCodeTypes } from '@/lib/qr-types'
import { QRCodeForm } from './qr-code-form'
import { motion, AnimatePresence } from 'framer-motion'
// import { Steps } from './steps'

export function QRCodeGenerator({ onStepChange }: { onStepChange: (step: number) => void }) {
  const [selectedType, setSelectedType] = useState<QRCodeType | null>(null)

  const handleTypeSelect = (type: QRCodeType) => {
    setSelectedType(type)
    onStepChange(2)
  }

  const handleBack = () => {
    setSelectedType(null)
    onStepChange(1)
  }

  const handleFormSubmit = () => {
    onStepChange(3)
  }

  return (
    <div className="container mx-auto px-4">
      <AnimatePresence mode="wait">
        {!selectedType ? (
          <motion.div
            key="type-selection"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">1. Select a type of QR code</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {qrCodeTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors h-full"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                      <div className="text-primary">{type.icon}</div>
                      <h3 className="font-semibold text-lg">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="qr-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <QRCodeForm type={selectedType} onBack={handleBack} onSubmit={handleFormSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

