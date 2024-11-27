import "./Navbar.css";
const Navbar = () => {
    return (  
        <nav>
            <a className="brand" href="/">Ask PDF</a>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Contact</a></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;