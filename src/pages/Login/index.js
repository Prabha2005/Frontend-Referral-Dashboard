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

/*

File: Login/index.js

Line 1:
Imports the useState hook from React.
useState is used to create and manage state variables inside the component.

Line 2:
Imports useNavigate from react-router-dom.
This hook is used to programmatically navigate between routes after successful login.

Line 3:
Imports the js-cookie library.
This library is used to create, read, and manage browser cookies.

Line 4:
Imports the CSS file associated with the Login component.
This file contains styling for the login page.

Line 6:
Creates a functional component named Login.

Line 7:
Creates a state variable named email.
Initial value is an empty string.
Stores the user's email input.

Line 8:
Creates a state variable named password.
Initial value is an empty string.
Stores the user's password input.

Line 9:
Creates a state variable named errormessage.
Initial value is an empty string.
Stores error messages returned from the API.

Line 11:
Initializes the navigate function using useNavigate().
This function is used to redirect users to different pages.

Line 13:
Defines an asynchronous function named onSubmitForm.
This function executes when the login form is submitted.

Line 14:
Prevents the browser's default form submission behavior.
Without this, the page would reload.

Line 16:
Creates a userDetails object.
Stores the email and password entered by the user.

Line 18:
Creates an options object for the API request.

Line 19:
Specifies the HTTP request method as POST.
POST is used because login credentials are being sent to the server.

Line 20 - 22:
Defines request headers.
Content-Type: application/json indicates that JSON data is being sent.

Line 23:
Converts the userDetails object into JSON format before sending it to the server.

Line 25 - 28:
Makes an API request to the login endpoint using fetch().
The await keyword pauses execution until the response is received.

Line 29:
Converts the API response into JavaScript object format using response.json().

Line 31:
Checks whether the API request was successful.

Line 32:
Stores the JWT token received from the server in browser cookies.
The cookie name is jwt_token.

Line 33:
Redirects the user to the home page ("/") after successful login.

Line 35:
Executes when the API request fails.

Line 36:
Stores the error message received from the API into component state.

Line 38:
Ends the onSubmitForm function.

Line 40:
Starts the JSX returned by the component.

Line 41:
Creates the outer container for the login page.
Used for page layout and background styling.

Line 42:
Creates a form element.
The onSubmit event is connected to the onSubmitForm function.

Line 43:
Displays the application title "Go Business".

Line 44:
Displays a subtitle describing the purpose of the page.

Line 45:
Creates a label for the email input field.

Line 46 - 52:
Creates an email input field.

Line 47:
Assigns a unique id of "email".

Line 48:
Sets input type to email.
Allows email validation by the browser.

Line 49:
Displays placeholder text when the field is empty.

Line 50:
Binds the input value to the email state variable.

Line 51:
Updates the email state whenever the user types.

Line 53:
Creates a label for the password field.

Note:
There is a typo here.

Current:
htmmlFor

Correct:
htmlFor

The current attribute will not work correctly in React.

Line 54 - 59:
Creates a password input field.

Line 55:
Assigns a unique id of "password".

Line 56:
Sets input type to password.
Characters entered will be hidden.

Line 57:
Binds the input value to the password state variable.

Line 58:
Updates the password state whenever the user types.

Line 60:
Creates a submit button.
Clicking this button triggers form submission.

Line 61:
Conditionally displays an error message.

How it works:
If errorMessage contains a value, the paragraph element is rendered.
If it is empty, nothing is displayed.

Note:
The code uses errorMessage, but the state variable was declared as errormessage.

Declared:
const [errormessage, setErrorMessage] = useState("");

Used:
errorMessage

This will cause an error.

Recommended Fix:
const [errorMessage, setErrorMessage] = useState("");

Line 62:
Closes the form element.

Line 63:
Closes the outer container.

Line 64:
Ends the JSX return statement.

Line 65:
Closes the Login component.

Line 66:
Exports the Login component as the default export.

Purpose of this File:

This component implements user authentication functionality. It collects email and password credentials from the user, sends them to the authentication API, stores the returned JWT token in cookies upon successful login, and redirects the user to the application's home page. If authentication fails, an appropriate error message is displayed to the user.

*/