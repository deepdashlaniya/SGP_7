import { z } from "zod";

export const RegistrationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    mobileNo: z.string().min(10, 'Mobile number must be at least 10 digits'),
    gender: z.enum(['Male', 'Female', 'Other']),
    address1: z.string().min(1, 'Address line 1 is required'),
    address2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    dateOfBirth: z.string().optional(),
    role: z.enum(['User','Business' ,'Admin']).optional(),
  });

  export type RegistrationType = z.infer<typeof RegistrationSchema>;