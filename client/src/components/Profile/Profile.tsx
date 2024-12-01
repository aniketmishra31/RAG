import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import Navbar from "../Navbar/Navbar";
import File from "../File/File";
import { User, Document } from "../../types/Types";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [docs, setDocs] = useState<Document[] | undefined>(undefined);
    const navigate = useNavigate();
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
        fetch(`${BASE_URL}/all-pdfs`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error("Could not fetch documents");
                return res.json();
            })
            .then((data: any) => {
                setDocs(data.documents);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);
    const handleUpload = () => {
        navigate("/upload-new");
    }
    return (
        <>
            <Navbar />
            {user ?
                (
                    <div className="profile">
                        <h2>Welcome {user.name}!</h2>
                        <button className="btn" onClick={handleUpload}>Upload PDF</button>
                        {!docs && <p>Upload a PDF and query easily</p>}
                        {docs && <h5>View your uploaded files</h5>}
                        <div className="files">
                            {
                                docs ?
                                    (
                                        docs.map(doc =>
                                            <File title={doc.title} text={doc.text} id={doc.id}/>
                                        )
                                    ) : (
                                        <p>Loading...</p>
                                    )
                            }
                        </div>
                    </div >
                ) : (
                    <p>Loading user profile...</p>
                )}
        </>
    );
};

export default Profile;
