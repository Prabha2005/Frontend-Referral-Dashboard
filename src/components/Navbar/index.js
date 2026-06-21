import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Navbar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
            Go Business
            </Link>

            <div className="nav-actions">
                <button type="button" className="try-btn">
                    Try for free
                </button>
            
            <button type="button" className="logout-btn" onClick={onLogout}>Log out</button>
        </div>

        </nav>
    );
};

export default Navbar;