import "./index.css"

const ServiceSummary = ({serviceSummary}) => {
    return (
        <section className="service-summary">
            <h2> Service Summary </h2>

            <div className="summary-grid">
                <div className="summary-card">
                    <p> Service </p>
                    <h4 className="some-service"> {serviceSummary.service}</h4>
                </div>
               <div className="summary-card">
  <p>Your Referrals</p>
  <h4>{serviceSummary.yourReferrals}</h4>
</div>

<div className="summary-card">
  <p>Active Referrals</p>
  <h4>{serviceSummary.activeReferrals}</h4>
</div>

<div className="summary-card">
  <p>Total Ref. Earnings</p>
  <h4>{serviceSummary.totalRefEarnings}</h4>
</div>
            </div>
        </section>
    );
};

export default ServiceSummary;


/*

File: src/components/ServiceSummary/index.js

Line 1:
Imports the CSS file associated with the ServiceSummary component.

Purpose:
Contains styling rules for the service summary section.

Line 3:
Defines a functional component named ServiceSummary.

Code:
const ServiceSummary = ({ serviceSummary }) => {

Purpose:
Creates a reusable component that displays service-related referral statistics.

Line 3:
Receives a prop named serviceSummary.

Purpose:
Contains service-specific information received from the parent component.

Example:

{
service: "Business Loan",
yourReferrals: 25,
activeReferrals: 10,
totalRefEarnings: "₹15,000"
}

Line 4:
Starts the JSX returned by the component.

Line 5:
Creates a section element.

Class:
service-summary

Purpose:
Groups all service summary content together.

Semantic Benefit:
Represents a distinct section of the dashboard.

Line 6:
Displays a heading.

Output:
Service Summary

Purpose:
Identifies the section for users.

Line 8:
Creates a container for summary items.

Class:
summary-grid

Purpose:
Organizes summary information in a grid layout.

Line 9:
Creates the first summary card/container.

Purpose:
Displays the service name.

Line 10:
Displays the label.

Output:
Service

Purpose:
Describes the data shown below.

Line 11:
Displays the service name.

Code:
{serviceSummary.service}

Example Output:
Business Loan

Purpose:
Shows which service the statistics belong to.

Line 12:
Closes the first summary item.

Line 13:
Creates the second summary card/container.

Purpose:
Displays referral count.

Line 14:
Displays the label.

Output:
Your Referrals

Purpose:
Indicates the total referrals submitted by the current user.

Line 15:
Displays referral count.

Code:
{serviceSummary.yourReferrals}

Example Output:
25

Purpose:
Shows how many referrals the user has made.

Line 16:
Closes the second summary item.

Line 17:
Creates the third summary card/container.

Purpose:
Displays active referral count.

Line 18:
Displays the label.

Output:
Active Referrals

Purpose:
Indicates referrals currently being processed or active.

Line 19:
Displays active referral value.

Code:
{serviceSummary.activeReferrals}

Example Output:
10

Purpose:
Shows the number of currently active referrals.

Line 20:
Closes the third summary item.

Line 21:
Creates the fourth summary card/container.

Purpose:
Displays referral earnings.

Line 22:
Displays the label.

Output:
Total Ref. Earnings

Purpose:
Indicates total earnings generated from referrals.

Line 23:
Displays earnings value.

Code:
{serviceSummary.totalRefEarnings}

Example Output:
₹15,000

Purpose:
Shows total commission or referral income earned.

Line 24:
Closes the fourth summary item.

Line 25:
Closes the summary-grid container.

Line 26:
Closes the section element.

Line 27:
Ends the return statement.

Line 28:
Closes the ServiceSummary component.

Line 30:
Exports ServiceSummary as the default export.

Purpose:
Allows the component to be imported and used in other files.

Purpose of this File:

This component displays a summarized view of referral performance for a specific service. It presents key business metrics such as service name, referral count, active referrals, and total referral earnings in a structured format.

Expected Data Flow:

Dashboard
↓
serviceSummary Object
↓
ServiceSummary Component
↓
Summary Cards Rendered

Example Data Received:

const serviceSummary = {
service: "Business Loan",
yourReferrals: 25,
activeReferrals: 10,
totalRefEarnings: "₹15,000"
};

Rendered Output:

---

Service Summary

Service
Business Loan

Your Referrals
25

Active Referrals
10

Total Ref. Earnings
₹15,000
-------

Why Props Were Used:

The component does not fetch data itself.

Instead:

Dashboard
→ Fetches API data

ServiceSummary
→ Receives data through props

Benefits:

1. Reusable Component
2. Easier Testing
3. Better Separation of Concerns
4. Cleaner Architecture

Relationship with Other Components:

Dashboard
→ Fetches referral data.

ServiceSummary
→ Displays service-level statistics.

Overview
→ Displays overall dashboard metrics.

Navbar
→ Handles navigation and logout.

Together these components build the complete dashboard experience.

Interview Explanation:

What is the purpose of the ServiceSummary component?

The ServiceSummary component displays key referral statistics for a specific service. It receives data through props and presents information such as the service name, total referrals, active referrals, and referral earnings in a structured format.

Why did you pass data through props instead of fetching again?

The Dashboard component already fetches the data from the API. Passing the required data as props avoids unnecessary API calls, improves performance, and keeps components focused on a single responsibility.


*/