import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@repo/database";
import  jwt from "jsonwebtoken";
import { authMiddleware, type AuthRequest } from "../lib/utils";
import { user_input_schema, JWTSECRET } from "@repo/common";

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
                    console.log(JWTSECRET)
                    if(JWTSECRET == null) {
                        return res.json({
                            message: "secret not found"
                        })
                    } else {
                        const token = jwt.sign({id: user_already_exist.id}, JWTSECRET, {expiresIn: '3h'})
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
                return res.status(500).json({
                    message: "user not found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: "error encountered while signing in"
        })
    }
})

router.get('/user/me', authMiddleware, async(req: AuthRequest, res) => {
    try {
        if(!req.userId) {
            return res.status(500).json({
                message: "Unauthorized access"
            })
        }
        const user = await prisma.user.findFirst({
            where: {
                id: req.userId,
            }
        })
        return res.status(200).json({
            username: user?.username
        })
    } catch (error) {
        return res.status(500).json({
            error: "error encountered while signing in"
        })
    }
})

router.post('/create-room', authMiddleware , async(req: AuthRequest, res) => {
    try {
        if(!req.userId) {
            return res.status(500).json({
                message: "Unauthorized access"
            })
        }
        const adminId = req.userId;
        const slug = req.body;
    
        await prisma.room.create({
            data: {
                slug,
                adminId: adminId
            }
        })
        return res.status(500).json({
            message: "room created ",
            room_name: slug
        })
    } catch (error) {
        return res.status(500).json({
            error: "error encountered while signing in"
        })
    }
})
export default router;