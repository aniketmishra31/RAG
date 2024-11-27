import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BASE_URL } from "../../main";

interface User {
    name: string;
    email: string;
    username: string;
}
const Profile = () => {
    const { userId } = useAuth();
    const [user, setUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        fetch(`${BASE_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw Error("Could not get user");
                return res.json();
            })
            .then((data: User) => {
                setUser(data);
            })
    }, [userId]);
    return (
        <>
            {
                user &&
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.username}</p>
                </div>
            }
        </>
    );
}

export default Profile;