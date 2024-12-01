import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
    const { userId, setUserId } = useAuth();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("ref_id");
        setUserId(undefined);
    }
    return (
        <nav>
            <a className="brand" href="/">Ask PDF</a>
            <ul>
                <li><Link to="/" >Home</Link></li>
                {userId && <li><Link to="/profile">Profile</Link></li>}
                <li><Link to="/">About</Link></li>
                {!userId && <li><Link to="/">Contact</Link></li>}
                {userId && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;