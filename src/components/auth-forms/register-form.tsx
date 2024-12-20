import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { registerFormSchema } from '@/schema/user'
import { registerUser } from '@/services/user-service'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface RegisterFormProps {
  email: string
  onRegisterSuccess: () => void
}

export default function RegisterForm({ email, onRegisterSuccess }: RegisterFormProps) {

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: email || "" ,
      name: "",
      role: "",
      password: "",
      confirmPassword: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const registrationData = {
        name: values.name,
        email: values.email,
        role: values.role,
        password: values.password,
      }
  
      await registerUser(registrationData)
      onRegisterSuccess()
  
    } catch (error) {
      console.error("Error during registration:", error)
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription>Since it&apos;s your first time here...</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is Your Name?</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>You are Joining As...</FormLabel>
                <FormControl>
                  <Select {...field} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="border border-gray-300 rounded-md p-2">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>What are You Here For?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set a Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>Almost there! Set up a strong password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm password" type="password" {...field} />
                </FormControl>
                <FormDescription>Retype your password for confirmation</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Register <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
