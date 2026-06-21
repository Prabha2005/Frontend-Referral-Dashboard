import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from  "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReferralDetails from "./pages/ReferralDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path="/login" element={<Login />} />

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/referral/:id"
    element={
      <ProtectedRoute>
        <ReferralDetails />
      </ProtectedRoute>
    }
  />

  <Route path="*" element={<NotFound />} />

  
</Routes>
    </BrowserRouter>
  );
}

export default App;


/*

File: App.js

Line 1:
Commented import statement for logo.svg.
Currently not used in the application.

Line 2:
Commented import statement for App.css.
Currently not used in the application.

Line 3:
Imports BrowserRouter, Routes, and Route from react-router-dom.
These components are used to implement client-side routing in the React application.

Line 4:
Imports the Login component from the components folder.
This component will be rendered when the login route is accessed.

Line 6:
Defines the App functional component.
This is the root component of the application.

Line 7:
Starts the JSX returned by the App component.

Line 8:
BrowserRouter wraps the application and enables routing functionality.
It listens for URL changes and renders the appropriate component.

Line 9:
Routes acts as a container for all route definitions.

Line 10:
Defines a route with the path "/login".
When the user navigates to "/login", the Login component is rendered.

Line 11:
Closes the Routes component.

Line 12:
Closes the BrowserRouter component.

Line 13:
Ends the return statement.

Line 14:
Closes the App component function.

Line 16:
Exports the App component as the default export.
This allows the component to be imported and rendered in other files.

Purpose of this File:
This file serves as the application's entry routing configuration. Currently, it contains a single route (/login) that renders the Login component. Additional routes can be added in the future as the application grows.

Why BrowserRouter and Routes are used:
Using BrowserRouter and Routes from the beginning makes the application scalable. Even if there is currently only one page, future pages such as Dashboard, Register, Profile, Forgot Password, and Settings can be added easily without restructuring the application.

*/

/*
File: src/App.js

Line 1:
Imports BrowserRouter, Routes, and Route from react-router-dom.

Purpose:
These components are used to implement routing in the React application.

BrowserRouter:
Enables client-side routing using the browser's URL.

Routes:
Acts as a container for all route definitions.

Route:
Defines which component should render for a specific URL path.

Line 2:
Imports the Login page component.

Purpose:
Displays the login screen where users can authenticate.

Line 3:
Imports the Dashboard page component.

Purpose:
Displays the main application dashboard after successful login.

Line 4:
Imports the ReferralDetails page component.

Purpose:
Intended to display detailed referral information.

Note:
This component is imported but currently not used in any route.

Line 5:
Imports the NotFound page component.

Purpose:
Displays a custom 404 page when users navigate to an invalid URL.

Line 6:
Imports the ProtectedRoute component.

Purpose:
Protects private routes by checking whether the user is authenticated.

Line 8:
Defines the App functional component.

Purpose:
Acts as the root component of the application.

Line 9:
Starts the JSX returned by the component.

Line 10:
Wraps the application inside BrowserRouter.

Purpose:
Enables routing functionality throughout the application.

Line 11:
Creates a Routes container.

Purpose:
Holds all route definitions.

Line 12:
Defines the Login route.

Code:
<Route path="/login" element={<Login />} />

Purpose:
When the URL is "/login", the Login component is rendered.

Line 13:
Starts the route definition for the home page.

Line 14:
Defines the path as "/".

Purpose:
This route acts as the application's main page.

Line 14 - 18:
Wraps the Dashboard component inside ProtectedRoute.

Code: <ProtectedRoute> <Dashboard /> </ProtectedRoute>

Purpose:
Ensures that only authenticated users can access the Dashboard.

Authentication Flow:

1. User visits "/"
2. ProtectedRoute checks for jwt_token.
3. If token exists:
   → Dashboard is rendered.
4. If token does not exist:
   → User is redirected to "/login".

Line 19:
Closes the home page route.

Line 20:
Defines a wildcard route.

Code:
<Route path="*" element={<NotFound />} />

Purpose:
Handles all invalid URLs.

Examples:

* /abc
* /dashboard123
* /unknown

All of these will render the NotFound page.

Line 23:
Closes the Routes component.

Line 24:
Closes BrowserRouter.

Line 25:
Ends the return statement.

Line 26:
Closes the App component.

Line 28:
Exports App as the default export.

Purpose:
Allows App to be imported and rendered in the application's entry file.

Purpose of this File:

This file acts as the central routing configuration for the entire React application. It defines which page should be displayed for each URL and applies authentication protection where required.

Current Route Structure:

/login
→ Login Page

/
→ Protected Dashboard Page

*

→ Not Found Page

Security Design:

Public Routes:

* /login

Protected Routes:

* /

Only authenticated users can access protected routes because they are wrapped inside ProtectedRoute.

Observation:

Imported but not currently used:
import ReferralDetails from './pages/ReferralDetails'

Since no route exists for this component, it is currently unused.

Possible Future Route:

<Route
path="/referral/:id"
element={ <ProtectedRoute> <ReferralDetails /> </ProtectedRoute>
}
/>

This would allow users to view referral details while still enforcing authentication.

Why This Structure Was Chosen:

1. Separates routing logic from page components.
2. Makes the application scalable as new pages are added.
3. Protects sensitive pages using ProtectedRoute.
4. Provides a custom 404 page for invalid URLs.
5. Keeps the routing configuration clean and maintainable.
*/