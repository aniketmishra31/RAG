import type { Request, Response } from "express";
import { User, UserConstructor } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (payload: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
}
const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
export const signup = async (req: Request, res: Response) => {
    try {
        const reqBody: UserConstructor = req.body;
        if(!reqBody)
            throw {status: 400,message: "No data found in body"};
        const hash = await hashPassword(reqBody.password);
        reqBody.password = hash;
        const user = new User(reqBody);
        const savedUser=await user.save();
        if(!savedUser)
            throw {status: 500,message: "Could not save the user"};
        const token = createToken(reqBody.email);
        if (!token)
            throw { status: 500, message: "No token created" };
        res.status(201).json({ accessToken: token,user_id: savedUser.id});
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json({ err: err.message || err });
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const {email,password} = req.body;
        if(!email || !password)
            throw {status: 400,message: "No data found in body"};
        const user = await User.getUserByEmail(email);
        if (!user)
            throw { status: 404, message: "No user found by email" };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw { status: 403, message: "Passwords do not match" };
        const token = createToken(user.email);
        if (!token)
            throw { status: 500, message: "No token created" };
        res.status(200).json({ accessToken: token,user_id: user.id });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json({ err: err.message || err });
    }
}