import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = ({children}) => {
    const token = Cookies.get("jwt_token");

    if (!token){
        return <Navigate to="/login" replace />; 
    }
    return children;
}

export default ProtectedRoute;

/*
File: src/components/ProtectedRoute/index.js

Line 1:
Imports the Navigate component from react-router-dom.

Purpose:
Navigate is used to redirect users from one route to another programmatically.

Line 2:
Imports the js-cookie library.

Purpose:
Used to access cookies stored in the browser, including the JWT token created after login.

Line 4:
Creates a functional component named ProtectedRoute.

Purpose:
This component protects routes from unauthorized access.

Line 4:
Receives children as a prop.

Purpose:
children represents the component wrapped inside ProtectedRoute.

Example: <ProtectedRoute> <Dashboard /> </ProtectedRoute>

In this case, Dashboard becomes the children prop.

Line 5:
Retrieves the JWT token from browser cookies.

Code:
const token = Cookies.get("jwt_token");

Purpose:
Checks whether the user is authenticated.

Line 7:
Checks if the token does not exist.

Condition:
if (!token)

Purpose:
Determines whether the user is logged in.

Line 8:
Redirects the user to the login page.

Code:
return <Navigate to="/login" replace />;

Purpose:
Prevents unauthorized users from accessing protected pages.

About replace:
The replace attribute replaces the current history entry instead of creating a new one.

Benefit:
After being redirected to the login page, users cannot simply click the browser Back button to return to the protected page.

Line 9:
Closes the if block.

Line 10:
Returns the children component if a valid token exists.

Purpose:
Allows authenticated users to access the protected page.

Example:
If the token is present and children is Dashboard, then Dashboard will be rendered.

Line 11:
Closes the ProtectedRoute component.

Line 13:
Exports ProtectedRoute as the default export.

Purpose:
Allows this component to be imported and used in routing files.

Purpose of this File:

This component acts as an authentication guard for protected pages. Before rendering a page, it checks whether a JWT token exists in browser cookies. If the token is missing, the user is redirected to the login page. If the token exists, the requested page is displayed.

Why ProtectedRoute is Used:

Without ProtectedRoute:

* Users can directly access private URLs by typing them into the browser.
* Sensitive pages become accessible without authentication.

With ProtectedRoute:

* Every protected page requires a valid login token.
* Unauthorized users are automatically redirected to the login page.
* Security and user access control are improved.

Example Usage:

<Route
path="/dashboard"
element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>
}
/>

Flow:

1. User requests a protected page.
2. ProtectedRoute checks for jwt_token.
3. If token exists:
   → Render the requested page.
4. If token does not exist:
   → Redirect to /login.
5. User must authenticate before accessing protected content.
*/