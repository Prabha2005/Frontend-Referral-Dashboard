import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css"

const ReferralsTable = ({
  referrals,
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = date => {
        return date.replaceAll("-", "/");
    };

    const formatProfit = amount => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };


    const itemsPerPage = 10;

const startIndex = (currentPage - 1) * itemsPerPage;

const currentItems = referrals.slice(
  startIndex,
  startIndex + itemsPerPage
);

const totalPages = Math.ceil(
  referrals.length / itemsPerPage
);
    return (
        <section className="table-section">
            <h2> All Referrals </h2>

          <div className="table-controls">

  <div className="search-container">
    <label>Search</label>

    <input
      type="search"
      placeholder="Name or service..."
      value={searchInput}
      onChange={event =>
        setSearchInput(event.target.value)
      }
    />
  </div>

  <div className="sort-container">
    <label>Sort by date</label>

    <select
      value={sortBy}
      onChange={event =>
        setSortBy(event.target.value)
      }
    >
      <option value="desc">Newest first</option>
      <option value="asc">Oldest first</option>
    </select>
  </div>

</div>

            <table className="referrals-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Profit</th>
                    </tr>
                </thead>

                <tbody>
                    {referrals.length === 0 ? (
                        <tr>
                            <td colSpan="4">No matching entries</td>
                        </tr>
                    ) : (
                    currentItems.map(item => (
                       <tr
                       key={item.id}
                       onClick={() => navigate(`/referral/${item.id}`)} 
                       >
                        <td>{item.name}</td>
                        <td>{item.serviceName}</td>
                        <td>{formatDate(item.date)}</td>
                        <td className="profit-cell">
  {formatProfit(item.profit)}
</td>
                        </tr>
                    )))}
                </tbody>
            </table>
          <div className="pagination-wrapper">

  <p className="entries-text">
    Showing {startIndex + 1}–
    {Math.min(startIndex + itemsPerPage, referrals.length)}
    of {referrals.length} entries
  </p>

  <div className="pagination">
  <button
    onClick={() =>
      setCurrentPage(prev => prev - 1)
    }
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={
          currentPage === index + 1
            ? "active-page"
            : ""
        }
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

  <button
    onClick={() =>
      setCurrentPage(prev => prev + 1)
    }
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
</div>
        </section>
    );
};

export default ReferralsTable;

