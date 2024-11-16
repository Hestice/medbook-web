import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { loginFormSchema } from '@/schema/user'
import { loginUser } from '@/services/users'
import { useRouter } from 'next/navigation'


interface LoginFormProps {
  email: string;
}

export default function LoginForm({ email }: LoginFormProps) {
  const router = useRouter()
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: email,
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await loginUser(values)
      console.log("Login successful:", response)
      router.push('/dashboard')
    } catch (error) {
      console.error("Error during submission:", error)
    }
  }

  return (
    <>
      <FormProvider  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Welcome Back!</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription>Great to see you again.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter password" type="password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password to log in.</FormDescription>
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
