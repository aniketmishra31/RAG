import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
    userId: string | undefined;
    setUserId: (id: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | undefined>(() => {
        return localStorage.getItem("ref_id") || undefined;
    });
    useEffect(() => {
        if (userId) 
            localStorage.setItem("ref_id", userId);
        else 
            localStorage.removeItem("ref_id");
    }, [userId]);
    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
