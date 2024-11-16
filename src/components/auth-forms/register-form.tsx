import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'

interface RegisterFormProps {
  email: string;
}

export default function RegisterForm({ email }: RegisterFormProps) {
  const registerFormSchema = z.object({
    email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    password: z.string().min(1)
  })

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: email,
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      console.log("login", values)

    } catch (error) {
      console.error("Error during submission:", error)
    }
  }
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Let&apos;s Create your Account!</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set a password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription> Almost there, just set up a strong password to create your account!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />  
          <Button type="submit" className="w-full">
            Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </FormProvider>
    </>
  )
}
