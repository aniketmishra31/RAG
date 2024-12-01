import db from "../config/db";

interface DocumentConstructor {
    text: string;
    user_id: string;
    api_key: string;
    title: string;
}
export class Document {
    private text: string;
    private user_id: string;
    private api_key: string;
    private title: string
    constructor({ text, user_id, api_key, title }: DocumentConstructor) {
        this.text = text;
        this.api_key = api_key;
        this.user_id = user_id;
        this.title = title;
    }
    static async getDocs(user_id: string): Promise<DocumentConstructor & { id: string }[] | undefined> {
        try {
            const { data, error } = await db
                .from("documents")
                .select("*")
                .eq("user_id", user_id);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data as DocumentConstructor & { id: string }[];
        } catch (err: any) {
            throw err;
        }
    }
    static async getDocumentByID(doc_id: string): Promise<DocumentConstructor & { id: string } | undefined> {
        try {
            const { data, error } = await db
                .from("documents")
                .select("*")
                .eq("id", doc_id)
                .single();
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data as DocumentConstructor & { id: string };
        } catch (err: any) {
            throw err;
        }
    }
    static async updateApiKey(doc_id: string, newApiKey: string): Promise<boolean> {
        try {
            const { error } = await db
                .from("documents")
                .update({ api_key: newApiKey })
                .eq("id", doc_id);
            if (error)
                throw error;
            return true;
        } catch (err: any) {
            throw err;
        }
    }
    static async getPdfId(doc_id: string): Promise<string | undefined> {
        try {
            const { data, error } = await db
                .from("embeddings")
                .select("metadata")
                .eq("document_id", doc_id);
            if (error)
                throw error;
            if (!data)
                return undefined;
            return data[0].metadata as string;
        } catch (err: any) {
            throw err;
        }
    }
}