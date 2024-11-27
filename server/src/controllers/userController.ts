import type { Request, Response } from "express";
import { User } from "../models/User";

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const user_id: string = req.params.id as string;
        const user = await User.getUserByID(user_id);
        if (!user)
            throw { status: 404, message: "No user found by email" };
        const resUser={
            name: user.name,
            email: user.email,
            username: user.username
        }
        res.status(200).json({ user: resUser });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json({ err: err.message || err });
    }
}