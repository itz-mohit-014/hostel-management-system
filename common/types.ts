import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  passwrod: z
    .string()
    .min(5, { message: "password Length can not be less than 5 char" })
    .max(20, { message: "password Length can not be less than 5 char" })
    .regex(passwordRegex),
});

export const loginSchema = z.object({
  email: z.string().email(),
  passwrod: z
    .string()
    .min(5, { message: "password Length can not be less than 5 char" })
    .max(20, { message: "password Length can not be less than 5 char" })
    .regex(passwordRegex),
});

export const profile = z.object({
  contact: z.number().min(1000000000).max(9999999999),
  roomNo: z.number().optional(),
  hostelName: z.string().optional(),
  departement: z.string().optional(),
  profilePicture: z.string().optional(),
});

export const complaint = z.object({
  type: z.string(),
  title: z.string(),
  status: z.string(),
  description: z.string().max(300),
  image: z.string().optional(),
  user: z.string(),
});

export const hostel = z.object({
  hostelName: z.string(),
  roomCount: z.number(),
  admin: z.string(),
  managedBy: z.string().optional(),
});

export const outing = z.object({
    studentId:z.string(),
    outingDate:z.date(),
    returnDate:z.date(),
    outingPurpose:z.string().max(300)
    
})