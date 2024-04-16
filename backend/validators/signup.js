import {z} from "zod";

export const signUpZod = z.object({
    firstName: z.string().trim().min(1, { message: "First name is required" }),
    lastName: z.string().trim().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: " Invalid Email" }),
    phone: z.string().trim().min(10, { message: "invalid phone no" }).max(10,{message:"invalid phone no"}),
    password: z.string().trim().min(6, { message: "Password should be at least 6 characters" }),
    confirm_password: z.string().trim().min(6, { message: "Confirm password should be at least 6 characters" }),
});