/*

File: src/components/Referrals/index.js

Line 1:
Imports useNavigate from react-router-dom.

Purpose:
Provides programmatic navigation between routes.

Benefit:
Allows users to navigate to referral details when a table row is clicked.

Line 2:
Imports the CSS file associated with the ReferralsTable component.

Purpose:
Contains styling for the referrals table.

Line 4:
Defines a functional component named ReferralsTable.

Code:
const ReferralsTable = ({ referrals }) => {

Purpose:
Creates a reusable component that displays referral records in a table.

Line 4:
Receives a prop named referrals.

Purpose:
Contains an array of referral objects passed from the parent component.

Example:

[
{
id: 1,
name: "John",
serviceName: "Business Loan",
date: "2026-06-20",
profit: 1200
}
]

Line 5:
Initializes the navigate function.

Code:
const navigate = useNavigate();

Purpose:
Used to redirect users to a referral details page.

---

Line 7:
Defines a helper function named formatDate.

Code:
const formatDate = date => {

Purpose:
Formats date values before displaying them.

Line 8:
Replaces all hyphens (-) with forward slashes (/).

Code:
return date.replaceAll("-", "/");

Example:

Input:
2026-06-20

Output:
2026/06/20

Purpose:
Makes dates easier to read.

Line 9:
Closes the formatDate function.

---

Line 11:
Defines a helper function named formatProfit.

Code:
const formatProfit = amount => {

Purpose:
Formats profit amounts as currency.

Line 12-16:
Creates a NumberFormat object.

Code:

new Intl.NumberFormat("en-US", {
style: "currency",
currency: "USD",
maximumFractionDigits: 0,
})

Purpose:
Formats numbers according to US currency conventions.

Example:

Input:
1200

Output:
$1,200

Line 17:
Applies formatting to the amount.

Code:
.format(amount);

Purpose:
Returns a formatted currency string.

Line 18:
Closes the formatProfit function.

---

Line 19:
Starts the JSX return statement.

Line 20:
Creates a section element.

Class:
table-section

Purpose:
Groups the referral table content.

Line 21:
Displays the section heading.

Output:
All Referrals

Purpose:
Identifies the table content.

---

Line 23:
Creates a table element.

Class:
referrals-table

Purpose:
Displays referral data in tabular format.

---

Table Header

Line 24:
Creates the table header section.

Line 25:
Creates a table row.

Purpose:
Represents the header row.

Line 26:
Creates the Name column heading.

Line 27:
Creates the Service column heading.

Line 28:
Creates the Date column heading.

Line 29:
Creates the Profit column heading.

Line 30:
Closes the header row.

Line 31:
Closes the table header.

---

Table Body

Line 33:
Creates the table body.

Purpose:
Contains all referral records.

Line 34:
Loops through the referrals array.

Code:
referrals.map(item => (

Purpose:
Creates one table row for each referral.

Example:

5 referrals
→ 5 table rows

---

Issue Found #1

Current Code:

<tr>
key={item.id}
onClick={() => navigate(`/referral/${item.id}`)}

Problem:

The key prop is placed outside the opening tag.

This will cause a syntax error.

Incorrect:

<tr>
key={item.id}

Correct:

<tr
    key={item.id}
    onClick={() => navigate(`/referral/${item.id}`)}
>

---

Line 36:
Attaches an onClick event.

Code:
onClick={() => navigate(`/referral/${item.id}`)}

Purpose:
Navigates to a specific referral details page.

Example:

Referral ID:
15

Generated URL:

/referral/15

Benefit:
Users can click a row to view detailed referral information.

---

Line 37:
Displays the referral name.

Code:

<td>{item.name}</td>

Example:
John Smith

---

Line 38:
Displays the service name.

Code:

<td>{item.serviceName}</td>

Example:
Business Loan

---

Line 39:
Displays the formatted date.

Code:

<td>{formatDate(item.date)}</td>

Example:

Input:
2026-06-20

Output:
2026/06/20

---

Issue Found #2

Current Code:

<td>{formatDate(item.profit)}</td>

Problem:

Profit is being passed to formatDate().

Example:

formatDate(1200)

This will cause an error because replaceAll() only works on strings.

Correct Code:

<td>{formatProfit(item.profit)}</td>

Purpose:
Profit should be formatted as currency, not as a date.

Expected Output:

$1,200

---

Line 41:
Closes the table row.

Line 42:
Closes the map function.

Line 43:
Closes the table body.

Line 44:
Closes the table.

Line 45:
Closes the section.

Line 46:
Ends the return statement.

Line 47:
Closes the ReferralsTable component.

Line 49:
Exports ReferralsTable as the default export.

Purpose:
Allows the component to be imported into other files.

---

Purpose of this File

This component displays referral records in a tabular format. It receives referral data through props, formats dates and profits for better readability, and allows users to navigate to a detailed referral page by clicking a table row.

---

Expected Data Flow

Dashboard
↓
referrals Array
↓
ReferralsTable Component
↓
Table Rows Generated

---

Expected Data Structure

const referrals = [
{
id: 1,
name: "John Smith",
serviceName: "Business Loan",
date: "2026-06-20",
profit: 1200
}
];

---

Rendered Output

---

## Name         Service         Date         Profit

## John Smith   Business Loan   2026/06/20  $1,200

Clicking the row:

→ Navigates to

/referral/1

---

Issues Found Summary

Issue 1:

Current:

<tr>
key={item.id}

Correct:

<tr
    key={item.id}
    onClick={() => navigate(`/referral/${item.id}`)}
>

Reason:
key must be inside the opening tag.

---

Issue 2:

Current:

<td>{formatDate(item.profit)}</td>

Correct:

<td>{formatProfit(item.profit)}</td>

Reason:
Profit should be displayed as currency, not as a date.

---

Interview Explanation

What is the purpose of the ReferralsTable component?

The ReferralsTable component displays referral records in a structured table format. It receives referral data through props, formats values for better readability, and allows users to navigate to detailed referral pages by clicking a row.

Why did you create formatDate() and formatProfit() functions?

I created helper functions to keep formatting logic separate from the JSX. This improves readability, reusability, and makes the UI code cleaner.

Why did you use useNavigate()?

I used useNavigate() to enable programmatic navigation. When a user clicks a referral row, they are redirected to a detailed page for that specific referral.

*/