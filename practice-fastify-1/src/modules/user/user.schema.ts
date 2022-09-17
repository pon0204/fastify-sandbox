import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})
