import * as z from "zod";



export const schema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(30, "Name must not exceed 30 characters."),

    email: z
      .string()
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    rePassword: z
      .string()
      .min(1, "Please confirm your password."),

    phone: z
      .string()
      .regex(
        /^01[0125]\d{8}$/,
        "Please enter a valid Egyptian mobile number starting with 010, 011, 012, or 015."
      ),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });

