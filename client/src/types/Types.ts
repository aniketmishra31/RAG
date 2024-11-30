export interface ResponseType {
    accessToken: string;
    user_id: string;
}
export interface User {
    name: string;
    email: string;
    username: string;
}
export interface Document {
    text: string;
    user_id: string;
    api_key: string;
    title: string;
}