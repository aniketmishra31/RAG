import db from "../config/db";

export interface UserConstructor {
    name: string;
    email: string;
    password: string;
    username: string;
}

export class User {
    private name: string;
    private email: string;
    private password: string;
    private username: string;
    constructor({ name, email, password, username }: UserConstructor) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = username;
    }
    async save(): Promise<void | undefined> {
        try {
            const { error } = await db
                .from("users")
                .insert(this)
                .single();
            if(error)
                throw error;
        } catch (err: any) {
            throw (err);
        }
    }
    static async getUserByEmail(email: string): Promise<UserConstructor & {id: string} | undefined>{
        try {
            const {data,error}=await db
                .from("users")
                .select("*")
                .eq("email",email)
                .single();
            if(error)
                throw error;
            if(!data)
                return undefined;
            return data as UserConstructor & {id: string};
        } catch (err: any) {
            throw err;
        }
    }
}

