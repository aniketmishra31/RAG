import "./Signup.css";
import React, { useState } from "react";
import { ResponseType } from "../../types/ResponseType";
import { useAuth } from "../../hooks/useAuth";
import { BASE_URL } from "../../main";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const {setUserId} = useAuth();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cnfPassword: "",
        username: ""
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                username: formData.username
            })
        })
            .then((res) => {
                if (!res.ok)
                    throw Error("Error in response");
                return res.json();
            })
            .then((data: ResponseType) => {
                console.log(data);
                setUserId(data.user_id);
                localStorage.setItem("accessToken",data.accessToken);
                navigate("/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="container">
                <div className="signup">
                    <h4>Welcome to AskPDF</h4>
                    <p>Create a new account</p>
                    <form method="POST" onSubmit={handleSignup}>
                        <div className="input-fields">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-fields">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-fields">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-fields">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                name="cnfPassword"
                                id="confirm-password"
                                placeholder="Re-Enter your password"
                                value={formData.cnfPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-fields">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input type="submit" value="Signup" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;