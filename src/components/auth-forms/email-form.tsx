import { Input } from "@/components/ui/input"
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { checkEmail } from "@/services/user-service"
import { emailCheckFormSchema } from "@/schema/check-email"

interface EmailFormProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean | null>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function EmailForm({ setEmail, setIsExistingUser, setStep }: EmailFormProps) {

  const form = useForm<z.infer<typeof emailCheckFormSchema>>({
    resolver: zodResolver(emailCheckFormSchema),
    defaultValues: {
      email: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof emailCheckFormSchema>) {
    setEmail(values.email);
    try {
      const data = await checkEmail(values.email)
      setIsExistingUser(data.exists)
      setStep(1)
    } catch (error) {
      console.error("Error during submission:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First things first...</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>What is your Email Address?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
