import { useState } from "react";
import { VerifyLogin } from "../api/users";
import "./Navbar.css";

function Navbar() {
    let [verified, setVerified] = useState(false);

    let verifyLogin = async () => {
        if (localStorage.getItem('auth_token')) {
            let verification = await VerifyLogin();

            if (verification.data.success) {
                setVerified(true);
                return;
            }
        }
    }

    function logout() {
        localStorage.removeItem('auth_token');
        window.location.href = '/';
    }

    if (!verified) {
        verifyLogin();
    }

    return (
        <nav className="navbar">
            <ul className="navbar-section navbar-brand">
                <li className="navbar-item">
                    MyApp
                </li>
            </ul>
            <ul className="navbar-section navbar-menu">
                <li className="navbar-item">
                    <a href="/" className="navbar-link">Home</a>
                </li>
            </ul>
            <ul className="navbar-section navbar-actions">
                {
                    verified ? (
                        <>
                            <li className="navbar-item" onClick={logout}>
                                <button className="navbar-button">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <button className="navbar-button">Login</button>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-button">Register</button>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
}

export default Navbar;