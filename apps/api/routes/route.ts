import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@repo/database";
import  jwt from "jsonwebtoken";
import { authMiddleware, user_input_schema } from "../lib/utils";

const router = Router();


router.post('/signup', async (req, res) => {
    try {
        const result = user_input_schema.safeParse(req.body);
        if (result.error) {
            return res.status(500).json({
                error: "error encountered while signing up"
            })
        }
        else {
            const { username, password } = result.data;
            const user_already_exist = await prisma.user.findFirst({
                where: {
                    username
                }
            })
            if(user_already_exist) {
                return res.status(500).json({
                    message: "user already exist"
                })
            } else {
                await prisma.user.create({
                    data: {
                        username,
                        password: await bcrypt.hash(password, 10)
                    }
                })
                return res.status(200).json({
                    message: "user signed up"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: "error encountered while signing up"
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const result = user_input_schema.safeParse(req.body);
        if (result.error) {
            return res.status(500).json({
                error: "error encountered while signing in"
            })
        }
        else {
            const { username, password } = result.data;
            const user_already_exist = await prisma.user.findFirst({
                where: {
                    username
                }
            })
            if(user_already_exist) {
                if(await bcrypt.compare(password, user_already_exist.password)) {
                    if(process.env.JWT_SECRET == null) {
                        return res.json({
                            message: "secret not found"
                        })
                    } else {
                        const token = jwt.sign({id: user_already_exist.id}, process.env.JWT_SECRET, {expiresIn: '3h'})
                        return res.status(200).json({
                            message: "user signed in",
                            token: token
                        })
                    }
                }
                else {
                    return res.status(500).json({
                        message: "wrong password"
                    })
                }
            }
            else {
                res.status(500).json({
                    message: "user not found"
                })
            }

            res.json({
                message: "signed in successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: "error encountered while signing in"
        })
    }
})

router.post('/create-room', authMiddleware , async(req, res) => {
    // db call and check
    res.json({
        message: "accessed auth"
    })
})
export default router;