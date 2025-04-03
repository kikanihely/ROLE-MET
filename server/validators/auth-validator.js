const { z } = require("zod");

const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }).trim(),
    city: z.string().min(1, { message: "City is required" }).trim(),
    state: z.string().min(1, { message: "State is required" }).trim(),
    jobTitle: z.string().optional().trim(),
    experience: z
      .number()
      .min(0, { message: "Experience cannot be negative" })
      .optional(),
    industry: z.string().min(1, { message: "Industry is required" }).trim(),
    skills: z.array(
      z.string().min(1, { message: "Each skill must be a non-empty string" })
    ),
    linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
    github: z.string().url({ message: "Invalid GitHub URL" }).optional(),
    resume: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }).trim(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),
    isAdmin: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
});

module.exports = { registerSchema, loginSchema };
