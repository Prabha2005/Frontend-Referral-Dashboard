import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const LOGIN_API_URL = `${API_BASE_URL}/api/auth/signin`;

const Login = () => {
  const navigate = useNavigate();

  const existingToken = Cookies.get("jwt_token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Assessment requirement:
   * Authenticated users visiting /login should go to /.
   */
  if (existingToken) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let responseJson;

      try {
        responseJson = await response.json();
      } catch {
        responseJson = {};
      }

      if (response.ok && responseJson?.data?.token) {
        Cookies.set("jwt_token", responseJson.data.token);

        navigate("/", {
          replace: true,
        });

        return;
      }

      setErrorMessage(
        responseJson?.message ||
        `Unable to sign in. Request failed with status ${response.status}.`
      );
    } catch (error) {
      setErrorMessage(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1 className="login-brand">Go Business</h1>

        <p className="login-tagline">
          Sign in to open your referral dashboard.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          {errorMessage && (
            <p className="login-error" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            className="login-submit-button"
            type="submit"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;