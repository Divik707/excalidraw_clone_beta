import { z }  from "zod";

export const user_input_schema = z.object({
    username: z.string(),
    password: z.string()
})

export const JWT_SECRET = process.env.JWT_SECRET;