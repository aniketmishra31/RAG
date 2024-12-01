import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
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
export const getDoc = async (req: Request &
{
    user?: {
        user_id: string;
    }
}, res: Response) => {
    try {
        if (!req.user)
            throw { status: 401, message: "Unauthorized" };
        const { id } = req.params;
        const doc = await Document.getDocumentByID(id);
        if (!doc)
            throw { status: 400, message: "No document found" };
        res.status(200).json({ document: doc });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json(err.message || err);
    }
}

export const generateApiKey = async (req: Request & {
    user?: {
        user_id: string;
    }
}, res: Response) => {
    try {
        if (!req.user)
            throw { status: 401, message: "Unauthorized" };
        const { id } = req.params;
        const doc = await Document.getDocumentByID(id);
        if (!doc)
            throw { status: 400, message: "No document found" };
        const key = uuidv4() + `${doc.id}`;
        const salt = await bcrypt.genSalt();
        const apiKey = await bcrypt.hash(key, salt);
        const updateStatus = await Document.updateApiKey(id, apiKey);
        res.status(200).json({ status: updateStatus, apiKey: apiKey });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json(err.message || err);
    }
}
export const getPdf = async (req: Request &
{
    user?: {
        user_id: string;
    }
}
    , res: Response
) => {
    try {
        if (!req.user)
            throw { status: 401, message: "Unauthorized" };
        const { id } = req.params;
        const pdf_id = await Document.getPdfId(id);
        if (!pdf_id)
            throw { status: 404, message: "No pdf embeddings with the pdf_id found" };
        res.status(200).json({ pdf_id: pdf_id });
    } catch (err: any) {
        res
            .status(err.status || 500)
            .json(err.message || err);
    }
}