const { z } = require("zod");
const mongoose = require("mongoose"); // Required for ObjectId validation

const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }).trim(),
    city: z.string().min(1, { message: "City is required" }).trim(),
    state: z.string().min(1, { message: "State is required" }).trim(),
    jobTitle: z.string().trim().optional(),
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

    role: z.enum(["candidate", "company"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be either 'candidate' or 'company'",
    }),
});

const companyRegisterSchema = z
  .object({
    companyName: z
      .string()
      .min(1, { message: "Company Name is required" })
      .trim(),

    emailId: z.string().email({ message: "Invalid email format" }).trim(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must not exceed 100 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one digit",
      })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" }),

    number: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),

    website: z.string().url({ message: "Invalid website URL" }).optional(),

    linkedIn: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),

    address: z.string().min(1, { message: "Address is required" }).trim(),

    city: z.string().min(1, { message: "City is required" }).trim(),

    state: z.string().min(1, { message: "State is required" }).trim(),

    numberOfEmployees: z.string(),

    companyDescription: z
      .string()
      .max(1000, { message: "Description must not exceed 1000 characters" })
      .optional(),

    logoUrl: z.string().url({ message: "Invalid logo URL" }).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const jobSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Job title is required" })
    .max(100, { message: "Job title must be less than 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),

  location: z.string().min(2, { message: "Location is required" }),

  experience: z.string().min(1, { message: "Experience is required" }),

  salaryRange: z
    .string()
    .regex(/^\d{4,}-\d{4,}$/, {
      message: "Salary range must be in 'min-max' format like '40000-60000'",
    })
    .optional(),

  skillsRequired: z
    .string()
    .min(1, { message: "At least one skill is required" }),

  company: z
    .string({ required_error: "Company reference is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid company ID format",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  companyRegisterSchema,
  jobSchema,
};
