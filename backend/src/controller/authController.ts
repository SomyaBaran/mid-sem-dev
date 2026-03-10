import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { registerSchema } from "../utils/type";

export const register = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    });
};

export const login = async (req: Request, res: Response) => {
    //write code in here
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: error.message
        })
    }
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({
            msg: "invalid password"
        });
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, ENV.JWT_SECRET);

    return res.status(200).json({
        msg: "Login successful",
        token
    });
};

