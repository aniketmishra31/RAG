import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../main";
import { useState } from "react";
import { ResponseType } from "../../types/ResponseType";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
const Login = () => {
    const navigate = useNavigate();
    const { setUserId } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (!res.ok)
                    throw Error("Error in response");
                return res.json();
            })
            .then((data: ResponseType) => {
                localStorage.setItem("accessToken", data.accessToken);
                setUserId(data.user_id);
                navigate("/profile");
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <>
            <div className="container">
                <div className="login">
                    <h4>Welcome to AskPDF</h4>
                    <p>Login to your account</p>
                    <form method="POST" onSubmit={handleLogin}>
                        <div className="input-fields">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-fields">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <input type="submit" value="Login" />
                    </form>
                    <p>Do not have an account? <Link to={"/signup"}>create one</Link></p>
                </div>
            </div>
        </>
    );
}

export default Login;