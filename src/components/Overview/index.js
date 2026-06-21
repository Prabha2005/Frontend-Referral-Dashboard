import {
  FaDollarSign,
  FaCreditCard,
  FaLink,
  FaHourglassHalf,
  FaPercentage,
  FaMoneyBillWave,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";

import "./index.css";

const icons = [
  <FaDollarSign />,
  <FaCreditCard />,
  <FaLink />,
  <FaHourglassHalf />,
  <FaPercentage />,
  <FaMoneyBillWave />,
  <FaUsers />,
  <FaExchangeAlt />,
];

const Overview = ({metrics}) => {
  return (
    <section className="overview-section">
      <h2>Overview</h2>

      <div className="metrics-grid">
        {metrics.map((each, index) => (
          <div className="metric-card" key={each.id}>
            <div className="metric-icon">
              {icons[index]}
            </div>

            <h3>{each.value}</h3>
            <p>{each.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
/*

File: src/components/Overview/index.js

Line 1:
Imports the CSS file associated with the Overview component.

Purpose:
Contains styles used to control the layout and appearance of the overview section.

Line 3:
Defines a functional component named Overview.

Purpose:
Displays summary metrics in a dashboard-friendly format.

Line 3:
Receives a prop named metrices.

Purpose:
Expected to contain an array of metric objects received from the parent component.

Example:

[
{
id: 1,
label: "Total Referrals",
value: 120
},
{
id: 2,
label: "Total Earnings",
value: "$500"
}
]

Important Observation:

The component receives:

const Overview = ({metrices}) =>

But later uses:

metrics.map(...)

There is a spelling mismatch.

Received:
metrices

Used:
metrics

This will cause an error because metrics is not defined.

Recommended Fix:

const Overview = ({ metrics }) =>

OR

metrices.map(...)

Use the same variable name consistently.

Line 4:
Starts the JSX returned by the component.

Line 5:
Creates a section element.

Class:
overview-section

Purpose:
Groups all overview-related content together.

Semantic Benefit:
section indicates a standalone content area within the page.

Line 6:
Displays a secondary heading.

Output:
Overview

Purpose:
Introduces the summary metrics section.

Line 8:
Creates a container for metric cards.

Class:
metrics-grid

Purpose:
Used to organize multiple metric cards in a grid layout.

Line 9:
Loops through the metrics array.

Code:
metrics.map(each => (

Purpose:
Creates one metric card for each metric object.

How map Works:

Input:

[
{ id: 1, label: "Users", value: 120 },
{ id: 2, label: "Sales", value: 50 }
]

Output:

Metric Card 1
Metric Card 2

Each item in the array generates a separate UI element.

Line 10:
Creates a metric card container.

Class:
metric-card

Purpose:
Displays an individual metric.

Line 10:
Assigns a key prop.

Code:
key={each.id}

Purpose:
Helps React efficiently update and track list items.

Why key is important:

Without a unique key:

* React may re-render unnecessarily.
* Performance may decrease.
* Warnings appear in the console.

Line 11:
Displays the metric value.

Code:

<h3>{each.value}</h3>

Examples:

120
₹5000
75%

Purpose:
Highlights the most important metric information.

Line 12:
Displays the metric label.

Code:

<p>{each.label}</p>

Examples:

Total Referrals
Revenue
Active Partners

Purpose:
Explains what the metric value represents.

Line 13:
Closes the metric card.

Line 14:
Closes the map function.

Line 15:
Closes the metrics grid container.

Line 16:
Closes the section element.

Line 17:
Ends the return statement.

Line 18:
Closes the Overview component.

Line 20:
Exports Overview as the default export.

Purpose:
Allows the component to be imported into other files.

Purpose of this File:

This component is responsible for displaying dashboard summary statistics in a card-based layout. It receives metric data from a parent component and dynamically generates a collection of metric cards using the map() function.

Example Data Received:

const metrics = [
{
id: 1,
value: 120,
label: "Total Referrals"
},
{
id: 2,
value: "$5,000",
label: "Total Earnings"
}
];

Rendered Output:

---

Overview

120
Total Referrals

$5,000
Total Earnings
--------------

Data Flow:

Dashboard Component
↓
metrics
↓
Overview Component
↓
map() generates cards
↓
Metrics displayed on screen

Why map() Was Used:

Instead of manually creating cards:

<div>Card 1</div>
<div>Card 2</div>
<div>Card 3</div>

The application uses:

metrics.map(...)

Benefits:

1. Dynamic rendering.
2. Cleaner code.
3. Easier maintenance.
4. Supports any number of metrics.

Relationship with Dashboard:

Dashboard
→ Fetches API data.

Overview
→ Receives metric data through props.

Overview
→ Displays the metrics visually.

This separation keeps the application modular and reusable.

Issues Found:

Issue 1:

Current:

const Overview = ({metrices}) =>

Later:

metrics.map(...)

Problem:
metrics is undefined.

Fix:

const Overview = ({ metrics }) =>

Issue 2:

Variable Name

Current:
metrices

Recommended:
metrics

Reason:
"metrics" is the standard and commonly accepted term in software development.

Interview Explanation:

What is the purpose of the Overview component?

The Overview component is a reusable dashboard component that displays summary statistics such as referrals, earnings, or active users. It receives data through props and dynamically generates metric cards using the map() method.

Why did you use map()?

I used map() because the number of metrics can change. It allows me to dynamically generate UI elements from an array while keeping the code clean, scalable, and maintainable.

Why did you use a key prop?

The key prop helps React uniquely identify each list item, improving rendering performance and preventing unnecessary DOM updates.


*/