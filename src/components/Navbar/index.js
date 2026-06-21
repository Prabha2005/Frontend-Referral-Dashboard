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

/*

File: src/components/Navbar/index.js

Line 1:
Imports Link and useNavigate from react-router-dom.

Link:
Used for navigation between routes without reloading the page.

useNavigate:
Provides a function that allows programmatic navigation to different routes.

Line 2:
Imports the js-cookie library.

Purpose:
Used to manage browser cookies, including reading, creating, and deleting authentication tokens.

Line 3:
Imports the Navbar component's CSS file.

Purpose:
Contains styles related to the navigation bar.

Line 5:
Defines a functional component named Navbar.

Purpose:
Represents the top navigation section of the application.

Line 6:
Initializes the navigate function using useNavigate().

Purpose:
Allows route changes through JavaScript code.

Line 8:
Defines a function named onLogout.

Purpose:
Handles user logout functionality.

Line 9:
Removes the JWT token from browser cookies.

Code:
Cookies.remove("jwt_token");

Purpose:
Logs the user out by deleting the authentication token.

Why:
ProtectedRoute depends on this token to determine whether a user is authenticated.

Line 10:
Redirects the user to the login page.

Code:
navigate("/login");

Purpose:
After logout, users are taken back to the authentication screen.

Line 11:
Closes the onLogout function.

Line 13:
Starts the JSX returned by the component.

Line 14:
Creates a semantic navigation container using the nav element.

Class:
navbar

Purpose:
Acts as the application's top navigation bar.

Line 15:
Creates a Link component.

Code:

<Link to="/" className="logo-link">

Purpose:
Navigates to the home page when clicked.

Benefit:
Unlike a normal anchor tag, Link performs navigation without reloading the application.

Line 16:
Displays the application name.

Content:
Go Business

Purpose:
Acts as the brand/logo section of the navigation bar.

Line 17:
Closes the Link component.

Line 19:
Creates a container for navigation actions.

Class:
nav-actions

Purpose:
Groups action-related buttons together.

Line 20:
Creates a button element.

Type:
button

Class:
try-btn

Purpose:
Displays a "Try for free" call-to-action button.

Line 21:
Button text displayed to the user.

Content:
Try for free

Line 22:
Closes the button element.

Line 23:
Closes the nav-actions container.

Line 25:
Creates a logout button.

Type:
button

Class:
logout-btn

Purpose:
Allows authenticated users to log out.

Line 25:
Attaches the onLogout event handler.

Code:
onClick={onLogout}

Purpose:
Executes logout functionality when clicked.

Line 25:
Displays button text.

Content:
Log out

Line 26:
Closes the button element.

Line 27:
Closes the nav element.

Line 28:
Ends the return statement.

Line 29:
Closes the Navbar component.

Line 31:
Exports Navbar as the default export.

Purpose:
Allows Navbar to be imported and used in other components.

Purpose of this File:

This file defines the application's navigation bar. It provides navigation back to the home page, displays branding through the "Go Business" logo, includes a promotional action button, and allows authenticated users to securely log out of the application.

Logout Flow:

1. User clicks "Log out".
2. onLogout() function executes.
3. JWT token is removed from browser cookies.
4. User authentication is invalidated.
5. User is redirected to "/login".
6. ProtectedRoute will prevent access to protected pages until the user logs in again.

Relationship with Other Files:

Login Page
→ Creates and stores the JWT token.

Navbar
→ Removes the JWT token during logout.

ProtectedRoute
→ Checks whether the JWT token exists.

App.js
→ Defines the routes that Navbar helps users navigate between.

Why Link Was Used Instead of an Anchor Tag:

Incorrect: <a href="/">Home</a>

Problem:
Reloads the entire application.

Correct:

<Link to="/">Home</Link>

Benefit:
React Router updates the page without a full browser refresh, resulting in a faster and smoother user experience.

Why Cookies.remove() Was Used:

The JWT token represents the user's authenticated session.

By removing:
Cookies.remove("jwt_token");

The application effectively logs the user out because ProtectedRoute will no longer find a valid authentication token.

Future Enhancements:

1. User Profile Menu

   * Display username and avatar.

2. Notifications

   * Show recent referral activity.

3. Responsive Mobile Menu

   * Hamburger menu for smaller screens.

4. Active Navigation Links

   * Highlight the current page.

5. Dark Mode Toggle

   * Allow users to switch themes.

Current Navigation Structure:

Go Business (Logo/Home Link)

[ Try for free ]     [ Log out ]

This provides a simple and clean navigation experience while maintaining authentication control.


*/