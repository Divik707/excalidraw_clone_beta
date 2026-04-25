import { z }  from "zod";
import dotenv from "dotenv";
dotenv.config();

export const user_input_schema = z.object({
    username: z.string(),
    password: z.string()
})

export const JWTSECRET = process.env.JWT_SECRET || "mysecretpassword";