import "./index.css"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Overview from "../../components/Overview";
import ServiceSummary from "../../components/ServiceSummary";
import ShareReferral from "../../components/ShareReferral";
import ReferralsTable from "../../components/ReferralsTable";
import Footer from "../../components/Footer";


const Dashboard = () => {
   const [dashboardData, setDashboardData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [errorMessage, setErrorMessage] = useState("");
   const [searchInput, setSearchInput] = useState("");
   const [sortBy, setSortBy] = useState("desc");

  
   useEffect(() => {
  getDashboardData();
}, [searchInput, sortBy]);

   const getDashboardData = async () => {
      try {
         const token = Cookies.get("jwt_token");

         let url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${searchInput}&sort=${sortBy}`;

        const response = await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
        });

         const data = await response.json();
         if(response.ok){
            
            setDashboardData(data.data);
         }
         else{
            setErrorMessage(data.message);
         }
      }
      catch(error){
         setErrorMessage("Something went wrong");
      }
      setIsLoading(false);
   };


   if (isLoading) {
  return (
    <div className="status-container">
      <h2>Loading...</h2>
    </div>
  );
}

if (errorMessage) {
  return (
    <div className="status-container">
      <h2>{errorMessage}</h2>
    </div>
  );
}

    return (
      <>
     <Navbar/>
        <div className="dashboard-container">
            <h1>Referral Dashboard</h1>
            <p> 
                Track your referrals, earnings, and partner activity in one place.
            </p>
           <Overview metrics={dashboardData.metrics}/>
           <ServiceSummary serviceSummary={dashboardData.serviceSummary} />
           <ShareReferral referral={dashboardData.referral} />
           <ReferralsTable
  referrals={dashboardData.referrals}
  searchInput={searchInput}
  setSearchInput={setSearchInput}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>
        </div>
        <Footer />
         </>
    );
};

export default Dashboard;

/*
-----------------------------------
Version 1
-----------------------------------

File: src/pages/Dashboard/index.js

Line 1:
Defines a functional component named Dashboard.

Purpose:
This component represents the main dashboard page of the application.

A dashboard is typically the first page users see after successfully logging in.

Line 2:
Starts the JSX returned by the component.

Purpose:
Specifies the UI that will be displayed when the Dashboard component is rendered.

Line 3:
Creates a div element.

Purpose:
Acts as a container for all dashboard content.

Line 4:
Creates an h1 heading element.

Content:
Referral Dashboard

Purpose:
Displays the main title of the page.

This helps users immediately understand which page they are viewing.

Line 5 - 7:
Creates a paragraph element.

Content:
Track your referrals, earnings, and partner activity in one place.

Purpose:
Provides a brief description of the dashboard's purpose.

This text informs users that the dashboard will be used to monitor:

* Referral activity
* Earnings
* Partner performance

Line 8:
Closes the div container.

Line 9:
Ends the return statement.

Line 10:
Closes the Dashboard component.

Line 12:
Exports Dashboard as the default export.

Purpose:
Allows this component to be imported and used in other files such as App.js.

Purpose of this File:

This file defines the Dashboard page displayed after a successful login. Currently, it serves as a placeholder page containing a title and description. In future development, this page can be expanded to display referral statistics, earnings reports, partner information, charts, tables, and other business-related metrics.

Current UI Output:

Referral Dashboard

Track your referrals, earnings, and partner activity in one place.

Future Enhancements:

Possible features that may be added to this dashboard:

1. Total Referrals Count

   * Number of referrals generated.

2. Earnings Summary

   * Total commissions earned.

3. Active Partners

   * List of currently active referral partners.

4. Referral Status Tracking

   * Pending
   * Approved
   * Rejected

5. Charts and Analytics

   * Referral growth over time.
   * Monthly earnings trends.

6. Recent Activities

   * Latest referrals.
   * Recent partner actions.

Why This Component Exists:

Even though the component is currently simple, creating the Dashboard page early establishes the application's structure and routing flow. It provides a dedicated location where business metrics and referral management features can be added as the project grows.

Application Flow:

1. User logs in successfully.
2. JWT token is stored in cookies.
3. User is redirected to "/".
4. ProtectedRoute validates the token.
5. Dashboard component is rendered.
6. User can view referral-related information.

Relationship with Other Files:

App.js
→ Defines the "/" route that renders Dashboard.

ProtectedRoute
→ Protects Dashboard from unauthorized access.

Login Page
→ Redirects users to Dashboard after successful authentication.

This makes Dashboard the primary authenticated page of the application.
 */

/*

-----------------------------------
Version 2
-----------------------------------

File: src/pages/Dashboard/index.js

Line 1:
Imports useEffect and useState hooks from React.

useState:
Used to store and manage component state.

useEffect:
Used to perform side effects such as API calls when the component loads.

Line 2:
Imports the js-cookie library.

Purpose:
Used to retrieve the JWT token stored in browser cookies.

Line 3:
Imports the Navbar component.

Purpose:
Displays the navigation bar at the top of the dashboard page.

Line 6:
Defines the Dashboard functional component.

Purpose:
Represents the main page users see after logging in.

Line 7:
Creates a state variable named dashboardData.

Code:
const [dashboardData, setDashboardData] = useState(null);

Purpose:
Stores the dashboard data returned from the API.

Initial Value:
null

Line 8:
Creates a state variable named isLoading.

Code:
const [isLoading, setIsLoading] = useState(true);

Purpose:
Tracks whether data is currently being fetched.

Initial Value:
true

Reason:
The page starts in a loading state until the API request completes.

Line 9:
Creates a state variable named errorMessage.

Code:
const [errorMessage, setErrorMessage] = useState("");

Purpose:
Stores any error message returned by the API or application.

Initial Value:
Empty string

Line 11:
Calls useEffect.

Purpose:
Runs code after the component renders.

Line 12:
Executes getDashboardData() when the component loads.

Purpose:
Fetches dashboard information from the backend.

Line 13:
Empty dependency array ([]).

Purpose:
Ensures the effect runs only once when the component first mounts.

Equivalent Concept:
componentDidMount() in class components.

Line 15:
Defines an asynchronous function named getDashboardData.

Purpose:
Retrieves dashboard data from the backend API.

Line 16:
Starts a try block.

Purpose:
Handles successful API execution.

Line 17:
Retrieves the JWT token from browser cookies.

Code:
const token = Cookies.get("jwt_token");

Purpose:
Obtains the authentication token required for protected API access.

Line 19 - 26:
Makes an API request using fetch().

Purpose:
Requests referral dashboard data from the backend.

API Endpoint:
https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals

Line 22:
Creates request headers.

Purpose:
Provides authentication credentials to the backend.

Line 23:
Adds the Authorization header.

Code:
Authorization: `Bearer ${token}`

Purpose:
Sends the JWT token using the Bearer authentication scheme.

Example:

Authorization: Bearer eyJhbGciOi...

Why:
The backend validates the token before returning protected data.

Line 28:
Converts the API response into a JavaScript object.

Code:
const data = await response.json();

Purpose:
Allows access to the returned API data.

Line 29:
Checks whether the request succeeded.

Condition:
if(response.ok)

Purpose:
Determines whether the API returned a successful response.

Line 30:
Stores dashboard data in state.

Code:
setDashboardData(data.data);

Purpose:
Updates the UI with the retrieved information.

Line 32:
Handles API failure responses.

Purpose:
Displays the error message returned by the server.

Line 33:
Stores the API error message.

Code:
setErrorMessage(data.message);

Example:
"Unauthorized"
"Token Expired"

Line 35:
Closes the if-else block.

Line 36:
Starts the catch block.

Purpose:
Handles unexpected errors.

Examples:

* Network failure
* Server unavailable
* Invalid JSON response

Line 37:
Stores a generic error message.

Code:
setErrorMessage("Something went wrong");

Purpose:
Prevents application crashes and provides user feedback.

Line 38:
Closes the catch block.

Line 39:
Updates loading state.

Code:
setIsLoading(false);

Purpose:
Indicates that the API request has finished.

Important:
This executes whether the request succeeds or fails.

Line 40:
Closes the getDashboardData function.

Line 41:
Checks whether data is still loading.

Condition:
if(isLoading)

Purpose:
Displays a loading message while waiting for the API response.

Line 42:
Returns a loading indicator.

Output:
Loading...

Line 43:
Closes the loading condition.

Line 44:
Checks whether an error exists.

Condition:
if(errorMessage)

Purpose:
Displays the error instead of dashboard content.

Line 45:
Renders the error message.

Example:
Unauthorized

Something went wrong

Line 46:
Closes the error condition.

Line 48:
Starts the JSX return statement.

Purpose:
Renders the dashboard UI when data is successfully loaded.

Line 49:
Uses a React Fragment.

Syntax:
<></>

Purpose:
Allows multiple elements to be returned without creating an unnecessary wrapper div.

Line 50:
Renders the Navbar component.

Purpose:
Displays navigation controls at the top of the page.

Line 51:
Creates the dashboard container.

Class:
dashboard-container

Purpose:
Wraps dashboard content.

Line 52:
Displays the dashboard title.

Output:
Referral Dashboard

Line 53 - 55:
Displays a description paragraph.

Purpose:
Explains the purpose of the dashboard.

Line 56:
Creates a pre element.

Purpose:
Preserves formatting and indentation.

Useful for debugging API responses.

Line 57:
Converts dashboardData into a formatted JSON string.

Code:
JSON.stringify(dashboardData, null, 2)

Parameters:

dashboardData
→ Object to convert.

null
→ No custom transformation.

2
→ Indentation spacing.

Purpose:
Displays API data in a readable format.

Example Output:

{
"totalReferrals": 25,
"earnings": 1200
}

Line 58:
Closes the pre element.

Line 59:
Closes the dashboard container.

Line 60:
Closes the React Fragment.

Line 61:
Ends the return statement.

Line 62:
Closes the Dashboard component.

Line 64:
Exports Dashboard as the default export.

Purpose:
Allows this component to be imported and used elsewhere.

Purpose of this File:

This component serves as the application's main authenticated dashboard. It retrieves referral-related data from a protected API endpoint, displays loading and error states, and renders the retrieved information once the request is successful.

Data Flow:

1. User logs in.
2. JWT token is stored in cookies.
3. Dashboard component loads.
4. useEffect triggers getDashboardData().
5. JWT token is retrieved from cookies.
6. API request is sent with Authorization header.
7. Backend validates the token.
8. Dashboard data is returned.
9. State is updated.
10. Dashboard content is rendered.

Why Loading and Error States Were Added:

Loading State:

* Prevents displaying empty content while waiting for data.

Error State:

* Provides meaningful feedback if the request fails.

This improves user experience and application reliability.

Current Purpose of JSON.stringify():

The dashboard currently displays raw API data for testing and debugging purposes.

In production, this data would typically be displayed using:

* Cards
* Tables
* Charts
* Statistics Panels
* Referral Lists

instead of raw JSON.


*/


/*

-----------------------------------
Version 3
-----------------------------------
File Update: src/pages/Dashboard/index.js

Changes Made from Previous Version

Line 4:
Added:

import Overview from "../../components/Overview";

Purpose:
Imports the Overview component.

Reason:
Instead of displaying raw JSON data directly on the screen, the dashboard now delegates metric rendering to a dedicated reusable component.

Benefits:

* Better code organization.
* Improved component reusability.
* Cleaner Dashboard component.
* Easier maintenance.

---

Previous Code:

<pre>
   {JSON.stringify(dashboardData, null, 2)}
</pre>

Purpose:
Displayed raw API data for debugging and testing.

Limitation:
Not suitable for production because users should not see raw JSON responses.

---

New Code:

<Overview metrics={dashboardData.metrics}/>

Purpose:
Passes dashboard metrics data to the Overview component.

How It Works:

dashboardData
↓
dashboardData.metrics
↓
Overview Component
↓
metrics.map(...)
↓
Metric Cards Rendered

Example Data:

dashboardData = {
metrics: [
{
id: 1,
label: "Total Referrals",
value: 120
},
{
id: 2,
label: "Total Earnings",
value: "$5,000"
}
]
}

The Overview component receives:

metrics={dashboardData.metrics}

and renders metric cards automatically.

---

Architecture Improvement

Old Structure:

Dashboard
↓
Display Raw JSON

New Structure:

Dashboard
↓
Overview Component
↓
Metric Cards

Benefits:

1. Separation of Concerns
   Dashboard handles data fetching.
   Overview handles metric presentation.

2. Reusability
   Overview can be reused on other pages.

3. Cleaner Code
   Dashboard becomes easier to read.

4. Scalability
   Additional dashboard sections can be added independently.

---

Why This Change Was Made

During initial development, JSON.stringify() was useful for verifying API responses.

Once the API structure became stable, a dedicated Overview component was introduced to present the data in a user-friendly dashboard format rather than exposing raw JSON.

*/

/*

VERSION 4 


File Update: src/pages/Dashboard/index.js

Version Change:
Added ServiceSummary component to display service-specific referral statistics.

---

Line 4

Added:

import ServiceSummary from "../../components/ServiceSummary";

Purpose:
Imports the ServiceSummary component.

Reason:
The dashboard now displays service-level referral information in addition to overall metrics.

Benefits:

* Better dashboard organization.
* Separates service statistics from overview statistics.
* Improves component reusability.
* Makes the Dashboard component cleaner.

---

Previous Dashboard Layout

<Navbar />

Dashboard Heading

Overview Component

Purpose:
Displayed only high-level dashboard metrics.

Structure:

Dashboard
↓
Overview
↓
Metrics Cards

---

New Dashboard Layout

<Navbar />

Dashboard Heading

Overview Component

ServiceSummary Component

Purpose:
Displays additional service-specific referral details.

Structure:

Dashboard
↓
Overview
↓
Overall Metrics

Dashboard
↓
ServiceSummary
↓
Service Statistics

---

Added JSX

<ServiceSummary
 serviceSummary={dashboardData.serviceSummary}
/>

Purpose:
Passes service summary data from the API response into the ServiceSummary component.

Data Flow:

API Response
↓
dashboardData
↓
dashboardData.serviceSummary
↓
ServiceSummary Component
↓
Service Information Rendered

---

Expected Data Structure

dashboardData = {
metrics: [...],

```
serviceSummary: {
    service: "Business Loan",
    yourReferrals: 25,
    activeReferrals: 10,
    totalRefEarnings: "₹15,000"
}
```

}

---

Rendered Dashboard Structure

Referral Dashboard

Track your referrals, earnings, and partner activity in one place.

---

## Overview Section

Total Referrals
Total Earnings
Active Partners
Conversion Rate

---

## Service Summary Section

Service
Business Loan

Your Referrals
25

Active Referrals
10

Total Ref. Earnings
₹15,000

---

---

Why This Change Was Made

Previously:

The dashboard displayed only overall business metrics.

Limitation:

Users could see total statistics but could not view service-specific referral information.

Now:

The dashboard displays:

1. Overall Metrics
   → Through Overview component

2. Service Metrics
   → Through ServiceSummary component

Benefit:

Provides a more complete view of referral performance.

---

Architecture Improvement

Before:

Dashboard
↓
Overview

After:

Dashboard
↓
Overview

Dashboard
↓
ServiceSummary

Benefits:

1. Better Separation of Concerns
2. More Modular Components
3. Easier Maintenance
4. Improved Scalability
5. Reusable UI Components

---

Issue Found

Current Code:

import Overview from "../../components/Overview";

<ServiceSummary
 serviceSummary={dashboardData.serviceSummary}
/>

Problem:

ServiceSummary is used but not imported in the provided code.

Required Import:

import ServiceSummary from "../../components/ServiceSummary";

Without this import:

Error:
ServiceSummary is not defined

The application will fail to compile.

---

Summary of Changes

Added:

* ServiceSummary component import
* ServiceSummary component rendering

New Data Used:

* dashboardData.serviceSummary

Purpose:
To display service-specific referral statistics alongside overall dashboard metrics.
*/