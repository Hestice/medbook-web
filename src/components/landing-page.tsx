'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stethoscope, ArrowRight } from 'lucide-react'

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically check if the email exists in your database
    // For this example, we'll randomly decide if it's an existing user
    setIsExistingUser(Math.random() > 0.5)
    setStep(1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
        <nav className="flex gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
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
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Welcome to MedBook!</h2>
                  <p className="text-gray-600 mb-4">Let&apos;s get started with your email address.</p>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
              {step === 1 && isExistingUser !== null && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">
                    {isExistingUser ? "Welcome back!" : "Let's create your account"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {isExistingUser
                      ? "Great to see you again. Please enter your password to log in."
                      : "You're almost there! Just set a password to create your account."}
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  {!isExistingUser && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" required />
                    </div>
                  )}
                  <Button className="w-full">
                    {isExistingUser ? "Log In" : "Create Account"}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 MedBook. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}