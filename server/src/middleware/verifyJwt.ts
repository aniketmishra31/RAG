import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const isAuth = async (req: Request & {
    user?: {
        user_id: string;
    }
},
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.headers["authorization"] as string;
        if (!accessToken)
            throw { status: 401, message: "No token found" };
        const token = accessToken.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_SECRET as string) as string;
        const user = await User.getUserByEmail(data);
        if (!user)
            throw { status: 401, message: "Token value incorrect" };
        req.user = { user_id: user.id };
        next();
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json(err.message || err);
    }
}
export default isAuth;