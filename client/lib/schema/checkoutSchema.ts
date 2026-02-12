import { z } from "zod";

const checkoutSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, {
      message: "Phone number must have at least 10 characters.",
    })
    .max(15, { message: "Phone number must have at most 15 characters." })
    .regex(
      /^[\+]?[\d\s]{10,15}$/,
      "Invalid phone number, must be between 10 and 15 digits",
    ),

  altMobileNumber: z
    .string()
    .min(10, {
      message: "Phone number must have at least 10 characters.",
    })
    .max(15, { message: "Phone number must have at most 15 characters." })
    .regex(
      /^[\+]?[\d\s]{10,15}$/,
      "Invalid phone number, must be between 10 and 15 digits",
    )
    .optional()
    .or(z.literal("")),

  email: z.string().email({ message: "Invalid email address." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const addressSchema = z.object({
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  district: z.string().min(2, {
    message: "district must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  address: z.string().min(10, {
    message: "address must be at least 10 characters.",
  }),
  pinCode: z.string().min(4, {
    message: "pin code must be at least 4 characters.",
  }),
  flatNo: z
    .string()
    .min(1, { message: "flat no must be at least 1 characters." }),
  landmark: z
    .string()
    .min(2, { message: "landmark must be at least 2 characters." })
    .optional(),
});

export { checkoutSchema, addressSchema };
