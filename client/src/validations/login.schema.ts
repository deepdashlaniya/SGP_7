import { z } from "zod";

const User = z.object({
    email: z.string().email('Please enter valid email'),
  });