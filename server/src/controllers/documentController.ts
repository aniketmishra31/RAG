import type { Request, Response } from "express";
import { Document } from "../models/Document";

export const getAllDocs = async (req: Request & {
    user?: {
        user_id: string;
    }
},
    res: Response
) => {
    try {
        if (!req.user)
            throw { status: 401, message: "Unauthorized" };
        const documents = await Document.getDocs(req.user.user_id);
        if (!documents)
            throw { status: 404, message: "No documents foound" };
        res.status(200).json({ documents: documents });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json(err.message || err);
    }
}