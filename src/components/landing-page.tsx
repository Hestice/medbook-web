'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Stethoscope } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import EmailForm from '@/components/auth-forms/email-form'
import LoginForm from '@/components/auth-forms/login-form'
import RegisterForm from './auth-forms/register-form'
import RegisterSuccess from './dialogs/register-success'

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleRegisterSuccess = () => {
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation/>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center mb-8">
          <Stethoscope className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4">
            Need a Doctor?
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
            We&apos;re here to help. Book your appointment in just a few clicks.
          </p>
          <Button onClick={() => setShowLogin(true)} size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
        </div>
      </main>
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg p-6 overflow-y-auto"
          >
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              onClick={() => {
                setShowLogin(false)
                setStep(0)
                setEmail('')
                setIsExistingUser(null)
              }}
            >
              &times;
            </Button>
            <div className="mt-8">
              {step === 0 && (
                <EmailForm setEmail={setEmail} setIsExistingUser={setIsExistingUser} setStep={setStep} />
              )}
              {step === 1 && isExistingUser !== null && (
                <div className="space-y-4">
                  {isExistingUser ? (
                    <LoginForm email={email} />
                  ) : (
                    <RegisterForm email={email} onRegisterSuccess={handleRegisterSuccess}/>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
      
      { dialogOpen && <RegisterSuccess dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} setShowLogin={setShowLogin} setIsExistingUser={setIsExistingUser}/> }
      
    </div>
  )
}