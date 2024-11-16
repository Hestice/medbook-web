import { z } from "zod"

export  const emailCheckFormSchema = z.object({
  email: z
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email.")
})