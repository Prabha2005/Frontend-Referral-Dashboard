import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onSubmitForm = async event => {
        event.preventDefault();

        const userDetails = {email, password};

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        };
        const response = await fetch(
            "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
            options,
        );
        const data = await response.json();

        if (response.ok) {
            Cookies.set("jwt_token", data.data.token, { expires: 7 });
            navigate("/");
        }
        else{
            setErrorMessage(data.message);
        }
    };

    return (
        <div className="login-bg">
            <form className="login-card" onSubmit={onSubmitForm}>
                <h1 className="logo">Go Business</h1>
                <p className="subtitle">Sign in to open your referral dashboard.</p>
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value = {email}
                onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Sign in</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
};
export default Login;