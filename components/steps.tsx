import { Check } from 'lucide-react'

interface StepsProps {
  currentStep: number
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { number: 1, title: 'Type of QR code' },
    { number: 2, title: 'Content' },
    { number: 3, title: 'QR design' },
  ]

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-muted-foreground text-muted-foreground'
          }`}>
            {currentStep > step.number ? (
              <Check className="w-6 h-6" />
            ) : (
              <span className="text-sm font-medium">{step.number}</span>
            )}
          </div>
          <div className={`ml-2 text-sm font-medium ${
            currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {step.title}
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-1 mx-2 bg-muted">
              <div className={`h-full ${currentStep > step.number ? 'bg-primary' : ''}`} style={{
                width: currentStep > step.number ? '100%' : (currentStep === step.number ? '50%' : '0%')
              }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

