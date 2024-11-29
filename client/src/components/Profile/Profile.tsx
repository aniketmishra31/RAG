import { useEffect, useState } from "react";
import { BASE_URL } from "../../main";
import "./Profile.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Navbar/Navbar";

interface User {
    name: string;
    email: string;
    username: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        fetch(`${BASE_URL}/user`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Could not get user");
                return res.json();
            })
            .then((data: any) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <Navbar />
            {user ?
                (
                    <>
                        <div className="header">
                            <h2>Welcome {user.name}!</h2>
                        </div>
                        <div className="content">
                            <div className="files">
                                <h5>Files</h5>
                            </div>
                            <button className="btn upload">
                                <FontAwesomeIcon className="upload-icon" icon={faPlus} />
                                Upload PDF
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Loading user profile...</p>
                )}
        </>
    );
};

export default Profile;
